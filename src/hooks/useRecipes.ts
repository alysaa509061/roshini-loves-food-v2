import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Recipe } from '@/types/recipe';
import { DEMO_RECIPES } from '@/utils/demoRecipes';

const DEMO_MIGRATED_KEY = 'roshini_demo_migrated_cloud';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch recipes from cloud
  const fetchRecipes = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching recipes:', error);
        return;
      }

      const mappedRecipes: Recipe[] = (data || []).map(r => ({
        id: r.id,
        title: r.title,
        description: r.description,
        ingredients: r.ingredients || [],
        instructions: r.instructions || [],
        servings: r.servings,
        cookTime: r.cook_time || undefined,
        tags: r.tags || [],
        isFavorite: r.is_favorite || false,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
      }));

      setRecipes(mappedRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Migrate demo recipes for first-time users
  const migrateDemoRecipes = useCallback(async () => {
    const migrated = localStorage.getItem(DEMO_MIGRATED_KEY);
    if (migrated) return;

    // Check if there are already recipes
    const { count } = await supabase
      .from('recipes')
      .select('*', { count: 'exact', head: true });

    if (count && count > 0) {
      localStorage.setItem(DEMO_MIGRATED_KEY, 'true');
      return;
    }

    // Add demo recipes
    const demoRecipesData = DEMO_RECIPES.map(recipe => ({
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      servings: recipe.servings,
      cook_time: recipe.cookTime,
      tags: recipe.tags,
      is_favorite: false,
    }));

    const { error } = await supabase.from('recipes').insert(demoRecipesData);
    
    if (!error) {
      localStorage.setItem(DEMO_MIGRATED_KEY, 'true');
      fetchRecipes();
    }
  }, [fetchRecipes]);

  // Set up real-time subscription
  useEffect(() => {
    fetchRecipes();
    migrateDemoRecipes();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('recipes-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'recipes',
        },
        () => {
          // Refetch on any change for simplicity
          fetchRecipes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchRecipes, migrateDemoRecipes]);

  const addRecipe = async (recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt' | 'isFavorite'>) => {
    const { data, error } = await supabase
      .from('recipes')
      .insert({
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        servings: recipe.servings,
        cook_time: recipe.cookTime,
        tags: recipe.tags,
        is_favorite: false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding recipe:', error);
      return null;
    }

    const newRecipe: Recipe = {
      id: data.id,
      title: data.title,
      description: data.description,
      ingredients: data.ingredients || [],
      instructions: data.instructions || [],
      servings: data.servings,
      cookTime: data.cook_time || undefined,
      tags: data.tags || [],
      isFavorite: data.is_favorite || false,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };

    return newRecipe;
  };

  const updateRecipe = async (id: string, updates: Partial<Recipe>) => {
    const dbUpdates: Record<string, unknown> = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.ingredients !== undefined) dbUpdates.ingredients = updates.ingredients;
    if (updates.instructions !== undefined) dbUpdates.instructions = updates.instructions;
    if (updates.servings !== undefined) dbUpdates.servings = updates.servings;
    if (updates.cookTime !== undefined) dbUpdates.cook_time = updates.cookTime;
    if (updates.tags !== undefined) dbUpdates.tags = updates.tags;
    if (updates.isFavorite !== undefined) dbUpdates.is_favorite = updates.isFavorite;

    const { error } = await supabase
      .from('recipes')
      .update(dbUpdates)
      .eq('id', id);

    if (error) {
      console.error('Error updating recipe:', error);
    }
  };

  const deleteRecipe = async (id: string) => {
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const getRecipe = (id: string) => {
    return recipes.find(recipe => recipe.id === id);
  };

  const importRecipes = async (importedRecipes: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt' | 'isFavorite'>[]) => {
    const recipesData = importedRecipes.map(recipe => ({
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      servings: recipe.servings,
      cook_time: recipe.cookTime,
      tags: recipe.tags,
      is_favorite: false,
    }));

    const { data, error } = await supabase
      .from('recipes')
      .insert(recipesData)
      .select();

    if (error) {
      console.error('Error importing recipes:', error);
      return [];
    }

    return data || [];
  };

  const exportRecipes = () => {
    return recipes;
  };

  const toggleFavorite = async (id: string) => {
    const recipe = recipes.find(r => r.id === id);
    if (recipe) {
      await updateRecipe(id, { isFavorite: !recipe.isFavorite });
    }
  };

  const refresh = async () => {
    await fetchRecipes();
  };

  return {
    recipes,
    isLoading,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipe,
    importRecipes,
    exportRecipes,
    toggleFavorite,
    refresh,
  };
};

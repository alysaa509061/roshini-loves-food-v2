import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Recipe } from '@/types/recipe';
import { DEMO_RECIPES } from '@/utils/demoRecipes';

const DEMO_MIGRATED_KEY = 'roshini_demo_migrated';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Fetch recipes from cloud
  const fetchRecipes = useCallback(async () => {
    if (!user) {
      setRecipes([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('user_id', user.id)
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
  }, [user]);

  // Migrate demo recipes for first-time users
  const migrateDemoRecipes = useCallback(async () => {
    if (!user) return;
    
    const migrated = localStorage.getItem(`${DEMO_MIGRATED_KEY}_${user.id}`);
    if (migrated) return;

    // Check if user already has recipes
    const { count } = await supabase
      .from('recipes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    if (count && count > 0) {
      localStorage.setItem(`${DEMO_MIGRATED_KEY}_${user.id}`, 'true');
      return;
    }

    // Add demo recipes
    const demoRecipesData = DEMO_RECIPES.map(recipe => ({
      user_id: user.id,
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
      localStorage.setItem(`${DEMO_MIGRATED_KEY}_${user.id}`, 'true');
      fetchRecipes();
    }
  }, [user, fetchRecipes]);

  // Set up real-time subscription
  useEffect(() => {
    if (!user) return;

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
          filter: `user_id=eq.${user.id}`,
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
  }, [user, fetchRecipes, migrateDemoRecipes]);

  const addRecipe = async (recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt' | 'isFavorite'>) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('recipes')
      .insert({
        user_id: user.id,
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
    if (!user) return;

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
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating recipe:', error);
    }
  };

  const deleteRecipe = async (id: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const getRecipe = (id: string) => {
    return recipes.find(recipe => recipe.id === id);
  };

  const importRecipes = async (importedRecipes: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt' | 'isFavorite'>[]) => {
    if (!user) return [];

    const recipesData = importedRecipes.map(recipe => ({
      user_id: user.id,
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

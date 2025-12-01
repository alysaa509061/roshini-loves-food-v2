import { useState, useEffect } from 'react';
import { Recipe } from '@/types/recipe';
import { DEMO_RECIPES } from '@/utils/demoRecipes';

const STORAGE_KEY = 'roshini_recipes';
const DEMO_LOADED_KEY = 'roshini_demo_loaded';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Load recipes from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const demoLoaded = localStorage.getItem(DEMO_LOADED_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRecipes(parsed);
      } catch (error) {
        console.error('Failed to load recipes:', error);
      }
    } else if (!demoLoaded) {
      // First time visitor - load demo recipes
      const demoRecipesWithIds: Recipe[] = DEMO_RECIPES.map((recipe, index) => ({
        ...recipe,
        id: `demo-${index}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      setRecipes(demoRecipesWithIds);
      localStorage.setItem(DEMO_LOADED_KEY, 'true');
    }
  }, []);

  // Save recipes to localStorage whenever they change
  useEffect(() => {
    if (recipes.length > 0 || localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    }
  }, [recipes]);

  const addRecipe = (recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setRecipes(prev => [newRecipe, ...prev]);
    return newRecipe;
  };

  const updateRecipe = (id: string, updates: Partial<Recipe>) => {
    setRecipes(prev =>
      prev.map(recipe =>
        recipe.id === id
          ? { ...recipe, ...updates, updatedAt: new Date().toISOString() }
          : recipe
      )
    );
  };

  const deleteRecipe = (id: string) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== id));
  };

  const getRecipe = (id: string) => {
    return recipes.find(recipe => recipe.id === id);
  };

  const importRecipes = (importedRecipes: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>[]) => {
    const newRecipes: Recipe[] = importedRecipes.map(recipe => ({
      ...recipe,
      id: Date.now().toString() + Math.random(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    setRecipes(prev => [...newRecipes, ...prev]);
    return newRecipes;
  };

  const exportRecipes = () => {
    return recipes;
  };

  return {
    recipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipe,
    importRecipes,
    exportRecipes,
  };
};

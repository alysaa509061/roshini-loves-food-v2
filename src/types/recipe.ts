export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  servings: number;
  cookTime?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RecipeFormData {
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  servings: number;
  cookTime?: string;
  tags?: string;
}

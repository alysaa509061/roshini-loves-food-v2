import { useState } from "react";
import { Recipe, RecipeFormData } from "@/types/recipe";
import { validateVegetarian } from "@/utils/vegValidator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Sparkles, ArrowLeft } from "lucide-react";

interface RecipeFormProps {
  recipe?: Recipe;
  onSubmit: (data: RecipeFormData) => void;
  onCancel: () => void;
}

const RecipeForm = ({ recipe, onSubmit, onCancel }: RecipeFormProps) => {
  const [formData, setFormData] = useState<RecipeFormData>({
    title: recipe?.title || "",
    description: recipe?.description || "",
    ingredients: recipe?.ingredients.join("\n") || "",
    instructions: recipe?.instructions.join("\n") || "",
    servings: recipe?.servings || 2,
    cookTime: recipe?.cookTime || "",
    tags: recipe?.tags?.join(", ") || "",
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string | null>(null);

  const handleChange = (field: keyof RecipeFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidationError(null);
    setSuggestions(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all text fields for non-veg content
    const allText = [
      formData.title,
      formData.description,
      formData.ingredients,
      formData.instructions,
      formData.tags || ""
    ].join(" ");

    const validation = validateVegetarian(allText);

    if (!validation.isValid) {
      setValidationError(validation.message || "Non-vegetarian content detected!");
      setSuggestions(validation.suggestions || null);
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onCancel} className="gap-2 font-mono">
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-heading">
            <Sparkles className="w-5 h-5 text-primary" />
            {recipe ? "Edit Recipe" : "New Veggie Recipe"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {validationError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div>{validationError}</div>
                {suggestions && (
                  <div className="mt-2 text-sm">{suggestions}</div>
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Recipe Name</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Magical Veg Curry"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="What makes this dish special?"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="servings">Servings</Label>
              <Input
                id="servings"
                type="number"
                min="1"
                value={formData.servings}
                onChange={(e) => handleChange("servings", parseInt(e.target.value))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cookTime">Cook Time</Label>
              <Input
                id="cookTime"
                value={formData.cookTime}
                onChange={(e) => handleChange("cookTime", e.target.value)}
                placeholder="30 mins"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ingredients">Ingredients (one per line)</Label>
            <Textarea
              id="ingredients"
              value={formData.ingredients}
              onChange={(e) => handleChange("ingredients", e.target.value)}
              placeholder={"1 cup rice\n2 tomatoes\n1 tsp cumin"}
              rows={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions (one step per line)</Label>
            <Textarea
              id="instructions"
              value={formData.instructions}
              onChange={(e) => handleChange("instructions", e.target.value)}
              placeholder={"Heat oil in pan\nAdd spices\nCook until golden"}
              rows={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => handleChange("tags", e.target.value)}
              placeholder="comfort food, indian, spicy"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel} className="font-mono">
          Cancel
        </Button>
        <Button type="submit" className="font-mono">
          {recipe ? "Update Recipe" : "Add to Cookbook"}
        </Button>
      </div>
    </form>
    </div>
  );
};

export default RecipeForm;

import { useState } from "react";
import { Recipe } from "@/types/recipe";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, Users, Minus, Plus, Edit, Trash2 } from "lucide-react";

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const RecipeDetail = ({ recipe, onBack, onEdit, onDelete }: RecipeDetailProps) => {
  const [servingMultiplier, setServingMultiplier] = useState(1);

  const adjustedServings = recipe.servings * servingMultiplier;

  const handleServingChange = (delta: number) => {
    const newMultiplier = servingMultiplier + delta;
    if (newMultiplier >= 0.5 && newMultiplier <= 10) {
      setServingMultiplier(newMultiplier);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2 font-mono">
          <ArrowLeft className="w-4 h-4" />
          Back to Recipes
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={onEdit}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="destructive" size="icon" onClick={onDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <CardTitle className="text-3xl font-heading">{recipe.title}</CardTitle>
              <Badge variant="outline" className="bg-accent/20 text-accent-foreground border-accent">
                🌿 Vegetarian
              </Badge>
            </div>
            <p className="text-muted-foreground">{recipe.description}</p>

            <div className="flex items-center gap-6 text-sm">
              {recipe.cookTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{recipe.cookTime}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => handleServingChange(-0.5)}
                    disabled={servingMultiplier <= 0.5}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="min-w-[60px] text-center">
                    {adjustedServings} servings
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => handleServingChange(0.5)}
                    disabled={servingMultiplier >= 10}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>

            {recipe.tags && recipe.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 font-heading">
              🥬 Ingredients
            </h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-1">•</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 font-heading">
              👩‍🍳 Instructions
            </h3>
            <ol className="space-y-3">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-3 text-sm">
                  <span className="font-bold text-primary min-w-[24px]">
                    {index + 1}.
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          <Separator />

          <div className="text-xs text-muted-foreground text-center">
            Added on {new Date(recipe.createdAt).toLocaleDateString()}
            {recipe.updatedAt !== recipe.createdAt && (
              <> • Updated {new Date(recipe.updatedAt).toLocaleDateString()}</>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipeDetail;

import { useState } from "react";
import { Recipe } from "@/types/recipe";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, Users, Minus, Plus, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipe } from "@/hooks/useSwipe";

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const RecipeDetail = ({ 
  recipe, 
  onBack, 
  onEdit, 
  onDelete,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}: RecipeDetailProps) => {
  const [servingMultiplier, setServingMultiplier] = useState(1);

  const swipeHandlers = useSwipe({
    onSwipeLeft: hasNext ? onNext : undefined,
    onSwipeRight: hasPrevious ? onPrevious : undefined,
    threshold: 50,
  });

  const adjustedServings = recipe.servings * servingMultiplier;

  const handleServingChange = (delta: number) => {
    const newMultiplier = servingMultiplier + delta;
    if (newMultiplier >= 0.5 && newMultiplier <= 10) {
      setServingMultiplier(newMultiplier);
    }
  };

  const adjustIngredient = (ingredient: string): string => {
    // Match common patterns: "2 cups", "1/2 tsp", "1.5 kg", etc.
    const numberPattern = /^(\d+(?:\/\d+)?(?:\.\d+)?)\s+(.+)$/;
    const match = ingredient.match(numberPattern);
    
    if (match) {
      const [, amount, rest] = match;
      let numericAmount: number;
      
      // Handle fractions like "1/2"
      if (amount.includes('/')) {
        const [numerator, denominator] = amount.split('/').map(Number);
        numericAmount = numerator / denominator;
      } else {
        numericAmount = parseFloat(amount);
      }
      
      const adjustedAmount = numericAmount * servingMultiplier;
      
      // Format the adjusted amount nicely
      let formattedAmount: string;
      if (adjustedAmount % 1 === 0) {
        formattedAmount = adjustedAmount.toString();
      } else if (adjustedAmount % 0.5 === 0) {
        const whole = Math.floor(adjustedAmount);
        formattedAmount = whole > 0 ? `${whole} 1/2` : '1/2';
      } else {
        formattedAmount = adjustedAmount.toFixed(2).replace(/\.?0+$/, '');
      }
      
      return `${formattedAmount} ${rest}`;
    }
    
    return ingredient;
  };

  return (
    <div 
      className="space-y-6 select-none"
      {...swipeHandlers}
    >
      {/* Mobile swipe indicator */}
      {(hasPrevious || hasNext) && (
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground sm:hidden">
          {hasPrevious && (
            <span className="flex items-center gap-1">
              <ChevronLeft className="w-3 h-3" /> Swipe for previous
            </span>
          )}
          {hasNext && (
            <span className="flex items-center gap-1">
              Swipe for next <ChevronRight className="w-3 h-3" />
            </span>
          )}
        </div>
      )}

      {/* Desktop navigation buttons */}
      {(hasPrevious || hasNext) && (
        <div className="hidden sm:flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevious}
            disabled={!hasPrevious}
            className="gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNext}
            disabled={!hasNext}
            className="gap-1"
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <Button variant="ghost" onClick={onBack} className="gap-2 font-mono text-sm justify-start">
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span className="truncate">Back to Recipes</span>
        </Button>
        <div className="flex gap-2 self-end sm:self-auto">
          <Button variant="outline" size="icon" onClick={onEdit} className="shrink-0">
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="destructive" size="icon" onClick={onDelete} className="shrink-0">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <CardTitle className="text-2xl sm:text-3xl font-heading">{recipe.title}</CardTitle>
              <Badge variant="outline" className="bg-accent/20 text-accent-foreground border-accent shrink-0 w-fit">
                Vegetarian
              </Badge>
            </div>
            <p className="text-muted-foreground">{recipe.description}</p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
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
                    className="h-9 w-9 sm:h-7 sm:w-7 touch-manipulation"
                    onClick={() => handleServingChange(-0.5)}
                    disabled={servingMultiplier <= 0.5}
                  >
                    <Minus className="w-4 h-4 sm:w-3 sm:h-3" />
                  </Button>
                  <span className="min-w-[60px] text-center">
                    {adjustedServings} servings
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 sm:h-7 sm:w-7 touch-manipulation"
                    onClick={() => handleServingChange(0.5)}
                    disabled={servingMultiplier >= 10}
                  >
                    <Plus className="w-4 h-4 sm:w-3 sm:h-3" />
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
              Ingredients
            </h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-1">•</span>
                  <span>{adjustIngredient(ingredient)}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 font-heading">
              Instructions
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

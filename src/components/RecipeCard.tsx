import { Recipe } from "@/types/recipe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Heart } from "lucide-react";
import { getRecipeImage } from "@/utils/recipeImages";

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
  onToggleFavorite?: (e: React.MouseEvent) => void;
}

const RecipeCard = ({ recipe, onClick, onToggleFavorite }: RecipeCardProps) => {
  const image = getRecipeImage(recipe.id);

  return (
    <Card
      className="cursor-pointer hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 overflow-hidden"
      onClick={onClick}
    >
      {image && (
        <div className="h-40 overflow-hidden">
          <img src={image} alt={recipe.title} className="w-full h-full object-cover" />
        </div>
      )}
      <CardHeader>
        <CardTitle className="flex items-start justify-between gap-2 font-heading">
          <span className="text-lg">{recipe.title}</span>
          <div className="flex items-center gap-1 shrink-0">
            {onToggleFavorite && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(e);
                }}
                className="p-1 hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-4 h-4 ${
                    recipe.isFavorite
                      ? "fill-destructive text-destructive"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            )}
            <Badge variant="outline" className="bg-accent/20 text-accent-foreground border-accent">
              Veg
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {recipe.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {recipe.cookTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{recipe.cookTime}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {recipe.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecipeCard;

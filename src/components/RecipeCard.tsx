import { Recipe } from "@/types/recipe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
  return (
    <Card
      className="cursor-pointer hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="flex items-start justify-between gap-2 font-heading">
          <span className="text-lg">{recipe.title}</span>
          <Badge variant="outline" className="bg-accent/20 text-accent-foreground border-accent shrink-0">
            🌿 Veg
          </Badge>
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

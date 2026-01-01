import { Recipe } from "@/types/recipe";
import { Clock, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface RecipeGalleryProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
}

const RecipeGallery = ({ recipes, onSelectRecipe }: RecipeGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (recipes.length === 0) return null;

  const currentRecipe = recipes[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? recipes.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === recipes.length - 1 ? 0 : prev + 1));
  };

  // Generate a pastel color based on recipe title
  const getRecipeColor = (title: string) => {
    const colors = [
      "from-rose-200 to-pink-300",
      "from-orange-200 to-amber-300",
      "from-emerald-200 to-teal-300",
      "from-sky-200 to-blue-300",
      "from-violet-200 to-purple-300",
      "from-lime-200 to-green-300",
    ];
    const index = title.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="relative">
      {/* Main Gallery Card */}
      <div 
        className="relative aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer group"
        onClick={() => onSelectRecipe(currentRecipe)}
      >
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getRecipeColor(currentRecipe.title)}`} />
        
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 w-20 h-20 border-4 border-white/50 rounded-full" />
          <div className="absolute bottom-8 right-8 w-32 h-32 border-4 border-white/50 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white/30 rotate-45" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
          <div className="space-y-3">
            {currentRecipe.tags && currentRecipe.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {currentRecipe.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-mono bg-white/20 backdrop-blur-sm text-white rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <h2 className="text-2xl md:text-4xl font-bold font-heading text-white drop-shadow-lg">
              {currentRecipe.title}
            </h2>
            
            <p className="text-white/80 text-sm md:text-base line-clamp-2 max-w-xl">
              {currentRecipe.description}
            </p>

            <div className="flex items-center gap-4 text-white/70 text-sm">
              {currentRecipe.cookTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {currentRecipe.cookTime}
                </span>
              )}
              {currentRecipe.servings && (
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {currentRecipe.servings} servings
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white font-medium bg-black/50 px-4 py-2 rounded-full">
            View Recipe
          </span>
        </div>
      </div>

      {/* Navigation */}
      {recipes.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {recipes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-primary w-6" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeGallery;

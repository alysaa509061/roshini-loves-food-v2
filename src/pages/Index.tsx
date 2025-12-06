import { useState, useCallback } from "react";
import AccessGate from "@/components/AccessGate";
import RecipeCard from "@/components/RecipeCard";
import RecipeForm from "@/components/RecipeForm";
import RecipeDetail from "@/components/RecipeDetail";
import RecipeImport from "@/components/RecipeImport";
import { useRecipes } from "@/hooks/useRecipes";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";
import { Recipe, RecipeFormData } from "@/types/recipe";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, BookOpen, Download, Upload, RefreshCw, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type View = "list" | "add" | "edit" | "detail" | "import";

const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentView, setCurrentView] = useState<View>("list");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { recipes, isLoading, addRecipe, updateRecipe, deleteRecipe, importRecipes, exportRecipes, refresh } = useRecipes();
  const { toast } = useToast();

  const handleUnlock = () => {
    setIsUnlocked(true);
    toast({
      title: "Welcome back, Roshini!",
      description: "Your veggie kingdom awaits",
    });
  };

  const handleAddRecipe = async (data: RecipeFormData) => {
    const recipe = await addRecipe({
      title: data.title,
      description: data.description,
      ingredients: data.ingredients.split("\n").filter(i => i.trim()),
      instructions: data.instructions.split("\n").filter(i => i.trim()),
      servings: data.servings,
      cookTime: data.cookTime,
      tags: data.tags ? data.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
    });

    if (recipe) {
      toast({
        title: "Recipe added!",
        description: `${recipe.title} is now in your cookbook`,
      });
    }

    setCurrentView("list");
  };

  const handleUpdateRecipe = async (data: RecipeFormData) => {
    if (!selectedRecipe) return;

    await updateRecipe(selectedRecipe.id, {
      title: data.title,
      description: data.description,
      ingredients: data.ingredients.split("\n").filter(i => i.trim()),
      instructions: data.instructions.split("\n").filter(i => i.trim()),
      servings: data.servings,
      cookTime: data.cookTime,
      tags: data.tags ? data.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
    });

    toast({
      title: "Recipe updated!",
      description: `${data.title} has been saved`,
    });

    setCurrentView("detail");
  };

  const handleDeleteRecipe = async () => {
    if (!selectedRecipe) return;

    const title = selectedRecipe.title;
    await deleteRecipe(selectedRecipe.id);

    toast({
      title: "Recipe deleted",
      description: `${title} has been removed from your cookbook`,
      variant: "destructive",
    });

    setSelectedRecipe(null);
    setCurrentView("list");
  };

  const handleImportRecipes = async (importedRecipes: any[]) => {
    const newRecipes = await importRecipes(importedRecipes);
    toast({
      title: `Imported ${newRecipes.length} recipe${newRecipes.length > 1 ? 's' : ''}!`,
      description: "All recipes passed the veg check",
    });
    setCurrentView("list");
  };

  const handleExportRecipes = () => {
    const data = exportRecipes();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roshini-recipes-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Recipes exported!",
      description: "JSON file downloaded successfully",
    });
  };

  const handleRefresh = useCallback(async () => {
    await refresh();
    toast({
      title: "Refreshed!",
      description: `${recipes.length} recipes loaded`,
    });
  }, [recipes.length, toast, refresh]);

  const { pullDistance, isRefreshing, isReadyToRefresh, handlers } = usePullToRefresh({
    onRefresh: handleRefresh,
    threshold: 80,
  });

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Show AccessGate if not unlocked
  if (!isUnlocked) {
    return <AccessGate onUnlock={handleUnlock} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen p-4 md:p-8"
      {...(currentView === "list" ? handlers : {})}
    >
      {/* Pull to refresh indicator */}
      {currentView === "list" && pullDistance > 0 && (
        <div 
          className="fixed top-0 left-0 right-0 flex justify-center z-50 transition-transform sm:hidden"
          style={{ transform: `translateY(${pullDistance - 40}px)` }}
        >
          <div className={`
            bg-primary text-primary-foreground rounded-full p-2 shadow-lg
            transition-all duration-200
            ${isReadyToRefresh ? 'scale-110' : 'scale-100'}
          `}>
            <RefreshCw 
              className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`}
              style={{ 
                transform: isRefreshing ? 'none' : `rotate(${pullDistance * 3}deg)`,
              }}
            />
          </div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 py-8 scrapbook-paper">
          <div className="flex items-center justify-center gap-4 animate-float">
            <img
              src="/roshie-avatar.jpg"
              alt="Roshini"
              className="w-16 h-16 rounded-full border-2 border-primary shadow-lg"
            />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-heading">
              RoshiniLovesFood
            </h1>
          </div>
          <p className="text-muted-foreground">
            A sassy, scrapbook-style vegetarian recipe journal
          </p>
        </div>

        {/* Main Content */}
        {currentView === "list" && (
          <>
            {/* Action Bar */}
            <div className="flex flex-col gap-3">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search recipes, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handleExportRecipes}
                  variant="outline"
                  size="sm"
                  className="font-mono gap-1 text-xs sm:text-sm sm:gap-2"
                  disabled={recipes.length === 0}
                >
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                  Export
                </Button>
                <Button
                  onClick={() => setCurrentView("import")}
                  variant="outline"
                  size="sm"
                  className="font-mono gap-1 text-xs sm:text-sm sm:gap-2"
                >
                  <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
                  Import
                </Button>
                <Button
                  onClick={() => setCurrentView("add")}
                  size="sm"
                  className="font-mono gap-1 text-xs sm:text-sm sm:gap-2 ml-auto"
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  New Recipe
                </Button>
              </div>
            </div>

            {/* Recipe Grid */}
            {filteredRecipes.length === 0 ? (
              <div className="text-center py-16 space-y-4 sticky-note">
                <BookOpen className="w-16 h-16 mx-auto text-muted-foreground opacity-50" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 font-heading">
                    {searchQuery ? "No recipes found" : "No recipes yet!"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery
                      ? "Try a different search term"
                      : "Start building your veggie cookbook"}
                  </p>
                  {!searchQuery && (
                    <Button
                      onClick={() => setCurrentView("add")}
                      className="font-mono gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Your First Recipe
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRecipes.map(recipe => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => {
                      setSelectedRecipe(recipe);
                      setCurrentView("detail");
                    }}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {currentView === "add" && (
          <RecipeForm
            onSubmit={handleAddRecipe}
            onCancel={() => setCurrentView("list")}
          />
        )}

        {currentView === "edit" && selectedRecipe && (
          <RecipeForm
            recipe={selectedRecipe}
            onSubmit={handleUpdateRecipe}
            onCancel={() => setCurrentView("detail")}
          />
        )}

        {currentView === "import" && (
          <RecipeImport
            onImport={handleImportRecipes}
            onClose={() => setCurrentView("list")}
          />
        )}

        {currentView === "detail" && selectedRecipe && (
          <RecipeDetail
            recipe={selectedRecipe}
            onBack={() => {
              setSelectedRecipe(null);
              setCurrentView("list");
            }}
            onEdit={() => setCurrentView("edit")}
            onDelete={handleDeleteRecipe}
            hasPrevious={filteredRecipes.findIndex(r => r.id === selectedRecipe.id) > 0}
            hasNext={filteredRecipes.findIndex(r => r.id === selectedRecipe.id) < filteredRecipes.length - 1}
            onPrevious={() => {
              const currentIndex = filteredRecipes.findIndex(r => r.id === selectedRecipe.id);
              if (currentIndex > 0) {
                setSelectedRecipe(filteredRecipes[currentIndex - 1]);
              }
            }}
            onNext={() => {
              const currentIndex = filteredRecipes.findIndex(r => r.id === selectedRecipe.id);
              if (currentIndex < filteredRecipes.length - 1) {
                setSelectedRecipe(filteredRecipes[currentIndex + 1]);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Index;

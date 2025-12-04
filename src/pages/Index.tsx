import { useState, useEffect } from "react";
import AccessGate from "@/components/AccessGate";
import RecipeCard from "@/components/RecipeCard";
import RecipeForm from "@/components/RecipeForm";
import RecipeDetail from "@/components/RecipeDetail";
import RecipeImport from "@/components/RecipeImport";
import { useRecipes } from "@/hooks/useRecipes";
import { Recipe, RecipeFormData } from "@/types/recipe";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, BookOpen, Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type View = "list" | "add" | "edit" | "detail" | "import";

const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentView, setCurrentView] = useState<View>("list");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { recipes, addRecipe, updateRecipe, deleteRecipe, importRecipes, exportRecipes } = useRecipes();
  const { toast } = useToast();

  // Check if user needs to unlock on mount
  useEffect(() => {
    setIsUnlocked(false);
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    toast({
      title: "Welcome back, Roshini!",
      description: "Your veggie kingdom awaits",
    });
  };

  const handleAddRecipe = (data: RecipeFormData) => {
    const recipe = addRecipe({
      title: data.title,
      description: data.description,
      ingredients: data.ingredients.split("\n").filter(i => i.trim()),
      instructions: data.instructions.split("\n").filter(i => i.trim()),
      servings: data.servings,
      cookTime: data.cookTime,
      tags: data.tags ? data.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
    });

    toast({
      title: "Recipe added!",
      description: `${recipe.title} is now in your cookbook`,
    });

    setCurrentView("list");
  };

  const handleUpdateRecipe = (data: RecipeFormData) => {
    if (!selectedRecipe) return;

    updateRecipe(selectedRecipe.id, {
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

  const handleDeleteRecipe = () => {
    if (!selectedRecipe) return;

    const title = selectedRecipe.title;
    deleteRecipe(selectedRecipe.id);

    toast({
      title: "Recipe deleted",
      description: `${title} has been removed from your cookbook`,
      variant: "destructive",
    });

    setSelectedRecipe(null);
    setCurrentView("list");
  };

  const handleImportRecipes = (importedRecipes: any[]) => {
    const newRecipes = importRecipes(importedRecipes);
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

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!isUnlocked) {
    return <AccessGate onUnlock={handleUnlock} />;
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
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
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search recipes, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleExportRecipes}
                  variant="outline"
                  className="font-mono gap-2"
                  disabled={recipes.length === 0}
                >
                  <Download className="w-4 h-4" />
                  Export
                </Button>
                <Button
                  onClick={() => setCurrentView("import")}
                  variant="outline"
                  className="font-mono gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Import
                </Button>
                <Button
                  onClick={() => setCurrentView("add")}
                  className="font-mono gap-2"
                >
                  <Plus className="w-4 h-4" />
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

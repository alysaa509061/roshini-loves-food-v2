import { useState, useMemo } from "react";
import { Recipe } from "@/types/recipe";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, ShoppingCart, Download, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShoppingListProps {
  recipes: Recipe[];
  onClose: () => void;
}

interface IngredientItem {
  name: string;
  checked: boolean;
  recipes: string[];
}

const ShoppingList = ({ recipes, onClose }: ShoppingListProps) => {
  const { toast } = useToast();
  const [selectedRecipeIds, setSelectedRecipeIds] = useState<Set<string>>(
    new Set(recipes.map((r) => r.id))
  );
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const selectedRecipes = recipes.filter((r) => selectedRecipeIds.has(r.id));

  // Combine ingredients from selected recipes
  const combinedIngredients = useMemo(() => {
    const ingredientMap = new Map<string, IngredientItem>();

    selectedRecipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        // Normalize ingredient name (remove quantities for grouping)
        const normalizedName = ingredient.toLowerCase().trim();
        const existing = ingredientMap.get(normalizedName);

        if (existing) {
          existing.recipes.push(recipe.title);
        } else {
          ingredientMap.set(normalizedName, {
            name: ingredient,
            checked: checkedItems.has(normalizedName),
            recipes: [recipe.title],
          });
        }
      });
    });

    return Array.from(ingredientMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [selectedRecipes, checkedItems]);

  const toggleRecipe = (id: string) => {
    setSelectedRecipeIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleIngredient = (name: string) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      const normalizedName = name.toLowerCase().trim();
      if (newSet.has(normalizedName)) {
        newSet.delete(normalizedName);
      } else {
        newSet.add(normalizedName);
      }
      return newSet;
    });
  };

  const copyToClipboard = async () => {
    const text = combinedIngredients
      .filter((i) => !checkedItems.has(i.name.toLowerCase().trim()))
      .map((i) => `☐ ${i.name}`)
      .join("\n");

    await navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Shopping list copied to clipboard",
    });
  };

  const downloadList = () => {
    const text = [
      "🛒 Shopping List",
      `Generated: ${new Date().toLocaleDateString()}`,
      "",
      "Recipes:",
      ...selectedRecipes.map((r) => `  • ${r.title}`),
      "",
      "Ingredients:",
      ...combinedIngredients.map(
        (i) =>
          `${checkedItems.has(i.name.toLowerCase().trim()) ? "☑" : "☐"} ${i.name}`
      ),
    ].join("\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shopping-list-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: "Shopping list saved as text file",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-primary" />
          Shopping List
        </h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recipe Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-heading">Select Recipes</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {recipes.map((recipe) => (
                  <label
                    key={recipe.id}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedRecipeIds.has(recipe.id)}
                      onCheckedChange={() => toggleRecipe(recipe.id)}
                    />
                    <span className="text-sm">{recipe.title}</span>
                  </label>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Shopping List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-heading">
                Ingredients ({combinedIngredients.length})
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  disabled={combinedIngredients.length === 0}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadList}
                  disabled={combinedIngredients.length === 0}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {combinedIngredients.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Select recipes to generate shopping list
                </p>
              ) : (
                <div className="space-y-2">
                  {combinedIngredients.map((item, index) => {
                    const isChecked = checkedItems.has(
                      item.name.toLowerCase().trim()
                    );
                    return (
                      <label
                        key={index}
                        className={`flex items-start gap-3 p-2 rounded-md hover:bg-muted cursor-pointer ${
                          isChecked ? "opacity-50" : ""
                        }`}
                      >
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggleIngredient(item.name)}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <span
                            className={`text-sm ${
                              isChecked ? "line-through" : ""
                            }`}
                          >
                            {item.name}
                          </span>
                          {item.recipes.length > 1 && (
                            <p className="text-xs text-muted-foreground">
                              Used in: {item.recipes.join(", ")}
                            </p>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={onClose} className="font-mono">
          Done
        </Button>
      </div>
    </div>
  );
};

export default ShoppingList;

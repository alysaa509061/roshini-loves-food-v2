import { useState, useMemo } from "react";
import { Recipe } from "@/types/recipe";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { X, CalendarDays, ShoppingCart, Trash2, Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MealPlannerProps {
  recipes: Recipe[];
  onClose: () => void;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEALS = ["Breakfast", "Lunch", "Dinner"];

type MealPlan = Record<string, Record<string, string | null>>; // day -> meal -> recipeId

const STORAGE_KEY = "roshini_meal_plan";

const loadMealPlan = (): MealPlan => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

const saveMealPlan = (plan: MealPlan) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
};

const MealPlanner = ({ recipes, onClose }: MealPlannerProps) => {
  const { toast } = useToast();
  const [mealPlan, setMealPlan] = useState<MealPlan>(loadMealPlan);
  const [showShoppingList, setShowShoppingList] = useState(false);

  const assignRecipe = (day: string, meal: string, recipeId: string | null) => {
    setMealPlan(prev => {
      const updated = {
        ...prev,
        [day]: { ...(prev[day] || {}), [meal]: recipeId },
      };
      saveMealPlan(updated);
      return updated;
    });
  };

  const clearAll = () => {
    setMealPlan({});
    saveMealPlan({});
    toast({ title: "Plan cleared", description: "All meals have been removed" });
  };

  const plannedRecipes = useMemo(() => {
    const ids = new Set<string>();
    Object.values(mealPlan).forEach(dayPlan => {
      Object.values(dayPlan).forEach(id => {
        if (id) ids.add(id);
      });
    });
    return recipes.filter(r => ids.has(r.id));
  }, [mealPlan, recipes]);

  const shoppingIngredients = useMemo(() => {
    const ingredientMap = new Map<string, { name: string; recipes: string[] }>();
    plannedRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        const key = ingredient.toLowerCase().trim();
        const existing = ingredientMap.get(key);
        if (existing) {
          if (!existing.recipes.includes(recipe.title)) existing.recipes.push(recipe.title);
        } else {
          ingredientMap.set(key, { name: ingredient, recipes: [recipe.title] });
        }
      });
    });
    return Array.from(ingredientMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [plannedRecipes]);

  const getRecipeById = (id: string | null) => id ? recipes.find(r => r.id === id) : null;

  const copyShoppingList = async () => {
    const text = shoppingIngredients.map(i => `☐ ${i.name}`).join("\n");
    await navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Shopping list copied to clipboard" });
  };

  const downloadShoppingList = () => {
    const text = [
      "🗓️ Weekly Meal Plan Shopping List",
      `Generated: ${new Date().toLocaleDateString()}`,
      "",
      "Planned meals:",
      ...DAYS.flatMap(day => {
        const dayPlan = mealPlan[day];
        if (!dayPlan) return [];
        return MEALS.map(meal => {
          const recipe = getRecipeById(dayPlan[meal]);
          return recipe ? `  ${day} ${meal}: ${recipe.title}` : null;
        }).filter(Boolean);
      }),
      "",
      "Shopping list:",
      ...shoppingIngredients.map(i => `☐ ${i.name}`),
    ].join("\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `meal-plan-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Downloaded!", description: "Meal plan saved" });
  };

  if (showShoppingList) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-primary" />
            Meal Plan Shopping List
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copyShoppingList} disabled={shoppingIngredients.length === 0}>
              <Copy className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={downloadShoppingList} disabled={shoppingIngredients.length === 0}>
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowShoppingList(false)}>
              Back
            </Button>
          </div>
        </div>
        <Card>
          <CardContent className="pt-6">
            {shoppingIngredients.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Add meals to your plan first</p>
            ) : (
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {shoppingIngredients.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-2 rounded-md hover:bg-muted">
                      <span className="text-primary mt-0.5">•</span>
                      <div className="flex-1">
                        <span className="text-sm">{item.name}</span>
                        {item.recipes.length > 1 && (
                          <p className="text-xs text-muted-foreground">Used in: {item.recipes.join(", ")}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <Button onClick={() => setShowShoppingList(false)} className="font-mono">Back to Planner</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
          <CalendarDays className="w-6 h-6 text-primary" />
          Meal Planner
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowShoppingList(true)}
            className="gap-1"
            disabled={plannedRecipes.length === 0}
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Shopping List</span>
          </Button>
          <Button variant="outline" size="sm" onClick={clearAll} className="gap-1">
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Desktop: table layout */}
      <div className="hidden md:block overflow-x-auto">
        <Card>
          <CardContent className="pt-6">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2 font-heading text-sm text-muted-foreground w-24"></th>
                  {MEALS.map(meal => (
                    <th key={meal} className="text-left p-2 font-heading text-sm">{meal}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DAYS.map(day => (
                  <tr key={day} className="border-t border-border">
                    <td className="p-2 font-heading text-sm font-medium">{day}</td>
                    {MEALS.map(meal => {
                      const recipeId = mealPlan[day]?.[meal];
                      const recipe = getRecipeById(recipeId || null);
                      return (
                        <td key={meal} className="p-2">
                          <Select
                            value={recipeId || "none"}
                            onValueChange={v => assignRecipe(day, meal, v === "none" ? null : v)}
                          >
                            <SelectTrigger className="h-auto min-h-[36px] text-xs">
                              <SelectValue>
                                {recipe ? (
                                  <span className="truncate">{recipe.title}</span>
                                ) : (
                                  <span className="text-muted-foreground">—</span>
                                )}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              {recipes.map(r => (
                                <SelectItem key={r.id} value={r.id}>{r.title}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Mobile: cards */}
      <div className="md:hidden space-y-4">
        {DAYS.map(day => (
          <Card key={day}>
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-base font-heading">{day}</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-2">
              {MEALS.map(meal => {
                const recipeId = mealPlan[day]?.[meal];
                return (
                  <div key={meal} className="flex items-center gap-2">
                    <Badge variant="outline" className="shrink-0 text-xs w-20 justify-center">{meal}</Badge>
                    <Select
                      value={recipeId || "none"}
                      onValueChange={v => assignRecipe(day, meal, v === "none" ? null : v)}
                    >
                      <SelectTrigger className="h-8 text-xs flex-1">
                        <SelectValue placeholder="—" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {recipes.map(r => (
                          <SelectItem key={r.id} value={r.id}>{r.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {plannedRecipes.length} recipe{plannedRecipes.length !== 1 ? "s" : ""} planned this week
        </p>
      </div>
    </div>
  );
};

export default MealPlanner;

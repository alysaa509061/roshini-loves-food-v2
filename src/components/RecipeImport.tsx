import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileJson, X } from "lucide-react";
import { validateVegetarian } from "@/utils/vegValidator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface RecipeImportProps {
  onImport: (recipes: any[]) => void;
  onClose: () => void;
}

const RecipeImport = ({ onImport, onClose }: RecipeImportProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndParseRecipes = (content: string) => {
    try {
      const parsed = JSON.parse(content);
      const recipes = Array.isArray(parsed) ? parsed : [parsed];

      // Validate each recipe for veg content
      for (const recipe of recipes) {
        const allText = [
          recipe.title || "",
          recipe.description || "",
          ...(recipe.ingredients || []),
          ...(recipe.instructions || []),
          ...(recipe.tags || [])
        ].join(" ");

        const validation = validateVegetarian(allText);
        if (!validation.isValid) {
          throw new Error(`Non-veg content detected in "${recipe.title || 'recipe'}": ${validation.message}`);
        }
      }

      return recipes;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error("Invalid recipe file format. Must be JSON.");
    }
  };

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith('.json')) {
      setError("Please upload a JSON file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const recipes = validateAndParseRecipes(content);
        onImport(recipes);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to import recipes");
      }
    };
    reader.readAsText(file);
  }, [onImport]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 font-heading">
            <FileJson className="w-5 h-5 text-primary" />
            Import Recipes
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            border-2 border-dashed rounded-lg p-12 text-center transition-all
            ${isDragging
              ? 'border-primary bg-primary/10 scale-105'
              : 'border-border hover:border-primary/50'
            }
          `}
        >
          <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
          <p className="text-lg font-semibold mb-2">
            Drop your recipe file here
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            or
          </p>
          <label htmlFor="file-upload">
            <Button variant="outline" className="font-mono" asChild>
              <span>
                Select JSON File
                <input
                  id="file-upload"
                  type="file"
                  accept=".json"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </span>
            </Button>
          </label>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>📝 File must be in JSON format</p>
          <p>🌿 All recipes will be validated for vegetarian content</p>
          <p>✨ Non-veg recipes will be rejected automatically</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeImport;

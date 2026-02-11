import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, X, ImageIcon } from "lucide-react";
import { fileToBase64 } from "@/utils/recipeImages";

interface RecipeImageUploadProps {
  image: string | null;
  onChange: (base64: string | null) => void;
}

const RecipeImageUpload = ({ image, onChange }: RecipeImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) return;
    
    setIsLoading(true);
    try {
      const base64 = await fileToBase64(file);
      onChange(base64);
    } catch (err) {
      console.error('Error processing image:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {image ? (
        <div className="relative rounded-lg overflow-hidden border border-border">
          <img src={image} alt="Recipe" className="w-full h-48 object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={() => onChange(null)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-full h-32 border-dashed flex flex-col gap-2"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="text-sm text-muted-foreground">Processing...</span>
          ) : (
            <>
              <div className="flex gap-2">
                <Camera className="w-5 h-5 text-muted-foreground" />
                <ImageIcon className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">
                Take photo or upload image
              </span>
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default RecipeImageUpload;

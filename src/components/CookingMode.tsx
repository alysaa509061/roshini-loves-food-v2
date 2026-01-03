import { useState, useEffect } from "react";
import { Recipe } from "@/types/recipe";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, ChevronLeft, ChevronRight, Check } from "lucide-react";

interface CookingModeProps {
  recipe: Recipe;
  onClose: () => void;
}

const CookingMode = ({ recipe, onClose }: CookingModeProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  // Keep screen awake using Wake Lock API
  useEffect(() => {
    let wakeLock: WakeLockSentinel | null = null;

    const requestWakeLock = async () => {
      try {
        if ("wakeLock" in navigator) {
          wakeLock = await navigator.wakeLock.request("screen");
        }
      } catch (err) {
        console.log("Wake Lock not supported or failed:", err);
      }
    };

    requestWakeLock();

    // Re-acquire wake lock when page becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        requestWakeLock();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (wakeLock) {
        wakeLock.release();
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const toggleStepComplete = (index: number) => {
    setCompletedSteps((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const goToPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToNext = () => {
    if (currentStep < recipe.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const progress = (completedSteps.size / recipe.instructions.length) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex-1">
          <h2 className="text-lg font-heading font-bold truncate">{recipe.title}</h2>
          <p className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {recipe.instructions.length}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-auto">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary text-2xl font-bold">
                {currentStep + 1}
              </span>
              <p className="text-xl md:text-2xl leading-relaxed">
                {recipe.instructions[currentStep]}
              </p>
              <Button
                variant={completedSteps.has(currentStep) ? "default" : "outline"}
                onClick={() => toggleStepComplete(currentStep)}
                className="gap-2"
              >
                <Check className="w-4 h-4" />
                {completedSteps.has(currentStep) ? "Completed" : "Mark as Done"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between p-4 border-t border-border">
        <Button
          variant="outline"
          onClick={goToPrevious}
          disabled={currentStep === 0}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {/* Step indicators */}
        <div className="hidden sm:flex items-center gap-1">
          {recipe.instructions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentStep
                  ? "bg-primary"
                  : completedSteps.has(index)
                  ? "bg-accent"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          onClick={goToNext}
          disabled={currentStep === recipe.instructions.length - 1}
          className="gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CookingMode;

import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share, MoreVertical, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Install = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Recipes
        </Button>

        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
            <Download className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold font-heading">Install RoshiniLovesFood</h1>
          <p className="text-muted-foreground">
            Add this app to your home screen for quick access and offline use!
          </p>
        </div>

        {/* iPhone / iPad */}
        <div className="space-y-4 p-6 rounded-xl border bg-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center text-white font-bold text-sm">
              iOS
            </div>
            <div>
              <h2 className="font-semibold font-heading">iPhone & iPad</h2>
              <p className="text-sm text-muted-foreground">Safari browser</p>
            </div>
          </div>
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">1</span>
              <span>Open this page in <strong>Safari</strong> (not Chrome or other browsers)</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">2</span>
              <span className="flex items-center gap-1">
                Tap the <Share className="w-4 h-4 inline" /> <strong>Share</strong> button at the bottom
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">3</span>
              <span>Scroll down and tap <strong>"Add to Home Screen"</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">4</span>
              <span>Tap <strong>"Add"</strong> in the top right corner</span>
            </li>
          </ol>
        </div>

        {/* Android */}
        <div className="space-y-4 p-6 rounded-xl border bg-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center text-white font-bold text-xs">
              AND
            </div>
            <div>
              <h2 className="font-semibold font-heading">Android</h2>
              <p className="text-sm text-muted-foreground">Chrome browser</p>
            </div>
          </div>
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">1</span>
              <span>Open this page in <strong>Chrome</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">2</span>
              <span className="flex items-center gap-1">
                Tap the <MoreVertical className="w-4 h-4 inline" /> <strong>menu</strong> button (3 dots) in the top right
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">3</span>
              <span>Tap <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">4</span>
              <span>Tap <strong>"Install"</strong> to confirm</span>
            </li>
          </ol>
        </div>

        {/* Desktop */}
        <div className="space-y-4 p-6 rounded-xl border bg-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-xs">
              PC
            </div>
            <div>
              <h2 className="font-semibold font-heading">Desktop (Windows/Mac)</h2>
              <p className="text-sm text-muted-foreground">Chrome or Edge browser</p>
            </div>
          </div>
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">1</span>
              <span>Open this page in <strong>Chrome</strong> or <strong>Edge</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">2</span>
              <span className="flex items-center gap-1">
                Look for the <Plus className="w-4 h-4 inline" /> <strong>install icon</strong> in the address bar (right side)
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">3</span>
              <span>Click <strong>"Install"</strong> in the popup</span>
            </li>
          </ol>
        </div>

        <div className="text-center text-sm text-muted-foreground p-4 bg-muted/50 rounded-lg">
          <p>Once installed, the app will sync your recipes across all your devices! 🌿</p>
        </div>
      </div>
    </div>
  );
};

export default Install;

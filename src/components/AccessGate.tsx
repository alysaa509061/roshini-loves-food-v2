import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AccessGateProps {
  onUnlock: () => void;
}

const AccessGate = ({ onUnlock }: AccessGateProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === "0318" || password === "031806") {
      onUnlock();
    } else {
      setError("Nope! Try Roshini's special date 🎂");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <img
            src="/redbow.png"
            alt="Red bow decoration"
            className="w-20 h-20 mx-auto animate-pulse"
          />
          <h1 className="text-4xl font-bold tracking-tight font-heading">
            RoshiniLovesFood
          </h1>
          <p className="text-muted-foreground text-sm">
            🌿 A Vegetarian Paradise 🌿
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter the magic code..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className={`text-center text-lg ${shake ? "animate-shake" : ""}`}
              autoFocus
            />
            {error && (
              <p className="text-destructive text-sm">
                {error}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full font-mono text-lg"
          >
            Unlock Recipe Book 🔓
          </Button>
        </form>

        <p className="text-xs text-muted-foreground">
          Hint: Think special birthday dates 🎈
        </p>
      </div>
    </div>
  );
};

export default AccessGate;

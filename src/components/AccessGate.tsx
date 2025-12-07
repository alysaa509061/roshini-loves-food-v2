import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AccessGateProps {
  onUnlock: () => void;
}

// Obfuscated valid codes - decoded at runtime
const getValidCodes = (): string[] => {
  const encoded = "MTgwMzA2LDE4MDMsMTgwNiwwMzA2LDA2MDM4MSwzMDgxLDYwMzA=";
  try {
    return atob(encoded).split(",");
  } catch {
    return [];
  }
};

const AccessGate = ({ onUnlock }: AccessGateProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (getValidCodes().includes(password)) {
      onUnlock();
    } else {
      setError("Nope! Try Roshini's special date");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight font-heading">
            RoshiniLovesFood
          </h1>
          <p className="text-muted-foreground text-sm">
            Hi Roshini, this is your personal recipe book!
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
            Unlock Recipe Book
          </Button>
        </form>

        <p className="text-xs text-muted-foreground">
          Hint: Think special dates
        </p>
      </div>
    </div>
  );
};

export default AccessGate;

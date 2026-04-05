import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Minimal dark mode toggle. Persists preference in localStorage.
 */
export function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("finance_dark_mode") === "true";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("finance_dark_mode", String(dark));
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded border border-border hover:bg-muted transition-colors"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

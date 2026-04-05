import { useFinance } from "@/context/FinanceContext";
import { Shield, Eye } from "lucide-react";

/**
 * Simple role switcher between Admin and Viewer.
 */
export function RoleSwitcher() {
  const { role, setRole } = useFinance();

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground hidden sm:inline">Role:</span>
      <button
        onClick={() => setRole("admin")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-medium transition-colors ${
          role === "admin"
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-card text-foreground border-border hover:bg-muted"
        }`}
      >
        <Shield className="h-3.5 w-3.5" />
        Admin
      </button>
      <button
        onClick={() => setRole("viewer")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-medium transition-colors ${
          role === "viewer"
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-card text-foreground border-border hover:bg-muted"
        }`}
      >
        <Eye className="h-3.5 w-3.5" />
        Viewer
      </button>
    </div>
  );
}

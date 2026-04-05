import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, List, Lightbulb } from "lucide-react";
import { RoleSwitcher } from "./RoleSwitcher";
import { DarkModeToggle } from "./DarkModeToggle";
import { useFinance } from "@/context/FinanceContext";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: List },
  { to: "/insights", label: "Insights", icon: Lightbulb },
];

/**
 * App layout shell — top header with navigation, role switcher, and dark mode toggle.
 */
export function AppLayout({ children }: { children: ReactNode }) {
  const { feedback } = useFinance();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Brand */}
            <div className="flex items-center gap-6">
              <h1 className="text-base font-bold text-primary tracking-tight">
                Finance Dashboard
              </h1>
              {/* Navigation */}
              <nav className="hidden sm:flex items-center gap-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-foreground hover:bg-muted"
                      }`
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
            {/* Controls */}
            <div className="flex items-center gap-3">
              <RoleSwitcher />
              <DarkModeToggle />
            </div>
          </div>

          {/* Mobile nav */}
          <nav className="flex sm:hidden items-center gap-1 pb-2 -mt-1 overflow-x-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded text-sm whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-foreground hover:bg-muted"
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* Feedback toast */}
      {feedback && (
        <div className="fixed top-16 right-4 z-50 bg-card border border-border rounded px-4 py-2 text-sm shadow-sm animate-in fade-in slide-in-from-top-2">
          {feedback}
        </div>
      )}

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">{children}</main>
    </div>
  );
}

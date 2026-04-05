import { useFinance } from "@/context/FinanceContext";
import { BarChart3, TrendingUp, TrendingDown, Wallet } from "lucide-react";

/**
 * Dynamic insights: highest spending category, income vs expense comparison,
 * remaining balance. Updates when transactions change.
 */
export function InsightsPanel() {
  const { transactions, totalIncome, totalExpenses, totalBalance } = useFinance();

  // Highest spending category
  const expenses = transactions.filter((t) => t.type === "expense");
  const categoryTotals: Record<string, number> = {};
  expenses.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const highestCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const savingsRate =
    totalIncome > 0
      ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)
      : "0";

  const insights = [
    {
      label: "Highest Spending Category",
      value: highestCategory
        ? `${highestCategory[0]} — ₹${highestCategory[1].toLocaleString("en-IN")}`
        : "No expenses recorded",
      icon: BarChart3,
    },
    {
      label: "Total Income",
      value: `₹${totalIncome.toLocaleString("en-IN")}`,
      icon: TrendingUp,
    },
    {
      label: "Total Expenses",
      value: `₹${totalExpenses.toLocaleString("en-IN")}`,
      icon: TrendingDown,
    },
    {
      label: "Remaining Balance",
      value: `₹${totalBalance.toLocaleString("en-IN")}`,
      icon: Wallet,
    },
    {
      label: "Savings Rate",
      value: `${savingsRate}%`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Financial Insights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((ins) => (
          <div
            key={ins.label}
            className="bg-card border border-border rounded p-5 flex items-start gap-3"
          >
            <div className="p-2 rounded bg-muted text-primary">
              <ins.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{ins.label}</p>
              <p className="text-base font-semibold mt-1">{ins.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Category breakdown table */}
      {Object.keys(categoryTotals).length > 0 && (
        <div className="bg-card border border-border rounded p-5">
          <h3 className="text-sm font-semibold mb-3">Expense Breakdown by Category</h3>
          <div className="space-y-2">
            {Object.entries(categoryTotals)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, amount]) => {
                const pct = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
                return (
                  <div key={cat} className="flex items-center gap-3">
                    <span className="text-sm w-28 shrink-0">{cat}</span>
                    <div className="flex-1 bg-muted rounded-sm h-4 overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-sm transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-20 text-right">
                      ₹{amount.toLocaleString("en-IN")} ({pct.toFixed(1)}%)
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

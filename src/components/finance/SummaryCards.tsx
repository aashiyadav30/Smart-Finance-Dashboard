import { useFinance } from "@/context/FinanceContext";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

/**
 * Summary cards showing Total Balance, Total Income, Total Expenses.
 * Values update dynamically from transaction state.
 */
export function SummaryCards() {
  const { totalBalance, totalIncome, totalExpenses } = useFinance();

  const cards = [
    {
      label: "Total Balance",
      value: totalBalance,
      icon: DollarSign,
      colorClass: "text-primary",
    },
    {
      label: "Total Income",
      value: totalIncome,
      icon: TrendingUp,
      colorClass: "text-gov-green",
    },
    {
      label: "Total Expenses",
      value: totalExpenses,
      icon: TrendingDown,
      colorClass: "text-gov-red",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="bg-card border border-border rounded p-5 flex items-start gap-4"
        >
          <div className={`p-2 rounded bg-muted ${c.colorClass}`}>
            <c.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{c.label}</p>
            <p className={`text-xl font-semibold mt-1 ${c.colorClass}`}>
              ₹{c.value.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

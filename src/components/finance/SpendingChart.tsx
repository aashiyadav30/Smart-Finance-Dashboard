import { useFinance } from "@/context/FinanceContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Muted but distinguishable palette
const COLORS = [
  "hsl(213, 50%, 32%)",
  "hsl(142, 45%, 36%)",
  "hsl(0, 65%, 48%)",
  "hsl(38, 90%, 50%)",
  "hsl(260, 35%, 48%)",
  "hsl(180, 40%, 38%)",
  "hsl(330, 40%, 45%)",
  "hsl(90, 35%, 40%)",
  "hsl(20, 55%, 48%)",
  "hsl(200, 45%, 42%)",
];

/**
 * Spending breakdown by category (expenses only).
 */
export function SpendingChart() {
  const { transactions } = useFinance();

  const expenses = transactions.filter((t) => t.type === "expense");
  const categoryMap: Record<string, number> = {};
  expenses.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const data = Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="bg-card border border-border rounded p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">
        Spending by Category
      </h3>
      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">
          No expense data to display.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => `₹${value.toLocaleString("en-IN")}`}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "11px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

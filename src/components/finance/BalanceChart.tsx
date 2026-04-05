import { useFinance } from "@/context/FinanceContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * Balance trend chart — shows cumulative balance over time.
 */
export function BalanceChart() {
  const { transactions } = useFinance();

  // Sort by date and compute running balance
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let runningBalance = 0;
  const data = sorted.map((t) => {
    runningBalance += t.type === "income" ? t.amount : -t.amount;
    return {
      date: new Date(t.date).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
      }),
      balance: runningBalance,
    };
  });

  return (
    <div className="bg-card border border-border rounded p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">
        Balance Trend
      </h3>
      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">
          No transaction data to display.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, "Balance"]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

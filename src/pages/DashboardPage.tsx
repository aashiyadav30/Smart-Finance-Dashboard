import { SummaryCards } from "@/components/finance/SummaryCards";
import { BalanceChart } from "@/components/finance/BalanceChart";
import { SpendingChart } from "@/components/finance/SpendingChart";
import { TransactionForm } from "@/components/finance/TransactionForm";

/**
 * Dashboard Overview page — summary cards + charts.
 */
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Overview</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Summary of your financial activity
          </p>
        </div>
        <TransactionForm />
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BalanceChart />
        <SpendingChart />
      </div>
    </div>
  );
}

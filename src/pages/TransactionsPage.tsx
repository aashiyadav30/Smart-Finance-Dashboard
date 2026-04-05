import { TransactionTable } from "@/components/finance/TransactionTable";
import { TransactionForm } from "@/components/finance/TransactionForm";

/**
 * Transactions page — add, edit, delete, search, filter, sort, and export.
 */
export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Transactions</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage all financial transactions
          </p>
        </div>
        <TransactionForm />
      </div>

      <TransactionTable />
    </div>
  );
}

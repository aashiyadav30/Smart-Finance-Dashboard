import { useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import { Category, TransactionType } from "@/types/finance";
import { Plus } from "lucide-react";

const CATEGORIES: Category[] = [
  "Salary", "Freelance", "Investment", "Rent", "Utilities", "Groceries",
  "Transport", "Healthcare", "Education", "Entertainment", "Shopping", "Other",
];

/**
 * Add transaction form — only visible to admin role.
 */
export function TransactionForm() {
  const { addTransaction, role } = useFinance();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    description: "",
    category: "Other" as Category,
    type: "expense" as TransactionType,
    amount: "",
  });

  if (role !== "admin") return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description || !form.amount || Number(form.amount) <= 0) return;

    addTransaction({
      date: form.date,
      description: form.description,
      category: form.category,
      type: form.type,
      amount: Number(form.amount),
    });

    // Reset form
    setForm({
      date: new Date().toISOString().split("T")[0],
      description: "",
      category: "Other",
      type: "expense",
      amount: "",
    });
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-sm px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity"
      >
        <Plus className="h-4 w-4" />
        Add Transaction
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded p-5 space-y-4"
    >
      <h3 className="text-sm font-semibold">New Transaction</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Date</label>
          <input
            type="date"
            className="w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            Description
          </label>
          <input
            type="text"
            className="w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            placeholder="e.g. Monthly rent"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Amount (₹)</label>
          <input
            type="number"
            min="1"
            className="w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            placeholder="0"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Category</label>
          <select
            className="w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value as Category })
            }
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Type</label>
          <select
            className="w-full border border-border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value as TransactionType })
            }
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="text-sm px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity"
        >
          Add Transaction
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm px-4 py-2 border border-border rounded hover:bg-muted transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

import { useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import { Transaction, Category, TransactionType } from "@/types/finance";
import { Search, ArrowUpDown, Pencil, Trash2, Download } from "lucide-react";

const CATEGORIES: Category[] = [
  "Salary", "Freelance", "Investment", "Rent", "Utilities", "Groceries",
  "Transport", "Healthcare", "Education", "Entertainment", "Shopping", "Other",
];

/**
 * Full transaction table with search, filter, sort, inline edit, delete, and CSV export.
 */
export function TransactionTable() {
  const {
    filteredTransactions,
    filters,
    setFilters,
    role,
    updateTransaction,
    deleteTransaction,
    transactions,
  } = useFinance();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Transaction>>({});

  // Start editing
  const startEdit = (txn: Transaction) => {
    setEditingId(txn.id);
    setEditData({ ...txn });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit = () => {
    if (editingId) {
      updateTransaction(editingId, editData);
      setEditingId(null);
      setEditData({});
    }
  };

  // CSV export
  const exportCSV = () => {
    const header = "Date,Description,Category,Type,Amount\n";
    const rows = transactions
      .map((t) => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleSort = (field: "date" | "amount") => {
    setFilters((prev) => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === "desc" ? "asc" : "desc",
    }));
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search transactions…"
              className="pl-8 pr-3 py-2 text-sm bg-card border border-border rounded w-full sm:w-56 focus:outline-none focus:ring-1 focus:ring-ring"
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
            />
          </div>

          {/* Type filter */}
          <select
            className="py-2 px-3 text-sm bg-card border border-border rounded focus:outline-none focus:ring-1 focus:ring-ring"
            value={filters.type}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                type: e.target.value as TransactionType | "all",
              }))
            }
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Category filter */}
          <select
            className="py-2 px-3 text-sm bg-card border border-border rounded focus:outline-none focus:ring-1 focus:ring-ring"
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                category: e.target.value as Category | "all",
              }))
            }
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={exportCSV}
          className="flex items-center gap-1.5 text-sm px-3 py-2 border border-border rounded bg-card hover:bg-muted transition-colors"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="border border-border rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted text-left">
              <th
                className="px-4 py-3 font-medium cursor-pointer select-none"
                onClick={() => toggleSort("date")}
              >
                <span className="flex items-center gap-1">
                  Date <ArrowUpDown className="h-3 w-3" />
                </span>
              </th>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th
                className="px-4 py-3 font-medium cursor-pointer select-none"
                onClick={() => toggleSort("amount")}
              >
                <span className="flex items-center gap-1">
                  Amount <ArrowUpDown className="h-3 w-3" />
                </span>
              </th>
              {role === "admin" && (
                <th className="px-4 py-3 font-medium">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td
                  colSpan={role === "admin" ? 6 : 5}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  No transactions found.
                </td>
              </tr>
            ) : (
              filteredTransactions.map((txn) => (
                <tr
                  key={txn.id}
                  className="border-t border-border hover:bg-muted/50 transition-colors"
                >
                  {editingId === txn.id ? (
                    <>
                      <td className="px-4 py-2">
                        <input
                          type="date"
                          className="border border-border rounded px-2 py-1 text-sm bg-card w-full"
                          value={editData.date || ""}
                          onChange={(e) =>
                            setEditData((d) => ({ ...d, date: e.target.value }))
                          }
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          className="border border-border rounded px-2 py-1 text-sm bg-card w-full"
                          value={editData.description || ""}
                          onChange={(e) =>
                            setEditData((d) => ({ ...d, description: e.target.value }))
                          }
                        />
                      </td>
                      <td className="px-4 py-2">
                        <select
                          className="border border-border rounded px-2 py-1 text-sm bg-card"
                          value={editData.category || ""}
                          onChange={(e) =>
                            setEditData((d) => ({
                              ...d,
                              category: e.target.value as Category,
                            }))
                          }
                        >
                          {CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-2">
                        <select
                          className="border border-border rounded px-2 py-1 text-sm bg-card"
                          value={editData.type || ""}
                          onChange={(e) =>
                            setEditData((d) => ({
                              ...d,
                              type: e.target.value as TransactionType,
                            }))
                          }
                        >
                          <option value="income">Income</option>
                          <option value="expense">Expense</option>
                        </select>
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          className="border border-border rounded px-2 py-1 text-sm bg-card w-24"
                          value={editData.amount || ""}
                          onChange={(e) =>
                            setEditData((d) => ({
                              ...d,
                              amount: Number(e.target.value),
                            }))
                          }
                        />
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <button
                          onClick={saveEdit}
                          className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:opacity-90"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-xs px-2 py-1 border border-border rounded hover:bg-muted"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {new Date(txn.date).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-4 py-3">{txn.description}</td>
                      <td className="px-4 py-3">{txn.category}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${
                            txn.type === "income"
                              ? "bg-gov-green/10 text-gov-green"
                              : "bg-gov-red/10 text-gov-red"
                          }`}
                        >
                          {txn.type === "income" ? "Income" : "Expense"}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium">
                        ₹{txn.amount.toLocaleString("en-IN")}
                      </td>
                      {role === "admin" && (
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEdit(txn)}
                              className="p-1 hover:bg-muted rounded"
                              title="Edit"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => deleteTransaction(txn.id)}
                              className="p-1 hover:bg-destructive/10 rounded text-destructive"
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      )}
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

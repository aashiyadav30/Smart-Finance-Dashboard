import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Transaction, UserRole, FilterState } from "@/types/finance";
import { mockTransactions } from "@/data/mockTransactions";

// ---- localStorage helpers ----
const STORAGE_KEY = "finance_dashboard_transactions";
const ROLE_KEY = "finance_dashboard_role";

function loadTransactions(): Transaction[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // fall through
  }
  return mockTransactions;
}

function saveTransactions(txns: Transaction[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(txns));
}

// ---- Context types ----
interface FinanceContextType {
  transactions: Transaction[];
  role: UserRole;
  setRole: (role: UserRole) => void;
  addTransaction: (txn: Omit<Transaction, "id">) => void;
  updateTransaction: (id: string, txn: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  filteredTransactions: Transaction[];
  // Computed summaries
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
  // Feedback message
  feedback: string | null;
}

const defaultFilters: FilterState = {
  search: "",
  type: "all",
  category: "all",
  sortBy: "date",
  sortOrder: "desc",
};

const FinanceContext = createContext<FinanceContextType | null>(null);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(loadTransactions);
  const [role, setRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem(ROLE_KEY) as UserRole) || "admin";
  });
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Persist transactions
  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  // Persist role
  const setRole = useCallback((r: UserRole) => {
    setRoleState(r);
    localStorage.setItem(ROLE_KEY, r);
  }, []);

  // Show feedback briefly
  const showFeedback = useCallback((msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 2500);
  }, []);

  // CRUD operations
  const addTransaction = useCallback((txn: Omit<Transaction, "id">) => {
    const newTxn: Transaction = { ...txn, id: `t${Date.now()}` };
    setTransactions((prev) => [newTxn, ...prev]);
    showFeedback("Transaction added successfully");
  }, [showFeedback]);

  const updateTransaction = useCallback((id: string, updates: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
    showFeedback("Transaction updated successfully");
  }, [showFeedback]);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    showFeedback("Transaction deleted");
  }, [showFeedback]);

  // Computed values
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  // Filtered & sorted transactions
  const filteredTransactions = React.useMemo(() => {
    let result = [...transactions];

    // Search filter
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.category.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.amount.toString().includes(q)
      );
    }

    // Type filter
    if (filters.type !== "all") {
      result = result.filter((t) => t.type === filters.type);
    }

    // Category filter
    if (filters.category !== "all") {
      result = result.filter((t) => t.category === filters.category);
    }

    // Sort
    result.sort((a, b) => {
      const dir = filters.sortOrder === "asc" ? 1 : -1;
      if (filters.sortBy === "date") {
        return dir * (new Date(a.date).getTime() - new Date(b.date).getTime());
      }
      return dir * (a.amount - b.amount);
    });

    return result;
  }, [transactions, filters]);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        role,
        setRole,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        filters,
        setFilters,
        filteredTransactions,
        totalIncome,
        totalExpenses,
        totalBalance,
        feedback,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used within FinanceProvider");
  return ctx;
}

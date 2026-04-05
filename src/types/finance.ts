// Transaction data types for the Finance Dashboard

export type TransactionType = "income" | "expense";

export type Category =
  | "Salary"
  | "Freelance"
  | "Investment"
  | "Rent"
  | "Utilities"
  | "Groceries"
  | "Transport"
  | "Healthcare"
  | "Education"
  | "Entertainment"
  | "Shopping"
  | "Other";

export interface Transaction {
  id: string;
  date: string; // ISO date string
  amount: number;
  category: Category;
  type: TransactionType;
  description: string;
}

export type UserRole = "admin" | "viewer";

export interface FilterState {
  search: string;
  type: TransactionType | "all";
  category: Category | "all";
  sortBy: "date" | "amount";
  sortOrder: "asc" | "desc";
}

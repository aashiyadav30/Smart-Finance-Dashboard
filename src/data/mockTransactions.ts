import { Transaction } from "@/types/finance";

// 21 sample transactions spanning several months
export const mockTransactions: Transaction[] = [
  { id: "t1", date: "2024-01-05", amount: 5200, category: "Salary", type: "income", description: "Monthly salary - January" },
  { id: "t2", date: "2024-01-08", amount: 1200, category: "Rent", type: "expense", description: "Monthly rent payment" },
  { id: "t3", date: "2024-01-12", amount: 85, category: "Utilities", type: "expense", description: "Electricity bill" },
  { id: "t4", date: "2024-01-15", amount: 320, category: "Groceries", type: "expense", description: "Weekly groceries" },
  { id: "t5", date: "2024-01-20", amount: 750, category: "Freelance", type: "income", description: "Web design project" },
  { id: "t6", date: "2024-02-05", amount: 5200, category: "Salary", type: "income", description: "Monthly salary - February" },
  { id: "t7", date: "2024-02-10", amount: 1200, category: "Rent", type: "expense", description: "Monthly rent payment" },
  { id: "t8", date: "2024-02-14", amount: 150, category: "Entertainment", type: "expense", description: "Concert tickets" },
  { id: "t9", date: "2024-02-18", amount: 290, category: "Groceries", type: "expense", description: "Weekly groceries" },
  { id: "t10", date: "2024-02-22", amount: 45, category: "Transport", type: "expense", description: "Monthly bus pass" },
  { id: "t11", date: "2024-03-05", amount: 5200, category: "Salary", type: "income", description: "Monthly salary - March" },
  { id: "t12", date: "2024-03-08", amount: 1200, category: "Rent", type: "expense", description: "Monthly rent payment" },
  { id: "t13", date: "2024-03-10", amount: 500, category: "Investment", type: "income", description: "Dividend payout" },
  { id: "t14", date: "2024-03-14", amount: 200, category: "Healthcare", type: "expense", description: "Doctor visit" },
  { id: "t15", date: "2024-03-18", amount: 310, category: "Groceries", type: "expense", description: "Weekly groceries" },
  { id: "t16", date: "2024-03-22", amount: 120, category: "Shopping", type: "expense", description: "New work shirt" },
  { id: "t17", date: "2024-03-25", amount: 1000, category: "Freelance", type: "income", description: "Logo design project" },
  { id: "t18", date: "2024-04-05", amount: 5200, category: "Salary", type: "income", description: "Monthly salary - April" },
  { id: "t19", date: "2024-04-10", amount: 1200, category: "Rent", type: "expense", description: "Monthly rent payment" },
  { id: "t20", date: "2024-04-12", amount: 350, category: "Education", type: "expense", description: "Online course subscription" },
  { id: "t21", date: "2024-04-15", amount: 60, category: "Other", type: "expense", description: "Miscellaneous supplies" },
];

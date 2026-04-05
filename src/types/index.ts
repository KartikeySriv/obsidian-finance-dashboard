export type TransactionType = 'income' | 'expense';

export type Category = 
  | 'Technology' 
  | 'Investment' 
  | 'Rent' 
  | 'Travel' 
  | 'Food' 
  | 'Entertainment' 
  | 'Utilities'
  | 'Salary'
  | 'Other';

export interface Transaction {
  id: string;
  title: string;
  category: Category;
  date: string;
  amount: number;
  type: TransactionType;
}

export type Role = 'admin' | 'viewer';

export interface DashboardStats {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  balanceChange: number;
  incomeChange: number;
  expenseChange: number;
}

export interface ChartData {
  date: string;
  balance: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

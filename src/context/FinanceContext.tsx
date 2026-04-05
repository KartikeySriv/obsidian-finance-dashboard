import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, Role, Category } from '../types';

interface FinanceContextType {
  transactions: Transaction[];
  role: Role;
  setRole: (role: Role) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: Category | 'All';
  setCategoryFilter: (category: Category | 'All') => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    title: 'Apple Store Infinite Loop',
    category: 'Technology',
    date: '2023-06-24',
    amount: -2499.00,
    type: 'expense',
  },
  {
    id: '2',
    title: 'Monthly Dividend Payout',
    category: 'Investment',
    date: '2023-06-22',
    amount: 1240.50,
    type: 'income',
  },
  {
    id: '3',
    title: 'Skyline Property Mgmt',
    category: 'Rent',
    date: '2023-06-20',
    amount: -3200.00,
    type: 'expense',
  },
  {
    id: '4',
    title: 'Freelance Project Payment',
    category: 'Salary',
    date: '2023-06-18',
    amount: 4500.00,
    type: 'income',
  },
  {
    id: '5',
    title: 'Emirates Flight Booking',
    category: 'Travel',
    date: '2023-06-15',
    amount: -1240.00,
    type: 'expense',
  },
  {
    id: '6',
    title: 'Whole Foods Market',
    category: 'Food',
    date: '2023-06-12',
    amount: -940.00,
    type: 'expense',
  },
];

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('obsidian_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [role, setRole] = useState<Role>(() => {
    const saved = localStorage.getItem('obsidian_role');
    return (saved as Role) || 'admin';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All');

  useEffect(() => {
    localStorage.setItem('obsidian_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('obsidian_role', role);
  }, [role]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  return (
    <FinanceContext.Provider value={{
      transactions,
      role,
      setRole,
      addTransaction,
      deleteTransaction,
      updateTransaction,
      searchQuery,
      setSearchQuery,
      categoryFilter,
      setCategoryFilter,
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

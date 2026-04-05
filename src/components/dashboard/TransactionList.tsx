import React, { useState } from 'react';
import { Search, Filter, Plus, Trash2, Edit2, MoreHorizontal, ReceiptText } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency, cn } from '../../lib/utils';
import { Transaction, Category } from '../../types';
import AddTransactionModal from '../transactions/AddTransactionModal';

const TransactionList: React.FC = () => {
  const { 
    transactions, 
    role, 
    deleteTransaction, 
    searchQuery, 
    setSearchQuery,
    categoryFilter,
    setCategoryFilter
  } = useFinance();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories: (Category | 'All')[] = [
    'All', 'Technology', 'Investment', 'Rent', 'Travel', 'Food', 'Salary'
  ];

  const [sortConfig, setSortConfig] = useState<{ key: keyof Transaction, direction: 'asc' | 'desc' }>({ key: 'date', direction: 'desc' });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: keyof Transaction) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="glass-card p-6 flex flex-col h-full">
      <AddTransactionModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold">Recent Transactions</h3>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-obsidian-text-muted w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-obsidian-bg border border-obsidian-border rounded-lg py-1.5 pl-10 pr-4 text-xs focus:outline-none focus:border-obsidian-accent transition-colors w-48"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 bg-obsidian-bg border border-obsidian-border rounded-lg px-4 py-1.5 text-xs font-semibold text-obsidian-text-muted hover:text-white hover:border-obsidian-accent transition-all"
            >
              <Filter size={14} />
              <span>Filter</span>
            </button>
            
            {isFilterOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-obsidian-card border border-obsidian-border rounded-xl shadow-2xl z-20 p-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategoryFilter(cat);
                      setIsFilterOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-xs transition-colors",
                      categoryFilter === cat ? "bg-obsidian-accent text-white" : "text-obsidian-text-muted hover:bg-obsidian-border hover:text-white"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {role === 'admin' && (
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 bg-obsidian-accent hover:bg-obsidian-accent/90 text-white rounded-lg px-4 py-1.5 text-xs font-bold transition-all shadow-lg shadow-obsidian-accent/20"
            >
              <Plus size={14} />
              <span>Add Transaction</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-separate border-spacing-y-4">
          <thead>
            <tr className="text-[10px] font-bold text-obsidian-text-muted uppercase tracking-widest">
              <th className="pb-2 pl-4 cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('title')}>Transaction</th>
              <th className="pb-2 cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('category')}>Category</th>
              <th className="pb-2 cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('date')}>Date</th>
              <th className="pb-2 cursor-pointer hover:text-white transition-colors" onClick={() => requestSort('amount')}>Amount</th>
              {role === 'admin' && <th className="pb-2 text-right pr-4">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((t) => (
              <tr key={t.id} className="group hover:bg-obsidian-bg/50 transition-colors">
                <td className="py-4 pl-4 rounded-l-xl bg-obsidian-bg/30 border-y border-l border-obsidian-border">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-obsidian-card border border-obsidian-border flex items-center justify-center">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        t.type === 'income' ? "bg-obsidian-success" : "bg-obsidian-danger"
                      )} />
                    </div>
                    <span className="text-sm font-semibold">{t.title}</span>
                  </div>
                </td>
                <td className="py-4 bg-obsidian-bg/30 border-y border-obsidian-border">
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-obsidian-border text-obsidian-text-muted uppercase tracking-wider">
                    {t.category}
                  </span>
                </td>
                <td className="py-4 bg-obsidian-bg/30 border-y border-obsidian-border">
                  <span className="text-xs text-obsidian-text-muted">{t.date}</span>
                </td>
                <td className="py-4 bg-obsidian-bg/30 border-y border-obsidian-border">
                  <span className={cn(
                    "text-sm font-bold",
                    t.type === 'income' ? "text-obsidian-success" : "text-obsidian-danger"
                  )}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(t.amount))}
                  </span>
                </td>
                {role === 'admin' && (
                  <td className="py-4 pr-4 rounded-r-xl bg-obsidian-bg/30 border-y border-r border-obsidian-border text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-obsidian-text-muted hover:text-white transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => deleteTransaction(t.id)}
                        className="p-2 text-obsidian-text-muted hover:text-obsidian-danger transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredTransactions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-obsidian-text-muted">
            <ReceiptText size={48} className="mb-4 opacity-20" />
            <p className="text-sm font-medium">No transactions found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { Category, TransactionType } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose }) => {
  const { addTransaction } = useFinance();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Technology');
  const [type, setType] = useState<TransactionType>('expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    addTransaction({
      title,
      amount: type === 'expense' ? -Math.abs(Number(amount)) : Math.abs(Number(amount)),
      category,
      type,
      date: new Date().toISOString().split('T')[0],
    });

    setTitle('');
    setAmount('');
    onClose();
  };

  const categories: Category[] = [
    'Technology', 'Investment', 'Rent', 'Travel', 'Food', 'Salary', 'Entertainment', 'Utilities', 'Other'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-obsidian-bg/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-obsidian-card border border-obsidian-border rounded-2xl shadow-2xl p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">Add Transaction</h3>
              <button onClick={onClose} className="text-obsidian-text-muted hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-obsidian-text-muted uppercase tracking-widest">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Apple Store"
                  className="w-full bg-obsidian-bg border border-obsidian-border rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-obsidian-accent transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-obsidian-text-muted uppercase tracking-widest">Amount</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-obsidian-bg border border-obsidian-border rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-obsidian-accent transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-obsidian-text-muted uppercase tracking-widest">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as TransactionType)}
                    className="w-full bg-obsidian-bg border border-obsidian-border rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-obsidian-accent transition-colors appearance-none"
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-obsidian-text-muted uppercase tracking-widest">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full bg-obsidian-bg border border-obsidian-border rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-obsidian-accent transition-colors appearance-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-obsidian-accent hover:bg-obsidian-accent/90 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-obsidian-accent/20 mt-4 flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                <span>Create Transaction</span>
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddTransactionModal;

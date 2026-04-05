import React from 'react';
import { Wallet, TrendingUp, TrendingDown, ReceiptText } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency, formatPercentage, cn } from '../../lib/utils';

const SummaryCards: React.FC = () => {
  const { transactions } = useFinance();

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = Math.abs(transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0));

  const totalBalance = totalIncome - totalExpenses;

  // Mock changes for UI consistency with design
  const balanceChange = 2.4;
  const incomeChange = 12.8;
  const expenseChange = -4.1;

  const cards = [
    {
      title: 'Total Balance',
      value: totalBalance,
      change: balanceChange,
      icon: Wallet,
      color: 'text-obsidian-accent',
      description: 'Active liquidity across 4 accounts',
    },
    {
      title: 'Total Income',
      value: totalIncome,
      change: incomeChange,
      icon: TrendingUp,
      color: 'text-obsidian-success',
      description: 'Projection: On track for monthly goal',
    },
    {
      title: 'Total Expenses',
      value: totalExpenses,
      change: expenseChange,
      icon: ReceiptText,
      color: 'text-obsidian-danger',
      description: "Reduced spending in 'Travel' sector",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card) => (
        <div key={card.title} className="glass-card p-6 flex flex-col justify-between group hover:border-obsidian-accent/50 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-obsidian-text-muted uppercase tracking-wider mb-1">{card.title}</p>
              <div className="flex items-baseline gap-3">
                <h3 className="text-2xl font-bold">{formatCurrency(card.value)}</h3>
                <span className={cn(
                  "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                  card.change >= 0 ? "bg-obsidian-success/10 text-obsidian-success" : "bg-obsidian-danger/10 text-obsidian-danger"
                )}>
                  {formatPercentage(card.change)}
                </span>
              </div>
            </div>
            <div className={cn("p-2 rounded-lg bg-obsidian-bg border border-obsidian-border group-hover:scale-110 transition-transform", card.color)}>
              <card.icon size={20} />
            </div>
          </div>
          <p className="text-xs text-obsidian-text-muted">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;

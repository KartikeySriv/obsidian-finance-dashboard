import React from 'react';
import { TrendingUp, TrendingDown, Lightbulb, Globe } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency, formatPercentage, cn } from '../../lib/utils';

const Insights: React.FC = () => {
  const { transactions } = useFinance();

  const expenseByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);

  const sortedCategories = Object.entries(expenseByCategory)
    .sort((a, b) => (b[1] as number) - (a[1] as number));

  const highestSpending = sortedCategories[0] || ['None', 0];
  const totalExpenses = sortedCategories.reduce((acc, [_, val]) => acc + (val as number), 0);
  const highestSpendingPercent = totalExpenses > 0 ? ((highestSpending[1] as number) / totalExpenses) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h3 className="text-xs font-bold text-obsidian-text-muted uppercase tracking-widest mb-6">Financial Insights</h3>
        
        <div className="space-y-8">
          <div>
            <p className="text-[10px] text-obsidian-text-muted uppercase font-bold tracking-widest mb-1">Highest Spending Category</p>
            <div className="flex items-baseline justify-between mb-2">
              <h4 className="text-sm font-bold">{highestSpending[0]}</h4>
              <span className="text-xs font-bold text-obsidian-danger">{highestSpendingPercent.toFixed(0)}% total</span>
            </div>
            <div className="w-full h-1.5 bg-obsidian-bg rounded-full overflow-hidden">
              <div 
                className="h-full bg-obsidian-danger rounded-full" 
                style={{ width: `${highestSpendingPercent}%` }} 
              />
            </div>
          </div>

          <div>
            <p className="text-[10px] text-obsidian-text-muted uppercase font-bold tracking-widest mb-1">Monthly Comparison</p>
            <div className="flex items-baseline justify-between mb-1">
              <h4 className="text-sm font-bold">Net Savings</h4>
              <span className="text-xs font-bold text-obsidian-success">+$12,126</span>
            </div>
            <p className="text-[10px] text-obsidian-text-muted italic leading-relaxed">Highest savings margin this fiscal year.</p>
          </div>

          <div className="bg-obsidian-accent/5 border border-obsidian-accent/20 rounded-xl p-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
              <TrendingUp size={48} className="text-obsidian-accent" />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={16} className="text-obsidian-accent" />
              <h4 className="text-xs font-bold text-obsidian-accent uppercase tracking-widest">Observations</h4>
            </div>
            <p className="text-xs text-obsidian-text-muted leading-relaxed relative z-10">
              Your travel expenses are 12% lower than average. Consider allocating the surplus to the Obsidian Index Fund.
            </p>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-bold text-obsidian-text-muted uppercase tracking-widest">Wealth Map</h3>
          <Globe size={16} className="text-obsidian-text-muted" />
        </div>
        
        <div className="aspect-video bg-obsidian-bg rounded-lg border border-obsidian-border relative overflow-hidden mb-6">
          <div className="absolute inset-0 opacity-20 grayscale invert">
            <img 
              src="https://picsum.photos/seed/worldmap/400/200" 
              alt="World Map" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-obsidian-accent rounded-full animate-ping" />
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-obsidian-accent rounded-full animate-ping" />
          <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-obsidian-accent rounded-full animate-ping" />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[10px] text-obsidian-text-muted uppercase font-bold tracking-widest">Global Diversification</span>
          <span className="text-xs font-bold text-obsidian-accent">High</span>
        </div>
      </div>
    </div>
  );
};

export default Insights;

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../lib/utils';

const COLORS = ['#3b82f6', '#10b981', '#ef4444', '#f59e0b', '#8b5cf6'];

const ExpenseChart: React.FC = () => {
  const { transactions } = useFinance();

  const expenseByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);

  const data = Object.entries(expenseByCategory).map(([name, value]) => ({
    name,
    value: value as number,
  })).sort((a, b) => (b.value as number) - (a.value as number));

  const totalExpense = data.reduce((acc, item) => acc + (item.value as number), 0);

  return (
    <div className="glass-card p-6 h-[400px] flex flex-col">
      <h3 className="text-lg font-bold mb-6">Expense Allocation</h3>
      
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#141820', 
                borderColor: '#1e293b', 
                borderRadius: '8px',
                fontSize: '12px',
                color: '#fff'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-[10px] text-obsidian-text-muted uppercase font-bold tracking-widest">Total</p>
          <p className="text-lg font-bold">{formatCurrency(totalExpense)}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {data.slice(0, 3).map((item, index) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span className="text-xs text-obsidian-text-muted">{item.name}</span>
            </div>
            <span className="text-xs font-bold">{formatCurrency(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseChart;

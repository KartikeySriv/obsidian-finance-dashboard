import React from 'react';
import { TrendingUp, TrendingDown, PieChart, BarChart2, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const Analytics: React.FC = () => {
  const monthlyData = [
    { month: 'Jan', income: 4500, expenses: 3200 },
    { month: 'Feb', income: 5200, expenses: 3800 },
    { month: 'Mar', income: 4800, expenses: 4100 },
    { month: 'Apr', income: 6100, expenses: 3500 },
    { month: 'May', income: 5500, expenses: 4200 },
    { month: 'Jun', income: 6800, expenses: 3900 },
  ];

  const categoryData = [
    { name: 'Technology', value: 2499, color: '#3b82f6' },
    { name: 'Rent', value: 3200, color: '#10b981' },
    { name: 'Travel', value: 1240, color: '#ef4444' },
    { name: 'Food', value: 940, color: '#f59e0b' },
    { name: 'Investment', value: 1240, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Advanced Analytics</h2>
          <p className="text-sm text-obsidian-text-muted">Deep dive into your financial patterns and trends.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-obsidian-card border border-obsidian-border rounded-lg px-4 py-2 text-xs font-semibold text-obsidian-text-muted hover:text-white transition-all">
            <Calendar size={14} />
            <span>Last 6 Months</span>
          </button>
          <button className="flex items-center gap-2 bg-obsidian-accent hover:bg-obsidian-accent/90 text-white rounded-lg px-4 py-2 text-xs font-bold transition-all shadow-lg shadow-obsidian-accent/20">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-6 min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <BarChart2 size={20} className="text-obsidian-accent" />
              Income vs Expenses
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-obsidian-accent" />
                <span className="text-xs text-obsidian-text-muted">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-obsidian-danger" />
                <span className="text-xs text-obsidian-text-muted">Expenses</span>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10 }} 
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  cursor={{ fill: '#1e293b' }}
                  contentStyle={{ 
                    backgroundColor: '#141820', 
                    borderColor: '#1e293b', 
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="income" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-sm font-bold text-obsidian-text-muted uppercase tracking-widest mb-6">Key Insights</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">Savings Rate Up</p>
                  <p className="text-xs text-obsidian-text-muted mt-1">Your savings rate increased by 15% compared to last month.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                  <TrendingDown size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">Expense Alert</p>
                  <p className="text-xs text-obsidian-text-muted mt-1">Technology spending is 20% higher than your set budget.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-sm font-bold text-obsidian-text-muted uppercase tracking-widest mb-6">Spending Trends</h3>
            <div className="space-y-4">
              {categoryData.map((cat) => (
                <div key={cat.name} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold">{cat.name}</span>
                    <span className="text-obsidian-text-muted">{formatCurrency(cat.value)}</span>
                  </div>
                  <div className="w-full h-1.5 bg-obsidian-bg rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ width: `${(cat.value / 3200) * 100}%`, backgroundColor: cat.color }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

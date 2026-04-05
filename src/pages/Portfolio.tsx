import React from 'react';
import { Wallet, Briefcase, PiggyBank, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Portfolio: React.FC = () => {
  const assets = [
    { name: 'Chase Checking', type: 'Bank Account', balance: 45200.50, change: 2.4, icon: Wallet, color: 'text-blue-400' },
    { name: 'Vanguard 500 Index', type: 'Investment', balance: 68400.00, change: 5.8, icon: Briefcase, color: 'text-purple-400' },
    { name: 'High Yield Savings', type: 'Savings', balance: 12500.00, change: 0.5, icon: PiggyBank, color: 'text-green-400' },
    { name: 'Coinbase Pro', type: 'Crypto', balance: 8491.50, change: -12.4, icon: TrendingUp, color: 'text-orange-400' },
  ];

  const totalAssets = assets.reduce((acc, asset) => acc + asset.balance, 0);

  const chartData = assets.map(asset => ({
    name: asset.name,
    value: asset.balance,
  }));

  const COLORS = ['#60a5fa', '#a78bfa', '#4ade80', '#fb923c'];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Portfolio Overview</h2>
          <p className="text-sm text-obsidian-text-muted">Manage your assets and account distribution.</p>
        </div>
        <div className="glass-card px-6 py-3 flex items-center gap-4">
          <span className="text-xs font-bold text-obsidian-text-muted uppercase tracking-widest">Total Assets</span>
          <span className="text-2xl font-bold text-obsidian-accent">{formatCurrency(totalAssets)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assets.map((asset) => (
              <div key={asset.name} className="glass-card p-6 group hover:border-obsidian-accent/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={cn("p-3 rounded-xl bg-obsidian-bg border border-obsidian-border", asset.color)}>
                      <asset.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold">{asset.name}</h4>
                      <p className="text-xs text-obsidian-text-muted">{asset.type}</p>
                    </div>
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                    asset.change >= 0 ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                  )}>
                    {asset.change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {Math.abs(asset.change)}%
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{formatCurrency(asset.balance)}</p>
                  <div className="w-full h-1.5 bg-obsidian-bg rounded-full mt-3 overflow-hidden">
                    <div 
                      className="h-full bg-obsidian-accent rounded-full" 
                      style={{ width: `${(asset.balance / totalAssets) * 100}%` }} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="glass-card p-6 h-full flex flex-col">
            <h3 className="text-lg font-bold mb-6">Asset Distribution</h3>
            <div className="flex-1 min-h-[300px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
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
                <p className="text-[10px] text-obsidian-text-muted uppercase font-bold tracking-widest">Diversification</p>
                <p className="text-lg font-bold">Optimal</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {assets.map((asset, index) => (
                <div key={asset.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-xs text-obsidian-text-muted">{asset.name}</span>
                  </div>
                  <span className="text-xs font-bold">{((asset.balance / totalAssets) * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { TrendingUp } from 'lucide-react';
export default Portfolio;

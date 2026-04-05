import React from 'react';
import { TrendingUp, Search, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface MarketItem {
  name: string;
  symbol: string;
  price: number;
  change: number;
  trend: number[];
  color: string;
}

const MarketCard: React.FC<{ item: MarketItem }> = ({ item }) => (
  <div className="glass-card p-6 flex flex-col gap-4 group hover:border-obsidian-accent/50 transition-all duration-300">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-obsidian-bg border border-obsidian-border flex items-center justify-center font-bold text-xs text-obsidian-accent">
          {item.symbol}
        </div>
        <div>
          <h4 className="font-bold text-sm">{item.name}</h4>
          <p className="text-[10px] text-obsidian-text-muted uppercase tracking-widest">{item.symbol}</p>
        </div>
      </div>
      <div className={cn(
        "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full",
        item.change >= 0 ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
      )}>
        {item.change >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
        {Math.abs(item.change)}%
      </div>
    </div>

    <div className="flex items-end justify-between">
      <div>
        <p className="text-xl font-bold">{formatCurrency(item.price)}</p>
        <p className="text-[10px] text-obsidian-text-muted mt-1">Live Market Price</p>
      </div>
      <div className="w-24 h-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={item.trend.map((v: number, i: number) => ({ v, i }))}>
            <Line 
              type="monotone" 
              dataKey="v" 
              stroke={item.change >= 0 ? '#4ade80' : '#f87171'} 
              strokeWidth={2} 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

const Markets: React.FC = () => {
  const stocks: MarketItem[] = [
    { name: 'Apple Inc.', symbol: 'AAPL', price: 189.43, change: 1.2, trend: [180, 182, 185, 184, 189], color: 'text-green-400' },
    { name: 'Microsoft Corp.', symbol: 'MSFT', price: 415.10, change: -0.5, trend: [420, 418, 419, 417, 415], color: 'text-red-400' },
    { name: 'Tesla, Inc.', symbol: 'TSLA', price: 175.22, change: 4.8, trend: [160, 165, 168, 172, 175], color: 'text-green-400' },
    { name: 'NVIDIA Corp.', symbol: 'NVDA', price: 875.28, change: 2.1, trend: [850, 860, 855, 870, 875], color: 'text-green-400' },
    { name: 'Amazon.com, Inc.', symbol: 'AMZN', price: 178.15, change: -1.2, trend: [182, 180, 179, 181, 178], color: 'text-red-400' },
  ];

  const crypto: MarketItem[] = [
    { name: 'Bitcoin', symbol: 'BTC', price: 68420.50, change: 3.4, trend: [65000, 66000, 67500, 68000, 68420], color: 'text-orange-400' },
    { name: 'Ethereum', symbol: 'ETH', price: 3450.12, change: -2.1, trend: [3600, 3550, 3500, 3480, 3450], color: 'text-blue-400' },
    { name: 'Solana', symbol: 'SOL', price: 145.80, change: 12.4, trend: [120, 130, 135, 140, 145], color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Market Intelligence</h2>
          <p className="text-sm text-obsidian-text-muted">Real-time tracking of global markets and digital assets.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-obsidian-text-muted w-4 h-4" />
            <input
              type="text"
              placeholder="Search assets..."
              className="bg-obsidian-card border border-obsidian-border rounded-lg py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-obsidian-accent transition-colors w-48"
            />
          </div>
          <button className="flex items-center gap-2 bg-obsidian-card border border-obsidian-border rounded-lg px-4 py-2 text-xs font-semibold text-obsidian-text-muted hover:text-white transition-all">
            <Filter size={14} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <TrendingUp size={20} className="text-obsidian-accent" />
            Top Equities
          </h3>
          <button className="text-xs font-bold text-obsidian-accent hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stocks.map(stock => <MarketCard key={stock.symbol} item={stock} />)}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <TrendingUp size={20} className="text-orange-400" />
            Digital Assets
          </h3>
          <button className="text-xs font-bold text-obsidian-accent hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {crypto.map(coin => <MarketCard key={coin.symbol} item={coin} />)}
        </div>
      </div>
    </div>
  );
};

export default Markets;

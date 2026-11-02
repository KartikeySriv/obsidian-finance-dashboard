import React, { useEffect, useState } from 'react';
import { TrendingUp, Search, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface MarketItem {
  name: string;
  symbol: string;
  price: number;
  change: number;
  trend: number[];
}

interface MarketData {
  stocks: MarketItem[];
  crypto: MarketItem[];
}

function isValidMarketItem(item: unknown): item is MarketItem {
  if (!item || typeof item !== 'object') return false;
  const candidate = item as Record<string, unknown>;
  return (
    typeof candidate.name === 'string' &&
    typeof candidate.symbol === 'string' &&
    typeof candidate.price === 'number' &&
    Number.isFinite(candidate.price) &&
    typeof candidate.change === 'number' &&
    Number.isFinite(candidate.change) &&
    Array.isArray(candidate.trend) &&
    candidate.trend.every((v) => typeof v === 'number' && Number.isFinite(v))
  );
}

function isValidMarketData(data: unknown): data is MarketData {
  if (!data || typeof data !== 'object') return false;
  const candidate = data as Record<string, unknown>;
  return (
    Array.isArray(candidate.stocks) &&
    Array.isArray(candidate.crypto) &&
    candidate.stocks.every(isValidMarketItem) &&
    candidate.crypto.every(isValidMarketItem)
  );
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
  const [stocks, setStocks] = useState<MarketItem[]>([]);
  const [crypto, setCrypto] = useState<MarketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadMarketData() {
      setLoading(true);
      setError(null);

      try {
        const base = import.meta.env.BASE_URL.endsWith('/')
          ? import.meta.env.BASE_URL
          : `${import.meta.env.BASE_URL}/`;
        const url = `${base}data/market-data.json`;
        const response = await fetch(url, { signal: controller.signal, cache: 'no-store' });

        if (!response.ok) {
          throw new Error(`Failed to load market data (${response.status})`);
        }

        const json: unknown = await response.json();

        if (!isValidMarketData(json)) {
          throw new Error('Market data file is missing valid stocks or crypto arrays');
        }

        setStocks(json.stocks);
        setCrypto(json.crypto);
      } catch (err) {
        if (controller.signal.aborted) return;
        const message = err instanceof Error ? err.message : 'Failed to load market data';
        setError(message);
        setStocks([]);
        setCrypto([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadMarketData();

    return () => controller.abort();
  }, [retryCount]);

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold">Market Intelligence</h2>
          <p className="text-sm text-obsidian-text-muted">Loading market data…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold">Market Intelligence</h2>
          <p className="text-sm text-obsidian-text-muted">Unable to load CMS market data.</p>
        </div>
        <div className="glass-card p-6 space-y-4">
          <p className="text-sm text-red-400">{error}</p>
          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
            className="bg-obsidian-card border border-obsidian-border rounded-lg px-4 py-2 text-xs font-semibold text-obsidian-text-muted hover:text-white transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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

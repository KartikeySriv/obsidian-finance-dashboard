import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { date: 'JUN 01', balance: 120000 },
  { date: 'JUN 08', balance: 122000 },
  { date: 'JUN 15', balance: 124592 },
  { date: 'JUN 22', balance: 121000 },
  { date: 'JUN 30', balance: 124592 },
];

const BalanceChart: React.FC = () => {
  return (
    <div className="glass-card p-6 h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold">Balance over time</h3>
          <p className="text-xs text-obsidian-text-muted">Real-time portfolio performance tracking</p>
        </div>
        <div className="flex bg-obsidian-bg p-1 rounded-lg border border-obsidian-border">
          {['1M', '3M', '1Y'].map((t) => (
            <button
              key={t}
              className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                t === '1M' ? 'bg-obsidian-accent text-white' : 'text-obsidian-text-muted hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 10 }} 
              dy={10}
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#141820', 
                borderColor: '#1e293b', 
                borderRadius: '8px',
                fontSize: '12px',
                color: '#fff'
              }}
              itemStyle={{ color: '#3b82f6' }}
            />
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorBalance)" 
              dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#141820' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalanceChart;

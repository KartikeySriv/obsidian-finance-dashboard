import React from 'react';
import { Search, Bell, Settings, User } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { cn } from '../../lib/utils';

const TopBar: React.FC = () => {
  const { role, setRole, searchQuery, setSearchQuery } = useFinance();

  const tabs = ['Dashboard', 'Strategy', 'Reports'];

  return (
    <header className="h-20 border-b border-obsidian-border flex items-center justify-between px-8 bg-obsidian-bg/80 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-8 flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-obsidian-text-muted w-4 h-4" />
          <input
            type="text"
            placeholder="Financial Intelligence search..."
            className="w-full bg-obsidian-card border border-obsidian-border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-obsidian-accent transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>


      </div>

      <div className="flex items-center gap-6">
        <div className="flex bg-obsidian-card p-1 rounded-lg border border-obsidian-border">
          <button
            onClick={() => setRole('admin')}
            className={cn(
              "px-4 py-1.5 text-xs font-semibold rounded-md transition-all",
              role === 'admin' ? "bg-obsidian-accent text-white shadow-lg" : "text-obsidian-text-muted hover:text-white"
            )}
          >
            Admin
          </button>
          <button
            onClick={() => setRole('viewer')}
            className={cn(
              "px-4 py-1.5 text-xs font-semibold rounded-md transition-all",
              role === 'viewer' ? "bg-obsidian-accent text-white shadow-lg" : "text-obsidian-text-muted hover:text-white"
            )}
          >
            Viewer
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;

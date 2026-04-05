import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  TrendingUp, 
  PieChart, 
  ShieldCheck, 
  Settings, 
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Intelligence', path: '/' },
    { icon: Briefcase, label: 'Portfolio', path: '/portfolio' },
    { icon: TrendingUp, label: 'Markets', path: '/markets' },
    { icon: PieChart, label: 'Analytics', path: '/analytics' },
    { icon: ShieldCheck, label: 'Security', path: '/security' },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed top-6 left-6 z-50 p-2 bg-obsidian-card border border-obsidian-border rounded-lg text-white shadow-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          onClick={toggleSidebar}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      <aside className={cn(
        "w-64 h-screen bg-obsidian-sidebar border-r border-obsidian-border flex flex-col fixed lg:sticky top-0 z-50 transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-obsidian-accent rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Obsidian</h1>
            <p className="text-[10px] text-obsidian-text-muted uppercase tracking-widest">Wealth Intelligence</p>
          </div>
        </div>

        <nav className="flex-1 px-4 mt-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => cn(
                isActive ? "nav-item-active" : "nav-item",
                "w-full text-left"
              )}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-4 mb-6">
          <div className="bg-obsidian-accent/5 border border-obsidian-accent/20 rounded-xl p-4">
            <p className="text-xs text-obsidian-text-muted mb-2">Maximize your potential with advanced signals.</p>
            <button className="w-full bg-obsidian-accent hover:bg-obsidian-accent/90 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
              Upgrade to Pro
            </button>
          </div>
        </div>

        <div className="px-4 pb-6 space-y-2">
          <button className="nav-item w-full">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

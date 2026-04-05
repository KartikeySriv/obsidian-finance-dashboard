import React, { useState } from 'react';
import { Shield, Lock, Smartphone, Key, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

const Security: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Security Settings</h2>
        <p className="text-sm text-obsidian-text-muted">Manage your account security and authentication preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-obsidian-accent/10 text-obsidian-accent border border-obsidian-accent/20">
              <Lock size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold">Change Password</h3>
              <p className="text-xs text-obsidian-text-muted">Update your account password regularly.</p>
            </div>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-obsidian-text-muted uppercase tracking-widest">Current Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-obsidian-bg border border-obsidian-border rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-obsidian-accent transition-colors"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-obsidian-text-muted hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-obsidian-text-muted uppercase tracking-widest">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-obsidian-bg border border-obsidian-border rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-obsidian-accent transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button className="w-full bg-obsidian-accent hover:bg-obsidian-accent/90 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-obsidian-accent/20">
              Update Password
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Smartphone size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Two-Factor Auth</h3>
                  <p className="text-xs text-obsidian-text-muted">Add an extra layer of security.</p>
                </div>
              </div>
              <button 
                onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  is2FAEnabled ? "bg-obsidian-accent" : "bg-obsidian-border"
                )}
              >
                <div className={cn(
                  "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                  is2FAEnabled ? "translate-x-7" : "translate-x-1"
                )} />
              </button>
            </div>
            
            <div className="bg-obsidian-bg/50 border border-obsidian-border rounded-xl p-4 flex items-start gap-3">
              <CheckCircle2 size={16} className="text-obsidian-success mt-0.5 shrink-0" />
              <p className="text-xs text-obsidian-text-muted leading-relaxed">
                We recommend using an authenticator app like Google Authenticator or Authy for maximum security.
              </p>
            </div>
          </div>

          <div className="glass-card p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <Key size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold">API Keys</h3>
                <p className="text-xs text-obsidian-text-muted">Manage your personal access tokens.</p>
              </div>
            </div>
            <button className="w-full bg-obsidian-bg border border-obsidian-border hover:border-obsidian-accent text-white font-bold py-3 rounded-xl transition-all">
              Manage API Keys
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;

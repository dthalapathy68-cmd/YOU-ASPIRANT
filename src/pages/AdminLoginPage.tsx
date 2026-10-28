import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/db';
import { ShieldCheck, Lock, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@youaspirant.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please provide administrative email.');
      return;
    }

    // Set demo admin account
    db.loginDemoAdmin();
    navigate('/admin/dashboard');
  };

  const handleQuickDemoAdmin = () => {
    db.loginDemoAdmin();
    navigate('/admin/dashboard');
  };

  return (
    <div className="max-w-[480px] mx-auto px-4 py-12 md:py-20 text-left">
      <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-9 shadow-elevated space-y-6">
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#542744] flex items-center justify-center text-[#FFD49A] mx-auto shadow-sm">
            <ShieldCheck className="w-6 h-6 text-[#F4A340]" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-[#542744]">
            Administration Portal
          </h1>
          <p className="text-xs text-[#77717A]">
            Staff access for student lead management, roadmap curation, and enquiries.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-xs text-[#C54A4A] rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Quick Demo Admin Button */}
        <div className="p-4 rounded-2xl bg-[#F5EDF3] border border-[#DBCBD6] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#542744] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F4A340]" />
              <span>One-Click Admin Demo</span>
            </span>
            <span className="text-[10px] font-semibold text-[#754565] bg-white px-2 py-0.5 rounded">
              Director Role
            </span>
          </div>
          <p className="text-xs text-[#77717A]">
            Log in directly to manage enquiries, review leads, and edit career profiles in local demo mode.
          </p>
          <button
            type="button"
            onClick={handleQuickDemoAdmin}
            className="w-full py-2 px-3 rounded-button bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] text-xs font-semibold transition-all"
          >
            Sign In as Demo Admin
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5E8] bg-[#FFFCF7] text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
              Admin Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5E8] bg-[#FFFCF7] text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-button bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>Enter Administration Dashboard</span>
            <ArrowRight className="w-4 h-4 text-[#F4A340]" />
          </button>
        </form>
      </div>
    </div>
  );
};

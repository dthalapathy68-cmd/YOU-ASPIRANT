import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { db } from '../services/db';
import { User, Lock, ArrowRight, Sparkles, Shield, AlertCircle } from 'lucide-react';

export const StudentLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/student/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }

    // In demo mode, log in or create demo student session
    const user = db.loginDemoStudent();
    if (email.trim() && email !== user.email) {
      user.email = email.trim();
      db.setCurrentUser(user);
    }
    navigate(redirect);
  };

  const handleQuickDemoLogin = () => {
    db.loginDemoStudent();
    navigate(redirect);
  };

  return (
    <div className="max-w-[480px] mx-auto px-4 py-12 md:py-20 text-left">
      <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-9 shadow-elevated space-y-6">
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#F5EDF3] flex items-center justify-center text-[#542744] mx-auto">
            <User className="w-6 h-6 text-[#542744]" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-[#542744]">
            Student Sign In
          </h1>
          <p className="text-xs text-[#77717A]">
            Access your saved Career DNA, FuturePath roadmaps, and guidance requests.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-xs text-[#C54A4A] rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Quick Demo Login Pill */}
        <div className="p-4 rounded-2xl bg-[#F5EDF3] border border-[#DBCBD6] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#542744] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F4A340]" />
              <span>Quick Demo Access</span>
            </span>
            <span className="text-[10px] font-semibold text-[#754565] bg-white px-2 py-0.5 rounded">
              One Click
            </span>
          </div>
          <p className="text-xs text-[#77717A]">
            Instantly explore the student dashboard pre-loaded with sample Career DNA results and milestone progress.
          </p>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2 px-3 rounded-button bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] text-xs font-semibold transition-all"
          >
            Sign In as Demo Student (Ananya)
          </button>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#EDE5E8]" />
          </div>
          <div className="relative flex justify-center text-[11px] uppercase">
            <span className="bg-[#FFFFFF] px-2 text-[#77717A] font-semibold">Or with credentials</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. ananya@student.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5E8] bg-[#FFFCF7] text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5E8] bg-[#FFFCF7] text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-button bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4 text-[#F4A340]" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-[#77717A] space-y-2">
          <p>
            Don't have an account yet?{' '}
            <Link to="/student/register" className="text-[#542744] font-bold underline">
              Create an Account
            </Link>
          </p>
          <p>
            Company staff or counsellor?{' '}
            <Link to="/admin/login" className="text-[#754565] font-semibold">
              Admin Portal
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

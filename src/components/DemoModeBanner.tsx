import React, { useState } from 'react';
import { db } from '../services/db';
import { Database, Info, X, CheckCircle2 } from 'lucide-react';

export const DemoModeBanner: React.FC = () => {
  const isDemo = db.isDemoMode();
  const [isOpen, setIsOpen] = useState(false);

  if (!isDemo) return null;

  return (
    <>
      {/* Subtle Persistent Bottom-Left Pill */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#542744] text-[#FFD49A] text-xs font-medium shadow-md border border-[#F4A340]/40 hover:bg-[#754565] transition-all"
          title="Click to view Demo Mode & Storage details"
        >
          <span className="w-2 h-2 rounded-full bg-[#F4A340] animate-pulse" />
          <span>Demo Mode (LocalStorage)</span>
        </button>
      </div>

      {/* Explanatory Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFCF7] border border-[#EDE5E8] rounded-card p-6 max-w-md w-full shadow-floating relative text-left">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[#77717A] hover:text-[#542744] p-1 rounded-lg"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5EDF3] flex items-center justify-center text-[#542744]">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-[#542744]">Application Running in Demo Mode</h3>
                <p className="text-xs text-[#77717A]">Persistent Browser Storage Active</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-[#29232C] mb-5">
              <p>
                This application is running with a separated local storage data provider. All interactive features are functional:
              </p>
              <ul className="space-y-1.5 text-xs text-[#77717A]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#27845D]" /> Career DNA assessment scoring and results
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#27845D]" /> FuturePath roadmap milestone completion & notes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#27845D]" /> Skill Gap Map self-assessments
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#27845D]" /> Student lead generation & admin enquiries
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#27845D]" /> Student and Admin portals
                </li>
              </ul>
              <div className="p-3 bg-[#F5EDF3] rounded-xl text-xs text-[#542744]">
                <p className="font-semibold mb-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" /> Note regarding production database:
                </p>
                <p>
                  To switch to production Supabase PostgreSQL, configure <code className="bg-[#FFFCF7] px-1 py-0.5 rounded border border-[#EDE5E8]">VITE_SUPABASE_URL</code> and <code className="bg-[#FFFCF7] px-1 py-0.5 rounded border border-[#EDE5E8]">VITE_SUPABASE_ANON_KEY</code> in <code className="bg-[#FFFCF7] px-1 py-0.5 rounded border border-[#EDE5E8]">.env</code> and execute <code className="bg-[#FFFCF7] px-1 py-0.5 rounded border border-[#EDE5E8]">supabase/schema.sql</code>.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 px-4 rounded-button bg-[#542744] text-[#FFFCF7] font-medium text-sm hover:bg-[#754565] transition-all"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}
    </>
  );
};

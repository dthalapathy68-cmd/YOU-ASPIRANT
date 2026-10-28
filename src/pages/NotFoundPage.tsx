import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-[700px] mx-auto px-4 py-20 md:py-28 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-[#F5EDF3] border border-[#DBCBD6] flex items-center justify-center text-[#542744] mx-auto shadow-subtle">
        <Compass className="w-8 h-8 text-[#F4A340] animate-spin" style={{ animationDuration: '10s' }} />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-[#F4A340] uppercase tracking-wider">Page Not Found</span>
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#542744]">
          404 — Direction Uncharted
        </h1>
        <p className="text-sm sm:text-base text-[#77717A] max-w-md mx-auto leading-relaxed">
          The page or pathway you are looking for does not exist or has been relocated. Let's get you back on track.
        </p>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 rounded-button bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
        >
          <Home className="w-4 h-4 text-[#F4A340]" />
          <span>Return to Homepage</span>
        </Link>
        <Link
          to="/assessment"
          className="px-6 py-3 rounded-button bg-[#F5EDF3] text-[#542744] text-xs font-semibold hover:bg-[#EDE5E8] transition-colors"
        >
          Take Career DNA Assessment
        </Link>
      </div>
    </div>
  );
};

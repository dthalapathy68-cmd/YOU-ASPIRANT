import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

interface FloatingPathwayDockProps {
  onOpenLeadModal: () => void;
  onOpenQuizModal: () => void;
}

export const FloatingPathwayDock: React.FC<FloatingPathwayDockProps> = ({
  onOpenLeadModal,
  onOpenQuizModal,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling past the first 400px of Hero
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-5 right-5 sm:right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto"
      role="region"
      aria-label="Quick Career Actions Dock"
    >
      <div className="bg-brand-midnight/95 backdrop-blur-md text-brand-ivory p-1.5 pl-3.5 rounded-full border border-brand-coral/30 shadow-floating flex items-center gap-2">
        <button
          onClick={onOpenQuizModal}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-brand-ivory/80 hover:text-white transition-colors pr-2 border-r border-brand-midnight-light"
          title="Take 60-Second Readiness Check"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-coral" />
          <span>Readiness Check</span>
        </button>

        <button
          onClick={onOpenLeadModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-coral hover:bg-brand-coral-hover text-white text-xs font-bold rounded-full shadow-sm hover:shadow-coral-glow transition-all"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Talk to Guide</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { ArrowDown, Compass, BookOpen, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { FuturePathwayHero } from './FuturePathwayHero';

interface HeroSectionProps {
  onOpenLeadModal: () => void;
  onOpenQuizModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onOpenLeadModal,
  onOpenQuizModal
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-brand-ivory via-brand-ivory to-white">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-brand-lavender/40 via-brand-coral/5 to-brand-lavender/30 blur-3xl pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-ivory-border shadow-subtle mb-6 animate-pulse-subtle">
            <span className="w-2 h-2 rounded-full bg-brand-coral" />
            <span className="text-xs font-bold tracking-widest text-brand-midnight uppercase">
              Brand Experience: Your Future is Not a Guess. It is a Journey.
            </span>
          </div>

          {/* Hero Headline with Editorial Display Typography */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-brand-midnight tracking-tight leading-[1.08] uppercase">
            YOUR AMBITION.
            <br />
            <span className="font-editorial italic font-normal lowercase tracking-normal text-brand-coral">
              meets its
            </span>{' '}
            DIRECTION.
          </h1>

          {/* Supporting Copy */}
          <p className="mt-6 text-lg sm:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed font-normal">
            Discover your strengths, build the right skills, and take your next step with career guidance designed around your aspirations.
          </p>

          {/* Primary & Secondary Call to Actions */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('discovery')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-white bg-brand-coral hover:bg-brand-coral-hover rounded-2xl shadow-lg hover:shadow-coral-glow transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Compass className="w-5 h-5" />
              <span>Discover My Path</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>

            <button
              onClick={() => scrollToSection('programs')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-semibold text-brand-midnight bg-white hover:bg-brand-ivory-dark border border-brand-ivory-border hover:border-brand-midnight/20 rounded-2xl shadow-subtle transition-all duration-200"
            >
              <BookOpen className="w-5 h-5 text-brand-muted" />
              <span>Explore Our Programs</span>
            </button>
          </div>

          {/* Compact, Honest Credibility Statement (Zero Fabrications) */}
          <div className="mt-10 pt-6 border-t border-brand-ivory-border/80 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-brand-muted">
            <div className="flex items-center gap-1.5 font-medium text-brand-midnight/90">
              <ShieldCheck className="w-4 h-4 text-brand-coral" />
              <span>Diagnostic-first advisory</span>
            </div>
            <span className="hidden sm:inline text-brand-ivory-border">•</span>
            <div className="flex items-center gap-1.5 font-medium text-brand-midnight/90">
              <CheckCircle2 className="w-4 h-4 text-brand-coral" />
              <span>Practitioner-led cohorts</span>
            </div>
            <span className="hidden sm:inline text-brand-ivory-border">•</span>
            <div className="flex items-center gap-1.5 font-medium text-brand-midnight/90">
              <CheckCircle2 className="w-4 h-4 text-brand-coral" />
              <span>Zero exaggerated rank or placement claims</span>
            </div>
          </div>
        </div>

        {/* Signature Visual: Interactive Future Pathway */}
        <FuturePathwayHero />
      </div>
    </section>
  );
};

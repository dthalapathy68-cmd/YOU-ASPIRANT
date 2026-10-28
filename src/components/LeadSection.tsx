import React from 'react';
import { Compass, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, MessageSquare, PhoneCall } from 'lucide-react';

interface LeadSectionProps {
  onOpenLeadModal: () => void;
  onOpenQuizModal: () => void;
}

export const LeadSection: React.FC<LeadSectionProps> = ({
  onOpenLeadModal,
  onOpenQuizModal,
}) => {
  return (
    <section className="py-20 lg:py-24 bg-brand-ivory relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-midnight via-brand-midnight-card to-brand-midnight text-brand-ivory rounded-3xl p-8 sm:p-12 lg:p-16 border border-brand-coral/30 shadow-floating relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-coral/15 blur-3xl rounded-full pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left 8 Cols */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-midnight-light border border-brand-midnight-card text-brand-coral text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next Strategic Action</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight uppercase">
                YOUR CAREER DESERVES
                <br />
                <span className="font-editorial italic font-normal lowercase text-brand-coral">
                  more than
                </span>{' '}
                UNINFORMED ADVICE.
              </h2>

              <p className="text-base sm:text-lg text-brand-ivory/80 max-w-2xl leading-relaxed">
                Book a 20-minute exploratory conversation with a senior You Aspirant mentor. We deconstruct your goals, evaluate baseline prerequisites, and outline a realistic milestone roadmap.
              </p>

              {/* Credibility micro-points */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-brand-ivory/70">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-coral" />
                  <span>Zero aggressive sales pitching</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-coral" />
                  <span>Objective diagnostic assessment</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-coral" />
                  <span>Personalized milestone blueprint</span>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: CTA Action Cards */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
              <button
                onClick={onOpenLeadModal}
                className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-coral hover:bg-brand-coral-hover text-white text-sm font-bold uppercase tracking-wider rounded-2xl shadow-lg hover:shadow-coral-glow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Compass className="w-5 h-5" />
                <span>Talk to a Career Guide</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenQuizModal}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-midnight-light hover:bg-brand-midnight border border-brand-midnight-card text-brand-ivory text-xs font-semibold rounded-2xl transition-all"
              >
                <Sparkles className="w-4 h-4 text-brand-coral" />
                <span>Take 60-Sec Readiness Check</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

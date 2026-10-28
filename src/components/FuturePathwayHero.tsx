import React, { useState } from 'react';
import { Compass, BookOpen, Target, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface MilestoneNode {
  id: string;
  stageNum: string;
  label: string;
  subtitle: string;
  actionText: string;
  description: string;
  xPercent: number;
  yPercent: number;
  cardOffset: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  icon: React.ElementType;
}

const MILESTONES: MilestoneNode[] = [
  {
    id: 'discover',
    stageNum: '01',
    label: 'Discover',
    subtitle: 'Aspiration & Diagnostic',
    actionText: 'Evaluate aptitudes & eliminate guesswork',
    description: 'Deconstruct strengths, curiosities, and realistic market opportunities before committing months of study.',
    xPercent: 12,
    yPercent: 68,
    cardOffset: 'top-right',
    icon: Compass,
  },
  {
    id: 'learn',
    stageNum: '02',
    label: 'Learn',
    subtitle: 'Practitioner Toolkits',
    actionText: 'Build modern proof-of-work',
    description: 'Live cohorts led by working industry professionals, focusing on real code, cases, and conceptual depth.',
    xPercent: 38,
    yPercent: 28,
    cardOffset: 'bottom-right',
    icon: BookOpen,
  },
  {
    id: 'prepare',
    stageNum: '03',
    label: 'Prepare',
    subtitle: 'Strategic Drills',
    actionText: 'Deconstruct hiring & exam filters',
    description: 'Video mock interviews, analytical Mains answer synthesis, and timing strategy under simulated pressure.',
    xPercent: 66,
    yPercent: 72,
    cardOffset: 'top-left',
    icon: Target,
  },
  {
    id: 'progress',
    stageNum: '04',
    label: 'Progress',
    subtitle: 'Confident Next Steps',
    actionText: 'Step into verified opportunity',
    description: 'Turn months of disciplined preparation into college placement offers, exam breakthroughs, or career transitions.',
    xPercent: 88,
    yPercent: 32,
    cardOffset: 'bottom-left',
    icon: Sparkles,
  },
];

export const FuturePathwayHero: React.FC = () => {
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>('discover');

  const activeMilestone = MILESTONES.find(m => m.id === activeMilestoneId) || MILESTONES[0];

  return (
    <div className="w-full relative mt-8 lg:mt-12">
      {/* Visual Header / Micro-controller */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-brand-ivory-border/70">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-coral animate-ping" />
          <span className="text-xs font-bold uppercase tracking-widest text-brand-midnight">
            The Interactive Future Pathway
          </span>
          <span className="text-xs text-brand-muted hidden sm:inline">— Select any milestone to inspect</span>
        </div>

        {/* Milestone Quick Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0" role="tablist" aria-label="Future Pathway Milestones">
          {MILESTONES.map((m) => {
            const isActive = m.id === activeMilestoneId;
            return (
              <button
                key={m.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveMilestoneId(m.id)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'bg-brand-midnight text-brand-ivory shadow-sm'
                    : 'bg-white/80 text-brand-muted hover:text-brand-midnight hover:bg-white border border-brand-ivory-border'
                }`}
              >
                <span className="font-mono text-[10px] text-brand-coral mr-1">{m.stageNum}</span>
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Visual Pathway (hidden on mobile, shown on lg+) */}
      <div className="hidden lg:block relative w-full h-[460px] bg-gradient-to-b from-white/90 via-brand-ivory/60 to-brand-lavender/30 rounded-3xl border border-brand-ivory-border/80 p-6 shadow-subtle overflow-hidden">
        {/* Subtle geometric background grid */}
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none" 
          style={{
            backgroundImage: 'radial-gradient(#140E28 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Dynamic Glow Spotlight centered near active milestone */}
        <div 
          className="absolute w-80 h-80 rounded-full bg-brand-coral/10 blur-3xl pointer-events-none transition-all duration-700 ease-out"
          style={{
            left: `${activeMilestone.xPercent - 15}%`,
            top: `${activeMilestone.yPercent - 25}%`
          }}
        />

        {/* SVG Pathway Track */}
        <svg 
          viewBox="0 0 1000 460" 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          fill="none" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#140E28" stopOpacity="0.25" />
              <stop offset="35%" stopColor="#FF5B37" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#7E57C2" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF5B37" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF5B37" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#FF5B37" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#140E28" stopOpacity="0.05" />
            </linearGradient>

            <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#140E28" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Wide ambient glow behind path */}
          <path
            d="M 120 310 C 240 310, 260 130, 380 130 C 510 130, 530 330, 660 330 C 780 330, 800 150, 880 150"
            stroke="url(#glowGradient)"
            strokeWidth="28"
            strokeLinecap="round"
          />

          {/* Soft background line */}
          <path
            d="M 120 310 C 240 310, 260 130, 380 130 C 510 130, 530 330, 660 330 C 780 330, 800 150, 880 150"
            stroke="#EAE4DC"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Animated Flowing Pathway Stroke */}
          <path
            d="M 120 310 C 240 310, 260 130, 380 130 C 510 130, 530 330, 660 330 C 780 330, 800 150, 880 150"
            stroke="url(#pathGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            className="pathway-flowing-stroke"
          />
        </svg>

        {/* Interactive Milestone Nodes on Desktop Canvas */}
        {MILESTONES.map((m) => {
          const isActive = m.id === activeMilestoneId;
          const Icon = m.icon;

          return (
            <div
              key={m.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${m.xPercent}%`, top: `${m.yPercent}%` }}
            >
              {/* Milestone Node Target Button */}
              <button
                onClick={() => setActiveMilestoneId(m.id)}
                className={`relative group p-1 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-coral ${
                  isActive ? 'scale-110 z-30' : 'hover:scale-105 z-20'
                }`}
                aria-label={`Milestone ${m.stageNum}: ${m.label}`}
                aria-pressed={isActive}
              >
                {/* Node Outer Ring */}
                <div 
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                    isActive 
                      ? 'bg-brand-midnight text-white border-brand-coral shadow-lg shadow-brand-coral/30' 
                      : 'bg-white text-brand-midnight border-brand-ivory-border shadow-md hover:border-brand-coral/60'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'text-brand-coral scale-110' : 'text-brand-midnight'}`} />
                </div>

                {/* Stage Number Floating Tag */}
                <span className={`absolute -top-1.5 -right-1.5 px-1.5 py-0.5 text-[9px] font-bold rounded-full font-mono transition-colors ${
                  isActive 
                    ? 'bg-brand-coral text-white' 
                    : 'bg-brand-midnight text-brand-ivory'
                }`}>
                  {m.stageNum}
                </span>

                {/* Ambient node pulse */}
                {isActive && (
                  <div className="absolute inset-0 rounded-full border border-brand-coral animate-ping opacity-35 pointer-events-none" />
                )}
              </button>

              {/* Milestone Card Positioned Relative to Node */}
              <div
                className={`absolute w-64 pointer-events-auto transition-all duration-300 z-20 ${
                  isActive ? 'opacity-100 scale-100' : 'opacity-75 hover:opacity-100 scale-95'
                } ${
                  m.cardOffset === 'top-right' ? 'left-16 bottom-2' :
                  m.cardOffset === 'bottom-right' ? 'left-16 top-4' :
                  m.cardOffset === 'top-left' ? 'right-16 bottom-2 text-right' :
                  'right-16 top-4 text-right'
                }`}
              >
                <div 
                  onClick={() => setActiveMilestoneId(m.id)}
                  className={`cursor-pointer p-3.5 rounded-2xl transition-all duration-300 backdrop-blur-sm border ${
                    isActive 
                      ? 'bg-white/95 border-brand-coral/40 shadow-elevated' 
                      : 'bg-white/80 border-brand-ivory-border/70 hover:bg-white'
                  }`}
                >
                  <div className={`flex items-center gap-1.5 mb-1 ${m.cardOffset.includes('left') ? 'justify-end' : ''}`}>
                    <span className="text-[10px] font-mono font-bold text-brand-coral uppercase tracking-wider">
                      Stage {m.stageNum}
                    </span>
                    <span className="text-brand-muted text-[10px]">•</span>
                    <span className="text-xs font-semibold text-brand-midnight">
                      {m.label}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-brand-midnight tracking-tight">
                    {m.subtitle}
                  </h4>
                  <p className="text-[11px] text-brand-muted leading-relaxed mt-1 line-clamp-2">
                    {m.actionText}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Bottom Inspection Banner inside Canvas */}
        <div className="absolute bottom-4 left-6 right-6 bg-brand-midnight/95 text-brand-ivory rounded-2xl px-5 py-3 flex items-center justify-between shadow-floating backdrop-blur-md border border-brand-coral/20">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-brand-coral text-white">
              {activeMilestone.stageNum}
            </span>
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider mr-2">
                {activeMilestone.label}:
              </span>
              <span className="text-xs text-brand-ivory/80">
                {activeMilestone.description}
              </span>
            </div>
          </div>
          <a
            href="#discovery"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-brand-coral hover:text-white transition-colors"
          >
            <span>Explore your own path</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Mobile Vertical Journey Layout (Optimized for small screens) */}
      <div className="lg:hidden space-y-4">
        <div className="relative pl-6 before:content-[''] before:absolute before:left-3 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-brand-coral before:via-brand-midnight before:to-brand-coral">
          {MILESTONES.map((m) => {
            const isActive = m.id === activeMilestoneId;
            const Icon = m.icon;

            return (
              <div 
                key={m.id} 
                className="relative mb-5 last:mb-0 cursor-pointer"
                onClick={() => setActiveMilestoneId(m.id)}
              >
                {/* Node indicator */}
                <div 
                  className={`absolute -left-6 top-3 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isActive 
                      ? 'bg-brand-coral text-white ring-4 ring-brand-coral/20' 
                      : 'bg-brand-midnight text-brand-ivory'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold">{m.stageNum}</span>
                </div>

                {/* Content Card */}
                <div className={`p-4 rounded-2xl transition-all border ${
                  isActive 
                    ? 'bg-white border-brand-coral/50 shadow-elevated' 
                    : 'bg-white/70 border-brand-ivory-border'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-brand-coral uppercase tracking-wider">
                      {m.label}
                    </span>
                    <Icon className="w-4 h-4 text-brand-muted" />
                  </div>
                  <h4 className="text-sm font-bold text-brand-midnight">
                    {m.subtitle}
                  </h4>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    {m.description}
                  </p>
                  <div className="mt-2 pt-2 border-t border-brand-ivory-border/60 flex items-center gap-1.5 text-[11px] font-medium text-brand-midnight/90">
                    <CheckCircle2 className="w-3 h-3 text-brand-coral" />
                    <span>{m.actionText}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useId } from 'react';
import { 
  CAREER_DOMAINS, 
  ACADEMIC_STAGES, 
  getCareerRecommendation 
} from '../data/careers';
import { AcademicStage, CareerDomainId } from '../types';
import { 
  Code2, 
  TrendingUp, 
  ShieldAlert, 
  Palette, 
  Briefcase, 
  ArrowRight, 
  RotateCcw, 
  Printer, 
  CheckCircle, 
  Sparkles,
  Info,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';

interface CareerDiscoveryProps {
  onOpenLeadWithPathway: (pathwayTitle: string, domainId: CareerDomainId, stage: AcademicStage) => void;
  onOpenBlueprintModal: (recommendation: ReturnType<typeof getCareerRecommendation>) => void;
}

export const CareerDiscovery: React.FC<CareerDiscoveryProps> = ({
  onOpenLeadWithPathway,
  onOpenBlueprintModal
}) => {
  const [selectedDomain, setSelectedDomain] = useState<CareerDomainId>('tech');
  const [selectedStage, setSelectedStage] = useState<AcademicStage>('undergrad');
  const [hasInteracted, setHasInteracted] = useState<boolean>(true);

  const recommendation = getCareerRecommendation(selectedDomain, selectedStage);
  const currentDomainInfo = CAREER_DOMAINS.find(d => d.id === selectedDomain) || CAREER_DOMAINS[0];

  const domainIcons: Record<CareerDomainId, React.ElementType> = {
    tech: Code2,
    business: TrendingUp,
    govt: ShieldAlert,
    creative: Palette,
    employability: Briefcase,
  };

  const handleReset = () => {
    setSelectedDomain('tech');
    setSelectedStage('undergrad');
  };

  return (
    <section id="discovery" className="py-20 lg:py-28 bg-white relative scroll-mt-20">
      {/* Subtle border separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-ivory-border to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lavender text-brand-midnight text-xs font-bold uppercase tracking-wider mb-4 border border-brand-lavender-border">
            <Sparkles className="w-3.5 h-3.5 text-brand-coral" />
            <span>Interactive Pathway Engine</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-midnight tracking-tight uppercase">
            YOU HAVE POTENTIAL.
            <br />
            <span className="font-editorial italic lowercase text-brand-coral font-normal">
              let’s find your
            </span>{' '}
            DIRECTION.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed font-normal">
            Select your primary area of curiosity and current academic stage below. Our curated exploratory engine provides immediate structured guidance without requiring sign-up.
          </p>
        </div>

        {/* Discovery Interactive Workspace */}
        <div className="bg-brand-ivory rounded-3xl border border-brand-ivory-border p-5 sm:p-8 lg:p-10 shadow-elevated">
          
          {/* STEP 1: Select Interest Domain */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold tracking-widest text-brand-coral uppercase">
                Step 01 — Choose Your Domain of Curiosity
              </span>
              <span className="text-xs text-brand-muted font-medium">
                {CAREER_DOMAINS.length} Primary Fields
              </span>
            </div>

            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3" 
              role="radiogroup" 
              aria-label="Career Interest Domain"
            >
              {CAREER_DOMAINS.map((domain) => {
                const isSelected = domain.id === selectedDomain;
                const Icon = domainIcons[domain.id];

                return (
                  <button
                    key={domain.id}
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => {
                      setSelectedDomain(domain.id);
                      setHasInteracted(true);
                    }}
                    className={`p-4 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between relative ${
                      isSelected
                        ? 'bg-brand-midnight text-brand-ivory border-brand-coral shadow-md ring-2 ring-brand-coral/20'
                        : 'bg-white hover:bg-white/90 text-brand-midnight border-brand-ivory-border hover:border-brand-coral/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-xl ${isSelected ? 'bg-brand-midnight-card text-brand-coral' : 'bg-brand-lavender text-brand-midnight'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-brand-coral text-white' : 'bg-brand-ivory-dark text-brand-muted'
                        }`}>
                          {domain.badge}
                        </span>
                      </div>
                      <h3 className={`text-sm font-bold tracking-tight ${isSelected ? 'text-white' : 'text-brand-midnight'}`}>
                        {domain.name}
                      </h3>
                      <p className={`text-xs mt-1.5 line-clamp-2 leading-relaxed ${isSelected ? 'text-brand-ivory/80' : 'text-brand-muted'}`}>
                        {domain.tagline}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-brand-ivory-border/30 flex items-center justify-between text-[11px] font-semibold">
                      <span className={isSelected ? 'text-brand-coral' : 'text-brand-muted'}>
                        {isSelected ? 'Active Selection' : 'Select Domain'}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-brand-coral' : 'text-brand-muted'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Select Academic Stage */}
          <div className="mb-10 pt-8 border-t border-brand-ivory-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold tracking-widest text-brand-coral uppercase">
                Step 02 — Select Your Current Stage
              </span>
              <span className="text-xs text-brand-muted font-medium">
                Tailors timeline & preparation rigor
              </span>
            </div>

            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" 
              role="radiogroup" 
              aria-label="Academic Stage"
            >
              {ACADEMIC_STAGES.map((stg) => {
                const isSelected = stg.id === selectedStage;

                return (
                  <button
                    key={stg.id}
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => {
                      setSelectedStage(stg.id);
                      setHasInteracted(true);
                    }}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-white border-brand-coral shadow-sm ring-2 ring-brand-coral/20'
                        : 'bg-white/60 hover:bg-white text-brand-midnight border-brand-ivory-border'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-brand-coral bg-brand-coral' : 'border-brand-muted'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="text-xs font-bold text-brand-midnight">
                        {stg.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-muted mt-1 pl-5.5 leading-snug">
                      {stg.hint}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC RESULTS ENGINE PANEL */}
          <div className="mt-8 pt-8 border-t border-brand-ivory-border bg-white rounded-2xl p-6 sm:p-8 border shadow-subtle">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-brand-ivory-border">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-coral uppercase tracking-wider mb-1">
                  <span>Exploratory Blueprint</span>
                  <span>•</span>
                  <span>Instant Tailored Analysis</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-brand-midnight tracking-tight">
                  {recommendation.title}
                </h3>
              </div>

              {/* Action buttons on top of result */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-brand-muted hover:text-brand-midnight bg-brand-ivory rounded-lg border border-brand-ivory-border transition-colors"
                  title="Reset selections to default"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={() => onOpenBlueprintModal(recommendation)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-brand-midnight hover:text-brand-coral bg-brand-lavender/60 hover:bg-brand-lavender rounded-lg border border-brand-lavender-border transition-colors"
                  title="Print or view full blueprint summary"
                >
                  <Printer className="w-3.5 h-3.5 text-brand-coral" />
                  <span>View / Print Blueprint</span>
                </button>
              </div>
            </div>

            {/* Overview statement */}
            <p className="text-sm sm:text-base text-brand-midnight/80 leading-relaxed mt-5">
              {recommendation.overview}
            </p>

            {/* Two Column Breakdown: Skill Pillars & 4-Phase Roadmap */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              
              {/* Core Skill Pillars */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-midnight">
                  <Layers className="w-4 h-4 text-brand-coral" />
                  <span>Three Core Skill Pillars to Build</span>
                </div>

                <div className="space-y-3">
                  {recommendation.skillPillars.map((pillar, idx) => (
                    <div 
                      key={pillar.name} 
                      className="p-3.5 rounded-xl bg-brand-ivory/60 border border-brand-ivory-border flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-lg bg-brand-midnight text-white text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-brand-midnight">
                          {pillar.name}
                        </h4>
                        <p className="text-xs text-brand-muted mt-0.5 leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Roadmap Phases */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-midnight">
                  <Calendar className="w-4 h-4 text-brand-coral" />
                  <span>Suggested Preparation Trajectory</span>
                </div>

                <div className="relative pl-5 before:content-[''] before:absolute before:left-2 before:top-3 before:bottom-3 before:w-0.5 before:bg-brand-lavender-border space-y-3">
                  {recommendation.roadmapPhases.map((phase) => (
                    <div key={phase.phase} className="relative">
                      <div className="absolute -left-5 top-1.5 w-2.5 h-2.5 rounded-full bg-brand-coral ring-4 ring-white" />
                      <div className="p-3 rounded-xl bg-brand-ivory/40 border border-brand-ivory-border/70">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold text-brand-coral">
                            {phase.phase}
                          </span>
                          <span className="text-xs font-bold text-brand-midnight">
                            {phase.title}
                          </span>
                        </div>
                        <p className="text-xs text-brand-muted mt-1">
                          {phase.focus}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Programs Pill */}
            <div className="mt-8 pt-6 border-t border-brand-ivory-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-brand-muted font-medium block">
                  Aligned You Aspirant Training Cohorts:
                </span>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  {recommendation.recommendedPrograms.map((prog) => (
                    <span 
                      key={prog} 
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-lavender text-brand-midnight border border-brand-lavender-border"
                    >
                      {prog}
                    </span>
                  ))}
                </div>
              </div>

              {/* Primary Next Action CTA */}
              <button
                onClick={() => onOpenLeadWithPathway(recommendation.title, selectedDomain, selectedStage)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-brand-coral hover:bg-brand-coral-hover rounded-xl shadow-md hover:shadow-coral-glow transition-all shrink-0"
              >
                <span>Discuss This Path with a Mentor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Transparent Guidance Disclaimer (No AI Hype, No Guarantees) */}
            <div className="mt-6 p-3.5 rounded-xl bg-brand-ivory/80 border border-brand-ivory-border flex items-start gap-2.5 text-xs text-brand-muted">
              <Info className="w-4 h-4 text-brand-coral shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-brand-midnight font-semibold">Exploratory Guidance Note:</strong> Suggestions above represent structured curriculum archetypes based on industry standards, not a guaranteed career prediction or automated placement promise. All cohorts require sustained effort, intellectual discipline, and independent practice.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

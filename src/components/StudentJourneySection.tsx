import React, { useState } from 'react';
import { Compass, Calendar, Code, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface JourneyStep {
  step: string;
  title: string;
  tagline: string;
  purpose: string;
  keyDeliverables: string[];
  studentCheckpoint: string;
  mentorInvolvement: string;
  icon: React.ElementType;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    step: '01',
    title: 'Discover',
    tagline: 'Understand interests, goals, and viable career horizons.',
    purpose: 'Eliminate guesswork early. Instead of jumping into popular trends, we diagnose your innate cognitive habits, analytical inclinations, and authentic curiosities.',
    keyDeliverables: [
      'Comprehensive 1-on-1 Aspiration Diagnostic',
      'Realistic mapping of 2–3 suitable career pathways',
      'Evaluation of academic prerequisites and baseline readiness'
    ],
    studentCheckpoint: 'Clear consensus on target pathway before enrolling in any technical or entrance preparation.',
    mentorInvolvement: '1-on-1 discovery interview with senior advisory mentor.',
    icon: Compass,
  },
  {
    step: '02',
    title: 'Plan',
    tagline: 'Identify relevant preparation priorities and milestones.',
    purpose: 'Ambition without a schedule leads to burnout. We break multi-year objectives into quarterly targets, weekly study blocks, and clear proof-of-work goals.',
    keyDeliverables: [
      'Personalized 12-to-24 week learning schedule',
      'Curated reading list and official syllabus deconstruction',
      'Risk assessment: identifying subject blind spots early'
    ],
    studentCheckpoint: 'A structured weekly calendar balancing college commitments with focused training hours.',
    mentorInvolvement: 'Milestone roadmap calibration and benchmark setting.',
    icon: Calendar,
  },
  {
    step: '03',
    title: 'Develop',
    tagline: 'Build production-grade skills and rigorous conceptual depth.',
    purpose: 'Move beyond passive video lectures. Engage in live practitioner cohorts where you build real software repos, deconstruct real business models, or write timed answers.',
    keyDeliverables: [
      'Live masterclasses and weekly interactive code/case labs',
      'Rigorous peer and mentor review cycles with written rubrics',
      'Creation of 2 substantial portfolio case studies'
    ],
    studentCheckpoint: 'Proof of work: functional github repositories, design systems, or evaluated answer banks.',
    mentorInvolvement: 'Weekly code/essay reviews and live Q&A critique sessions.',
    icon: Code,
  },
  {
    step: '04',
    title: 'Progress',
    tagline: 'Take informed, confident steps toward real opportunities.',
    purpose: 'Deconstruct hiring and entrance filters. Convert your months of preparation into polished interview performance, ATS-cleared resumes, and poised executive articulation.',
    keyDeliverables: [
      'Single-page ATS-optimized engineering/analyst resume',
      'Recorded 1-on-1 video mock interviews with performance debriefs',
      'Strategic guidance on off-campus hiring cycles and exam day composure'
    ],
    studentCheckpoint: 'Complete interview readiness and verified poise under high-pressure selection panels.',
    mentorInvolvement: 'Panel mock interview simulations and post-round debriefs.',
    icon: Sparkles,
  },
];

interface StudentJourneySectionProps {
  onStartJourney: () => void;
}

export const StudentJourneySection: React.FC<StudentJourneySectionProps> = ({ onStartJourney }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const currentStep = JOURNEY_STEPS[activeStepIndex];

  return (
    <section id="journey" className="py-20 lg:py-28 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lavender text-brand-midnight text-xs font-bold uppercase tracking-wider mb-4 border border-brand-lavender-border">
            <span className="w-2 h-2 rounded-full bg-brand-coral" />
            <span>The 4-Stage Learning Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-midnight tracking-tight uppercase">
            HOW WE WALK WITH YOU
            <br />
            <span className="font-editorial italic lowercase text-brand-coral font-normal">
              from uncertainty to
            </span>{' '}
            PROGRESS.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed font-normal">
            Every successful student follows a predictable progression. Our framework safeguards your time by ensuring you never begin preparation before establishing clarity.
          </p>
        </div>

        {/* Future Pathway Stage Stepper Navigation */}
        <div className="relative mb-12">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-8 right-8 h-1 bg-brand-ivory-border -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {JOURNEY_STEPS.map((step, idx) => {
              const isSelected = idx === activeStepIndex;
              const isPassed = idx < activeStepIndex;
              const Icon = step.icon;

              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-brand-midnight text-brand-ivory border-brand-coral shadow-elevated ring-2 ring-brand-coral/20'
                      : isPassed
                      ? 'bg-brand-lavender/40 hover:bg-brand-lavender text-brand-midnight border-brand-lavender-border'
                      : 'bg-white hover:bg-brand-ivory text-brand-midnight border-brand-ivory-border'
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-brand-coral text-white' : 'bg-brand-ivory-dark text-brand-muted'
                    }`}>
                      Stage {step.step}
                    </span>
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-coral' : 'text-brand-muted'}`} />
                  </div>
                  <h3 className={`text-base font-bold tracking-tight ${isSelected ? 'text-white' : 'text-brand-midnight'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-xs mt-1 line-clamp-1 ${isSelected ? 'text-brand-ivory/80' : 'text-brand-muted'}`}>
                    {step.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage Active Inspection Canvas */}
        <div className="bg-brand-ivory rounded-3xl border border-brand-ivory-border p-6 sm:p-10 shadow-subtle">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Purpose & Key Deliverables */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-coral uppercase tracking-wider mb-2">
                  <span>Detailed Stage Breakdown</span>
                  <span>•</span>
                  <span>Phase {currentStep.step} of 04</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-midnight tracking-tight">
                  {currentStep.title} — {currentStep.tagline}
                </h3>
                <p className="text-sm sm:text-base text-brand-midnight/80 mt-3 leading-relaxed">
                  {currentStep.purpose}
                </p>
              </div>

              {/* Key Deliverables */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-midnight">
                  What Gets Built / Completed In This Stage:
                </h4>
                <div className="space-y-2.5">
                  {currentStep.keyDeliverables.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-brand-ivory-border">
                      <div className="w-5 h-5 rounded-full bg-brand-coral/10 text-brand-coral flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm text-brand-midnight font-medium leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Checkpoint, Mentor Role & Next Button */}
            <div className="lg:col-span-5 space-y-4">
              {/* Student Checkpoint Card */}
              <div className="p-5 rounded-2xl bg-white border border-brand-ivory-border space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-midnight">
                  <ShieldCheck className="w-4 h-4 text-brand-coral" />
                  <span>Student Readiness Checkpoint</span>
                </div>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {currentStep.studentCheckpoint}
                </p>
              </div>

              {/* Mentor Involvement */}
              <div className="p-5 rounded-2xl bg-brand-lavender/50 border border-brand-lavender-border space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-midnight block">
                  Mentor Responsibility
                </span>
                <p className="text-xs text-brand-midnight/80 leading-relaxed">
                  {currentStep.mentorInvolvement}
                </p>
              </div>

              {/* Next Stage Navigation / CTA */}
              <div className="pt-2 flex items-center gap-3">
                {activeStepIndex < JOURNEY_STEPS.length - 1 ? (
                  <button
                    onClick={() => setActiveStepIndex(prev => prev + 1)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-midnight hover:bg-brand-midnight-card text-brand-ivory font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
                  >
                    <span>Inspect Next Stage: {JOURNEY_STEPS[activeStepIndex + 1].title}</span>
                    <ArrowRight className="w-4 h-4 text-brand-coral" />
                  </button>
                ) : (
                  <button
                    onClick={onStartJourney}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-coral hover:bg-brand-coral-hover text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-coral-glow"
                  >
                    <span>Begin Your Own Journey</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

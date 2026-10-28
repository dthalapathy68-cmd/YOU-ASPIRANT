import React, { useState } from 'react';
import { TRAINING_PROGRAMS } from '../data/programs';
import { CareerDomainId, TrainingProgram } from '../types';
import { ProgramDetailModal } from './ProgramDetailModal';
import { 
  Clock, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Layers,
  Filter
} from 'lucide-react';

interface ProgramsSectionProps {
  onApplyProgram: (programTitle: string) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onApplyProgram }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | CareerDomainId>('all');
  const [activeModalProgram, setActiveModalProgram] = useState<TrainingProgram | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Programs' },
    { id: 'tech', label: 'Technology' },
    { id: 'govt', label: 'Civil & Banking' },
    { id: 'business', label: 'Product & Strategy' },
    { id: 'creative', label: 'UI/UX Design' },
    { id: 'employability', label: 'Campus Placement' },
  ];

  const filteredPrograms = selectedFilter === 'all'
    ? TRAINING_PROGRAMS
    : TRAINING_PROGRAMS.filter(p => p.domain === selectedFilter);

  return (
    <section id="programs" className="py-20 lg:py-28 bg-brand-ivory relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-brand-ivory-border shadow-subtle text-brand-midnight text-xs font-bold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5 text-brand-coral" />
            <span>Curriculum & Cohorts</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-midnight tracking-tight uppercase">
            FLAGSHIP TRAINING
            <br />
            <span className="font-editorial italic lowercase text-brand-coral font-normal">
              designed for
            </span>{' '}
            TANGIBLE OUTCOMES.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed font-normal">
            Every cohort is limited in size to ensure continuous code reviews, portfolio critique, and personalized mentor debriefs.
          </p>

          {/* Filter Bar */}
          <div className="mt-8 flex items-center justify-center gap-1.5 flex-wrap">
            {filterTabs.map((tab) => {
              const isActive = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-midnight text-white shadow-sm'
                      : 'bg-white hover:bg-brand-ivory-dark text-brand-muted hover:text-brand-midnight border border-brand-ivory-border'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-ivory-border hover:border-brand-coral/40 shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Program Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-brand-coral uppercase px-2.5 py-1 rounded-full bg-brand-coral-soft">
                    {program.badge}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-brand-muted">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{program.duration.split('(')[0].trim()}</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-bold text-brand-midnight tracking-tight mb-2 group-hover:text-brand-coral transition-colors">
                  {program.title}
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed mb-5">
                  {program.tagline}
                </p>

                {/* Meta details */}
                <div className="space-y-2 mb-6 p-3.5 rounded-xl bg-brand-ivory/60 border border-brand-ivory-border/70 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-brand-muted font-medium">Format:</span>
                    <span className="text-brand-midnight font-semibold truncate max-w-[180px]">{program.format}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-muted font-medium">Level:</span>
                    <span className="text-brand-midnight font-semibold">{program.targetStage}</span>
                  </div>
                </div>

                {/* Key Outcomes preview */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-midnight block">
                    Key Outcomes:
                  </span>
                  {program.keyOutcomes.slice(0, 2).map((outcome) => (
                    <div key={outcome} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-coral mt-0.5 shrink-0" />
                      <span className="text-xs text-brand-midnight/80 leading-snug">
                        {outcome}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-5 border-t border-brand-ivory-border flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveModalProgram(program)}
                  className="text-xs font-bold text-brand-midnight hover:text-brand-coral transition-colors flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Inspect Syllabus</span>
                </button>

                <button
                  onClick={() => onApplyProgram(program.title)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-midnight hover:bg-brand-coral text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                >
                  <span>Apply Cohort</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Program Detail Modal */}
      <ProgramDetailModal
        isOpen={!!activeModalProgram}
        onClose={() => setActiveModalProgram(null)}
        program={activeModalProgram}
        onApply={(title) => {
          setActiveModalProgram(null);
          onApplyProgram(title);
        }}
      />
    </section>
  );
};

import React from 'react';
import { X, CheckCircle, Clock, Calendar, Users, ArrowRight, ShieldCheck, BookOpen } from 'lucide-react';
import { TrainingProgram } from '../types';

interface ProgramDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: TrainingProgram | null;
  onApply: (programTitle: string) => void;
}

export const ProgramDetailModal: React.FC<ProgramDetailModalProps> = ({
  isOpen,
  onClose,
  program,
  onApply
}) => {
  if (!isOpen || !program) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-brand-midnight/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="program-modal-title"
    >
      <div 
        className="bg-brand-ivory w-full max-w-3xl rounded-3xl border border-brand-ivory-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-brand-midnight text-brand-ivory px-6 py-5 flex items-start justify-between border-b border-brand-midnight-card">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-bold tracking-widest text-brand-coral uppercase px-2.5 py-0.5 rounded bg-brand-midnight-card">
                {program.badge}
              </span>
              <span className="text-xs text-brand-ivory/70">
                {program.duration}
              </span>
            </div>
            <h3 id="program-modal-title" className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {program.title}
            </h3>
            <p className="text-xs text-brand-ivory/80 mt-1">
              {program.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-brand-muted-dark hover:text-white hover:bg-brand-midnight-card transition-colors shrink-0"
            aria-label="Close Program Details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Executive Summary */}
          <div className="p-4 rounded-2xl bg-white border border-brand-ivory-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-midnight mb-1">
              Program Summary
            </h4>
            <p className="text-xs sm:text-sm text-brand-midnight/80 leading-relaxed">
              {program.summary}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-brand-lavender/50 border border-brand-lavender-border">
              <span className="text-[11px] font-mono text-brand-coral font-bold block mb-0.5">FORMAT</span>
              <span className="text-xs font-bold text-brand-midnight">{program.format}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-brand-lavender/50 border border-brand-lavender-border">
              <span className="text-[11px] font-mono text-brand-coral font-bold block mb-0.5">TARGET LEVEL</span>
              <span className="text-xs font-bold text-brand-midnight">{program.targetStage}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-brand-lavender/50 border border-brand-lavender-border">
              <span className="text-[11px] font-mono text-brand-coral font-bold block mb-0.5">ADMISSIONS</span>
              <span className="text-xs font-bold text-brand-midnight">{program.seatsNote}</span>
            </div>
          </div>

          {/* Detailed Module Breakdown */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-midnight mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-coral" />
              <span>Modular Curriculum & Syllabus Breakdown</span>
            </h4>
            <div className="space-y-3">
              {program.modules.map((mod) => (
                <div key={mod.week} className="p-3.5 rounded-xl bg-white border border-brand-ivory-border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold text-brand-coral">
                      {mod.week}
                    </span>
                    <span className="text-xs font-bold text-brand-midnight">
                      {mod.topic}
                    </span>
                  </div>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {mod.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tangible Outcomes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-midnight mb-2">
              Verified Learning Outcomes
            </h4>
            <div className="space-y-2">
              {program.keyOutcomes.map((outcome) => (
                <div key={outcome} className="flex items-start gap-2.5 text-xs text-brand-midnight/90 bg-white p-3 rounded-xl border border-brand-ivory-border">
                  <CheckCircle className="w-4 h-4 text-brand-coral shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prerequisites & Mentor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-brand-ivory-border">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-midnight block mb-1">
                Prerequisites
              </span>
              <p className="text-xs text-brand-muted leading-relaxed">
                {program.prerequisites}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-brand-ivory-border">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-midnight block mb-1">
                Faculty & Mentor Profile
              </span>
              <p className="text-xs text-brand-muted leading-relaxed">
                {program.mentorProfile}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-brand-ivory-dark px-6 py-4 border-t border-brand-ivory-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-brand-muted">
            Admissions require a 15-minute diagnostic fit discussion.
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 text-xs font-semibold text-brand-midnight bg-white rounded-xl border border-brand-ivory-border hover:bg-brand-ivory"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onApply(program.title);
              }}
              className="w-1/2 sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-brand-coral hover:bg-brand-coral-hover rounded-xl shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Apply for Next Cohort</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

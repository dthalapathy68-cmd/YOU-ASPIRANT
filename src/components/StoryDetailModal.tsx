import React from 'react';
import { X, CheckCircle2, ShieldCheck, Quote } from 'lucide-react';
import { TestimonialStory } from '../types';

interface StoryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: TestimonialStory | null;
}

export const StoryDetailModal: React.FC<StoryDetailModalProps> = ({
  isOpen,
  onClose,
  story
}) => {
  if (!isOpen || !story) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-brand-midnight/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="story-modal-title"
    >
      <div 
        className="bg-brand-ivory w-full max-w-2xl rounded-3xl border border-brand-ivory-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-brand-midnight text-brand-ivory px-6 py-5 flex items-start justify-between border-b border-brand-midnight-card">
          <div className="flex items-center gap-3">
            <img 
              src={story.avatarUrl} 
              alt={story.studentName} 
              className="w-12 h-12 rounded-full object-cover border-2 border-brand-coral"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 id="story-modal-title" className="text-lg font-bold text-white">
                  {story.studentName}
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-coral text-white">
                  {story.verificationBadge}
                </span>
              </div>
              <p className="text-xs text-brand-ivory/70 mt-0.5">
                {story.academicBackground}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-brand-muted-dark hover:text-white hover:bg-brand-midnight-card transition-colors shrink-0"
            aria-label="Close Story"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Story Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Quote Banner */}
          <div className="p-5 rounded-2xl bg-white border border-brand-ivory-border relative">
            <Quote className="w-8 h-8 text-brand-coral/20 absolute top-3 right-4" />
            <p className="text-sm sm:text-base font-editorial italic text-brand-midnight leading-relaxed relative z-10">
              "{story.quote}"
            </p>
          </div>

          {/* Program & Milestone Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-brand-lavender/50 border border-brand-lavender-border">
              <span className="text-[10px] font-mono font-bold text-brand-coral uppercase block mb-1">
                ENROLLED COHORT
              </span>
              <span className="text-xs font-bold text-brand-midnight block">
                {story.verifiedProgram}
              </span>
              <span className="text-[11px] text-brand-muted">{story.cohortYear}</span>
            </div>

            <div className="p-4 rounded-xl bg-brand-coral-soft/60 border border-brand-coral/20">
              <span className="text-[10px] font-mono font-bold text-brand-coral uppercase block mb-1">
                VERIFIED MILESTONE
              </span>
              <span className="text-xs font-bold text-brand-midnight leading-tight block">
                {story.verifiedMilestone}
              </span>
            </div>
          </div>

          {/* Full Narrative */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-midnight mb-2">
              The Journey Narrative
            </h4>
            <p className="text-sm text-brand-midnight/80 leading-relaxed bg-white p-5 rounded-2xl border border-brand-ivory-border">
              {story.fullNarrative}
            </p>
          </div>

          {/* Transparent Social Proof Disclaimer */}
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-brand-ivory border border-brand-ivory-border text-xs text-brand-muted">
            <ShieldCheck className="w-4 h-4 text-brand-coral shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Individual Effort Notice:</strong> Student testimonials represent individual achievements driven by consistent student effort. You Aspirant provides structured curriculum and mentorship; we do not promise guaranteed jobs, exam ranks, or admissions.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-brand-ivory-dark px-6 py-4 border-t border-brand-ivory-border flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-brand-midnight bg-white rounded-xl border border-brand-ivory-border hover:bg-brand-ivory"
          >
            Close Story
          </button>
        </div>
      </div>
    </div>
  );
};

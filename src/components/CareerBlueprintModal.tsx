import React from 'react';
import { X, Printer, Compass, CheckCircle2, Calendar, Layers, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { CareerRecommendation } from '../types';

interface CareerBlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  recommendation: CareerRecommendation | null;
  onDiscussWithMentor: () => void;
}

export const CareerBlueprintModal: React.FC<CareerBlueprintModalProps> = ({
  isOpen,
  onClose,
  recommendation,
  onDiscussWithMentor
}) => {
  if (!isOpen || !recommendation) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-brand-midnight/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="blueprint-title"
    >
      <div 
        className="bg-brand-ivory w-full max-w-3xl rounded-3xl border border-brand-ivory-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar */}
        <div className="bg-brand-midnight text-brand-ivory px-6 py-4 flex items-center justify-between border-b border-brand-midnight-card">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-brand-coral" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Official Career Journey Blueprint
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-midnight-card hover:bg-brand-midnight-light text-xs font-semibold text-brand-ivory transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-brand-coral" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-brand-muted-dark hover:text-white hover:bg-brand-midnight-card transition-colors"
              aria-label="Close Blueprint Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Blueprint Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto" id="printable-blueprint">
          {/* Header with Brand Logo & Date */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-ivory-border">
            <BrandLogo size="md" />
            <div className="text-right text-xs text-brand-muted">
              <p className="font-mono font-semibold text-brand-midnight">Document: YA-BP-{Math.floor(100000 + Math.random() * 900000)}</p>
              <p>Issued: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>

          {/* Blueprint Title */}
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-coral block mb-1">
              Personalized Trajectory Framework
            </span>
            <h2 id="blueprint-title" className="text-2xl sm:text-3xl font-extrabold text-brand-midnight tracking-tight">
              {recommendation.title}
            </h2>
            <p className="text-sm text-brand-muted mt-2 leading-relaxed">
              {recommendation.overview}
            </p>
          </div>

          {/* Core Skill Pillars */}
          <div className="p-5 rounded-2xl bg-white border border-brand-ivory-border space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-midnight">
              <Layers className="w-4 h-4 text-brand-coral" />
              <span>Recommended Core Skill Pillars</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {recommendation.skillPillars.map((p, idx) => (
                <div key={p.name} className="p-3 rounded-xl bg-brand-ivory/50 border border-brand-ivory-border/60">
                  <span className="text-xs font-mono font-bold text-brand-coral block mb-1">
                    0{idx + 1}
                  </span>
                  <h4 className="text-xs font-bold text-brand-midnight">{p.name}</h4>
                  <p className="text-[11px] text-brand-muted mt-1 leading-normal">{p.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Timeline */}
          <div className="p-5 rounded-2xl bg-white border border-brand-ivory-border space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-midnight">
              <Calendar className="w-4 h-4 text-brand-coral" />
              <span>Phased Milestone Timeline</span>
            </div>
            <div className="space-y-2 pt-1">
              {recommendation.roadmapPhases.map((phase) => (
                <div key={phase.phase} className="flex items-start gap-3 p-2.5 rounded-lg bg-brand-ivory/40">
                  <span className="text-xs font-mono font-bold text-brand-coral shrink-0 w-24">
                    {phase.phase}
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-brand-midnight">{phase.title}</h5>
                    <p className="text-xs text-brand-muted mt-0.5">{phase.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Recommended Actions */}
          <div className="p-4 rounded-xl bg-brand-lavender/60 border border-brand-lavender-border flex items-start gap-3 text-xs text-brand-midnight">
            <Sparkles className="w-4 h-4 text-brand-coral shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Next Strategic Milestone: </strong>
              <span>{recommendation.suggestedAction}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-brand-ivory-dark px-6 py-4 border-t border-brand-ivory-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-brand-muted">
            Valid for discussion with an official You Aspirant mentor.
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 text-xs font-semibold text-brand-midnight bg-white rounded-xl border border-brand-ivory-border hover:bg-brand-ivory transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onDiscussWithMentor();
              }}
              className="w-1/2 sm:w-auto px-5 py-2 text-xs font-bold text-white bg-brand-coral hover:bg-brand-coral-hover rounded-xl shadow-sm transition-all"
            >
              Discuss With Mentor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

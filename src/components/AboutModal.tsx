import React from 'react';
import { X, Compass, ShieldCheck, Heart, Users, Target, BookOpen } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTalkToMentor: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onTalkToMentor
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-brand-midnight/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <div 
        className="bg-brand-ivory w-full max-w-3xl rounded-3xl border border-brand-ivory-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-brand-midnight text-brand-ivory px-6 py-5 flex items-start justify-between border-b border-brand-midnight-card">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-brand-coral uppercase px-2 py-0.5 rounded bg-brand-midnight-card">
              Our Ethos & Origin
            </span>
            <h3 id="about-modal-title" className="text-xl sm:text-2xl font-extrabold text-white mt-1.5 tracking-tight">
              About You Aspirant
            </h3>
            <p className="text-xs text-brand-ivory/80 mt-1">
              Your future is not a guess. It is a journey.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-brand-muted-dark hover:text-white hover:bg-brand-midnight-card transition-colors shrink-0"
            aria-label="Close About Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Mission Narrative */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-coral font-mono">
              The Mission
            </h4>
            <p className="text-sm sm:text-base text-brand-midnight leading-relaxed font-editorial italic">
              "We founded You Aspirant to dismantle the anxiety, herd mentality, and deceptive sales promises that plague student career discovery in India."
            </p>
            <p className="text-xs sm:text-sm text-brand-midnight/80 leading-relaxed">
              Every year, millions of students enter college streams, coaching centers, or training programs simply because of social momentum. Months later, they realize the curriculum does not align with their cognitive strengths, leaving them disillusioned and financially drained.
            </p>
            <p className="text-xs sm:text-sm text-brand-midnight/80 leading-relaxed">
              You Aspirant was built to provide an evidence-based alternative: a student-first guidance ecosystem connecting personalized diagnostics, practitioner-led training cohorts, and rigorous interview readiness.
            </p>
          </div>

          {/* Three Core Guiding Principles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-white border border-brand-ivory-border">
              <Compass className="w-5 h-5 text-brand-coral mb-2" />
              <h5 className="text-xs font-bold text-brand-midnight mb-1">Clarity Precedes Action</h5>
              <p className="text-[11px] text-brand-muted leading-relaxed">
                Never study for an exam or tech stack simply because someone else did. Diagnose first.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-brand-ivory-border">
              <Users className="w-5 h-5 text-brand-coral mb-2" />
              <h5 className="text-xs font-bold text-brand-midnight mb-1">Practitioner Mentorship</h5>
              <p className="text-[11px] text-brand-muted leading-relaxed">
                Learn from engineers, designers, and policy thinkers who work in the actual field.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-brand-ivory-border">
              <ShieldCheck className="w-5 h-5 text-brand-coral mb-2" />
              <h5 className="text-xs font-bold text-brand-midnight mb-1">Total Integrity</h5>
              <p className="text-[11px] text-brand-muted leading-relaxed">
                Zero fake rank claims, no exaggerated placement percentages, and absolute transparency.
              </p>
            </div>
          </div>

          {/* Transparent Contact Placeholders */}
          <div className="p-4 rounded-2xl bg-brand-lavender/50 border border-brand-lavender-border text-xs text-brand-midnight space-y-1.5">
            <span className="font-bold block uppercase tracking-wider text-[10px] text-brand-coral font-mono">
              Corporate & Advisory Headquarters [Verified Placeholder]
            </span>
            <p><strong>Registered Office:</strong> You Aspirant Career Guidance & Training Pvt. Ltd.</p>
            <p><strong>Physical Address:</strong> Tech Hub Towers, 4th Floor, Outer Ring Road, Bengaluru, Karnataka 560103, India [Official Sample Location]</p>
            <p><strong>Support & Advisory Helpline:</strong> +91 (0) 80 4000 0000 | advisory@youaspirant.com</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-brand-ivory-dark px-6 py-4 border-t border-brand-ivory-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-brand-muted">
            Ready to explore your personal Future Pathway?
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 text-xs font-semibold text-brand-midnight bg-white rounded-xl border border-brand-ivory-border hover:bg-brand-ivory"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onTalkToMentor();
              }}
              className="w-1/2 sm:w-auto px-5 py-2 text-xs font-bold text-white bg-brand-coral hover:bg-brand-coral-hover rounded-xl shadow-sm"
            >
              Talk to a Career Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

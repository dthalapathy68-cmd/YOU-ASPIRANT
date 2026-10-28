import React from 'react';
import { X, ShieldCheck, Lock, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  type
}) => {
  if (!isOpen) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-brand-midnight/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div 
        className="bg-brand-ivory w-full max-w-2xl rounded-3xl border border-brand-ivory-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-brand-midnight text-brand-ivory px-6 py-5 flex items-start justify-between border-b border-brand-midnight-card">
          <div className="flex items-center gap-2.5">
            {isPrivacy ? <Lock className="w-5 h-5 text-brand-coral" /> : <FileText className="w-5 h-5 text-brand-coral" />}
            <div>
              <h3 id="legal-modal-title" className="text-lg font-bold text-white">
                {isPrivacy ? 'Privacy Policy & Student Data Charter' : 'Terms of Guidance & Code of Conduct'}
              </h3>
              <p className="text-xs text-brand-ivory/70 mt-0.5">
                Effective: January 2026 • You Aspirant Career Guidance
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-brand-muted-dark hover:text-white hover:bg-brand-midnight-card transition-colors shrink-0"
            aria-label="Close Legal Document"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Document Content */}
        <div className="p-6 sm:p-8 space-y-4 max-h-[70vh] overflow-y-auto text-xs sm:text-sm text-brand-midnight/80 leading-relaxed">
          {isPrivacy ? (
            <>
              <div className="p-3.5 rounded-xl bg-white border border-brand-ivory-border">
                <h4 className="font-bold text-brand-midnight mb-1">1. Student Information Collection</h4>
                <p>We collect basic contact details (full name, email, phone number, and current academic stage) exclusively to schedule career diagnostic conversations and facilitate cohort learning. We never sell, lease, or monetize student contact records.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-brand-ivory-border">
                <h4 className="font-bold text-brand-midnight mb-1">2. Zero Tele-Marketing Spam</h4>
                <p>We do not use aggressive third-party call centers or robocalls. Any contact is initiated solely by authorized You Aspirant mentors for scheduled 1-on-1 consultations.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-brand-ivory-border">
                <h4 className="font-bold text-brand-midnight mb-1">3. Confidentiality of Code & Submissions</h4>
                <p>All student code repositories, design portfolios, and written diagnostic submissions remain 100% the intellectual property of the student. We do not claim ownership over any student work.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-brand-ivory-border">
                <h4 className="font-bold text-brand-midnight mb-1">4. Right to Erasure</h4>
                <p>Students may request permanent deletion of their diagnostic profiles and contact history at any time by emailing privacy@youaspirant.com.</p>
              </div>
            </>
          ) : (
            <>
              <div className="p-3.5 rounded-xl bg-white border border-brand-ivory-border">
                <h4 className="font-bold text-brand-midnight mb-1">1. Educational & Exploratory Nature</h4>
                <p>You Aspirant provides diagnostic career guidance, practical skill cohorts, and interview preparation. Our suggestions are exploratory and intended to help students make informed decisions; they do not constitute a guaranteed placement or examination rank.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-brand-ivory-border">
                <h4 className="font-bold text-brand-midnight mb-1">2. Student Commitment & Attendance</h4>
                <p>Practical competence requires active participation. Students are expected to complete weekly code reviews, analytical answer submissions, and respect fellow cohort peers.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-brand-ivory-border">
                <h4 className="font-bold text-brand-midnight mb-1">3. Track Transfer Policy</h4>
                <p>If within the first 14 days of cohort commencement a student and mentor agree that another pathway better fits the student’s aptitude, an internal transfer can be requested without forfeiture of fees, subject to prerequisite alignment.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-brand-ivory-border">
                <h4 className="font-bold text-brand-midnight mb-1">4. Code of Conduct</h4>
                <p>Plagiarism, harassment, or disrespectful behavior toward instructors or peers will result in immediate disqualification without refund.</p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-brand-ivory-dark px-6 py-4 border-t border-brand-ivory-border flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-brand-midnight bg-white rounded-xl border border-brand-ivory-border hover:bg-brand-ivory"
          >
            I Understand & Accept
          </button>
        </div>
      </div>
    </div>
  );
};

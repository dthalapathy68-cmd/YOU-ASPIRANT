import React, { useState, useEffect } from 'react';
import { X, Compass, CheckCircle2, AlertCircle, ArrowRight, Clock, ShieldCheck, Download, Loader2 } from 'lucide-react';
import { AcademicStage, CareerDomainId, LeadFormData } from '../types';
import { CAREER_DOMAINS, ACADEMIC_STAGES } from '../data/careers';
import confetti from 'canvas-confetti';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDomain?: CareerDomainId;
  initialStage?: AcademicStage;
  initialAspiration?: string;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  initialDomain = 'tech',
  initialStage = 'undergrad',
  initialAspiration = '',
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    email: '',
    phone: '',
    academicStage: initialStage,
    areaOfInterest: initialDomain,
    preferredSlot: 'afternoon',
    specificGoal: initialAspiration,
    consent: true,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [submissionState, setSubmissionState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [ticketNumber, setTicketNumber] = useState<string>('');

  useEffect(() => {
    if (initialDomain) setFormData(prev => ({ ...prev, areaOfInterest: initialDomain }));
    if (initialStage) setFormData(prev => ({ ...prev, academicStage: initialStage }));
    if (initialAspiration) setFormData(prev => ({ ...prev, specificGoal: initialAspiration }));
  }, [initialDomain, initialStage, initialAspiration]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof LeadFormData, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your full name (minimum 3 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim() || phoneDigits.length < 10) {
      newErrors.phone = 'Please provide a valid 10-digit mobile or WhatsApp number.';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to receive career advisory communication.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmissionState('loading');

    // Simulate realistic advisory CRM submission
    setTimeout(() => {
      const generatedTicket = `YA-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      setTicketNumber(generatedTicket);
      setSubmissionState('success');

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback
      }
    }, 1200);
  };

  const handleReset = () => {
    setSubmissionState('idle');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      academicStage: 'undergrad',
      areaOfInterest: 'tech',
      preferredSlot: 'afternoon',
      specificGoal: '',
      consent: true,
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-brand-midnight/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
    >
      <div 
        className="bg-brand-ivory w-full max-w-xl rounded-3xl border border-brand-ivory-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-brand-midnight text-brand-ivory px-6 py-5 flex items-start justify-between border-b border-brand-midnight-card">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Compass className="w-4 h-4 text-brand-coral" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-brand-coral uppercase">
                1-on-1 Exploratory Advisory
              </span>
            </div>
            <h3 id="lead-modal-title" className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Talk to a Career Guide
            </h3>
            <p className="text-xs text-brand-ivory/80 mt-1">
              Schedule an objective 20-minute discussion to map your pathway. Zero sales pressure.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-brand-muted-dark hover:text-white hover:bg-brand-midnight-card transition-colors shrink-0"
            aria-label="Close Enquiry Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {submissionState === 'success' ? (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-brand-coral uppercase tracking-wider block mb-1">
                  Advisory Request Confirmed
                </span>
                <h4 className="text-2xl font-extrabold text-brand-midnight">
                  Your Future Pathway Session is Booked
                </h4>
                <p className="text-xs sm:text-sm text-brand-muted mt-2 max-w-sm mx-auto leading-relaxed">
                  A senior You Aspirant advisor will reach out to schedule your 20-minute discussion during your requested slot.
                </p>
              </div>

              {/* Receipt Box */}
              <div className="p-4 rounded-2xl bg-white border border-brand-ivory-border text-left space-y-2 text-xs">
                <div className="flex justify-between pb-2 border-b border-brand-ivory-border">
                  <span className="text-brand-muted">Booking Reference:</span>
                  <span className="font-mono font-bold text-brand-midnight">{ticketNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Name:</span>
                  <span className="font-semibold text-brand-midnight">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Email / Phone:</span>
                  <span className="text-brand-midnight">{formData.email} • {formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Selected Domain:</span>
                  <span className="font-semibold text-brand-coral capitalize">{formData.areaOfInterest}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Preferred Timing:</span>
                  <span className="text-brand-midnight capitalize">{formData.preferredSlot} Slot</span>
                </div>
              </div>

              {/* Notice */}
              <p className="text-[11px] text-brand-muted">
                Demo State: Fully validated client-side and simulated CRM pipeline receipt.
              </p>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-brand-midnight hover:bg-brand-coral rounded-xl transition-all shadow-sm"
                >
                  Return to Exploration
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Full Name */}
              <div>
                <label htmlFor="lead-name" className="block text-xs font-bold uppercase tracking-wider text-brand-midnight mb-1.5">
                  Full Name <span className="text-brand-coral">*</span>
                </label>
                <input
                  id="lead-name"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                  className={`w-full px-4 py-3 rounded-xl bg-white border text-xs sm:text-sm text-brand-midnight focus:outline-none transition-all ${
                    errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-brand-ivory-border focus:border-brand-coral'
                  }`}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? "lead-name-error" : undefined}
                />
                {errors.fullName && (
                  <p id="lead-name-error" className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lead-email" className="block text-xs font-bold uppercase tracking-wider text-brand-midnight mb-1.5">
                    Email Address <span className="text-brand-coral">*</span>
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@university.edu"
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-xs sm:text-sm text-brand-midnight focus:outline-none transition-all ${
                      errors.email ? 'border-red-500 bg-red-50/20' : 'border-brand-ivory-border focus:border-brand-coral'
                    }`}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lead-phone" className="block text-xs font-bold uppercase tracking-wider text-brand-midnight mb-1.5">
                    Mobile / WhatsApp <span className="text-brand-coral">*</span>
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-xs sm:text-sm text-brand-midnight focus:outline-none transition-all ${
                      errors.phone ? 'border-red-500 bg-red-50/20' : 'border-brand-ivory-border focus:border-brand-coral'
                    }`}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Academic Stage & Domain Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lead-stage" className="block text-xs font-bold uppercase tracking-wider text-brand-midnight mb-1.5">
                    Current Academic Stage
                  </label>
                  <select
                    id="lead-stage"
                    value={formData.academicStage}
                    onChange={(e) => setFormData({ ...formData, academicStage: e.target.value as AcademicStage })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-brand-ivory-border text-xs sm:text-sm text-brand-midnight focus:border-brand-coral focus:outline-none"
                  >
                    {ACADEMIC_STAGES.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="lead-domain" className="block text-xs font-bold uppercase tracking-wider text-brand-midnight mb-1.5">
                    Primary Area of Interest
                  </label>
                  <select
                    id="lead-domain"
                    value={formData.areaOfInterest}
                    onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value as CareerDomainId })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-brand-ivory-border text-xs sm:text-sm text-brand-midnight focus:border-brand-coral focus:outline-none"
                  >
                    {CAREER_DOMAINS.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferred Callback Slot */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-midnight mb-1.5">
                  Preferred Callback Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['morning', 'afternoon', 'evening', 'weekend'] as const).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredSlot: slot })}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize border transition-all ${
                        formData.preferredSlot === slot
                          ? 'bg-brand-midnight text-white border-brand-coral shadow-sm'
                          : 'bg-white text-brand-muted border-brand-ivory-border hover:bg-brand-ivory'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specific Aspiration / Question */}
              <div>
                <label htmlFor="lead-goal" className="block text-xs font-bold uppercase tracking-wider text-brand-midnight mb-1.5">
                  Specific Goal or Question (Optional)
                </label>
                <textarea
                  id="lead-goal"
                  rows={2}
                  value={formData.specificGoal}
                  onChange={(e) => setFormData({ ...formData, specificGoal: e.target.value })}
                  placeholder="e.g. Planning for UPSC 2026, or need advice on switching from Mechanical to Software..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-brand-ivory-border text-xs sm:text-sm text-brand-midnight focus:border-brand-coral focus:outline-none"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 rounded border-brand-ivory-border text-brand-coral focus:ring-brand-coral"
                  />
                  <span className="text-xs text-brand-muted leading-tight">
                    I agree to receive a 20-minute exploratory advisory call. You Aspirant respects student privacy and strictly prohibits spam.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.consent}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-brand-ivory-border flex items-center justify-between gap-3">
                <span className="text-[11px] text-brand-muted flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-coral" />
                  <span>No spam guaranteed</span>
                </span>

                <button
                  type="submit"
                  disabled={submissionState === 'loading'}
                  className="px-6 py-3 bg-brand-coral hover:bg-brand-coral-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:shadow-coral-glow transition-all flex items-center gap-2 disabled:opacity-60"
                >
                  {submissionState === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Scheduling...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm Advisory Slot</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

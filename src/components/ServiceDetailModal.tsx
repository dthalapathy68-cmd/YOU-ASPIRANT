import React from 'react';
import { X, CheckCircle, ArrowRight, Compass, Users, Target, BookOpen, ShieldCheck } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceItem | null;
  onEnquire: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  isOpen,
  onClose,
  service,
  onEnquire
}) => {
  if (!isOpen || !service) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-brand-midnight/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div 
        className="bg-brand-ivory w-full max-w-2xl rounded-3xl border border-brand-ivory-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-brand-midnight text-brand-ivory px-6 py-5 flex items-start justify-between border-b border-brand-midnight-card">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-brand-coral uppercase px-2 py-0.5 rounded bg-brand-midnight-card">
              {service.badgeText}
            </span>
            <h3 id="service-modal-title" className="text-xl sm:text-2xl font-extrabold text-white mt-1.5 tracking-tight">
              {service.title}
            </h3>
            <p className="text-xs text-brand-ivory/80 mt-1">
              {service.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-brand-muted-dark hover:text-white hover:bg-brand-midnight-card transition-colors shrink-0"
            aria-label="Close Service Details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Detailed Scope */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-midnight mb-2">
              Curriculum & Advisory Scope
            </h4>
            <p className="text-sm text-brand-midnight/80 leading-relaxed bg-white p-4 rounded-2xl border border-brand-ivory-border">
              {service.detailedScope}
            </p>
          </div>

          {/* What it offers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-midnight mb-2">
              Concrete Offerings & Deliverables
            </h4>
            <div className="space-y-2">
              {service.offers.map((offer) => (
                <div key={offer} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-brand-ivory-border">
                  <CheckCircle className="w-4 h-4 text-brand-coral shrink-0 mt-0.5" />
                  <span className="text-xs text-brand-midnight font-medium leading-relaxed">{offer}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Designed For */}
          <div className="p-4 rounded-2xl bg-brand-lavender/50 border border-brand-lavender-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-midnight mb-1 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-brand-coral" />
              <span>Who This is Designed For</span>
            </h4>
            <p className="text-xs text-brand-midnight/90 leading-relaxed mt-1">
              {service.designedFor}
            </p>
          </div>

          {/* What you achieve */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-midnight mb-2">
              Tangible Outcomes You Can Expect
            </h4>
            <ul className="space-y-2">
              {service.achievements.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-brand-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-coral mt-1.5 shrink-0" />
                  <span className="text-brand-midnight/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-brand-ivory-dark px-6 py-4 border-t border-brand-ivory-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-brand-muted">
            Have questions about this track? Let's discuss directly.
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
                onEnquire(service.title);
              }}
              className="w-1/2 sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-brand-coral hover:bg-brand-coral-hover rounded-xl shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Enquire About This Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

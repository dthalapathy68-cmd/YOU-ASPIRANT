import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/services';
import { ServiceItem } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';
import { 
  Compass, 
  Code, 
  Award, 
  Users, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface ServicesSectionProps {
  onEnquireService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onEnquireService }) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const iconMap: Record<string, React.ElementType> = {
    Compass,
    Code,
    Award,
    Users,
    BookOpen
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-brand-ivory relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-brand-ivory-border shadow-subtle text-brand-midnight text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-coral" />
            <span>Structured Mentorship Ecosystem</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-midnight tracking-tight uppercase">
            THE RIGHT GUIDANCE
            <br />
            <span className="font-editorial italic lowercase text-brand-coral font-normal">
              changes the
            </span>{' '}
            JOURNEY.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed font-normal">
            We provide verified, evidence-based guidance across five essential student transitions. Each track connects diagnostic clarity with hands-on practice.
          </p>
        </div>

        {/* Services Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service, index) => {
            const Icon = iconMap[service.iconName] || Compass;
            const isFeatured = index === 0;

            return (
              <div
                key={service.id}
                className={`group rounded-3xl p-7 transition-all duration-300 border flex flex-col justify-between ${
                  isFeatured
                    ? 'bg-brand-midnight text-brand-ivory border-brand-coral/40 shadow-elevated md:col-span-2 lg:col-span-1'
                    : 'bg-white hover:bg-brand-ivory text-brand-midnight border-brand-ivory-border hover:border-brand-coral/30 shadow-subtle hover:shadow-elevated'
                }`}
              >
                <div>
                  {/* Service Top Bar */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3 rounded-2xl ${
                      isFeatured 
                        ? 'bg-brand-midnight-card text-brand-coral ring-1 ring-brand-coral/30' 
                        : 'bg-brand-lavender text-brand-midnight'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      isFeatured
                        ? 'bg-brand-coral text-white'
                        : 'bg-brand-ivory-dark text-brand-muted border border-brand-ivory-border'
                    }`}>
                      {service.badgeText}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className={`text-xl font-bold tracking-tight mb-2 ${isFeatured ? 'text-white' : 'text-brand-midnight'}`}>
                    {service.title}
                  </h3>
                  <p className={`text-xs leading-relaxed mb-6 ${isFeatured ? 'text-brand-ivory/80' : 'text-brand-muted'}`}>
                    {service.subtitle}
                  </p>

                  {/* What it offers checklist */}
                  <div className="space-y-2.5 mb-6">
                    <span className={`text-[11px] font-mono font-bold uppercase tracking-wider block ${
                      isFeatured ? 'text-brand-coral' : 'text-brand-midnight'
                    }`}>
                      Core Offerings:
                    </span>
                    {service.offers.map((offer) => (
                      <div key={offer} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                          isFeatured ? 'text-brand-coral' : 'text-brand-coral'
                        }`} />
                        <span className={`text-xs leading-snug ${
                          isFeatured ? 'text-brand-ivory/90' : 'text-brand-midnight/80'
                        }`}>
                          {offer}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Who it is for */}
                  <div className={`p-3.5 rounded-xl text-xs mb-6 ${
                    isFeatured 
                      ? 'bg-brand-midnight-card/70 border border-brand-midnight-light text-brand-ivory/90' 
                      : 'bg-brand-ivory border border-brand-ivory-border text-brand-muted'
                  }`}>
                    <strong className={isFeatured ? 'text-white' : 'text-brand-midnight'}>Designed for: </strong>
                    <span>{service.designedFor}</span>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className={`pt-4 border-t flex items-center justify-between ${
                  isFeatured ? 'border-brand-midnight-light' : 'border-brand-ivory-border'
                }`}>
                  <button
                    onClick={() => setActiveModalService(service)}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors ${
                      isFeatured 
                        ? 'text-brand-coral hover:text-white' 
                        : 'text-brand-midnight hover:text-brand-coral'
                    }`}
                  >
                    <span>View Service Blueprint</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onEnquireService(service.title)}
                    className={`p-2 rounded-xl transition-all ${
                      isFeatured 
                        ? 'bg-brand-coral hover:bg-brand-coral-hover text-white' 
                        : 'bg-brand-ivory-dark hover:bg-brand-coral hover:text-white text-brand-midnight'
                    }`}
                    aria-label={`Enquire about ${service.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        isOpen={!!activeModalService}
        onClose={() => setActiveModalService(null)}
        service={activeModalService}
        onEnquire={(title) => {
          setActiveModalService(null);
          onEnquireService(title);
        }}
      />
    </section>
  );
};

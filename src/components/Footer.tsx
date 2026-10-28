import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { MapPin, Mail, Phone, ShieldCheck, Compass, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#FFFCF7] border-t border-[#EDE5E8] pt-16 pb-12 overflow-hidden z-10">
      {/* Subtle Ambient Bottom Glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] rounded-full filter blur-[120px] opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(244, 163, 64, 0.4) 0%, rgba(84, 39, 68, 0.15) 60%, transparent 80%)'
        }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#EDE5E8]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <BrandLogo variant="plum" size="md" />
            </Link>
            <p className="text-sm text-[#77717A] max-w-sm leading-relaxed">
              You Aspirant helps students understand their interests, explore career possibilities, identify learning gaps, and plan their next steps through structured guidance and training.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-[#542744] font-medium bg-[#F5EDF3] px-3 py-2 rounded-xl border border-[#DBCBD6] inline-flex">
              <Sparkles className="w-3.5 h-3.5 text-[#F4A340]" />
              <span>Your Potential Has a Direction.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm tracking-wide text-[#542744] uppercase">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-[#77717A]">
              <li>
                <Link to="/assessment" className="hover:text-[#542744] transition-colors flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#F4A340]" />
                  <span>Career DNA Assessment</span>
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-[#542744] transition-colors">
                  Career Explorer
                </Link>
              </li>
              <li>
                <Link to="/roadmap" className="hover:text-[#542744] transition-colors">
                  FuturePath Roadmaps
                </Link>
              </li>
              <li>
                <Link to="/training" className="hover:text-[#542744] transition-colors">
                  Training Programs
                </Link>
              </li>
              <li>
                <Link to="/stories" className="hover:text-[#542744] transition-colors">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Career Domains */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm tracking-wide text-[#542744] uppercase">
              Disciplines
            </h4>
            <ul className="space-y-2 text-sm text-[#77717A]">
              <li>
                <Link to="/careers?category=software-tech" className="hover:text-[#542744] transition-colors">
                  Software & Technology
                </Link>
              </li>
              <li>
                <Link to="/careers?category=design-creativity" className="hover:text-[#542744] transition-colors">
                  Design & Creativity
                </Link>
              </li>
              <li>
                <Link to="/careers?category=data-analytics" className="hover:text-[#542744] transition-colors">
                  Data & Analytics
                </Link>
              </li>
              <li>
                <Link to="/careers?category=business-mgmt" className="hover:text-[#542744] transition-colors">
                  Business & Management
                </Link>
              </li>
              <li>
                <Link to="/careers?category=engineering-innov" className="hover:text-[#542744] transition-colors">
                  Engineering & Innovation
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Guidance */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm tracking-wide text-[#542744] uppercase">
              Guidance & Support
            </h4>
            <ul className="space-y-2.5 text-sm text-[#77717A]">
              <li>
                <Link to="/about" className="hover:text-[#542744] transition-colors">
                  About You Aspirant
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#542744] transition-colors">
                  Request Counselling
                </Link>
              </li>
              <li className="flex items-start gap-2 pt-1 text-xs text-[#77717A]">
                <Mail className="w-3.5 h-3.5 text-[#542744] mt-0.5 shrink-0" />
                <span>support@youaspirant.com (Demo Contact)</span>
              </li>
              <li className="flex items-start gap-2 text-xs text-[#77717A]">
                <MapPin className="w-3.5 h-3.5 text-[#542744] mt-0.5 shrink-0" />
                <span>Student Advisory Hub (Bangalore, India)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#77717A]">
          <p>© {new Date().getFullYear()} You Aspirant. All rights reserved. Built for student discovery.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-[#542744] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#542744] transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/student/login" className="hover:text-[#542744] transition-colors">
              Student Login
            </Link>
            <Link to="/admin/login" className="hover:text-[#542744] transition-colors flex items-center gap-1 font-medium text-[#754565]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Access</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Target, 
  Award, 
  BookOpen, 
  ArrowRight,
  HeartHandshake
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-10 md:py-16 text-left space-y-16">
      {/* Hero Header */}
      <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-12 shadow-elevated relative overflow-hidden space-y-4">
        <div 
          className="absolute -top-12 -right-12 w-64 h-64 rounded-full filter blur-[70px] opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #F4A340 0%, #542744 70%)' }}
        />

        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5EDF3] border border-[#DBCBD6] text-xs font-bold text-[#542744]">
            <HeartHandshake className="w-3.5 h-3.5 text-[#F4A340]" />
            <span>Empowering Aspirants</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#542744]">
            About You Aspirant
          </h1>

          <p className="text-base sm:text-lg text-[#77717A] leading-relaxed">
            You Aspirant helps students understand their interests, explore career possibilities, identify learning gaps, and plan their next steps through structured guidance and practical training.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-8 shadow-subtle space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F5EDF3] flex items-center justify-center text-[#542744]">
            <Target className="w-6 h-6 text-[#542744]" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-[#542744]">
            Our Mission
          </h2>
          <p className="text-sm text-[#77717A] leading-relaxed">
            To transform career uncertainty into clarity. We empower school students and college undergraduates to identify their natural cognitive strengths, explore genuine career directions, and bridge skill gaps with evidence-based milestones.
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-8 shadow-subtle space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFE7C7] flex items-center justify-center text-[#542744]">
            <Compass className="w-6 h-6 text-[#F4A340]" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-[#542744]">
            Our Vision
          </h2>
          <p className="text-sm text-[#77717A] leading-relaxed">
            An education ecosystem where every student possesses self-awareness of their possibilities, rather than defaulting to peer pressure or uninformed assumptions about the modern job landscape.
          </p>
        </div>
      </div>

      {/* Guidance Philosophy & Student-First Approach */}
      <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-8 sm:p-10 shadow-subtle space-y-6">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#542744]">
          Our Career Guidance Philosophy
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-[#FFFCF7] border border-[#EDE5E8] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F4A340]">Principle 01</span>
            <h3 className="font-heading font-bold text-base text-[#542744]">
              Interests Precede Skills
            </h3>
            <p className="text-xs text-[#77717A] leading-relaxed">
              When students understand what genuinely engages them, acquiring challenging technical skills becomes natural rather than an exhausting obligation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFCF7] border border-[#EDE5E8] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#542744]">Principle 02</span>
            <h3 className="font-heading font-bold text-base text-[#542744]">
              Milestones Over Overwhelm
            </h3>
            <p className="text-xs text-[#77717A] leading-relaxed">
              A 4-year engineering or degree curriculum often feels overwhelming. We break learning into bite-sized, practical project stages.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFCF7] border border-[#EDE5E8] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#27845D]">Principle 03</span>
            <h3 className="font-heading font-bold text-base text-[#542744]">
              Evidence Over Empty Promises
            </h3>
            <p className="text-xs text-[#77717A] leading-relaxed">
              We never fabricate placement guarantees or artificial statistics. We prioritize verifiable skills, portfolio projects, and honest mentorship.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 sm:p-12 rounded-card bg-[#542744] text-[#FFFCF7] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="font-heading font-bold text-2xl text-[#FFFCF7]">
            Begin Your Career Exploration
          </h3>
          <p className="text-xs sm:text-sm text-[#FFD49A]">
            Take the 15-question Career DNA assessment or talk directly with our guidance team.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            to="/assessment"
            className="px-6 py-3 rounded-button bg-[#F4A340] hover:bg-[#FFD49A] text-[#542744] font-bold text-xs sm:text-sm transition-all"
          >
            Start Assessment
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-button bg-[#754565] text-[#FFFCF7] text-xs sm:text-sm font-semibold hover:bg-[#A984A1] transition-all border border-[#A984A1]/40"
          >
            Contact Guidance Team
          </Link>
        </div>
      </div>
    </div>
  );
};

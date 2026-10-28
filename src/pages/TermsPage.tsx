import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-[850px] mx-auto px-4 sm:px-6 py-10 md:py-16 text-left space-y-8">
      <Link
        to="/"
        className="text-xs font-semibold text-[#754565] hover:text-[#542744] flex items-center gap-1.5"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-10 shadow-subtle space-y-6">
        <div className="space-y-2 pb-4 border-b border-[#EDE5E8]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EDF3] text-xs font-bold text-[#542744]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#542744]" />
            <span>Platform Agreement</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl text-[#542744]">
            Terms and Conditions
          </h1>
          <p className="text-xs text-[#77717A]">
            Effective Date: October 2026 · You Aspirant
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#29232C] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-[#542744]">
              1. Purpose of the Platform
            </h2>
            <p>
              You Aspirant provides educational discovery, self-directed skill roadmaps, and career advisory services. All assessment results, interest profiles, and learning timelines are intended for exploratory and informational guidance only.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-[#542744]">
              2. No Guarantee of Employment Outcomes
            </h2>
            <p>
              You Aspirant does not promise specific salaries, employment placements, or university admissions. Career outcomes depend entirely on individual student diligence, continuous practice, market conditions, and personal effort.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-[#542744]">
              3. User Conduct
            </h2>
            <p>
              Users agree to provide accurate and truthful information during registration and enquiry submissions, and to respect mentors and advisors during one-on-one sessions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-[#542744]">
              4. Intellectual Property
            </h2>
            <p>
              All curriculum designs, Career DNA assessment algorithms, FuturePath milestone structures, and visual brand assets are the intellectual property of You Aspirant.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

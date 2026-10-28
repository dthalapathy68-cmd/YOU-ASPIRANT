import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
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
            <ShieldCheck className="w-3.5 h-3.5 text-[#27845D]" />
            <span>Transparency & Student Privacy</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl text-[#542744]">
            Privacy Notice
          </h1>
          <p className="text-xs text-[#77717A]">
            Effective Date: October 2026 · You Aspirant Career Guidance
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#29232C] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-[#542744]">
              1. Information We Collect
            </h2>
            <p>
              When you explore You Aspirant, we collect only the information necessary to provide you with meaningful career discovery:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#77717A]">
              <li><strong>Self-Reported Assessment Responses:</strong> Answers provided during the Career DNA assessment to calculate interest patterns.</li>
              <li><strong>Contact Information:</strong> Full name, email address, optional phone number, and education level when you submit a guidance request or create an account.</li>
              <li><strong>Roadmap and Skill Progress:</strong> Checklists, notes, and self-reported skill ratings stored to maintain your personalized FuturePath.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-[#542744]">
              2. How We Use Your Information
            </h2>
            <p>
              Your information is strictly used to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#77717A]">
              <li>Generate exploratory Career DNA interest scores and matching recommendations.</li>
              <li>Save your learning roadmap milestone completion across browser sessions.</li>
              <li>Enable student advisory mentors to review your guidance requests and respond to your questions.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-[#542744]">
              3. Data Storage & Demo Mode
            </h2>
            <p>
              When running in demo mode, your data is stored locally within your personal browser storage (localStorage). When connected to our cloud database (Supabase PostgreSQL), strict Row Level Security (RLS) ensures that only you and authorized company administrators can view your private records.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-base text-[#542744]">
              4. Contact Our Privacy Officer
            </h2>
            <p>
              If you have any questions or wish to delete your stored assessment results and enquiry logs, please contact us at <a href="mailto:support@youaspirant.com" className="text-[#542744] font-semibold underline">support@youaspirant.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

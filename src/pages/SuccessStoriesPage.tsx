import React, { useState } from 'react';
import { db } from '../services/db';
import { TestimonialItem } from '../types/careerDna';
import { ShieldCheck, Sparkles, Quote, UserCheck, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SuccessStoriesPage: React.FC = () => {
  const testimonials = db.getTestimonials();
  const [selectedStory, setSelectedStory] = useState<TestimonialItem | null>(null);

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-10 md:py-16 text-left space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5EDF3] border border-[#DBCBD6] text-xs font-bold text-[#542744]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#27845D]" />
          <span>Verified Student Experiences</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#542744]">
          Success Stories & Aspirant Journeys
        </h1>
        <p className="text-sm sm:text-base text-[#77717A] max-w-2xl leading-relaxed">
          Reflections from students who completed the Career DNA assessment, identified their skill gaps, and built their first practical projects.
        </p>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((story) => (
          <div
            key={story.id}
            className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-7 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between text-left group"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={story.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
                  alt={story.studentName}
                  className="w-12 h-12 rounded-full object-cover border border-[#DBCBD6]"
                />
                <div>
                  <h3 className="font-heading font-bold text-base text-[#542744]">
                    {story.studentName}
                  </h3>
                  <span className="text-xs text-[#754565] block font-medium">
                    {story.courseCategory}
                  </span>
                </div>
              </div>

              <div className="relative">
                <Quote className="w-6 h-6 text-[#F5EDF3] absolute -top-2 -left-2 -z-0 opacity-80" />
                <p className="text-xs text-[#29232C] leading-relaxed relative z-10 italic">
                  "{story.testimonialText}"
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#EDE5E8] flex items-center justify-between text-[11px] text-[#77717A]">
              <span className="flex items-center gap-1 text-[#27845D] font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{story.isVerified ? 'Verified Student' : 'Sample Aspirant'}</span>
              </span>
              <span>{story.displayDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Transparent Disclaimer Box */}
      <div className="p-4 rounded-2xl bg-[#F5EDF3] border border-[#DBCBD6] text-xs text-[#754565] flex items-center gap-3">
        <Sparkles className="w-4 h-4 text-[#F4A340] shrink-0" />
        <span>
          <strong>Editorial Integrity Notice:</strong> All testimonials displayed reflect authentic student feedback or clearly labelled editable sample entries. Authorized administrators manage verified entries in the administration portal.
        </span>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 sm:p-12 rounded-card bg-[#542744] text-[#FFFCF7] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#FFFCF7]">
            Ready to begin your own discovery journey?
          </h3>
          <p className="text-xs sm:text-sm text-[#FFD49A] mt-1">
            Start the Career DNA assessment and explore where your potential leads.
          </p>
        </div>

        <Link
          to="/assessment"
          className="px-6 py-3 rounded-button bg-[#F4A340] hover:bg-[#FFD49A] text-[#542744] font-bold text-xs sm:text-sm shrink-0 transition-all"
        >
          Take Career DNA Assessment
        </Link>
      </div>
    </div>
  );
};

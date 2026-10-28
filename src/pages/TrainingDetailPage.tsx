import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../services/db';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  MessageSquare,
  Users,
  Award
} from 'lucide-react';

export const TrainingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const program = id ? db.getTrainingProgramById(id) : undefined;

  if (!program) {
    return (
      <div className="max-w-[800px] mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-heading font-bold text-2xl text-[#542744]">Program Not Found</h2>
        <p className="text-sm text-[#77717A]">The requested training syllabus could not be found.</p>
        <Link
          to="/training"
          className="px-5 py-2.5 rounded-button bg-[#542744] text-[#FFFCF7] text-xs font-semibold inline-block"
        >
          Back to All Programs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-10 md:py-16 text-left space-y-10">
      <Link
        to="/training"
        className="text-xs font-semibold text-[#754565] hover:text-[#542744] flex items-center gap-1.5"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Training Programs</span>
      </Link>

      {/* Program Header */}
      <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-10 shadow-elevated relative overflow-hidden space-y-4">
        <div 
          className="absolute -top-12 -right-12 w-64 h-64 rounded-full filter blur-[70px] opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #F4A340 0%, #542744 70%)' }}
        />

        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F5EDF3] text-[#542744]">
            {program.difficultyLevel} Level
          </span>
          {program.duration && (
            <span className="text-xs text-[#77717A] flex items-center gap-1 font-medium bg-[#FFFCF7] border border-[#EDE5E8] px-3 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5 text-[#F4A340]" />
              {program.duration}
            </span>
          )}
        </div>

        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#542744]">
          {program.title}
        </h1>

        <p className="text-base text-[#754565] font-medium">
          {program.tagline}
        </p>

        <p className="text-sm text-[#77717A] leading-relaxed max-w-2xl">
          {program.overview}
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <Link
            to={`/contact?interest=${encodeURIComponent(program.title)}`}
            className="px-6 py-3 rounded-button bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
          >
            <MessageSquare className="w-4 h-4 text-[#F4A340]" />
            <span>Enquire About Next Cohort</span>
          </Link>
        </div>
      </div>

      {/* Prerequisites & Audience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 shadow-subtle space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#542744]">
            <BookOpen className="w-4 h-4 text-[#F4A340]" />
            <span>Prerequisites</span>
          </div>
          <p className="text-xs sm:text-sm text-[#77717A] leading-relaxed">
            {program.prerequisites || 'No prior background required. Designed from foundational principles.'}
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 shadow-subtle space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#542744]">
            <Users className="w-4 h-4 text-[#F4A340]" />
            <span>Intended Audience</span>
          </div>
          <p className="text-xs sm:text-sm text-[#77717A] leading-relaxed">
            {program.intendedAudience || 'Beginners, school graduates, and college students looking for structured direction.'}
          </p>
        </div>
      </div>

      {/* Curriculum Modules */}
      <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-8 shadow-subtle space-y-6">
        <h2 className="font-heading font-bold text-2xl text-[#542744]">
          Curriculum & Module Breakdown
        </h2>

        <div className="space-y-4">
          {program.modules.map((mod, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-2xl bg-[#FFFCF7] border border-[#EDE5E8] space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F5EDF3] text-[#542744]">
                  {mod.week}
                </span>
                <h3 className="font-heading font-bold text-base text-[#542744]">
                  {mod.topic}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#77717A] leading-relaxed">
                {mod.details}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Enquiry CTA */}
      <div className="p-8 rounded-card bg-[#542744] text-[#FFFCF7] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-heading font-bold text-xl text-[#FFFCF7]">
            Interested in {program.title}?
          </h3>
          <p className="text-xs text-[#FFD49A] mt-1">
            Submit an enquiry to receive syllabus schedules, cohort dates, and study materials.
          </p>
        </div>

        <Link
          to={`/contact?interest=${encodeURIComponent(program.title)}`}
          className="px-6 py-3 rounded-button bg-[#F4A340] hover:bg-[#FFD49A] text-[#542744] font-bold text-xs sm:text-sm shrink-0 transition-all"
        >
          Submit Enquiry
        </Link>
      </div>
    </div>
  );
};

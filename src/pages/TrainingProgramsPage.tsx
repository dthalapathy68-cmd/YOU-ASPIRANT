import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../services/db';
import { SEED_CATEGORIES } from '../data/seedData';
import { 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Sparkles,
  HelpCircle,
  Briefcase
} from 'lucide-react';

export const TrainingProgramsPage: React.FC = () => {
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const programs = db.getTrainingPrograms();

  const filteredPrograms = programs.filter((p) => {
    if (filterLevel === 'all') return true;
    return p.difficultyLevel.toLowerCase() === filterLevel.toLowerCase();
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 md:py-16 text-left space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5EDF3] border border-[#DBCBD6] text-xs font-bold text-[#542744]">
          <GraduationCap className="w-3.5 h-3.5 text-[#F4A340]" />
          <span>Foundational Skill Cohorts</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#542744]">
          Training Programs
        </h1>
        <p className="text-sm sm:text-base text-[#77717A] max-w-2xl leading-relaxed">
          Structured, beginner-friendly skill programs designed to bridge academic study with practical capabilities. Each track emphasizes real-world portfolio tasks.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Beginner', 'Foundations', 'Career Readiness'].map((lvl) => {
          const isSelected = filterLevel.toLowerCase() === lvl.toLowerCase();
          return (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl.toLowerCase())}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-[#542744] text-[#FFFCF7] shadow-sm'
                  : 'bg-[#FFFFFF] border border-[#EDE5E8] text-[#754565] hover:bg-[#F5EDF3]'
              }`}
            >
              {lvl} Programs
            </button>
          );
        })}
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => {
          const category = SEED_CATEGORIES.find((c) => c.id === program.categoryId);
          return (
            <div
              key={program.id}
              className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between text-left group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F5EDF3] text-[#542744]">
                    {program.difficultyLevel}
                  </span>
                  {program.duration && (
                    <span className="text-[11px] text-[#77717A] flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#F4A340]" />
                      {program.duration.split('(')[0]}
                    </span>
                  )}
                </div>

                <h3 className="font-heading font-bold text-lg text-[#542744] mb-1 group-hover:text-[#754565] transition-colors">
                  {program.title}
                </h3>
                <p className="text-xs font-medium text-[#754565] mb-3">
                  {program.tagline}
                </p>
                <p className="text-xs text-[#77717A] leading-relaxed mb-4">
                  {program.overview}
                </p>

                <div className="space-y-1.5 mb-6">
                  <span className="text-[11px] font-bold text-[#29232C] block">Skills Covered:</span>
                  <div className="flex flex-wrap gap-1">
                    {program.skillsCovered.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-[10px] bg-[#FFFCF7] border border-[#EDE5E8] text-[#542744]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EDE5E8] flex items-center gap-2">
                <Link
                  to={`/training/${program.id}`}
                  className="flex-1 py-2 px-3 rounded-button bg-[#F5EDF3] hover:bg-[#EDE5E8] text-[#542744] text-xs font-semibold text-center transition-colors"
                >
                  View Details
                </Link>
                <Link
                  to={`/contact?interest=${encodeURIComponent(program.title)}`}
                  className="py-2 px-4 rounded-button bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] text-xs font-semibold text-center transition-colors"
                >
                  Enquire
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

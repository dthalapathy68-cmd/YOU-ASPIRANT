import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../services/db';
import { SEED_CATEGORIES, SEED_TRAINING_PROGRAMS } from '../data/seedData';
import { CareerProfileItem } from '../types/careerDna';
import { 
  ArrowLeft, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  Briefcase, 
  FolderGit2, 
  GraduationCap, 
  MessageSquare,
  Bookmark,
  Check
} from 'lucide-react';

export const CareerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [career, setCareer] = useState<CareerProfileItem | undefined>(undefined);
  const [isSaved, setIsSaved] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    if (id) {
      const found = db.getCareerById(id);
      setCareer(found);
      const savedList = db.getSavedCareers();
      setIsSaved(savedList.includes(id));
    }
  }, [id]);

  if (!career) {
    return (
      <div className="max-w-[800px] mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-heading font-bold text-2xl text-[#542744]">Career Profile Not Found</h2>
        <p className="text-sm text-[#77717A]">The requested career direction could not be located.</p>
        <Link
          to="/careers"
          className="px-5 py-2.5 rounded-button bg-[#542744] text-[#FFFCF7] text-xs font-semibold inline-block"
        >
          Back to Career Explorer
        </Link>
      </div>
    );
  }

  const category = SEED_CATEGORIES.find((c) => c.id === career.categoryId);
  const allCareers = db.getCareers();
  const relatedCareers = allCareers.filter((c) => c.categoryId === career.categoryId && c.id !== career.id).slice(0, 3);
  const relevantPrograms = SEED_TRAINING_PROGRAMS.filter((p) => p.categoryId === career.categoryId);

  const handleToggleSave = () => {
    const newState = db.toggleSaveCareer(career.id);
    setIsSaved(newState);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-10 md:py-16 text-left space-y-10">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/careers"
          className="text-xs font-semibold text-[#754565] hover:text-[#542744] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Career Explorer</span>
        </Link>

        <button
          onClick={handleToggleSave}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            isSaved
              ? 'bg-[#542744] text-[#FFFCF7] border-[#542744]'
              : 'bg-[#FFFFFF] text-[#542744] border-[#DBCBD6] hover:bg-[#F5EDF3]'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>{isSaved ? 'Saved to Profile' : 'Save Career'}</span>
        </button>
      </div>

      {saveToast && (
        <div className="p-3 bg-[#F5EDF3] border border-[#DBCBD6] rounded-xl text-xs font-semibold text-[#27845D] flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{isSaved ? 'Career added to your saved careers list' : 'Career removed from saved list'}</span>
        </div>
      )}

      {/* Hero Overview Card */}
      <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-10 shadow-elevated relative overflow-hidden">
        <div 
          className="absolute -top-12 -right-12 w-64 h-64 rounded-full filter blur-[70px] opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #F4A340 0%, #542744 70%)' }}
        />

        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F5EDF3] text-[#542744]">
              {category?.name || 'Career Exploration'}
            </span>
            {career.isBeginnerFriendly && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold text-[#27845D] bg-[#F5EDF3]">
                Beginner Friendly
              </span>
            )}
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#542744]">
            {career.title}
          </h1>

          <p className="text-base font-medium text-[#754565]">
            {career.tagline}
          </p>

          <p className="text-sm text-[#77717A] leading-relaxed">
            {career.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            {career.hasRoadmap && (
              <Link
                to={`/roadmap?career=${career.id}`}
                className="px-5 py-2.5 rounded-button bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
              >
                <Layers className="w-4 h-4 text-[#F4A340]" />
                <span>Open FuturePath Roadmap</span>
              </Link>
            )}

            <Link
              to={`/contact?interest=${encodeURIComponent(career.title)}`}
              className="px-5 py-2.5 rounded-button bg-[#F5EDF3] hover:bg-[#EDE5E8] text-[#542744] text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#754565]" />
              <span>Request Career Counselling</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Responsibilities & Core Skills */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Responsibilities (Col 7) */}
        <div className="md:col-span-7 bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-8 shadow-subtle space-y-4">
          <h2 className="font-heading font-bold text-xl text-[#542744]">
            Typical Daily Responsibilities
          </h2>
          <ul className="space-y-3">
            {career.responsibilities.map((resp, i) => (
              <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#29232C] leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-[#27845D] shrink-0 mt-0.5" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Core Skills (Col 5) */}
        <div className="md:col-span-5 bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-8 shadow-subtle space-y-4">
          <h2 className="font-heading font-bold text-xl text-[#542744]">
            Relevant Foundational Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {career.coreSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-xl bg-[#FFFCF7] border border-[#EDE5E8] text-xs font-medium text-[#542744]"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="text-xs text-[#77717A] pt-2">
            Practice each skill through guided stages in our interactive FuturePath roadmap.
          </p>
        </div>
      </div>

      {/* Suggested Beginner Practice Project */}
      <div className="bg-[#FFFFFF] border border-[#FADCB3] rounded-card p-6 sm:p-8 shadow-elevated space-y-4 relative overflow-hidden">
        <div 
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full filter blur-[50px] opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #F4A340 0%, transparent 70%)' }}
        />

        <div className="flex items-center gap-2">
          <FolderGit2 className="w-5 h-5 text-[#F4A340]" />
          <span className="text-xs font-bold text-[#542744] uppercase tracking-wider">
            Hands-on Practice Project
          </span>
        </div>

        <h3 className="font-heading font-bold text-xl text-[#542744]">
          {career.practiceProject.title}
        </h3>

        <p className="text-sm text-[#77717A] max-w-2xl leading-relaxed">
          {career.practiceProject.description}
        </p>

        <div className="pt-2">
          <span className="text-xs font-bold text-[#29232C] block mb-2">Key Deliverables to Build:</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {career.practiceProject.deliverables.map((deliv, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#FFFCF7] border border-[#EDE5E8] text-xs text-[#542744] font-medium">
                {deliv}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Relevant Training Programs if available */}
      {relevantPrograms.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-heading font-bold text-xl text-[#542744]">
            Structured Training Programs in this Discipline
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relevantPrograms.map((prog) => (
              <div
                key={prog.id}
                className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#EDE5E8] flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F4A340]">
                    {prog.difficultyLevel}
                  </span>
                  <h4 className="font-heading font-bold text-base text-[#542744] mt-1 mb-2">
                    {prog.title}
                  </h4>
                  <p className="text-xs text-[#77717A] mb-3">{prog.tagline}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#EDE5E8]">
                  <Link
                    to={`/training/${prog.id}`}
                    className="text-xs font-semibold text-[#542744] hover:text-[#754565]"
                  >
                    View Curriculum
                  </Link>
                  <Link
                    to={`/contact?interest=${prog.title}`}
                    className="px-3 py-1.5 rounded-button bg-[#542744] text-[#FFFCF7] text-xs font-semibold"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Careers */}
      {relatedCareers.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-heading font-bold text-xl text-[#542744]">
            Related Career Directions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedCareers.map((rel) => (
              <Link
                key={rel.id}
                to={`/careers/${rel.id}`}
                className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EDE5E8] hover:border-[#DBCBD6] transition-all text-left block"
              >
                <h4 className="font-heading font-bold text-sm text-[#542744] mb-1">
                  {rel.title}
                </h4>
                <p className="text-xs text-[#77717A] line-clamp-2">{rel.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

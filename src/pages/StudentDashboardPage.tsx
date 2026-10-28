import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../services/db';
import { UserAccount, AssessmentResultData, CareerProfileItem, EnquiryItem } from '../types/careerDna';
import { SEED_CAREERS } from '../data/seedData';
import { 
  User, 
  Compass, 
  Layers, 
  CheckCircle2, 
  Bookmark, 
  MessageSquare, 
  ArrowRight, 
  BarChart3, 
  Sparkles, 
  Clock, 
  Trash2,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export const StudentDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserAccount | null>(null);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResultData | null>(null);
  const [activeCareerId, setActiveCareerId] = useState<string>('frontend-developer');
  const [savedCareerIds, setSavedCareerIds] = useState<string[]>([]);
  const [myEnquiries, setMyEnquiries] = useState<EnquiryItem[]>([]);

  useEffect(() => {
    let currentUser = db.getCurrentUser();
    if (!currentUser) {
      // Auto login as demo student for seamless experience if visiting directly
      currentUser = db.loginDemoStudent();
    }
    setUser(currentUser);

    // Load state
    setAssessmentResult(db.getLatestAssessmentResult());
    const activeId = db.getActiveCareerId();
    setActiveCareerId(activeId);
    setSavedCareerIds(db.getSavedCareers());

    // Load enquiries submitted by this user
    const allEnquiries = db.getEnquiries();
    const userEnquiries = allEnquiries.filter((e) => e.email.toLowerCase() === currentUser?.email.toLowerCase());
    setMyEnquiries(userEnquiries.length > 0 ? userEnquiries : allEnquiries.slice(0, 2));
  }, []);

  const handleRemoveSaved = (careerId: string) => {
    db.toggleSaveCareer(careerId);
    setSavedCareerIds(db.getSavedCareers());
  };

  // Calculations
  const activeCareer = SEED_CAREERS.find((c) => c.id === activeCareerId) || SEED_CAREERS[0];
  const roadmapTemplate = db.getRoadmapTemplate(activeCareerId);
  const milestoneProgress = db.getMilestoneProgress(activeCareerId);

  const totalMilestones = roadmapTemplate?.milestones.length || 0;
  const completedCount = roadmapTemplate?.milestones.filter((m) => milestoneProgress[m.id]?.isCompleted).length || 0;
  const progressPercent = totalMilestones > 0 ? Math.round((completedCount / totalMilestones) * 100) : 0;
  const nextMilestone = roadmapTemplate?.milestones.find((m) => !milestoneProgress[m.id]?.isCompleted);

  // Skill summary
  const studentSkills = db.getStudentSkills(activeCareerId);
  const comfortableSkills = Object.entries(studentSkills).filter(([_, lvl]) => lvl === 'Comfortable').map(([s]) => s);
  const beginnerSkills = Object.entries(studentSkills).filter(([_, lvl]) => lvl === 'Beginner').map(([s]) => s);

  if (!user) return null;

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 md:py-16 text-left space-y-10">
      {/* ==================================================================== */}
      {/* SECTION A: WELCOME SECTION */}
      {/* ==================================================================== */}
      <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-10 shadow-elevated relative overflow-hidden">
        <div 
          className="absolute -top-12 -right-12 w-64 h-64 rounded-full filter blur-[70px] opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #F4A340 0%, #542744 70%)' }}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EDF3] border border-[#DBCBD6] text-xs font-bold text-[#542744]">
              <Sparkles className="w-3.5 h-3.5 text-[#F4A340]" />
              <span>Student Learning Portal</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#542744]">
              Welcome back, {user.fullName.split(' ')[0]}!
            </h1>
            <p className="text-sm text-[#77717A]">
              {user.educationLevel} · Active Goal: <strong>{activeCareer.title}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/assessment"
              className="px-4 py-2.5 rounded-button bg-[#F5EDF3] hover:bg-[#EDE5E8] text-[#542744] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Compass className="w-4 h-4 text-[#F4A340]" />
              <span>{assessmentResult ? 'Retake Assessment' : 'Take Assessment'}</span>
            </Link>
            <Link
              to="/roadmap"
              className="px-4 py-2.5 rounded-button bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Layers className="w-4 h-4 text-[#F4A340]" />
              <span>Open FuturePath</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid: Career DNA & Current Goal / Roadmap Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Career DNA Summary (Col 5) */}
        <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-7 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-[#542744]">
              Career DNA Summary
            </h3>
            {assessmentResult && (
              <Link to="/assessment/results" className="text-xs font-semibold text-[#754565] hover:text-[#542744]">
                View Full Report →
              </Link>
            )}
          </div>

          {assessmentResult ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#F5EDF3] border border-[#DBCBD6] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F4A340] block">
                  Top Interest Dimension
                </span>
                <div className="flex items-baseline justify-between">
                  <h4 className="font-heading font-bold text-base text-[#542744]">
                    {assessmentResult.primaryDimensions[0].label}
                  </h4>
                  <span className="text-sm font-extrabold text-[#542744]">
                    {assessmentResult.primaryDimensions[0].score}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#542744] rounded-full"
                    style={{ width: `${assessmentResult.primaryDimensions[0].score}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-[#29232C] block">Recommended Directions:</span>
                <div className="space-y-1.5">
                  {assessmentResult.recommendedCareers.map((rec) => (
                    <div
                      key={rec.careerId}
                      className="p-2.5 rounded-xl bg-[#FFFCF7] border border-[#EDE5E8] flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-[#542744]">{rec.title}</span>
                      <span className="text-[11px] text-[#27845D] font-bold">{rec.matchScore}% Match</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-[#FFFCF7] border border-dashed border-[#EDE5E8] text-center space-y-3">
              <Compass className="w-8 h-8 text-[#A984A1] mx-auto" />
              <p className="text-xs text-[#77717A]">
                You haven't completed the Career DNA assessment yet.
              </p>
              <Link
                to="/assessment"
                className="px-4 py-2 rounded-button bg-[#542744] text-[#FFFCF7] text-xs font-semibold inline-block"
              >
                Start Assessment
              </Link>
            </div>
          )}
        </div>

        {/* Right Column: Goal & FuturePath Progress (Col 7) */}
        <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-7 shadow-subtle space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EDE5E8]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F4A340]">Active Target Pathway</span>
              <h3 className="font-heading font-bold text-xl text-[#542744]">
                {activeCareer.title}
              </h3>
            </div>
            <Link
              to="/roadmap"
              className="text-xs font-semibold text-[#542744] hover:text-[#754565] flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Switch or Edit Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#77717A]">Roadmap Completion:</span>
              <span className="font-bold text-[#542744]">{progressPercent}%</span>
            </div>
            <div className="h-3 w-full bg-[#EDE5E8] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#542744] to-[#F4A340] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] text-[#77717A] block">
              {completedCount} of {totalMilestones} stages marked complete
            </span>
          </div>

          {/* Next Recommended Milestone */}
          {nextMilestone && (
            <div className="p-4 rounded-2xl bg-[#FFE7C7]/30 border border-[#FADCB3] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#542744]">
                <Sparkles className="w-3.5 h-3.5 text-[#F4A340]" />
                <span>Next Milestone to Tackle:</span>
              </div>
              <h4 className="font-heading font-bold text-base text-[#542744]">
                Stage {nextMilestone.stageNumber}: {nextMilestone.title}
              </h4>
              <p className="text-xs text-[#77717A] leading-relaxed">
                {nextMilestone.description}
              </p>
              <div className="pt-1">
                <Link
                  to={`/roadmap?career=${activeCareerId}`}
                  className="px-3.5 py-1.5 rounded-button bg-[#542744] text-[#FFFCF7] text-xs font-semibold inline-flex items-center gap-1.5"
                >
                  <span>Work on this Milestone</span>
                  <ArrowRight className="w-3 h-3 text-[#F4A340]" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Skill Gap Summary & Saved Careers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Skill Gap Summary Card */}
        <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-[#542744]">
              My Skill Gap Status
            </h3>
            <Link to={`/roadmap?career=${activeCareerId}`} className="text-xs font-semibold text-[#754565] hover:text-[#542744]">
              Update Ratings →
            </Link>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-bold text-[#27845D] uppercase tracking-wider block mb-1.5">
                Skills You Feel Comfortable With ({comfortableSkills.length}):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {comfortableSkills.length > 0 ? (
                  comfortableSkills.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-md text-[11px] bg-[#F5EDF3] text-[#27845D] font-semibold border border-[#DBCBD6]">
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-[#77717A] italic">No skills marked comfortable yet.</span>
                )}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-[#F4A340] uppercase tracking-wider block mb-1.5">
                Priority Skills to Strengthen ({beginnerSkills.length}):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {beginnerSkills.length > 0 ? (
                  beginnerSkills.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-md text-[11px] bg-[#FFE7C7]/30 text-[#542744] font-semibold border border-[#FADCB3]">
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-[#77717A] italic">Keep practicing your foundational roadmap stages!</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Saved Careers */}
        <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 shadow-subtle space-y-4">
          <h3 className="font-heading font-bold text-lg text-[#542744]">
            My Saved Careers ({savedCareerIds.length})
          </h3>

          {savedCareerIds.length > 0 ? (
            <div className="space-y-2.5">
              {savedCareerIds.map((id) => {
                const c = SEED_CAREERS.find((item) => item.id === id);
                if (!c) return null;
                return (
                  <div
                    key={id}
                    className="p-3 rounded-xl bg-[#FFFCF7] border border-[#EDE5E8] flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[#542744]">
                        {c.title}
                      </h4>
                      <span className="text-[11px] text-[#77717A]">{c.tagline}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <Link
                        to={`/careers/${c.id}`}
                        className="px-2.5 py-1 rounded-lg bg-[#F5EDF3] text-[#542744] font-semibold hover:bg-[#EDE5E8]"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleRemoveSaved(c.id)}
                        className="p-1 text-[#77717A] hover:text-[#C54A4A]"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-[#77717A] italic">
              No saved careers yet. Explore the <Link to="/careers" className="text-[#542744] underline font-semibold">Career Explorer</Link> and bookmark roles you like.
            </p>
          )}
        </div>
      </div>

      {/* Submitted Enquiries & Mentorship Status */}
      <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-8 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-xl text-[#542744]">
            My Guidance Enquiries ({myEnquiries.length})
          </h3>
          <Link
            to="/contact"
            className="text-xs font-semibold text-[#542744] hover:text-[#754565] flex items-center gap-1"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>New Enquiry</span>
          </Link>
        </div>

        {myEnquiries.length > 0 ? (
          <div className="space-y-3">
            {myEnquiries.map((enq) => (
              <div
                key={enq.id}
                className="p-4 rounded-2xl bg-[#FFFCF7] border border-[#EDE5E8] space-y-2 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-sm text-[#542744]">
                      {enq.enquiryType}
                    </span>
                    <span className="text-[11px] text-[#77717A]">({enq.areaOfInterest})</span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                      enq.status === 'Resolved'
                        ? 'bg-green-100 text-[#27845D]'
                        : enq.status === 'In Progress'
                        ? 'bg-amber-100 text-[#F4A340]'
                        : enq.status === 'Contacted'
                        ? 'bg-purple-100 text-[#754565]'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {enq.status}
                  </span>
                </div>

                <p className="text-[#29232C]">{enq.message}</p>

                {enq.notes && enq.notes.length > 0 && (
                  <div className="p-2.5 bg-[#F5EDF3] rounded-xl text-[11px] text-[#542744] space-y-1">
                    <span className="font-bold block">Advisory Note from {enq.notes[0].author}:</span>
                    <p className="italic text-[#754565]">{enq.notes[0].text}</p>
                  </div>
                )}

                <span className="text-[10px] text-[#77717A] block pt-1">
                  Submitted on {new Date(enq.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#77717A] italic">
            You have not submitted any guidance requests yet.
          </p>
        )}
      </div>
    </div>
  );
};

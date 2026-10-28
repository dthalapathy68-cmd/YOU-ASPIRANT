import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { db } from '../services/db';
import { SEED_CAREERS, SEED_ROADMAPS } from '../data/seedData';
import { CareerRoadmapTemplate, StudentMilestoneState, SkillProficiency } from '../types/careerDna';
import { 
  Layers, 
  CheckCircle2, 
  Circle, 
  BarChart3, 
  BookOpen, 
  Save, 
  ArrowRight, 
  Edit3, 
  ExternalLink,
  Sparkles,
  Info,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const RoadmapPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const careerParam = searchParams.get('career') || db.getActiveCareerId() || 'frontend-developer';

  const [selectedCareerId, setSelectedCareerId] = useState<string>(careerParam);
  const [template, setTemplate] = useState<CareerRoadmapTemplate | undefined>(undefined);
  const [milestonesState, setMilestonesState] = useState<Record<string, StudentMilestoneState>>({});
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNoteText, setTempNoteText] = useState<string>('');
  const [saveBanner, setSaveBanner] = useState<string | null>(null);

  // Skill Gap Map State
  const [skillsProficiency, setSkillsProficiency] = useState<Record<string, SkillProficiency>>({});
  const [skillSavedMessage, setSkillSavedMessage] = useState(false);

  useEffect(() => {
    setSelectedCareerId(careerParam);
    const tmpl = db.getRoadmapTemplate(careerParam);
    setTemplate(tmpl);

    const progress = db.getMilestoneProgress(careerParam);
    setMilestonesState(progress);

    const skills = db.getStudentSkills(careerParam);
    setSkillsProficiency(skills);
  }, [careerParam]);

  const handleCareerChange = (newCareerId: string) => {
    setSelectedCareerId(newCareerId);
    setSearchParams({ career: newCareerId });
    db.setActiveCareerId(newCareerId);
  };

  const handleToggleComplete = (milestoneId: string) => {
    const updated = db.toggleMilestoneComplete(selectedCareerId, milestoneId);
    setMilestonesState({ ...updated });
    setSaveBanner('Progress saved');
    setTimeout(() => setSaveBanner(null), 2500);
  };

  const handleOpenNoteEditor = (milestoneId: string, currentNote: string) => {
    setEditingNotesId(milestoneId);
    setTempNoteText(currentNote || '');
  };

  const handleSaveNote = (milestoneId: string) => {
    const updated = db.saveMilestoneNotes(selectedCareerId, milestoneId, tempNoteText);
    setMilestonesState({ ...updated });
    setEditingNotesId(null);
    setSaveBanner('Note updated');
    setTimeout(() => setSaveBanner(null), 2500);
  };

  const handleSkillLevelChange = (skillName: string, level: SkillProficiency) => {
    const updated = db.updateStudentSkill(selectedCareerId, skillName, level);
    setSkillsProficiency({ ...updated });
    setSkillSavedMessage(true);
    setTimeout(() => setSkillSavedMessage(false), 2500);
  };

  // Calculations
  const allMilestones = template?.milestones || [];
  const totalMilestones = allMilestones.length;
  const completedCount = allMilestones.filter((m) => milestonesState[m.id]?.isCompleted).length;
  const progressPercentage = totalMilestones > 0 ? Math.round((completedCount / totalMilestones) * 100) : 0;

  // Next recommended milestone: the first incomplete milestone
  const nextMilestone = allMilestones.find((m) => !milestonesState[m.id]?.isCompleted);

  // Skill Gap Calculations
  const activeCareerItem = SEED_CAREERS.find((c) => c.id === selectedCareerId) || SEED_CAREERS[0];
  const requiredSkills = activeCareerItem.coreSkills;

  const comfortableCount = requiredSkills.filter((s) => skillsProficiency[s] === 'Comfortable').length;
  const familiarCount = requiredSkills.filter((s) => skillsProficiency[s] === 'Familiar').length;
  const beginnerCount = requiredSkills.filter((s) => skillsProficiency[s] === 'Beginner').length;
  const notStartedCount = requiredSkills.filter((s) => !skillsProficiency[s] || skillsProficiency[s] === 'Not Started').length;

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 md:py-16 text-left space-y-12">
      {/* Top Banner Header */}
      <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-10 shadow-elevated relative overflow-hidden">
        <div 
          className="absolute -top-12 -right-12 w-64 h-64 rounded-full filter blur-[70px] opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #F4A340 0%, #542744 70%)' }}
        />

        <div className="space-y-4 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EDF3] border border-[#DBCBD6] text-xs font-bold text-[#542744]">
              <Layers className="w-3.5 h-3.5 text-[#F4A340]" />
              <span>FuturePath Milestones & Roadmap</span>
            </div>
            {saveBanner && (
              <span className="text-xs font-bold text-[#27845D] bg-[#F5EDF3] px-3 py-1 rounded-full animate-fade-in flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                {saveBanner}
              </span>
            )}
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#542744]">
            {template?.title || 'Career Learning FuturePath'}
          </h1>

          <p className="text-sm sm:text-base text-[#77717A] max-w-2xl leading-relaxed">
            {template?.overview || 'Turn your career ambition into clear, sequential learning stages with practical beginner projects.'}
          </p>

          {/* Career Path Selector */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs font-bold text-[#29232C] uppercase tracking-wider">
              Select Career Roadmap:
            </span>
            <div className="flex flex-wrap gap-2">
              {Object.keys(SEED_ROADMAPS).map((id) => {
                const career = SEED_CAREERS.find((c) => c.id === id);
                const isSelected = selectedCareerId === id;
                return (
                  <button
                    key={id}
                    onClick={() => handleCareerChange(id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#542744] text-[#FFFCF7] shadow-sm'
                        : 'bg-[#F5EDF3] text-[#754565] hover:bg-[#EDE5E8]'
                    }`}
                  >
                    {career?.title || id}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Progress & Next Milestone Spotlight */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Progress Bar Card */}
        <div className="md:col-span-5 bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 shadow-subtle flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-[#F4A340] uppercase tracking-wider">Overall Completion</span>
            <div className="flex items-baseline justify-between mt-1 mb-2">
              <h3 className="font-heading font-extrabold text-3xl text-[#542744]">
                {progressPercentage}%
              </h3>
              <span className="text-xs text-[#77717A] font-medium">
                {completedCount} of {totalMilestones} Milestones Completed
              </span>
            </div>

            <div className="w-full h-3 bg-[#EDE5E8] rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-[#542744] to-[#F4A340] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <p className="text-xs text-[#77717A] leading-relaxed">
            Calculated directly from your active completed stages. Mark stages complete as you finish practical tasks.
          </p>
        </div>

        {/* Next Recommended Milestone Spotlight */}
        <div className="md:col-span-7 bg-[#FFFFFF] border border-[#FADCB3] rounded-card p-6 shadow-elevated relative overflow-hidden flex flex-col justify-between">
          <div 
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full filter blur-[50px] opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #F4A340 0%, transparent 70%)' }}
          />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F4A340] animate-ping" />
              <span className="text-xs font-bold text-[#542744] uppercase tracking-wider">
                Next Recommended Step
              </span>
            </div>

            {nextMilestone ? (
              <>
                <h3 className="font-heading font-bold text-xl text-[#542744] mb-1">
                  Stage {nextMilestone.stageNumber}: {nextMilestone.title}
                </h3>
                <p className="text-xs text-[#77717A] leading-relaxed mb-3">
                  {nextMilestone.description}
                </p>
                <div className="p-3 bg-[#FFE7C7]/30 border border-[#FADCB3] rounded-xl text-xs text-[#29232C]">
                  <span className="font-bold text-[#542744] block mb-0.5">Practical Task:</span>
                  <span>{nextMilestone.suggestedTask}</span>
                </div>
              </>
            ) : (
              <div className="p-4 bg-[#F5EDF3] rounded-xl text-center">
                <CheckCircle2 className="w-8 h-8 text-[#27845D] mx-auto mb-2" />
                <h4 className="font-heading font-bold text-base text-[#542744]">
                  All Milestones Completed!
                </h4>
                <p className="text-xs text-[#77717A] mt-1">
                  You have finished every stage in the {activeCareerItem.title} roadmap. Consider booking a guidance session to review your portfolio projects.
                </p>
              </div>
            )}
          </div>

          {nextMilestone && (
            <div className="pt-4 mt-4 border-t border-[#EDE5E8] flex justify-end">
              <button
                onClick={() => handleToggleComplete(nextMilestone.id)}
                className="px-4 py-2 rounded-button bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Check className="w-3.5 h-3.5 text-[#F4A340]" />
                <span>Mark Stage {nextMilestone.stageNumber} Complete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 9.2 ROADMAP STAGES LIST */}
      {/* ==================================================================== */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-[#F4A340] uppercase tracking-wider">Detailed Stages</span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#542744]">
            Roadmap Stages & Practical Tasks
          </h2>
          <p className="text-sm text-[#77717A] mt-1">
            Click checkboxes to track completion and write personal revision notes.
          </p>
        </div>

        <div className="space-y-4">
          {allMilestones.map((m) => {
            const isCompleted = Boolean(milestonesState[m.id]?.isCompleted);
            const personalNote = milestonesState[m.id]?.personalNotes || '';
            const isEditingNote = editingNotesId === m.id;

            return (
              <div
                key={m.id}
                className={`bg-[#FFFFFF] border rounded-card p-6 transition-all ${
                  isCompleted
                    ? 'border-[#27845D]/40 bg-[#FFFFFF] shadow-subtle'
                    : 'border-[#EDE5E8] shadow-subtle hover:border-[#DBCBD6]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Completion Toggle Button */}
                    <button
                      onClick={() => handleToggleComplete(m.id)}
                      className={`w-7 h-7 rounded-xl border shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-[#27845D] border-[#27845D] text-white shadow-sm'
                          : 'border-[#DBCBD6] hover:border-[#542744] bg-[#FFFCF7]'
                      }`}
                      title={isCompleted ? 'Click to reopen milestone' : 'Click to mark complete'}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <Circle className="w-3 h-3 text-transparent" />
                      )}
                    </button>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F5EDF3] text-[#542744]">
                          Stage {m.stageNumber}
                        </span>
                        {m.prerequisites && (
                          <span className="text-[11px] text-[#77717A]">
                            Prereq: {m.prerequisites}
                          </span>
                        )}
                      </div>

                      <h3 className={`font-heading font-bold text-lg ${isCompleted ? 'text-[#27845D]' : 'text-[#542744]'}`}>
                        {m.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#77717A] leading-relaxed">
                        {m.description}
                      </p>

                      {/* Skills to learn */}
                      <div className="space-y-1 pt-1">
                        <span className="text-[11px] font-semibold text-[#29232C] block">Skills Covered:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {m.skillsToLearn.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-0.5 rounded-md text-[11px] bg-[#FFFCF7] border border-[#EDE5E8] text-[#542744] font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Practical Task */}
                      <div className="p-3 bg-[#FFFCF7] border border-[#EDE5E8] rounded-xl text-xs space-y-1">
                        <span className="font-bold text-[#542744] block">Suggested Practical Task:</span>
                        <p className="text-[#29232C]">{m.suggestedTask}</p>
                      </div>

                      {/* Recommended Resources if present */}
                      {m.recommendedResources && m.recommendedResources.length > 0 && (
                        <div className="pt-1 flex flex-wrap gap-2 text-xs">
                          {m.recommendedResources.map((res) => (
                            <span
                              key={res.title}
                              className="px-2 py-1 rounded-md bg-[#F5EDF3] text-[#754565] text-[11px] flex items-center gap-1"
                            >
                              <BookOpen className="w-3 h-3 text-[#F4A340]" />
                              <span>{res.title} ({res.type})</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right side: Notes toggle */}
                  <div className="shrink-0 sm:self-start">
                    <button
                      onClick={() => handleOpenNoteEditor(m.id, personalNote)}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium text-[#754565] bg-[#F5EDF3] hover:bg-[#EDE5E8] flex items-center gap-1 transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#542744]" />
                      <span>{personalNote ? 'Edit Notes' : 'Add Note'}</span>
                    </button>
                  </div>
                </div>

                {/* Inline Note Editor */}
                {isEditingNote && (
                  <div className="mt-4 pt-4 border-t border-[#EDE5E8] space-y-2">
                    <label className="text-xs font-bold text-[#542744] block">
                      Personal Notes for Stage {m.stageNumber}:
                    </label>
                    <textarea
                      value={tempNoteText}
                      onChange={(e) => setTempNoteText(e.target.value)}
                      placeholder="e.g. Completed tutorials on Flexbox. Need to practice sticky headers before next stage..."
                      className="w-full p-3 rounded-xl border border-[#DBCBD6] bg-[#FFFCF7] text-xs text-[#29232C] focus:outline-none focus:border-[#542744]"
                      rows={2}
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSaveNote(m.id)}
                        className="px-3.5 py-1.5 rounded-button bg-[#542744] text-[#FFFCF7] text-xs font-semibold"
                      >
                        Save Note
                      </button>
                      <button
                        onClick={() => setEditingNotesId(null)}
                        className="px-3 py-1.5 rounded-button text-xs font-medium text-[#77717A] hover:bg-[#F5EDF3]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Display Saved Note */}
                {!isEditingNote && personalNote && (
                  <div className="mt-3 p-3 rounded-xl bg-[#F5EDF3]/60 border border-[#DBCBD6] text-xs text-[#29232C]">
                    <span className="font-bold text-[#542744] block mb-0.5">My Note:</span>
                    <p className="italic text-[#77717A]">{personalNote}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SECTION 10: SKILL GAP MAP */}
      {/* ==================================================================== */}
      <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-9 shadow-elevated space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EDE5E8] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE7C7] border border-[#FADCB3] text-xs font-bold text-[#542744] mb-2">
              <BarChart3 className="w-3.5 h-3.5 text-[#F4A340]" />
              <span>Interactive Skill Gap Engine</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#542744]">
              Skill Gap Map for {activeCareerItem.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#77717A] mt-1">
              Select your current proficiency level for each foundational skill to identify strengths and learning gaps.
            </p>
          </div>

          {skillSavedMessage && (
            <span className="text-xs font-bold text-[#27845D] bg-[#F5EDF3] px-3 py-1.5 rounded-full flex items-center gap-1 animate-fade-in">
              <Check className="w-3.5 h-3.5" />
              <span>Skills updated in storage</span>
            </span>
          )}
        </div>

        {/* Skill Gap Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-4 rounded-2xl bg-[#F5EDF3] border border-[#DBCBD6]">
            <span className="text-[11px] font-semibold text-[#754565] block uppercase">Comfortable</span>
            <span className="font-heading font-extrabold text-2xl text-[#27845D]">{comfortableCount}</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#F5EDF3] border border-[#DBCBD6]">
            <span className="text-[11px] font-semibold text-[#754565] block uppercase">Familiar</span>
            <span className="font-heading font-extrabold text-2xl text-[#542744]">{familiarCount}</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#FFE7C7]/40 border border-[#FADCB3]">
            <span className="text-[11px] font-semibold text-[#754565] block uppercase">Beginner</span>
            <span className="font-heading font-extrabold text-2xl text-[#F4A340]">{beginnerCount}</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#FFFCF7] border border-[#EDE5E8]">
            <span className="text-[11px] font-semibold text-[#77717A] block uppercase">Not Started</span>
            <span className="font-heading font-extrabold text-2xl text-[#77717A]">{notStartedCount}</span>
          </div>
        </div>

        {/* Interactive Skill Level Selectors */}
        <div className="space-y-3">
          <div className="grid grid-cols-12 text-xs font-bold text-[#77717A] px-4 uppercase tracking-wider pb-1">
            <span className="col-span-12 sm:col-span-5">Required Skill</span>
            <span className="col-span-12 sm:col-span-7">My Current Proficiency</span>
          </div>

          {requiredSkills.map((skillName) => {
            const currentLevel = skillsProficiency[skillName] || 'Not Started';
            return (
              <div
                key={skillName}
                className="grid grid-cols-12 items-center gap-3 p-4 rounded-2xl border border-[#EDE5E8] bg-[#FFFCF7] hover:bg-[#FFFFFF] transition-all"
              >
                <div className="col-span-12 sm:col-span-5">
                  <h4 className="font-heading font-bold text-sm text-[#542744]">
                    {skillName}
                  </h4>
                </div>

                <div className="col-span-12 sm:col-span-7 flex flex-wrap gap-1.5">
                  {(['Not Started', 'Beginner', 'Familiar', 'Comfortable'] as SkillProficiency[]).map((level) => {
                    const isSelected = currentLevel === level;
                    return (
                      <button
                        key={level}
                        onClick={() => handleSkillLevelChange(skillName, level)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          isSelected
                            ? level === 'Comfortable'
                              ? 'bg-[#27845D] text-white shadow-sm'
                              : level === 'Familiar'
                              ? 'bg-[#542744] text-white shadow-sm'
                              : level === 'Beginner'
                              ? 'bg-[#F4A340] text-white shadow-sm'
                              : 'bg-[#77717A] text-white shadow-sm'
                            : 'bg-[#F5EDF3] text-[#77717A] hover:bg-[#EDE5E8]'
                        }`}
                      >
                        {level}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer on Self-Reported Skills */}
        <div className="p-4 rounded-2xl bg-[#F5EDF3] text-xs text-[#754565] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#542744] shrink-0 mt-0.5" />
          <span>
            <strong>Transparency Notice:</strong> Skill ratings reflect your self-reported familiarity and are used to highlight where to begin on your learning path. They are not independently verified assessments.
          </span>
        </div>
      </div>

      {/* Guidance CTA */}
      <div className="p-6 sm:p-8 rounded-card bg-[#542744] text-[#FFFCF7] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-heading font-bold text-xl text-[#FFFCF7]">
            Need a mentor to review your {activeCareerItem.title} roadmap?
          </h3>
          <p className="text-xs text-[#FFD49A] mt-1">
            Connect with our advisory team to discuss milestone pacing, projects, and cohorts.
          </p>
        </div>

        <Link
          to={`/contact?interest=${encodeURIComponent(activeCareerItem.title)}`}
          className="px-6 py-3 rounded-button bg-[#F4A340] hover:bg-[#FFD49A] text-[#542744] font-bold text-xs sm:text-sm shrink-0 transition-all"
        >
          Request Guidance
        </Link>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../services/db';
import { AssessmentResultData, CareerMatch } from '../types/careerDna';
import { DIMENSIONS } from '../services/scoringEngine';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { 
  Sparkles, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  BookOpen, 
  UserCheck, 
  Send, 
  RotateCcw,
  Info,
  ExternalLink,
  Save,
  MessageSquare
} from 'lucide-react';

export const AssessmentResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<AssessmentResultData | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const currentUser = db.getCurrentUser();

  useEffect(() => {
    const latest = db.getLatestAssessmentResult();
    if (!latest) {
      // If no result exists yet, redirect to assessment
      navigate('/assessment');
    } else {
      setResult(latest);
    }
  }, [navigate]);

  if (!result) {
    return (
      <div className="max-w-[800px] mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#542744] border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-sm text-[#77717A]">Calculating your Career DNA profile...</p>
      </div>
    );
  }

  // Prepare chart data for Recharts
  const chartData = Object.entries(result.scores).map(([key, score]) => ({
    dimension: DIMENSIONS[key as keyof typeof DIMENSIONS]?.label.split('&')[0].trim() || key,
    score,
    key,
    color: DIMENSIONS[key as keyof typeof DIMENSIONS]?.color || '#542744',
  }));

  const handleSaveResults = () => {
    if (!currentUser) {
      // Redirect to register/login with return URL
      navigate('/student/login?redirect=/assessment/results');
    } else {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleBuildRoadmap = (careerId: string) => {
    db.setActiveCareerId(careerId);
    navigate(`/roadmap?career=${careerId}`);
  };

  const handleRequestGuidance = (careerTitle: string) => {
    navigate(`/contact?enquiryType=Career+Guidance&interest=${encodeURIComponent(careerTitle)}&ref=${result.id}`);
  };

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-10 md:py-16 text-left space-y-12">
      {/* Top Banner Header */}
      <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-10 shadow-elevated relative overflow-hidden">
        {/* Ambient Warm Sunlight Glow */}
        <div 
          className="absolute top-0 right-0 w-72 h-72 rounded-full filter blur-[75px] opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #F4A340 0%, #542744 75%)' }}
        />

        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EDF3] border border-[#DBCBD6] text-xs font-bold text-[#542744]">
            <Sparkles className="w-3.5 h-3.5 text-[#F4A340]" />
            <span>Assessment Synthesis Completed</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#542744]">
            Your Career DNA Report
          </h1>

          <p className="text-sm sm:text-base text-[#77717A] leading-relaxed">
            Based on your answers, here is your interest profile, suggested career directions with transparent matching rationales, and recommended next learning steps.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <span className="font-semibold text-[#542744] bg-[#F5EDF3] px-3 py-1.5 rounded-xl border border-[#EDE5E8]">
              Primary Strength: {result.primaryDimensions[0].label} ({result.primaryDimensions[0].score}%)
            </span>
            <span className="text-[#77717A] font-medium">
              Generated {new Date(result.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SECTION A: CAREER DNA PROFILE (Interest Dimension Chart) */}
      {/* ==================================================================== */}
      <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-8 shadow-subtle space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EDE5E8] gap-2">
          <div>
            <span className="text-xs font-bold text-[#F4A340] uppercase tracking-wider">Dimension Breakdown</span>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#542744]">
              Career DNA Dimension Scores
            </h2>
          </div>
          <span className="text-xs text-[#77717A]">
            Normalized 0–100 score distribution
          </span>
        </div>

        {/* Recharts Accessible Bar Chart */}
        <div className="h-[280px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#77717A' }} />
              <YAxis 
                type="category" 
                dataKey="dimension" 
                width={130} 
                tick={{ fontSize: 12, fill: '#29232C', fontWeight: 500 }} 
              />
              <Tooltip
                formatter={(val: any) => [`${val}%`, 'Interest Alignment']}
                contentStyle={{
                  backgroundColor: '#FFFCF7',
                  borderColor: '#EDE5E8',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(84, 39, 68, 0.08)',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="score" radius={[0, 8, 8, 0]}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 0 ? '#542744' : index === 1 ? '#F4A340' : '#A984A1'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          {result.primaryDimensions.map((d, i) => (
            <div key={d.key} className="p-3 rounded-xl bg-[#F5EDF3] border border-[#DBCBD6]">
              <span className="font-bold text-[#542744] block">
                #{i + 1} {d.label}
              </span>
              <span className="text-[#77717A] text-[11px]">Score: {d.score}% · Primary Driver</span>
            </div>
          ))}
          {result.secondaryDimensions.map((d, i) => (
            <div key={d.key} className="p-3 rounded-xl bg-[#FFFCF7] border border-[#EDE5E8]">
              <span className="font-semibold text-[#754565] block">
                Secondary: {d.label}
              </span>
              <span className="text-[#77717A] text-[11px]">Score: {d.score}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SECTION B: PRIMARY CAREER MATCHES (Top 3) */}
      {/* ==================================================================== */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-[#F4A340] uppercase tracking-wider">Curated Fit</span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#542744]">
            Primary Career Recommendations
          </h2>
          <p className="text-sm text-[#77717A] mt-1">
            These roles align closely with your top interest dimensions and problem-solving habits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {result.recommendedCareers.map((career, index) => (
            <div
              key={career.careerId}
              className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F5EDF3] text-[#542744]">
                    #{index + 1} Best Fit · {career.matchScore}%
                  </span>
                  <span className="text-[11px] text-[#77717A] font-medium">{career.categoryName}</span>
                </div>

                <h3 className="font-heading font-bold text-lg text-[#542744] mb-2">
                  {career.title}
                </h3>

                {/* Explainable Matching Rationale */}
                <div className="p-3 rounded-xl bg-[#FFFCF7] border border-[#EDE5E8] text-xs text-[#29232C] mb-4">
                  <span className="font-bold text-[#542744] block mb-1">Why this matches:</span>
                  <p className="text-[#77717A] leading-relaxed">
                    {career.whyMatch}
                  </p>
                </div>

                {/* Core Skills */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[11px] font-bold text-[#29232C] block">Skills to Learn:</span>
                  <div className="flex flex-wrap gap-1">
                    {career.coreSkills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded text-[10px] bg-[#F5EDF3] text-[#542744] border border-[#DBCBD6]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Starter Project */}
                <div className="mb-6">
                  <span className="text-[11px] font-bold text-[#29232C] block mb-1">Suggested Starter Task:</span>
                  <p className="text-xs text-[#77717A] italic">
                    {career.suggestedStarterActivity}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#EDE5E8] space-y-2">
                <button
                  onClick={() => handleBuildRoadmap(career.careerId)}
                  className="w-full py-2.5 px-4 rounded-button bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Layers className="w-3.5 h-3.5 text-[#F4A340]" />
                  <span>Build My FuturePath</span>
                </button>
                <Link
                  to={`/careers/${career.careerId}`}
                  className="w-full py-2 px-3 rounded-button bg-[#F5EDF3] hover:bg-[#EDE5E8] text-[#542744] text-xs font-medium text-center block transition-colors"
                >
                  View Career Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SECTION C & D: ALTERNATIVE PATHS & INFERRED LEARNING PREFERENCE */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Alternative Paths (Col 7) */}
        <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-7 shadow-subtle space-y-4">
          <div>
            <span className="text-xs font-bold text-[#F4A340] uppercase tracking-wider">Exploratory Horizons</span>
            <h3 className="font-heading font-bold text-xl text-[#542744]">
              Alternative Career Possibilities
            </h3>
            <p className="text-xs text-[#77717A] mt-0.5">
              Additional directions aligned with your secondary interest dimensions.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {result.alternativeCareers.map((career) => (
              <div
                key={career.careerId}
                className="p-4 rounded-2xl bg-[#FFFCF7] border border-[#EDE5E8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#DBCBD6] transition-all"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-bold text-base text-[#542744]">
                      {career.title}
                    </h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F5EDF3] text-[#754565]">
                      {career.matchScore}% Match
                    </span>
                  </div>
                  <p className="text-xs text-[#77717A] mt-1 max-w-md">
                    {career.whyMatch.split('. ')[0]}.
                  </p>
                </div>

                <button
                  onClick={() => handleBuildRoadmap(career.careerId)}
                  className="px-3.5 py-2 rounded-button bg-[#F5EDF3] hover:bg-[#542744] text-[#542744] hover:text-[#FFFCF7] text-xs font-semibold transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <span>View Path</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Inferred Learning Style (Col 5) */}
        <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-7 shadow-subtle space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFE7C7] flex items-center justify-center text-[#542744]">
              <BookOpen className="w-5 h-5 text-[#542744]" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#F4A340] uppercase tracking-wider">Inferred Preference</span>
              <h3 className="font-heading font-bold text-lg text-[#542744]">
                {result.learningPreference}
              </h3>
            </div>
          </div>

          <p className="text-xs text-[#29232C] leading-relaxed">
            {result.learningPreferenceExplanation}
          </p>

          <div className="p-3 bg-[#F5EDF3] rounded-xl text-[11px] text-[#754565] flex items-start gap-2">
            <Info className="w-4 h-4 text-[#542744] shrink-0 mt-0.5" />
            <span>
              This is a self-reported preference inferred from your quiz choices, not a rigid learning-style diagnosis. Feel free to adapt methods as you discover new tools.
            </span>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SECTION E: SKILL STARTER MAP */}
      {/* ==================================================================== */}
      <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-8 shadow-subtle space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EDE5E8] gap-2">
          <div>
            <span className="text-xs font-bold text-[#F4A340] uppercase tracking-wider">First Steps</span>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#542744]">
              Skill Starter Map for {result.recommendedCareers[0]?.title}
            </h3>
          </div>
          <Link
            to={`/roadmap?career=${result.recommendedCareers[0]?.careerId}`}
            className="text-xs font-semibold text-[#542744] hover:text-[#754565] flex items-center gap-1"
          >
            <span>Open Interactive Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {result.starterSkills.map((skill, idx) => (
            <div
              key={skill.name}
              className="p-4 rounded-2xl bg-[#FFFCF7] border border-[#EDE5E8] text-left space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F4A340]">
                  Milestone 0{idx + 1}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#27845D]" />
              </div>
              <h4 className="font-heading font-bold text-sm text-[#542744]">
                {skill.name}
              </h4>
              <p className="text-[11px] text-[#77717A]">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SECTION F: ACTION BAR & GUIDANCE REQUEST */}
      {/* ==================================================================== */}
      <div className="bg-[#542744] rounded-card p-6 sm:p-10 text-[#FFFCF7] shadow-floating flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-heading font-bold text-2xl text-[#FFFCF7]">
            Want help turning your results into a practical plan?
          </h3>
          <p className="text-xs sm:text-sm text-[#FFD49A]">
            Discuss your Career DNA with our student guidance advisors or save your results to your profile.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <button
            onClick={() => handleRequestGuidance(result.recommendedCareers[0]?.title)}
            className="px-5 py-3 rounded-button bg-[#F4A340] hover:bg-[#FFD49A] text-[#542744] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
          >
            <MessageSquare className="w-4 h-4 text-[#542744]" />
            <span>Request Personalised Guidance</span>
          </button>

          <button
            onClick={handleSaveResults}
            className="px-5 py-3 rounded-button bg-[#754565] hover:bg-[#A984A1] text-[#FFFCF7] font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all border border-[#A984A1]/40"
          >
            <Save className="w-4 h-4" />
            <span>{saveSuccess ? 'Saved to Profile!' : 'Save My Results'}</span>
          </button>

          <Link
            to="/careers"
            className="px-4 py-3 rounded-button bg-transparent hover:bg-white/10 text-xs font-medium text-white/90"
          >
            Explore More Careers
          </Link>
        </div>
      </div>
    </div>
  );
};

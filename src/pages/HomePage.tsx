import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CareerDnaHeroVisual } from '../components/CareerDnaHeroVisual';
import { SEED_CATEGORIES, SEED_TRAINING_PROGRAMS, SEED_TESTIMONIALS } from '../data/seedData';
import { 
  Compass, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Code2, 
  Palette, 
  BarChart3, 
  Briefcase, 
  Megaphone, 
  Cpu,
  Layers,
  MapPin,
  TrendingUp,
  BookOpen,
  HelpCircle,
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5 text-[#542744]" />,
  Palette: <Palette className="w-5 h-5 text-[#542744]" />,
  BarChart3: <BarChart3 className="w-5 h-5 text-[#542744]" />,
  Briefcase: <Briefcase className="w-5 h-5 text-[#542744]" />,
  Megaphone: <Megaphone className="w-5 h-5 text-[#542744]" />,
  Cpu: <Cpu className="w-5 h-5 text-[#542744]" />,
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDirection, setSelectedDirection] = useState<'create' | 'build' | 'analyse'>('build');

  const handleStartWithPrefill = () => {
    navigate(`/assessment?prefill=${selectedDirection}`);
  };

  return (
    <div className="relative z-10 space-y-24 md:space-y-32 pb-24">
      {/* ==================================================================== */}
      {/* 7.2 HERO SECTION */}
      {/* ==================================================================== */}
      <section className="pt-6 sm:pt-12 md:pt-16 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EDF3] border border-[#DBCBD6] text-xs font-bold tracking-wider text-[#542744] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#F4A340]" />
              <span>YOUR FUTURE, MORE CLEARLY</span>
            </div>

            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#542744] tracking-tight leading-[1.12]">
              Your Potential Has a Direction.
            </h1>

            <p className="text-base sm:text-lg text-[#77717A] max-w-xl leading-relaxed">
              Discover your interests, explore career possibilities, and build a personalised learning path designed around your goals.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/assessment"
                className="px-6 py-3.5 rounded-button bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] text-base font-semibold text-center flex items-center justify-center gap-2.5 shadow-md hover:shadow-plum-glow transition-all group"
              >
                <Compass className="w-5 h-5 text-[#F4A340] group-hover:rotate-45 transition-transform duration-300" />
                <span>Discover My Career</span>
              </Link>

              <Link
                to="/careers"
                className="px-6 py-3.5 rounded-button bg-[#FFFFFF] hover:bg-[#F5EDF3] border border-[#EDE5E8] text-[#542744] text-base font-semibold text-center flex items-center justify-center gap-2 transition-all hover:border-[#DBCBD6]"
              >
                <span>Explore Career Paths</span>
                <ArrowRight className="w-4 h-4 text-[#754565]" />
              </Link>
            </div>

            <p className="text-xs text-[#77717A] font-medium pt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#27845D]" />
              <span>Start with your interests. Move forward with clarity.</span>
            </p>
          </div>

          {/* Right Column: Signature Career DNA Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <CareerDnaHeroVisual />
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7.3 QUICK ASSESSMENT PREVIEW */}
      {/* ==================================================================== */}
      <section className="max-w-[1000px] mx-auto px-4 sm:px-6">
        <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-8 shadow-elevated text-center relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-2 mb-6">
            <span className="text-xs font-bold text-[#F4A340] uppercase tracking-wider">Interactive Discovery</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#542744]">
              Which direction feels right for you?
            </h2>
            <p className="text-sm text-[#77717A]">
              Select an exploratory interest below to preview your initial path.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
            {/* Option 1: Create and Design */}
            <button
              onClick={() => setSelectedDirection('create')}
              className={`p-5 rounded-2xl border transition-all text-left relative ${
                selectedDirection === 'create'
                  ? 'bg-[#F5EDF3] border-[#542744] shadow-subtle'
                  : 'bg-[#FFFCF7] border-[#EDE5E8] hover:border-[#DBCBD6]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#EDE5E8] flex items-center justify-center mb-3">
                <Palette className="w-5 h-5 text-[#542744]" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#542744] mb-1">
                Create and Design
              </h3>
              <p className="text-xs text-[#77717A] leading-relaxed">
                Visual interfaces, human empathy, user experiences, and creative storytelling.
              </p>
              {selectedDirection === 'create' && (
                <div className="absolute top-4 right-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#542744] block" />
                </div>
              )}
            </button>

            {/* Option 2: Build and Solve */}
            <button
              onClick={() => setSelectedDirection('build')}
              className={`p-5 rounded-2xl border transition-all text-left relative ${
                selectedDirection === 'build'
                  ? 'bg-[#F5EDF3] border-[#542744] shadow-subtle'
                  : 'bg-[#FFFCF7] border-[#EDE5E8] hover:border-[#DBCBD6]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#EDE5E8] flex items-center justify-center mb-3">
                <Code2 className="w-5 h-5 text-[#542744]" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#542744] mb-1">
                Build and Solve
              </h3>
              <p className="text-xs text-[#77717A] leading-relaxed">
                Programming logic, digital tools, web products, algorithms, and practical automation.
              </p>
              {selectedDirection === 'build' && (
                <div className="absolute top-4 right-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#542744] block" />
                </div>
              )}
            </button>

            {/* Option 3: Analyse and Discover */}
            <button
              onClick={() => setSelectedDirection('analyse')}
              className={`p-5 rounded-2xl border transition-all text-left relative ${
                selectedDirection === 'analyse'
                  ? 'bg-[#F5EDF3] border-[#542744] shadow-subtle'
                  : 'bg-[#FFFCF7] border-[#EDE5E8] hover:border-[#DBCBD6]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#EDE5E8] flex items-center justify-center mb-3">
                <BarChart3 className="w-5 h-5 text-[#542744]" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#542744] mb-1">
                Analyse and Discover
              </h3>
              <p className="text-xs text-[#77717A] leading-relaxed">
                Statistical data, trends, research evidence, and strategic business planning.
              </p>
              {selectedDirection === 'analyse' && (
                <div className="absolute top-4 right-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#542744] block" />
                </div>
              )}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleStartWithPrefill}
              className="w-full sm:w-auto px-7 py-3 rounded-button bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] text-sm font-semibold shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <span>Continue My Discovery</span>
              <ArrowRight className="w-4 h-4 text-[#F4A340]" />
            </button>
            <span className="text-xs text-[#77717A]">
              15 guided questions · Free exploratory guidance
            </span>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7.4 HOW IT WORKS */}
      {/* ==================================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold text-[#F4A340] uppercase tracking-wider">Clear & Structured</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#542744]">
            How You Aspirant Works
          </h2>
          <p className="text-sm text-[#77717A]">
            A beginner-friendly three-step journey to find clarity and move towards purposeful skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-7 shadow-subtle text-left relative group hover:border-[#DBCBD6] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#F5EDF3] border border-[#DBCBD6] flex items-center justify-center text-base font-bold font-heading text-[#542744] mb-5">
              01
            </div>
            <h3 className="font-heading font-bold text-xl text-[#542744] mb-2">
              Discover Yourself
            </h3>
            <p className="text-sm text-[#77717A] leading-relaxed mb-4">
              Answer structured questions about your interests, preferred activities, problem-solving habits, and learning style.
            </p>
            <div className="text-xs text-[#542744] font-semibold flex items-center gap-1.5 pt-2 border-t border-[#EDE5E8]">
              <Compass className="w-3.5 h-3.5 text-[#F4A340]" />
              <span>Career DNA Assessment</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-7 shadow-subtle text-left relative group hover:border-[#DBCBD6] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FFE7C7] border border-[#FADCB3] flex items-center justify-center text-base font-bold font-heading text-[#542744] mb-5">
              02
            </div>
            <h3 className="font-heading font-bold text-xl text-[#542744] mb-2">
              Explore Your Possibilities
            </h3>
            <p className="text-sm text-[#77717A] leading-relaxed mb-4">
              Review explainable career paths that align with your responses, complete with skill breakdowns and starter practice projects.
            </p>
            <div className="text-xs text-[#542744] font-semibold flex items-center gap-1.5 pt-2 border-t border-[#EDE5E8]">
              <TrendingUp className="w-3.5 h-3.5 text-[#F4A340]" />
              <span>Personalised Recommendations</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-7 shadow-subtle text-left relative group hover:border-[#DBCBD6] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#F5EDF3] border border-[#DBCBD6] flex items-center justify-center text-base font-bold font-heading text-[#542744] mb-5">
              03
            </div>
            <h3 className="font-heading font-bold text-xl text-[#542744] mb-2">
              Build Your FuturePath
            </h3>
            <p className="text-sm text-[#77717A] leading-relaxed mb-4">
              Turn your career direction into manageable learning milestones, complete hands-on tasks, track skill gaps, and save your progress.
            </p>
            <div className="text-xs text-[#542744] font-semibold flex items-center gap-1.5 pt-2 border-t border-[#EDE5E8]">
              <Layers className="w-3.5 h-3.5 text-[#F4A340]" />
              <span>FuturePath Milestones & Map</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7.5 CAREER CATEGORIES */}
      {/* ==================================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2 text-left">
            <span className="text-xs font-bold text-[#F4A340] uppercase tracking-wider">Diverse Horizons</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#542744]">
              Explore Career Disciplines
            </h2>
            <p className="text-sm text-[#77717A]">
              Designed for school and college students looking for direction across technical and creative fields.
            </p>
          </div>
          <Link
            to="/careers"
            className="text-sm font-semibold text-[#542744] hover:text-[#754565] flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>View All Profiles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEED_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between text-left group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#F5EDF3] border border-[#EDE5E8] flex items-center justify-center mb-4 group-hover:bg-[#542744] transition-colors">
                  <div className="group-hover:text-white transition-colors">
                    {ICON_MAP[category.iconName] || <Briefcase className="w-5 h-5 text-[#542744]" />}
                  </div>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#542744] mb-2">
                  {category.name}
                </h3>
                <p className="text-xs text-[#77717A] leading-relaxed mb-4">
                  {category.description}
                </p>

                <div className="space-y-1 mb-6">
                  <span className="text-[11px] font-semibold text-[#29232C] block uppercase tracking-wider">
                    Example Roles:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {category.exampleRoles.map((role) => (
                      <span
                        key={role}
                        className="px-2 py-0.5 rounded-md text-[11px] bg-[#FFFCF7] border border-[#EDE5E8] text-[#754565]"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                to={`/careers?category=${category.id}`}
                className="w-full py-2.5 px-4 rounded-button bg-[#F5EDF3] hover:bg-[#542744] text-[#542744] hover:text-[#FFFCF7] text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <span>Explore {category.name.split(' ')[0]}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7.6 SIGNATURE FEATURE SECTION */}
      {/* ==================================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold text-[#F4A340] uppercase tracking-wider">Core Pillars</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#542744]">
            Your interests are the beginning. Your roadmap is the next step.
          </h2>
          <p className="text-sm text-[#77717A]">
            Three connected features working together to transform uncertainty into practical learning milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Card 1: CAREER DNA */}
          <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-7 shadow-subtle text-left flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#F5EDF3] flex items-center justify-center text-[#542744] mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F4A340]">Feature 01</span>
              <h3 className="font-heading font-bold text-xl text-[#542744] mt-1 mb-2">
                Career DNA
              </h3>
              <p className="text-sm text-[#77717A] leading-relaxed mb-4">
                Understand your underlying interest patterns, cognitive problem-solving preferences, and learning style without confusing technical jargon.
              </p>
            </div>
            <Link
              to="/assessment"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#542744] hover:text-[#754565]"
            >
              <span>Take Assessment</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F4A340]" />
            </Link>
          </div>

          {/* Card 2: SKILL GAP MAP (with restrained amber glow) */}
          <div className="relative bg-[#FFFFFF] border border-[#FADCB3] rounded-card p-7 shadow-elevated text-left flex flex-col justify-between overflow-hidden">
            <div 
              className="absolute -top-10 -right-10 w-44 h-44 rounded-full filter blur-[50px] opacity-40 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(244, 163, 64, 0.7) 0%, transparent 70%)' }}
            />
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#FFE7C7] flex items-center justify-center text-[#F4A340] mb-4">
                <BarChart3 className="w-5 h-5 text-[#542744]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#542744]">Feature 02</span>
              <h3 className="font-heading font-bold text-xl text-[#542744] mt-1 mb-2">
                Skill Gap Map
              </h3>
              <p className="text-sm text-[#77717A] leading-relaxed mb-4">
                Compare your current abilities against essential foundational skills for any target career. Rate yourself across 4 levels and see your exact next priority.
              </p>
            </div>
            <Link
              to="/roadmap"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#542744] hover:text-[#754565]"
            >
              <span>View Skill Map</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F4A340]" />
            </Link>
          </div>

          {/* Card 3: FUTUREPATH */}
          <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-7 shadow-subtle text-left flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#F5EDF3] flex items-center justify-center text-[#542744] mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F4A340]">Feature 03</span>
              <h3 className="font-heading font-bold text-xl text-[#542744] mt-1 mb-2">
                FuturePath Roadmap
              </h3>
              <p className="text-sm text-[#77717A] leading-relaxed mb-4">
                Turn a long-term career goal into a sequence of manageable, achievable learning milestones with clear practice tasks and progress percentages.
              </p>
            </div>
            <Link
              to="/roadmap"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#542744] hover:text-[#754565]"
            >
              <span>Explore Roadmaps</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F4A340]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7.7 SAMPLE CAREER DNA REPORT */}
      {/* ==================================================================== */}
      <section className="max-w-[1000px] mx-auto px-4 sm:px-6">
        <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-10 shadow-elevated text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EDE5E8] gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#F4A340] uppercase tracking-wider">Example Report Preview</span>
              <h3 className="font-heading font-bold text-2xl text-[#542744]">
                Sample Career DNA & FuturePath Brief
              </h3>
            </div>
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#F5EDF3] text-[#542744] border border-[#DBCBD6] self-start sm:self-auto">
              Illustrative example — actual results depend on your answers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Left: Interest Dimension Breakdown */}
            <div className="space-y-4">
              <h4 className="font-heading font-bold text-base text-[#542744]">
                Demonstrated Interest Profile
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-medium text-[#29232C] mb-1">
                    <span>Technology & Logical Thinking</span>
                    <span className="font-bold text-[#542744]">88%</span>
                  </div>
                  <div className="h-2 w-full bg-[#F5EDF3] rounded-full overflow-hidden">
                    <div className="h-full bg-[#542744] rounded-full" style={{ width: '88%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-[#29232C] mb-1">
                    <span>Creativity & Visual Design</span>
                    <span className="font-bold text-[#F4A340]">76%</span>
                  </div>
                  <div className="h-2 w-full bg-[#F5EDF3] rounded-full overflow-hidden">
                    <div className="h-full bg-[#F4A340] rounded-full" style={{ width: '76%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-[#29232C] mb-1">
                    <span>Data & Analytical Rigor</span>
                    <span className="font-bold text-[#754565]">62%</span>
                  </div>
                  <div className="h-2 w-full bg-[#F5EDF3] rounded-full overflow-hidden">
                    <div className="h-full bg-[#754565] rounded-full" style={{ width: '62%' }} />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F5EDF3] text-xs text-[#29232C] space-y-1">
                <span className="font-bold text-[#542744] block">Inferred Learning Preference:</span>
                <p className="text-[#77717A]">
                  Project-based learning · Prefers constructing interactive prototypes and debugging functional errors over passive theory.
                </p>
              </div>
            </div>

            {/* Right: Suggested Direction & Starter Milestones */}
            <div className="space-y-4">
              <h4 className="font-heading font-bold text-base text-[#542744]">
                Matched Direction: Frontend Developer
              </h4>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5 p-3 rounded-xl border border-[#EDE5E8] bg-[#FFFCF7]">
                  <CheckCircle2 className="w-4 h-4 text-[#27845D] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#542744] block">Stage 1: Web Fundamentals</span>
                    <span className="text-xs text-[#77717A]">Understand HTTP requests, DNS, and browser rendering.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl border border-[#EDE5E8] bg-[#FFFCF7]">
                  <CheckCircle2 className="w-4 h-4 text-[#27845D] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#542744] block">Stage 2: Semantic HTML5 & CSS3</span>
                    <span className="text-xs text-[#77717A]">Master responsive Flexbox, Grid, and mobile layouts.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl border border-[#FADCB3] bg-[#FFE7C7]/20">
                  <div className="w-4 h-4 rounded-full border-2 border-[#F4A340] shrink-0 mt-0.5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F4A340]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#542744] block">Stage 3: JavaScript Programming</span>
                    <span className="text-xs text-[#77717A]">Recommended next milestone: variables, functions & DOM events.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EDE5E8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#77717A]">
              Ready to generate your personal Career DNA profile?
            </span>
            <Link
              to="/assessment"
              className="px-5 py-2.5 rounded-button bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <span>Take Your Assessment</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F4A340]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7.8 TRAINING PROGRAMS PREVIEW */}
      {/* ==================================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2 text-left">
            <span className="text-xs font-bold text-[#F4A340] uppercase tracking-wider">Skill Foundations</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#542744]">
              Training Programs
            </h2>
            <p className="text-sm text-[#77717A]">
              Structured beginner and readiness programs with hands-on practice projects.
            </p>
          </div>
          <Link
            to="/training"
            className="text-sm font-semibold text-[#542744] hover:text-[#754565] flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>View All Programs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEED_TRAINING_PROGRAMS.slice(0, 3).map((program) => (
            <div
              key={program.id}
              className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F5EDF3] text-[#542744]">
                    {program.difficultyLevel}
                  </span>
                  {program.duration && (
                    <span className="text-[11px] text-[#77717A] flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-[#F4A340]" />
                      {program.duration.split('(')[0]}
                    </span>
                  )}
                </div>

                <h3 className="font-heading font-bold text-lg text-[#542744] mb-2">
                  {program.title}
                </h3>
                <p className="text-xs text-[#77717A] leading-relaxed mb-4">
                  {program.overview}
                </p>

                <div className="space-y-1.5 mb-6">
                  <span className="text-[11px] font-semibold text-[#29232C] block">Skills Covered:</span>
                  <div className="flex flex-wrap gap-1">
                    {program.skillsCovered.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-[10px] bg-[#FFFCF7] border border-[#EDE5E8] text-[#754565]"
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
                  to={`/contact?interest=${program.title}`}
                  className="py-2 px-3 rounded-button bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] text-xs font-semibold text-center transition-colors"
                >
                  Enquire
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7.9 TESTIMONIALS & SUCCESS STORIES */}
      {/* ==================================================================== */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2 text-left">
            <span className="text-xs font-bold text-[#F4A340] uppercase tracking-wider">Student Perspectives</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#542744]">
              Student Experiences
            </h2>
            <p className="text-sm text-[#77717A]">
              Real student journeys discovering their career directions through guided assessments.
            </p>
          </div>
          <Link
            to="/stories"
            className="text-sm font-semibold text-[#542744] hover:text-[#754565] flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>Explore All Stories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SEED_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 shadow-subtle text-left flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatarUrl}
                    alt={t.studentName}
                    className="w-11 h-11 rounded-full object-cover border border-[#DBCBD6]"
                  />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#542744]">
                      {t.studentName}
                    </h4>
                    <span className="text-[11px] text-[#77717A] block">
                      {t.courseCategory}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#29232C] leading-relaxed italic">
                  "{t.testimonialText}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#EDE5E8] flex items-center justify-between text-[11px] text-[#77717A]">
                <span className="flex items-center gap-1 text-[#27845D] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Feedback</span>
                </span>
                <span>{t.displayDate}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7.10 FINAL CTA */}
      {/* ==================================================================== */}
      <section className="max-w-[1000px] mx-auto px-4 sm:px-6">
        <div className="bg-[#542744] rounded-card p-8 sm:p-14 text-center text-[#FFFCF7] shadow-floating relative overflow-hidden">
          {/* Subtle Golden Glow behind CTA */}
          <div 
            className="absolute top-0 right-0 w-80 h-80 rounded-full filter blur-[80px] opacity-25 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #F4A340 0%, transparent 70%)' }}
          />

          <div className="max-w-xl mx-auto space-y-4 relative z-10">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#754565] text-[#FFD49A] inline-block">
              Begin Today
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#FFFCF7]">
              Your next step starts with understanding yourself.
            </h2>
            <p className="text-sm sm:text-base text-[#FFD49A]/90 leading-relaxed">
              Explore your interests and discover the learning paths you can begin building today.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/assessment"
                className="w-full sm:w-auto px-7 py-3.5 rounded-button bg-[#F4A340] hover:bg-[#FFD49A] text-[#542744] font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Compass className="w-4 h-4 text-[#542744]" />
                <span>Discover My Career</span>
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-7 py-3.5 rounded-button bg-[#754565] hover:bg-[#A984A1] text-[#FFFCF7] font-semibold text-sm flex items-center justify-center gap-2 transition-all border border-[#A984A1]/40"
              >
                <span>Talk to Our Team</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

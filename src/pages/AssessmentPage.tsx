import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SEED_QUESTIONS } from '../data/seedData';
import { calculateAssessmentResult } from '../services/scoringEngine';
import { db } from '../services/db';
import { 
  Compass, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw,
  Sparkles,
  ShieldCheck,
  X
} from 'lucide-react';

export const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prefill = searchParams.get('prefill');

  // Stages: 'intro' | 'questionnaire'
  const [stage, setStage] = useState<'intro' | 'questionnaire'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; optionId: string }[]>([]);
  const [exitModalOpen, setExitModalOpen] = useState(false);

  // Load any previously saved progress on mount
  useEffect(() => {
    const saved = db.getAssessmentProgress();
    if (saved && saved.answers && saved.answers.length > 0) {
      setAnswers(saved.answers);
      setCurrentIndex(saved.currentQuestionIndex || 0);
    }
  }, []);

  // Handle prefill from Homepage preview card
  useEffect(() => {
    if (prefill && stage === 'intro') {
      let initialOption = 'q1-a';
      if (prefill === 'create') initialOption = 'q1-b';
      if (prefill === 'analyse') initialOption = 'q1-c';
      setAnswers([{ questionId: 1, optionId: initialOption }]);
    }
  }, [prefill, stage]);

  const currentQuestion = SEED_QUESTIONS[currentIndex];
  const currentAnswer = answers.find((a) => a.questionId === currentQuestion?.id);
  const progressPercent = Math.round(((currentIndex + 1) / SEED_QUESTIONS.length) * 100);

  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion) return;
    const existingIndex = answers.findIndex((a) => a.questionId === currentQuestion.id);
    let updated: { questionId: number; optionId: string }[];
    if (existingIndex >= 0) {
      updated = [...answers];
      updated[existingIndex] = { questionId: currentQuestion.id, optionId };
    } else {
      updated = [...answers, { questionId: currentQuestion.id, optionId }];
    }
    setAnswers(updated);
    db.saveAssessmentProgress(currentIndex, updated);
  };

  const handleNext = () => {
    if (!currentAnswer) return;

    if (currentIndex < SEED_QUESTIONS.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      db.saveAssessmentProgress(nextIdx, answers);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Final question answered: Calculate deterministic results
      const finalResult = calculateAssessmentResult(answers);
      db.saveAssessmentResult(finalResult);
      // Automatically navigate to Results page
      navigate('/assessment/results');
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      db.saveAssessmentProgress(prevIdx, answers);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    db.clearAssessmentProgress();
    setAnswers([]);
    setCurrentIndex(0);
    setStage('intro');
    setExitModalOpen(false);
  };

  // --------------------------------------------------------------------------
  // 8.1 INTRODUCTION VIEW
  // --------------------------------------------------------------------------
  if (stage === 'intro') {
    return (
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10 md:py-16 text-left">
        <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-10 shadow-elevated space-y-8 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div 
            className="absolute -top-16 -right-16 w-60 h-60 rounded-full filter blur-[70px] opacity-25 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #F4A340 0%, #542744 70%)' }}
          />

          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5EDF3] border border-[#DBCBD6] text-xs font-bold text-[#542744]">
              <Compass className="w-3.5 h-3.5 text-[#F4A340]" />
              <span>Career DNA Discovery Engine</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#542744]">
              Career DNA Assessment
            </h1>
            <p className="text-sm sm:text-base text-[#77717A] leading-relaxed">
              Understand your natural interest patterns, problem-solving preferences, and learning style. In approximately 4 to 5 minutes, we will generate tailored career directions and foundational learning milestones.
            </p>
          </div>

          {/* Key Facts Pill Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#FFFCF7] border border-[#EDE5E8] flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F5EDF3] flex items-center justify-center text-[#542744]">
                <Clock className="w-4 h-4 text-[#F4A340]" />
              </div>
              <div>
                <span className="text-[11px] text-[#77717A] block font-medium">Estimated Time</span>
                <span className="text-sm font-bold text-[#542744]">4–5 Minutes</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFCF7] border border-[#EDE5E8] flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F5EDF3] flex items-center justify-center text-[#542744]">
                <HelpCircle className="w-4 h-4 text-[#542744]" />
              </div>
              <div>
                <span className="text-[11px] text-[#77717A] block font-medium">Questions</span>
                <span className="text-sm font-bold text-[#542744]">15 Carefully Written</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFCF7] border border-[#EDE5E8] flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFE7C7] flex items-center justify-center text-[#542744]">
                <Sparkles className="w-4 h-4 text-[#F4A340]" />
              </div>
              <div>
                <span className="text-[11px] text-[#77717A] block font-medium">What You Receive</span>
                <span className="text-sm font-bold text-[#542744]">Full DNA & Roadmap</span>
              </div>
            </div>
          </div>

          {/* What the student will receive */}
          <div className="space-y-3 pt-2">
            <h3 className="font-heading font-bold text-base text-[#542744]">
              What Your Report Includes:
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#29232C]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#27845D] shrink-0 mt-0.5" />
                <span><strong>Career DNA Profile:</strong> Visual scores across 6 core interest and thinking dimensions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#27845D] shrink-0 mt-0.5" />
                <span><strong>Explainable Career Recommendations:</strong> 3 primary matches with clear explanations of why they fit.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#27845D] shrink-0 mt-0.5" />
                <span><strong>FuturePath Learning Roadmap:</strong> Clear sequence of beginner milestones and practical projects.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#27845D] shrink-0 mt-0.5" />
                <span><strong>Inferred Learning Preference:</strong> Insights into whether project-based, visual, or structured learning suits you best.</span>
              </li>
            </ul>
          </div>

          {/* Important Transparent Disclaimer */}
          <div className="p-4 rounded-2xl bg-[#F5EDF3] border border-[#DBCBD6] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#542744] shrink-0 mt-0.5" />
            <p className="text-xs text-[#754565] leading-relaxed">
              <strong>Exploratory Guidance Notice:</strong> This assessment provides structured educational guidance based on self-reported preferences. It is not a scientifically validated psychological diagnosis or a guaranteed career prediction. Your interests can evolve over time as you gain experience.
            </p>
          </div>

          {/* Start CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#77717A]">
              No registration required to explore your results.
            </span>
            <button
              onClick={() => setStage('questionnaire')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-button bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>Start My Assessment</span>
              <ArrowRight className="w-4 h-4 text-[#F4A340]" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 8.3 QUESTIONNAIRE INTERFACE (One question at a time)
  // --------------------------------------------------------------------------
  return (
    <div className="max-w-[780px] mx-auto px-4 sm:px-6 py-8 md:py-12 text-left">
      {/* Top Controls: Exit & Restart */}
      <div className="flex items-center justify-between mb-4 text-xs">
        <button
          onClick={() => setExitModalOpen(true)}
          className="text-[#77717A] hover:text-[#542744] flex items-center gap-1 font-medium"
        >
          <X className="w-4 h-4" />
          <span>Exit Assessment</span>
        </button>

        <span className="font-semibold text-[#542744]">
          Question {currentIndex + 1} of {SEED_QUESTIONS.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-[#EDE5E8] rounded-full overflow-hidden mb-8 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-[#542744] to-[#F4A340] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-9 shadow-elevated space-y-6">
        <div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#F5EDF3] text-[#542744] inline-block mb-3">
            {currentQuestion.category}
          </span>
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#542744] leading-snug">
            {currentQuestion.question}
          </h2>
          {currentQuestion.explanationHint && (
            <p className="text-xs text-[#77717A] mt-2 italic">
              {currentQuestion.explanationHint}
            </p>
          )}
        </div>

        {/* Answer Options */}
        <div className="space-y-3 pt-2">
          {currentQuestion.options.map((option) => {
            const isSelected = currentAnswer?.optionId === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all flex items-start gap-3.5 group relative ${
                  isSelected
                    ? 'bg-[#F5EDF3] border-[#542744] shadow-subtle ring-1 ring-[#542744]'
                    : 'bg-[#FFFCF7] border-[#EDE5E8] hover:border-[#DBCBD6] hover:bg-[#FFFFFF]'
                }`}
              >
                {/* Radio Circle Indicator */}
                <div
                  className={`w-5 h-5 rounded-full border shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'border-[#542744] bg-[#542744]'
                      : 'border-[#DBCBD6] group-hover:border-[#754565]'
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-[#FFFCF7]" />}
                </div>

                <span
                  className={`text-sm sm:text-base leading-relaxed ${
                    isSelected ? 'font-semibold text-[#542744]' : 'text-[#29232C]'
                  }`}
                >
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons: Back and Next */}
        <div className="pt-6 border-t border-[#EDE5E8] flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className={`px-4 py-2.5 rounded-button text-xs font-semibold flex items-center gap-1.5 transition-all ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed text-[#77717A]'
                : 'text-[#542744] hover:bg-[#F5EDF3]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!currentAnswer}
            className={`px-6 py-3 rounded-button font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all ${
              currentAnswer
                ? 'bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] hover:shadow-plum-glow'
                : 'bg-[#EDE5E8] text-[#77717A] cursor-not-allowed'
            }`}
          >
            <span>{currentIndex === SEED_QUESTIONS.length - 1 ? 'Calculate My DNA' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4 text-[#F4A340]" />
          </button>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {exitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFCF7] border border-[#EDE5E8] rounded-card p-6 max-w-sm w-full shadow-floating space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#542744]">
              Leave Assessment?
            </h3>
            <p className="text-xs text-[#77717A] leading-relaxed">
              Your answered questions have been safely saved to your browser session. You can resume at any time.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setExitModalOpen(false)}
                className="px-4 py-2 rounded-button text-xs font-medium text-[#77717A] hover:bg-[#F5EDF3]"
              >
                Continue Quiz
              </button>
              <button
                onClick={() => {
                  setExitModalOpen(false);
                  navigate('/');
                }}
                className="px-4 py-2 rounded-button bg-[#542744] text-[#FFFCF7] text-xs font-semibold"
              >
                Exit to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

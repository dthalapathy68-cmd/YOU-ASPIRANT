import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, RotateCcw, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReadinessQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectMentor: () => void;
}

interface Question {
  id: number;
  text: string;
  category: string;
  options: {
    label: string;
    points: number;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'Pathway Clarity',
    text: 'How clearly have you mapped your target career or examination goal for the next 12 months?',
    options: [
      { label: 'Completely uncertain; exploring multiple conflicting streams.', points: 5 },
      { label: 'Broadly decided (e.g. "Software" or "Civil Services"), but no weekly roadmap.', points: 15 },
      { label: 'Clear domain chosen with a defined 6-month study and skill target.', points: 25 },
    ],
  },
  {
    id: 2,
    category: 'Proof of Work & Skills',
    text: 'Do you have tangible, portfolio-grade proof of your practical capabilities?',
    options: [
      { label: 'Only college textbook projects or generic classroom assignments.', points: 5 },
      { label: '1 or 2 small personal projects or introductory coursework certificates.', points: 15 },
      { label: 'At least 2 production-grade GitHub repos, published PRDs, or evaluated answer banks.', points: 25 },
    ],
  },
  {
    id: 3,
    category: 'Resume & Articulation',
    text: 'How confident are you in articulating your past achievements under STAR / XYZ formats?',
    options: [
      { label: 'Resume has not been updated or reviewed by an industry professional.', points: 5 },
      { label: 'Clean resume format, but struggle to speak spontaneously in mock settings.', points: 15 },
      { label: 'Single-page ATS-optimized resume with practiced storytelling.', points: 25 },
    ],
  },
  {
    id: 4,
    category: 'Mentorship & Feedback',
    text: 'Have you received direct, objective feedback from someone currently working in your target role?',
    options: [
      { label: 'No, relying entirely on YouTube, forums, and peer opinions.', points: 5 },
      { label: 'Occasional informal advice from college seniors or family members.', points: 15 },
      { label: 'Structured 1-on-1 code/case reviews with active industry practitioners.', points: 25 },
    ],
  },
];

export const ReadinessQuizModal: React.FC<ReadinessQuizModalProps> = ({
  isOpen,
  onClose,
  onConnectMentor
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSelectOption = (questionId: number, points: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: points }));
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setIsCompleted(false);
  };

  const totalScore = Object.values(selectedAnswers).reduce((a, b) => a + b, 0);

  const getScoreVerdict = (score: number) => {
    if (score >= 80) {
      return {
        level: 'Advanced Acceleration Ready',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50 border-emerald-200',
        summary: 'You have solid foundations and clear focus. Your primary focus should be high-difficulty mock simulations, system design, and competitive edge polishing.',
      };
    }
    if (score >= 50) {
      return {
        level: 'Intermediate Execution Phase',
        color: 'text-brand-coral',
        bg: 'bg-brand-coral-soft border-brand-coral/20',
        summary: 'You understand your destination, but lack verified proof of work and rigorous feedback loops. Transitioning from tutorials to building real projects is your immediate priority.',
      };
    }
    return {
      level: 'Foundational Discovery Phase',
      color: 'text-brand-midnight',
      bg: 'bg-brand-lavender/60 border-brand-lavender-border',
      summary: 'You are at a high-leverage moment! Taking an objective diagnostic now will prevent months of misdirected study and common herd-mentality pitfalls.',
    };
  };

  const currentQuestion = QUESTIONS[currentStep];
  const verdict = getScoreVerdict(totalScore);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-brand-midnight/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-modal-title"
    >
      <div 
        className="bg-brand-ivory w-full max-w-xl rounded-3xl border border-brand-ivory-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-brand-midnight text-brand-ivory px-6 py-4 flex items-center justify-between border-b border-brand-midnight-card">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-coral" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              60-Second Career Readiness Diagnostic
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-brand-muted-dark hover:text-white hover:bg-brand-midnight-card transition-colors"
            aria-label="Close Quiz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {!isCompleted ? (
            <div>
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs text-brand-muted mb-2">
                  <span className="font-mono font-bold text-brand-coral">
                    Question {currentStep + 1} of {QUESTIONS.length}
                  </span>
                  <span>{currentQuestion.category}</span>
                </div>
                <div className="w-full h-1.5 bg-brand-ivory-border rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-coral transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <h3 id="quiz-modal-title" className="text-lg sm:text-xl font-bold text-brand-midnight tracking-tight mb-6">
                {currentQuestion.text}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(currentQuestion.id, option.points)}
                    className="w-full text-left p-4 rounded-2xl bg-white hover:bg-brand-lavender/40 border border-brand-ivory-border hover:border-brand-coral/40 transition-all text-xs sm:text-sm font-medium text-brand-midnight flex items-center justify-between group shadow-subtle"
                  >
                    <span className="leading-relaxed">{option.label}</span>
                    <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand-coral group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              {/* Score Display */}
              <div className="w-24 h-24 rounded-full bg-brand-midnight text-white flex flex-col items-center justify-center mx-auto border-4 border-brand-coral shadow-lg">
                <span className="text-2xl font-black font-mono">{totalScore}</span>
                <span className="text-[10px] text-brand-ivory/70 uppercase font-mono">out of 100</span>
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-brand-coral uppercase tracking-wider block mb-1">
                  Diagnostic Result
                </span>
                <h3 className={`text-xl font-extrabold ${verdict.color}`}>
                  {verdict.level}
                </h3>
                <p className="text-xs sm:text-sm text-brand-midnight/80 mt-3 leading-relaxed max-w-md mx-auto">
                  {verdict.summary}
                </p>
              </div>

              {/* Score Action Card */}
              <div className={`p-4 rounded-2xl border text-left ${verdict.bg}`}>
                <span className="text-xs font-bold text-brand-midnight block mb-1">
                  Recommended Immediate Next Step:
                </span>
                <p className="text-xs text-brand-midnight/90 leading-relaxed">
                  Discuss this diagnostic breakdown with an official You Aspirant career mentor. We will review your current projects and design a calibrated milestone roadmap.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-brand-muted hover:text-brand-midnight bg-white rounded-xl border border-brand-ivory-border"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Diagnostic</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onConnectMentor();
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-brand-coral hover:bg-brand-coral-hover rounded-xl shadow-md transition-all"
                >
                  <Compass className="w-4 h-4" />
                  <span>Discuss Score with a Mentor</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

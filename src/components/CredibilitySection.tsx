import React from 'react';
import { ShieldCheck, Check, X, Users, Compass, BookOpen, Award } from 'lucide-react';

export const CredibilitySection: React.FC = () => {
  const comparisonData = [
    {
      factor: 'Admissions Approach',
      typicalWay: 'One-size-fits-all package pushed by sales teams before assessing aptitude.',
      youAspirant: 'Diagnostic-first: we only suggest cohorts that align with your genuine analytical strengths.',
    },
    {
      factor: 'Instructor Profiles',
      typicalWay: 'Generic full-time academic lecturers detached from contemporary industry demands.',
      youAspirant: 'Active practitioners, software engineers, and public policy educators with verified credentials.',
    },
    {
      factor: 'Learning Methodology',
      typicalWay: 'Passive video streaming, rote lecture notes, and multiple-choice quizzes with zero code review.',
      youAspirant: 'Small live cohorts, weekly written code/case evaluations, and real portfolio builds.',
    },
    {
      factor: 'Outcome Claims',
      typicalWay: 'Exaggerated "100% placement" or "Rank 1 guaranteed" claims that misguide families.',
      youAspirant: 'Honest commitment to skills, portfolio depth, and interview readiness without deceptive marketing.',
    },
    {
      factor: 'Post-Program Support',
      typicalWay: 'Access cut off the day the theoretical syllabus concludes.',
      youAspirant: 'Ongoing 1-on-1 interview debriefs and resume iterations until your target hiring cycle.',
    },
  ];

  return (
    <section id="credibility" className="py-20 lg:py-28 bg-brand-ivory relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-brand-ivory-border shadow-subtle text-brand-midnight text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-coral" />
            <span>Integrity & Methodology</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-midnight tracking-tight uppercase">
            BUILT ON PURPOSE.
            <br />
            <span className="font-editorial italic lowercase text-brand-coral font-normal">
              driven by
            </span>{' '}
            MENTORS.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed font-normal">
            We reject the high-pressure sales culture of conventional coaching. Our four structural commitments keep us accountable to your long-term success.
          </p>
        </div>

        {/* 4 Pillars of Credibility */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-3xl p-6 border border-brand-ivory-border shadow-subtle">
            <div className="w-10 h-10 rounded-2xl bg-brand-lavender text-brand-midnight flex items-center justify-center mb-4">
              <Compass className="w-5 h-5 text-brand-coral" />
            </div>
            <h3 className="text-base font-bold text-brand-midnight mb-2">
              Diagnostic First
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              We never recommend enrolling in a technical cohort until your baseline aptitude and genuine interests have been evaluated by a mentor.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-brand-ivory-border shadow-subtle">
            <div className="w-10 h-10 rounded-2xl bg-brand-lavender text-brand-midnight flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-brand-coral" />
            </div>
            <h3 className="text-base font-bold text-brand-midnight mb-2">
              Practitioner Led
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Learn directly from active software architects, product managers, and civil educators who bring current industry standards to every class.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-brand-ivory-border shadow-subtle">
            <div className="w-10 h-10 rounded-2xl bg-brand-lavender text-brand-midnight flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5 text-brand-coral" />
            </div>
            <h3 className="text-base font-bold text-brand-midnight mb-2">
              Proof-of-Work Focus
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Recruiters don’t hire certificates. You graduate with deployable GitHub repositories, published product briefs, or evaluated answer scripts.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-brand-ivory-border shadow-subtle">
            <div className="w-10 h-10 rounded-2xl bg-brand-lavender text-brand-midnight flex items-center justify-center mb-4">
              <Award className="w-5 h-5 text-brand-coral" />
            </div>
            <h3 className="text-base font-bold text-brand-midnight mb-2">
              Zero Deceptive Claims
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              No fabricated topper photos, fake rank claims, or misleading placement guarantees. We build verified, sustainable competence.
            </p>
          </div>
        </div>

        {/* Comparison Table: The Typical Way vs The You Aspirant Pathway */}
        <div className="bg-white rounded-3xl border border-brand-ivory-border overflow-hidden shadow-elevated">
          <div className="p-6 sm:p-8 bg-brand-midnight text-brand-ivory border-b border-brand-midnight-card">
            <span className="text-[10px] font-mono font-bold tracking-widest text-brand-coral uppercase block mb-1">
              Honest Contrast
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              The Typical Coaching Factory vs. The You Aspirant Pathway
            </h3>
            <p className="text-xs text-brand-ivory/80 mt-1">
              A transparent look at how our student experience differs in practice.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-brand-ivory-border bg-brand-ivory/50 text-[11px] font-mono font-bold uppercase tracking-wider text-brand-muted">
                  <th className="py-4 px-6 w-1/4">Key Dimension</th>
                  <th className="py-4 px-6 w-3/8 text-brand-muted">Conventional Institute</th>
                  <th className="py-4 px-6 w-3/8 text-brand-coral">You Aspirant Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-ivory-border text-xs sm:text-sm">
                {comparisonData.map((row) => (
                  <tr key={row.factor} className="hover:bg-brand-ivory/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-brand-midnight align-top">
                      {row.factor}
                    </td>
                    <td className="py-4 px-6 text-brand-muted align-top leading-relaxed">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{row.typicalWay}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-brand-midnight font-medium align-top leading-relaxed bg-brand-coral-soft/30">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-brand-coral shrink-0 mt-0.5" />
                        <span>{row.youAspirant}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};

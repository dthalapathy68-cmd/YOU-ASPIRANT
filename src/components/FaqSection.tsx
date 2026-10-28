import React, { useState } from 'react';
import { FAQS_DATA } from '../data/faqs';
import { ChevronDown, HelpCircle, Search, Sparkles } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'Admissions & Guidance', label: 'Admissions & Guidance' },
    { id: 'Training & Cohorts', label: 'Cohorts & Format' },
    { id: 'Career Trajectory', label: 'Outcomes & Placements' },
    { id: 'Trust & Eligibility', label: 'Trust & Eligibility' },
  ];

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(prev => prev === id ? null : id);
  };

  // Structured data for FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS_DATA.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white relative scroll-mt-20">
      {/* Inject FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lavender text-brand-midnight text-xs font-bold uppercase tracking-wider mb-4 border border-brand-lavender-border">
            <HelpCircle className="w-3.5 h-3.5 text-brand-coral" />
            <span>Clarity & Answers</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-midnight tracking-tight uppercase">
            FREQUENTLY ASKED
            <br />
            <span className="font-editorial italic lowercase text-brand-coral font-normal">
              questions from
            </span>{' '}
            STUDENTS & PARENTS.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed font-normal">
            Honest answers to the most common questions regarding our methodology, cohort structures, and outcomes.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-brand-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, e.g., 'placement', 'prerequisites'..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-brand-ivory border border-brand-ivory-border focus:border-brand-coral focus:bg-white text-xs sm:text-sm text-brand-midnight transition-all shadow-subtle focus:outline-none"
            />
          </div>

          {/* Category Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-brand-midnight text-white shadow-sm'
                    : 'bg-brand-ivory hover:bg-brand-ivory-dark text-brand-muted hover:text-brand-midnight border border-brand-ivory-border'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5" role="region" aria-label="Frequently Asked Questions Accordion">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'bg-brand-ivory border-brand-coral/40 shadow-subtle' 
                      : 'bg-white hover:bg-brand-ivory/50 border-brand-ivory-border'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <span className="text-sm sm:text-base font-bold text-brand-midnight tracking-tight leading-snug">
                      {faq.question}
                    </span>
                    <div className={`p-1.5 rounded-full transition-transform duration-300 shrink-0 ${
                      isOpen ? 'bg-brand-coral text-white rotate-180' : 'bg-brand-ivory-dark text-brand-muted'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-brand-midnight/80 leading-relaxed border-t border-brand-ivory-border/60 animate-in fade-in duration-200"
                    >
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center bg-brand-ivory rounded-2xl border border-brand-ivory-border">
              <p className="text-sm text-brand-muted">
                No questions found matching your search. Try a different keyword or contact our advisors directly.
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

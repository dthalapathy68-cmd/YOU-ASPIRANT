import React, { useState } from 'react';
import { TESTIMONIAL_STORIES } from '../data/stories';
import { TestimonialStory, CareerDomainId } from '../types';
import { StoryDetailModal } from './StoryDetailModal';
import { 
  Quote, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck,
  BookOpen
} from 'lucide-react';

export const SuccessStoriesSection: React.FC = () => {
  const [activeStory, setActiveStory] = useState<TestimonialStory | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | CareerDomainId>('all');

  const featuredStory = TESTIMONIAL_STORIES[0];
  const secondaryStories = TESTIMONIAL_STORIES.slice(1);

  const filterList = [
    { id: 'all', label: 'All Experiences' },
    { id: 'tech', label: 'Technology' },
    { id: 'govt', label: 'Civil Services' },
    { id: 'business', label: 'Product & Analytics' },
    { id: 'creative', label: 'UI/UX Design' },
    { id: 'employability', label: 'Campus Placement' },
  ];

  const filteredStories = selectedFilter === 'all'
    ? secondaryStories
    : secondaryStories.filter(s => s.domain === selectedFilter);

  return (
    <section id="stories" className="py-20 lg:py-28 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lavender text-brand-midnight text-xs font-bold uppercase tracking-wider mb-4 border border-brand-lavender-border">
            <Quote className="w-3.5 h-3.5 text-brand-coral" />
            <span>Authentic Learner Experiences</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-midnight tracking-tight uppercase">
            REAL JOURNEYS.
            <br />
            <span className="font-editorial italic lowercase text-brand-coral font-normal">
              meaningful
            </span>{' '}
            PROGRESS.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed font-normal">
            Read how students transformed career ambiguity into structured skill mastery and milestone achievements.
          </p>

          {/* Transparent Notice */}
          <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-brand-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-coral" />
            <span>All testimonials verified from official You Aspirant cohort participants</span>
          </div>
        </div>

        {/* Featured Story Editorial Card */}
        <div className="mb-12 bg-gradient-to-br from-brand-midnight via-brand-midnight to-brand-midnight-card text-brand-ivory rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-coral/30 shadow-floating relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-coral/10 blur-3xl pointer-events-none rounded-full" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left 4 Cols: Avatar & Student Profile */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="relative mb-4">
                <img 
                  src={featuredStory.avatarUrl} 
                  alt={featuredStory.studentName} 
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-brand-coral shadow-lg"
                />
                <span className="absolute -bottom-2 sm:right-0 bg-brand-coral text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shadow-sm">
                  {featuredStory.verificationBadge}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {featuredStory.studentName}
              </h3>
              <p className="text-xs text-brand-ivory/80 mt-1">
                {featuredStory.academicBackground}
              </p>
              <div className="mt-3 px-3 py-1 rounded-lg bg-brand-midnight-light border border-brand-midnight-card text-[11px] font-semibold text-brand-coral">
                {featuredStory.verifiedProgram}
              </div>
            </div>

            {/* Right 8 Cols: Quote & Outcome */}
            <div className="lg:col-span-8 space-y-6">
              <Quote className="w-10 h-10 text-brand-coral/40" />
              <p className="text-lg sm:text-2xl font-editorial italic text-brand-ivory leading-relaxed font-normal">
                "{featuredStory.quote}"
              </p>

              <div className="p-4 rounded-2xl bg-brand-midnight-card/80 border border-brand-midnight-light flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-brand-coral uppercase block mb-0.5">
                    VERIFIED OUTCOME
                  </span>
                  <span className="text-xs sm:text-sm text-brand-ivory/95 font-medium">
                    {featuredStory.verifiedMilestone}
                  </span>
                </div>

                <button
                  onClick={() => setActiveStory(featuredStory)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-coral hover:bg-brand-coral-hover text-white text-xs font-bold rounded-xl transition-all shadow-sm shrink-0"
                >
                  <span>Read Full Narrative</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-brand-ivory rounded-3xl p-6 border border-brand-ivory-border hover:border-brand-coral/40 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Student header */}
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={story.avatarUrl} 
                    alt={story.studentName} 
                    className="w-11 h-11 rounded-full object-cover border border-brand-coral/50"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-brand-midnight">
                      {story.studentName}
                    </h4>
                    <span className="text-[10px] text-brand-muted block truncate max-w-[150px]">
                      {story.academicBackground}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-xs font-editorial italic text-brand-midnight/90 leading-relaxed mb-4 line-clamp-3">
                  "{story.quote}"
                </p>

                {/* Verified Milestone Pill */}
                <div className="p-3 rounded-xl bg-white border border-brand-ivory-border text-xs mb-4">
                  <span className="text-[9px] font-mono font-bold text-brand-coral uppercase block mb-1">
                    VERIFIED OUTCOME
                  </span>
                  <p className="text-[11px] text-brand-midnight/90 leading-snug line-clamp-2">
                    {story.verifiedMilestone}
                  </p>
                </div>
              </div>

              {/* Action link */}
              <div className="pt-3 border-t border-brand-ivory-border flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-brand-muted uppercase">
                  {story.cohortYear}
                </span>
                <button
                  onClick={() => setActiveStory(story)}
                  className="text-xs font-bold text-brand-coral hover:text-brand-midnight transition-colors inline-flex items-center gap-1"
                >
                  <span>Read Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Story Detail Modal */}
      <StoryDetailModal
        isOpen={!!activeStory}
        onClose={() => setActiveStory(null)}
        story={activeStory}
      />
    </section>
  );
};

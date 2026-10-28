import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { db } from '../services/db';
import { SEED_CATEGORIES } from '../data/seedData';
import { CareerProfileItem } from '../types/careerDna';
import { 
  Search, 
  Filter, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Briefcase, 
  Cpu, 
  Palette, 
  BarChart3, 
  TrendingUp, 
  Megaphone,
  Sparkles
} from 'lucide-react';

export const CareerExplorerPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [beginnerOnly, setBeginnerOnly] = useState(false);

  const careers = db.getCareers();

  // Filtered and searched careers
  const filteredCareers = useMemo(() => {
    return careers.filter((c) => {
      // Category filter
      if (selectedCategory !== 'all' && c.categoryId !== selectedCategory) {
        return false;
      }
      // Beginner friendly filter
      if (beginnerOnly && !c.isBeginnerFriendly) {
        return false;
      }
      // Search keyword filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = c.title.toLowerCase().includes(query);
        const matchesTagline = c.tagline.toLowerCase().includes(query);
        const matchesSkills = c.coreSkills.some((s) => s.toLowerCase().includes(query));
        const matchesDesc = c.description.toLowerCase().includes(query);
        return matchesTitle || matchesTagline || matchesSkills || matchesDesc;
      }
      return true;
    });
  }, [careers, selectedCategory, beginnerOnly, searchQuery]);

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 md:py-16 text-left space-y-10">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5EDF3] border border-[#DBCBD6] text-xs font-bold text-[#542744]">
          <Briefcase className="w-3.5 h-3.5 text-[#F4A340]" />
          <span>Career Profiles Directory</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#542744]">
          Career Explorer
        </h1>
        <p className="text-sm sm:text-base text-[#77717A] max-w-2xl leading-relaxed">
          Browse structured profiles across technical and creative domains. Inspect core skills, everyday responsibilities, beginner milestones, and start your learning roadmap.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-4 sm:p-6 shadow-subtle space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#77717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search careers by title, skills (e.g. React, SQL, Figma), or keywords..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EDE5E8] bg-[#FFFCF7] text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
            />
          </div>

          {/* Beginner Friendly Toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-[#542744] px-2 py-1">
            <input
              type="checkbox"
              checked={beginnerOnly}
              onChange={(e) => setBeginnerOnly(e.target.checked)}
              className="w-4 h-4 rounded text-[#542744] focus:ring-[#542744]"
            />
            <span>Beginner-Friendly Paths Only</span>
          </label>
        </div>

        {/* Category Filter Pills */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleCategorySelect('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#542744] text-[#FFFCF7] shadow-sm'
                : 'bg-[#F5EDF3] text-[#754565] hover:bg-[#EDE5E8]'
            }`}
          >
            All Categories ({careers.length})
          </button>
          {SEED_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#542744] text-[#FFFCF7] shadow-sm'
                    : 'bg-[#F5EDF3] text-[#754565] hover:bg-[#EDE5E8]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Career Cards Grid */}
      {filteredCareers.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-12 text-center space-y-3">
          <p className="font-heading font-bold text-lg text-[#542744]">No careers match your search</p>
          <p className="text-xs text-[#77717A]">Try clearing your search term or selecting "All Categories".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setBeginnerOnly(false);
            }}
            className="px-4 py-2 rounded-button bg-[#542744] text-[#FFFCF7] text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((career) => {
            const category = SEED_CATEGORIES.find((c) => c.id === career.categoryId);
            return (
              <div
                key={career.id}
                className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between text-left group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F5EDF3] text-[#542744]">
                      {category?.name || 'Exploration'}
                    </span>
                    {career.isBeginnerFriendly && (
                      <span className="text-[10px] font-semibold text-[#27845D] bg-[#F5EDF3] px-2 py-0.5 rounded">
                        Beginner Friendly
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-lg text-[#542744] mb-1 group-hover:text-[#754565] transition-colors">
                    {career.title}
                  </h3>
                  <p className="text-xs font-medium text-[#754565] mb-3">
                    {career.tagline}
                  </p>
                  <p className="text-xs text-[#77717A] leading-relaxed mb-4 line-clamp-3">
                    {career.description}
                  </p>

                  {/* Core Skills Badges */}
                  <div className="space-y-1 mb-6">
                    <span className="text-[11px] font-bold text-[#29232C] block">Core Skills:</span>
                    <div className="flex flex-wrap gap-1">
                      {career.coreSkills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-[10px] bg-[#FFFCF7] border border-[#EDE5E8] text-[#542744]"
                        >
                          {skill}
                        </span>
                      ))}
                      {career.coreSkills.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] text-[#77717A]">
                          +{career.coreSkills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-[#EDE5E8] flex items-center gap-2">
                  <Link
                    to={`/careers/${career.id}`}
                    className="flex-1 py-2 px-3 rounded-button bg-[#F5EDF3] hover:bg-[#EDE5E8] text-[#542744] text-xs font-semibold text-center transition-colors"
                  >
                    View Details
                  </Link>

                  {career.hasRoadmap && (
                    <Link
                      to={`/roadmap?career=${career.id}`}
                      className="py-2 px-3 rounded-button bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] text-xs font-semibold text-center flex items-center gap-1 transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#F4A340]" />
                      <span>Roadmap</span>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

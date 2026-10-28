import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../services/db';
import { SEED_CATEGORIES } from '../data/seedData';
import { CareerProfileItem } from '../types/careerDna';
import { 
  Briefcase, 
  ArrowLeft, 
  Edit3, 
  Plus, 
  Check, 
  X, 
  Eye, 
  EyeOff, 
  Save, 
  Layers 
} from 'lucide-react';

export const AdminContentPage: React.FC = () => {
  const [careers, setCareers] = useState<CareerProfileItem[]>(db.getCareers());
  const [editingCareer, setEditingCareer] = useState<CareerProfileItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form fields for editing/creating
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('software-tech');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [growthOutlook, setGrowthOutlook] = useState('');
  const [skillsText, setSkillsText] = useState('');
  const [isBeginnerFriendly, setIsBeginnerFriendly] = useState(true);
  const [isPublished, setIsPublished] = useState(true);

  const handleStartEdit = (c: CareerProfileItem) => {
    setEditingCareer(c);
    setIsCreating(false);
    setTitle(c.title);
    setCategoryId(c.categoryId);
    setTagline(c.tagline);
    setDescription(c.description);
    setGrowthOutlook(c.growthOutlook);
    setSkillsText(c.coreSkills.join(', '));
    setIsBeginnerFriendly(c.isBeginnerFriendly);
    setIsPublished(c.isPublished);
  };

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingCareer(null);
    setTitle('');
    setCategoryId('software-tech');
    setTagline('');
    setDescription('');
    setGrowthOutlook('');
    setSkillsText('');
    setIsBeginnerFriendly(true);
    setIsPublished(true);
  };

  const handleTogglePublish = (career: CareerProfileItem) => {
    const updated = { ...career, isPublished: !career.isPublished };
    db.saveCareer(updated);
    setCareers(db.getCareers());
    setFeedback(`"${career.title}" ${updated.isPublished ? 'published' : 'unpublished'}.`);
    setTimeout(() => setFeedback(null), 2500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !tagline.trim() || !description.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    const skillsArray = skillsText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const careerToSave: CareerProfileItem = {
      id: editingCareer ? editingCareer.id : title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      categoryId,
      title: title.trim(),
      tagline: tagline.trim(),
      description: description.trim(),
      growthOutlook: growthOutlook.trim() || 'Steady exploratory demand across diverse modern teams.',
      isBeginnerFriendly,
      isPublished,
      responsibilities: editingCareer ? editingCareer.responsibilities : [
        'Understand beginner fundamentals and practice core tools.',
        'Collaborate with mentors and write clean documentation.'
      ],
      coreSkills: skillsArray.length > 0 ? skillsArray : ['Core Foundations', 'Communication'],
      practiceProject: editingCareer ? editingCareer.practiceProject : {
        title: 'Beginner Showcase Portfolio',
        description: 'A hands-on starter project to demonstrate foundational capabilities.',
        deliverables: ['Working prototype', 'Documentation notes'],
      },
      hasRoadmap: editingCareer ? editingCareer.hasRoadmap : true,
    };

    db.saveCareer(careerToSave);
    setCareers(db.getCareers());
    setEditingCareer(null);
    setIsCreating(false);
    setFeedback(`Career "${careerToSave.title}" saved successfully.`);
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 md:py-16 text-left space-y-8">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/dashboard"
          className="text-xs font-semibold text-[#754565] hover:text-[#542744] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Operations Overview</span>
        </Link>
        <button
          onClick={handleStartCreate}
          className="px-3.5 py-1.5 rounded-xl bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#F4A340]" />
          <span>Add Career Profile</span>
        </button>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#542744]">
          Career & Curriculum Content Management
        </h1>
        <p className="text-xs sm:text-sm text-[#77717A]">
          Create, edit, publish, or unpublish career pathways shown to students in Career Explorer and Roadmaps.
        </p>
      </div>

      {feedback && (
        <div className="p-3 bg-green-50 border border-green-200 text-xs font-semibold text-[#27845D] rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Careers Table */}
      <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F5EDF3] border-b border-[#EDE5E8] text-[#542744] font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Career Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Skills Listed</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE5E8]">
              {careers.map((career) => {
                const cat = SEED_CATEGORIES.find((c) => c.id === career.categoryId);
                return (
                  <tr key={career.id} className="hover:bg-[#FFFCF7] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-heading font-bold text-sm text-[#542744]">
                        {career.title}
                      </div>
                      <span className="text-[11px] text-[#77717A] line-clamp-1">{career.tagline}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#754565]">
                      {cat?.name || career.categoryId}
                    </td>
                    <td className="py-3.5 px-4 text-[#29232C]">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {career.coreSkills.slice(0, 3).map((s) => (
                          <span key={s} className="px-1.5 py-0.5 rounded text-[10px] bg-[#F5EDF3] text-[#542744]">
                            {s}
                          </span>
                        ))}
                        {career.coreSkills.length > 3 && (
                          <span className="text-[10px] text-[#77717A]">+{career.coreSkills.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                          career.isPublished ? 'bg-green-100 text-[#27845D]' : 'bg-gray-100 text-[#77717A]'
                        }`}
                      >
                        {career.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleTogglePublish(career)}
                        className="px-2.5 py-1 rounded-lg border border-[#EDE5E8] hover:bg-[#F5EDF3] text-[#77717A] text-[11px]"
                        title={career.isPublished ? 'Unpublish' : 'Publish'}
                      >
                        {career.isPublished ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => handleStartEdit(career)}
                        className="px-3 py-1 rounded-lg bg-[#542744] text-[#FFFCF7] font-semibold text-xs hover:bg-[#754565]"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit or Create Modal */}
      {(editingCareer || isCreating) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFCF7] border border-[#EDE5E8] rounded-card p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-floating relative text-left space-y-4">
            <button
              onClick={() => {
                setEditingCareer(null);
                setIsCreating(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#77717A] hover:text-[#542744]"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading font-bold text-2xl text-[#542744]">
              {isCreating ? 'Create New Career Direction' : `Edit "${editingCareer?.title}"`}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
                  Career Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. AI Prompt Engineer"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EDE5E8] bg-[#FFFFFF] text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
                  Category *
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EDE5E8] bg-[#FFFFFF] text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
                >
                  {SEED_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
                  Tagline *
                </label>
                <input
                  type="text"
                  required
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Short, punchy summary of what the role builds..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EDE5E8] bg-[#FFFFFF] text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
                  Detailed Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Comprehensive description of the career path for beginner students..."
                  className="w-full p-3 rounded-xl border border-[#EDE5E8] bg-[#FFFFFF] text-xs text-[#29232C] focus:outline-none focus:border-[#542744]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
                  Core Skills (Comma separated)
                </label>
                <input
                  type="text"
                  value={skillsText}
                  onChange={(e) => setSkillsText(e.target.value)}
                  placeholder="e.g. HTML, CSS, JavaScript, Git"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EDE5E8] bg-[#FFFFFF] text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#542744]">
                  <input
                    type="checkbox"
                    checked={isBeginnerFriendly}
                    onChange={(e) => setIsBeginnerFriendly(e.target.checked)}
                    className="w-4 h-4 rounded text-[#542744]"
                  />
                  <span>Beginner Friendly</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#542744]">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-[#542744]"
                  />
                  <span>Publish to Public Explorer</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#EDE5E8] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingCareer(null);
                    setIsCreating(false);
                  }}
                  className="px-4 py-2 rounded-button text-xs font-semibold text-[#77717A] hover:bg-[#F5EDF3]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-button bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] text-xs font-bold shadow-sm"
                >
                  Save Career Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

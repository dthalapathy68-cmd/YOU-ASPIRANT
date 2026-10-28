import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../services/db';
import { TestimonialItem } from '../types/careerDna';
import { 
  Sparkles, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  ShieldCheck, 
  Eye, 
  EyeOff 
} from 'lucide-react';

export const AdminTestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(db.getTestimonials());
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form fields
  const [studentName, setStudentName] = useState('');
  const [courseCategory, setCourseCategory] = useState('');
  const [testimonialText, setTestimonialText] = useState('');
  const [displayDate, setDisplayDate] = useState('');
  const [isVerified, setIsVerified] = useState(true);
  const [isPublished, setIsPublished] = useState(true);

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingItem(null);
    setStudentName('');
    setCourseCategory('Web Development Foundations');
    setTestimonialText('');
    setDisplayDate('October 2026');
    setIsVerified(true);
    setIsPublished(true);
  };

  const handleStartEdit = (item: TestimonialItem) => {
    setEditingItem(item);
    setIsCreating(false);
    setStudentName(item.studentName);
    setCourseCategory(item.courseCategory);
    setTestimonialText(item.testimonialText);
    setDisplayDate(item.displayDate || '');
    setIsVerified(item.isVerified);
    setIsPublished(item.isPublished);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      db.deleteTestimonial(id);
      setTestimonials(db.getTestimonials());
      setFeedback('Testimonial deleted.');
      setTimeout(() => setFeedback(null), 2500);
    }
  };

  const handleToggleVerified = (item: TestimonialItem) => {
    const updated = { ...item, isVerified: !item.isVerified };
    db.saveTestimonial(updated);
    setTestimonials(db.getTestimonials());
  };

  const handleTogglePublished = (item: TestimonialItem) => {
    const updated = { ...item, isPublished: !item.isPublished };
    db.saveTestimonial(updated);
    setTestimonials(db.getTestimonials());
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !testimonialText.trim()) {
      alert('Please fill out student name and testimonial text.');
      return;
    }

    const itemToSave: TestimonialItem = {
      id: editingItem ? editingItem.id : `test-${Date.now()}`,
      studentName: studentName.trim(),
      courseCategory: courseCategory.trim(),
      testimonialText: testimonialText.trim(),
      avatarUrl: editingItem?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      displayDate: displayDate.trim() || 'October 2026',
      isVerified,
      isPublished,
    };

    db.saveTestimonial(itemToSave);
    setTestimonials(db.getTestimonials());
    setEditingItem(null);
    setIsCreating(false);
    setFeedback(`Testimonial for ${itemToSave.studentName} saved.`);
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 md:py-16 text-left space-y-8">
      {/* Back button & Action */}
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
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#542744]">
          Testimonial & Social Proof Management
        </h1>
        <p className="text-xs sm:text-sm text-[#77717A]">
          Manage student feedback. Only verified and published testimonials appear publicly on the website.
        </p>
      </div>

      {feedback && (
        <div className="p-3 bg-green-50 border border-green-200 text-xs font-semibold text-[#27845D] rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 shadow-subtle flex flex-col justify-between text-left space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatarUrl}
                    alt={item.studentName}
                    className="w-10 h-10 rounded-full object-cover border border-[#DBCBD6]"
                  />
                  <div>
                    <h3 className="font-heading font-bold text-base text-[#542744]">
                      {item.studentName}
                    </h3>
                    <span className="text-xs text-[#754565]">{item.courseCategory}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.isVerified ? 'bg-green-100 text-[#27845D]' : 'bg-gray-100 text-[#77717A]'
                    }`}
                  >
                    {item.isVerified ? 'Verified' : 'Sample'}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.isPublished ? 'bg-purple-100 text-[#542744]' : 'bg-red-50 text-[#C54A4A]'
                    }`}
                  >
                    {item.isPublished ? 'Public' : 'Hidden'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#29232C] leading-relaxed italic">
                "{item.testimonialText}"
              </p>
            </div>

            <div className="pt-3 border-t border-[#EDE5E8] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#77717A]">{item.displayDate}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleVerified(item)}
                  className="px-2 py-1 rounded-lg border border-[#EDE5E8] text-[11px] hover:bg-[#F5EDF3]"
                  title="Toggle Verified"
                >
                  {item.isVerified ? 'Mark Sample' : 'Verify'}
                </button>
                <button
                  onClick={() => handleTogglePublished(item)}
                  className="px-2 py-1 rounded-lg border border-[#EDE5E8] text-[11px] hover:bg-[#F5EDF3]"
                  title="Toggle Public"
                >
                  {item.isPublished ? 'Hide' : 'Publish'}
                </button>
                <button
                  onClick={() => handleStartEdit(item)}
                  className="p-1 text-[#542744] hover:bg-[#F5EDF3] rounded-lg"
                  title="Edit"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 text-[#C54A4A] hover:bg-red-50 rounded-lg"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit or Create Modal */}
      {(editingItem || isCreating) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFCF7] border border-[#EDE5E8] rounded-card p-6 sm:p-8 max-w-lg w-full shadow-floating relative text-left space-y-4">
            <button
              onClick={() => {
                setEditingItem(null);
                setIsCreating(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#77717A] hover:text-[#542744]"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading font-bold text-2xl text-[#542744]">
              {isCreating ? 'Add Student Testimonial' : `Edit Testimonial`}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
                  Student Name *
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Sneha Rao"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EDE5E8] bg-[#FFFFFF] text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
                  Course / Guidance Category *
                </label>
                <input
                  type="text"
                  required
                  value={courseCategory}
                  onChange={(e) => setCourseCategory(e.target.value)}
                  placeholder="e.g. UI/UX Design Essentials"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EDE5E8] bg-[#FFFFFF] text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
                  Testimonial Quote *
                </label>
                <textarea
                  required
                  rows={4}
                  value={testimonialText}
                  onChange={(e) => setTestimonialText(e.target.value)}
                  placeholder="Student feedback narrative..."
                  className="w-full p-3 rounded-xl border border-[#EDE5E8] bg-[#FFFFFF] text-xs text-[#29232C] focus:outline-none focus:border-[#542744]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
                  Display Date
                </label>
                <input
                  type="text"
                  value={displayDate}
                  onChange={(e) => setDisplayDate(e.target.value)}
                  placeholder="e.g. October 2026"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EDE5E8] bg-[#FFFFFF] text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#542744]">
                  <input
                    type="checkbox"
                    checked={isVerified}
                    onChange={(e) => setIsVerified(e.target.checked)}
                    className="w-4 h-4 rounded text-[#542744]"
                  />
                  <span>Verified Student</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#542744]">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-[#542744]"
                  />
                  <span>Publish Publicly</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#EDE5E8] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
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
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

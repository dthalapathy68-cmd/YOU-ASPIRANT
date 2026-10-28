import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../services/db';
import { UserPlus, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export const StudentRegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [educationLevel, setEducationLevel] = useState('Undergraduate (College)');
  const [careerInterestArea, setCareerInterestArea] = useState('software-tech');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim()) {
      setError('Please provide your name and email address.');
      return;
    }

    if (!privacyConsent) {
      setError('Please review and agree to the Privacy Policy to create your account.');
      return;
    }

    setIsSubmitting(true);
    try {
      await db.registerStudent({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        educationLevel,
        careerInterestArea,
        privacyConsent,
      });

      navigate('/student/dashboard');
    } catch (err) {
      setIsSubmitting(false);
      setError('Registration could not be completed. Please try again.');
    }
  };

  return (
    <div className="max-w-[520px] mx-auto px-4 py-12 md:py-16 text-left">
      <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-9 shadow-elevated space-y-6">
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#F5EDF3] flex items-center justify-center text-[#542744] mx-auto">
            <UserPlus className="w-6 h-6 text-[#542744]" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-[#542744]">
            Create Student Profile
          </h1>
          <p className="text-xs text-[#77717A]">
            Save your Career DNA assessments, roadmaps, and track your personal progress.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-xs text-[#C54A4A] rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5E8] bg-[#FFFCF7] text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rahul@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5E8] bg-[#FFFCF7] text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5E8] bg-[#FFFCF7] text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
                Education Stage *
              </label>
              <select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5E8] bg-[#FFFCF7] text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
              >
                <option value="High School (Grade 10–12)">High School (Grade 10–12)</option>
                <option value="Undergraduate (College)">Undergraduate (College)</option>
                <option value="Graduate">Graduate</option>
                <option value="Early-Career">Early-Career</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
                Primary Interest Area
              </label>
              <select
                value={careerInterestArea}
                onChange={(e) => setCareerInterestArea(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5E8] bg-[#FFFCF7] text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
              >
                <option value="software-tech">Software & Technology</option>
                <option value="design-creativity">Design & Creativity</option>
                <option value="data-analytics">Data & Analytics</option>
                <option value="business-mgmt">Business & Strategy</option>
              </select>
            </div>
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#77717A] select-none pt-2">
            <input
              type="checkbox"
              required
              checked={privacyConsent}
              onChange={(e) => setPrivacyConsent(e.target.checked)}
              className="w-4 h-4 rounded text-[#542744] focus:ring-[#542744] mt-0.5 shrink-0"
            />
            <span>
              I agree to the <Link to="/privacy" className="text-[#542744] underline font-medium">Privacy Policy</Link> and consent to storing my learning progress.
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3.5 rounded-button font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all ${
              isSubmitting
                ? 'bg-[#EDE5E8] text-[#77717A] cursor-wait'
                : 'bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] hover:shadow-plum-glow'
            }`}
          >
            <span>{isSubmitting ? 'Creating Profile...' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4 text-[#F4A340]" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-[#77717A]">
          Already have an account?{' '}
          <Link to="/student/login" className="text-[#542744] font-bold underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};

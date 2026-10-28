import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { db } from '../services/db';
import { EnquiryItem } from '../types/careerDna';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  Sparkles, 
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const prefillInterest = searchParams.get('interest') || '';
  const prefillType = searchParams.get('enquiryType') as EnquiryItem['enquiryType'] || 'Career Guidance';
  const prefillRef = searchParams.get('ref') || '';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [educationLevel, setEducationLevel] = useState('Undergraduate (College)');
  const [areaOfInterest, setAreaOfInterest] = useState(prefillInterest || 'Software and Technology');
  const [enquiryType, setEnquiryType] = useState<EnquiryItem['enquiryType']>(prefillType);
  const [message, setMessage] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedItem, setSubmittedItem] = useState<EnquiryItem | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Prefill with logged in student info if available
  useEffect(() => {
    const user = db.getCurrentUser();
    if (user) {
      if (!fullName) setFullName(user.fullName);
      if (!email) setEmail(user.email);
      if (user.phone && !phone) setPhone(user.phone);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please complete all required fields (Name, Email, and Message).');
      return;
    }

    if (!consentGiven) {
      setErrorMessage('Please confirm your consent to our Privacy Notice to submit your enquiry.');
      return;
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const created = await db.submitEnquiry({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        educationLevel,
        areaOfInterest,
        enquiryType,
        message: message.trim(),
        assessmentResultRef: prefillRef || undefined,
        consentGiven,
      });

      setSubmittedItem(created);
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage('An unexpected error occurred while saving your enquiry. Please try again.');
    }
  };

  const faqs = [
    {
      q: 'Is the Career DNA assessment free of charge?',
      a: 'Yes, the 15-question Career DNA assessment, results report, and FuturePath learning roadmaps are free to explore without requiring prior registration.',
    },
    {
      q: 'How does personal career counselling work?',
      a: 'When you submit a guidance request, an advisor reviews your Career DNA report, answers your questions about degree transitions, and helps configure a structured learning schedule.',
    },
    {
      q: 'Do I need prior technical coding knowledge?',
      a: 'Not at all. You Aspirant is specifically designed for beginners, high school students, and college undergraduates exploring both technical and creative fields from zero experience.',
    },
    {
      q: 'How can administrators review submitted student enquiries?',
      a: 'Authorized team members can log into the Admin Portal (/admin/login) to view leads, update status milestones (New, Contacted, In Progress, Resolved), and add internal guidance notes.',
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 md:py-16 text-left space-y-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5EDF3] border border-[#DBCBD6] text-xs font-bold text-[#542744]">
          <Mail className="w-3.5 h-3.5 text-[#F4A340]" />
          <span>Connect with Advisory</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#542744]">
          Contact Us & Request Guidance
        </h1>
        <p className="text-sm sm:text-base text-[#77717A] max-w-2xl leading-relaxed">
          Have questions about your Career DNA results, training programs, or learning roadmap pacing? Submit your enquiry below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form Column (Col 7) */}
        <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-9 shadow-elevated">
          {submittedItem ? (
            <div className="text-center py-8 space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-[#F5EDF3] flex items-center justify-center text-[#27845D] mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-[#542744]">
                Enquiry Successfully Received!
              </h3>
              <p className="text-sm text-[#77717A] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{submittedItem.fullName}</strong>. Your enquiry for <strong>{submittedItem.enquiryType}</strong> has been logged into our {db.isDemoMode() ? 'local demo storage' : 'database'} with ID <code>{submittedItem.id}</code>.
              </p>

              {db.isDemoMode() && (
                <div className="p-3 bg-[#F5EDF3] rounded-xl text-xs text-[#754565] max-w-md mx-auto text-left">
                  <p className="font-semibold text-[#542744] mb-1">Demo Mode Active:</p>
                  <p>
                    This enquiry is securely stored in your browser's persistent storage. You can immediately view, filter, and manage this lead in the <strong>Admin Portal</strong> at <Link to="/admin/leads" className="text-[#542744] underline font-bold">/admin/leads</Link>.
                  </p>
                </div>
              )}

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmittedItem(null);
                    setMessage('');
                  }}
                  className="px-5 py-2.5 rounded-button bg-[#542744] text-[#FFFCF7] text-xs font-semibold"
                >
                  Submit Another Enquiry
                </button>
                <Link
                  to="/careers"
                  className="px-5 py-2.5 rounded-button bg-[#F5EDF3] text-[#542744] text-xs font-semibold"
                >
                  Return to Explorer
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE5E8]">
                <h2 className="font-heading font-bold text-xl text-[#542744]">
                  Send a Guidance Request
                </h2>
                {prefillRef && (
                  <span className="text-[10px] font-semibold bg-[#F5EDF3] text-[#542744] px-2.5 py-1 rounded-full border border-[#DBCBD6]">
                    DNA Ref: {prefillRef}
                  </span>
                )}
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-xs font-medium text-[#C54A4A] rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ananya Sharma"
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
                    placeholder="e.g. ananya@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5E8] bg-[#FFFCF7] text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
                  />
                </div>
              </div>

              {/* Phone & Education Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div>
                  <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
                    Current Education Stage *
                  </label>
                  <select
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5E8] bg-[#FFFCF7] text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
                  >
                    <option value="High School (Grade 10–12)">High School (Grade 10–12)</option>
                    <option value="Undergraduate (College)">Undergraduate (College)</option>
                    <option value="Graduate / Post-Graduate">Graduate / Post-Graduate</option>
                    <option value="Early-Career Professional">Early-Career Professional</option>
                  </select>
                </div>
              </div>

              {/* Enquiry Type & Area of Interest */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
                    Enquiry Type *
                  </label>
                  <select
                    value={enquiryType}
                    onChange={(e) => setEnquiryType(e.target.value as EnquiryItem['enquiryType'])}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5E8] bg-[#FFFCF7] text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
                  >
                    <option value="Career Guidance">Career Guidance</option>
                    <option value="Training Program">Training Program</option>
                    <option value="Internship Preparation">Internship Preparation</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
                    Area of Interest *
                  </label>
                  <input
                    type="text"
                    required
                    value={areaOfInterest}
                    onChange={(e) => setAreaOfInterest(e.target.value)}
                    placeholder="e.g. Frontend Development, UI/UX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5E8] bg-[#FFFCF7] text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-[#29232C] uppercase tracking-wider mb-1">
                  How can our guidance team help you? *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a little about where you are in your studies, which career directions you are considering, or what questions you have..."
                  className="w-full p-3.5 rounded-xl border border-[#EDE5E8] bg-[#FFFCF7] text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
                />
              </div>

              {/* Privacy Consent Checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#77717A] select-none pt-1">
                <input
                  type="checkbox"
                  required
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="w-4 h-4 rounded text-[#542744] focus:ring-[#542744] mt-0.5 shrink-0"
                />
                <span>
                  I consent to You Aspirant storing this information to respond to my guidance enquiry in accordance with the <Link to="/privacy" className="text-[#542744] underline font-medium">Privacy Policy</Link>.
                </span>
              </label>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 rounded-button font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all ${
                  isSubmitting
                    ? 'bg-[#EDE5E8] text-[#77717A] cursor-wait'
                    : 'bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] hover:shadow-plum-glow'
                }`}
              >
                <Send className="w-4 h-4 text-[#F4A340]" />
                <span>{isSubmitting ? 'Submitting Enquiry...' : 'Submit Guidance Request'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Info Column & FAQ Accordion (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Office & Direct Contact Placeholders */}
          <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 shadow-subtle space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#542744]">
              Student Advisory Hub
            </h3>
            <div className="space-y-3 text-xs text-[#77717A]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#542744] shrink-0 mt-0.5" />
                <span>
                  <strong>Advisory Center (Placeholder):</strong><br />
                  You Aspirant Learning & Guidance HQ,<br />
                  Indiranagar, Bangalore, Karnataka 560038
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#542744] shrink-0 mt-0.5" />
                <span>
                  <strong>General Inquiries:</strong><br />
                  support@youaspirant.com (Editable demo address)
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#542744] shrink-0 mt-0.5" />
                <span>
                  <strong>Counselling Hours:</strong><br />
                  Monday – Saturday: 10:00 AM – 6:30 PM IST
                </span>
              </div>
            </div>
          </div>

          {/* Frequently Asked Questions Accordion */}
          <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 shadow-subtle space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#542744]">
              Frequently Asked Questions
            </h3>

            <div className="space-y-2">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-[#EDE5E8] rounded-xl overflow-hidden bg-[#FFFCF7]"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-3.5 text-left text-xs font-bold text-[#542744] flex items-center justify-between gap-2"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="px-3.5 pb-3.5 text-xs text-[#77717A] leading-relaxed border-t border-[#EDE5E8]/60 pt-2">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

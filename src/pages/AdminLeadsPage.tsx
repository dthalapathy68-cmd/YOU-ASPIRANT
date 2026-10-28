import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { db } from '../services/db';
import { EnquiryItem } from '../types/careerDna';
import { 
  Users, 
  Search, 
  Filter, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  Check, 
  ArrowLeft, 
  X, 
  Send, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Plus
} from 'lucide-react';

export const AdminLeadsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const highlightedId = searchParams.get('id');

  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Selected Lead Modal State
  const [selectedLead, setSelectedLead] = useState<EnquiryItem | null>(null);
  const [newStatus, setNewStatus] = useState<EnquiryItem['status']>('New');
  const [internalNoteText, setInternalNoteText] = useState('');
  const [updateFeedback, setUpdateFeedback] = useState<string | null>(null);

  useEffect(() => {
    const list = db.getEnquiries();
    setEnquiries(list);

    if (highlightedId) {
      const found = list.find((e) => e.id === highlightedId);
      if (found) {
        setSelectedLead(found);
        setNewStatus(found.status);
      }
    }
  }, [highlightedId]);

  const handleOpenLead = (lead: EnquiryItem) => {
    setSelectedLead(lead);
    setNewStatus(lead.status);
    setInternalNoteText('');
    setUpdateFeedback(null);
  };

  const handleSaveLeadChanges = () => {
    if (!selectedLead) return;

    const updated = db.updateEnquiryStatus(
      selectedLead.id,
      newStatus,
      internalNoteText.trim() || undefined
    );

    if (updated) {
      setSelectedLead({ ...updated });
      setEnquiries(db.getEnquiries());
      setInternalNoteText('');
      setUpdateFeedback('Lead status and notes saved successfully.');
      setTimeout(() => setUpdateFeedback(null), 3000);
    }
  };

  // Filtered Leads
  const filteredLeads = enquiries.filter((lead) => {
    if (statusFilter !== 'all' && lead.status !== statusFilter) return false;
    if (typeFilter !== 'all' && lead.enquiryType !== typeFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = lead.fullName.toLowerCase().includes(q);
      const matchEmail = lead.email.toLowerCase().includes(q);
      const matchInterest = lead.areaOfInterest.toLowerCase().includes(q);
      return matchName || matchEmail || matchInterest;
    }
    return true;
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 md:py-16 text-left space-y-8">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/dashboard"
          className="text-xs font-semibold text-[#754565] hover:text-[#542744] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Operations Overview</span>
        </Link>
        <span className="text-xs text-[#77717A]">
          Showing {filteredLeads.length} of {enquiries.length} leads
        </span>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#542744]">
          Student Leads & Counselling Requests
        </h1>
        <p className="text-xs sm:text-sm text-[#77717A]">
          Manage incoming counselling enquiries, assign mentors, and log internal advisement notes.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-4 sm:p-6 shadow-subtle space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input (Col 6) */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#77717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, email, or interest..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EDE5E8] bg-[#FFFCF7] text-xs sm:text-sm text-[#29232C] focus:outline-none focus:border-[#542744]"
            />
          </div>

          {/* Status Filter (Col 3) */}
          <div className="md:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#EDE5E8] bg-[#FFFCF7] text-xs text-[#29232C] focus:outline-none focus:border-[#542744]"
            >
              <option value="all">All Statuses</option>
              <option value="New">Status: New</option>
              <option value="Contacted">Status: Contacted</option>
              <option value="In Progress">Status: In Progress</option>
              <option value="Resolved">Status: Resolved</option>
            </select>
          </div>

          {/* Type Filter (Col 3) */}
          <div className="md:col-span-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#EDE5E8] bg-[#FFFCF7] text-xs text-[#29232C] focus:outline-none focus:border-[#542744]"
            >
              <option value="all">All Enquiry Types</option>
              <option value="Career Guidance">Career Guidance</option>
              <option value="Training Program">Training Program</option>
              <option value="Internship Preparation">Internship Preparation</option>
              <option value="General Enquiry">General Enquiry</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card shadow-subtle overflow-hidden">
        {filteredLeads.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <p className="font-heading font-bold text-base text-[#542744]">No student leads match the filter criteria.</p>
            <p className="text-xs text-[#77717A]">Try resetting your search query or selecting "All Statuses".</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F5EDF3] border-b border-[#EDE5E8] text-[#542744] font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">Student</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Enquiry Type</th>
                  <th className="py-3.5 px-4">Area of Interest</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Submitted</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE5E8]">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#FFFCF7] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-heading font-bold text-sm text-[#542744]">
                        {lead.fullName}
                      </div>
                      <span className="text-[11px] text-[#77717A]">{lead.educationLevel}</span>
                    </td>
                    <td className="py-3.5 px-4 text-[#29232C]">
                      <div>{lead.email}</div>
                      {lead.phone && <div className="text-[11px] text-[#77717A]">{lead.phone}</div>}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#542744]">
                      {lead.enquiryType}
                    </td>
                    <td className="py-3.5 px-4 text-[#754565]">
                      {lead.areaOfInterest}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                          lead.status === 'Resolved'
                            ? 'bg-green-100 text-[#27845D]'
                            : lead.status === 'In Progress'
                            ? 'bg-amber-100 text-[#F4A340]'
                            : lead.status === 'Contacted'
                            ? 'bg-purple-100 text-[#754565]'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#77717A]">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenLead(lead)}
                        className="px-3 py-1.5 rounded-xl bg-[#F5EDF3] hover:bg-[#542744] text-[#542744] hover:text-[#FFFCF7] font-semibold text-xs transition-colors"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Selected Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFCF7] border border-[#EDE5E8] rounded-card p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-floating relative text-left space-y-6">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#77717A] hover:text-[#542744]"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F5EDF3] flex items-center justify-center text-[#542744]">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#F4A340] uppercase tracking-wider">
                  Lead Details · ID: {selectedLead.id}
                </span>
                <h3 className="font-heading font-bold text-2xl text-[#542744]">
                  {selectedLead.fullName}
                </h3>
              </div>
            </div>

            {updateFeedback && (
              <div className="p-3 bg-green-50 border border-green-200 text-xs font-semibold text-[#27845D] rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{updateFeedback}</span>
              </div>
            )}

            {/* Profile Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs p-4 bg-[#FFFFFF] border border-[#EDE5E8] rounded-2xl">
              <div>
                <span className="text-[11px] text-[#77717A] block font-medium">Email:</span>
                <span className="font-semibold text-[#542744]">{selectedLead.email}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#77717A] block font-medium">Phone:</span>
                <span className="font-semibold text-[#29232C]">{selectedLead.phone || 'Not provided'}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#77717A] block font-medium">Education Stage:</span>
                <span className="font-semibold text-[#29232C]">{selectedLead.educationLevel}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#77717A] block font-medium">Interest Area:</span>
                <span className="font-semibold text-[#754565]">{selectedLead.areaOfInterest}</span>
              </div>
              {selectedLead.assessmentResultRef && (
                <div className="sm:col-span-2 pt-1 border-t border-[#EDE5E8]">
                  <span className="text-[11px] text-[#77717A] block font-medium">Assessment Ref:</span>
                  <span className="font-semibold text-[#542744]">Linked Career DNA: {selectedLead.assessmentResultRef}</span>
                </div>
              )}
            </div>

            {/* Student Message */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#542744] uppercase tracking-wider block">
                Student Enquiry Note:
              </span>
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#EDE5E8] text-xs text-[#29232C] leading-relaxed">
                {selectedLead.message}
              </div>
            </div>

            {/* Status Update Control */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#542744] uppercase tracking-wider block">
                Update Status Milestone:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['New', 'Contacted', 'In Progress', 'Resolved'] as EnquiryItem['status'][]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setNewStatus(st)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      newStatus === st
                        ? 'bg-[#542744] text-[#FFFCF7] shadow-sm'
                        : 'bg-[#FFFFFF] border border-[#EDE5E8] text-[#754565] hover:bg-[#F5EDF3]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal Notes History & New Note */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-[#542744] uppercase tracking-wider block">
                Internal Advisory Notes:
              </label>

              {selectedLead.notes && selectedLead.notes.length > 0 && (
                <div className="space-y-2 max-h-36 overflow-y-auto">
                  {selectedLead.notes.map((n) => (
                    <div key={n.id} className="p-3 rounded-xl bg-[#FFFFFF] border border-[#EDE5E8] text-xs space-y-0.5">
                      <div className="flex justify-between font-semibold text-[#542744]">
                        <span>{n.author}</span>
                        <span className="text-[10px] text-[#77717A]">{new Date(n.date).toLocaleString()}</span>
                      </div>
                      <p className="text-[#77717A]">{n.text}</p>
                    </div>
                  ))}
                </div>
              )}

              <textarea
                rows={2}
                value={internalNoteText}
                onChange={(e) => setInternalNoteText(e.target.value)}
                placeholder="Add an internal follow-up note (e.g. Scheduled roadmap call with mentor Sneha on Thursday)..."
                className="w-full p-3 rounded-xl border border-[#EDE5E8] bg-[#FFFFFF] text-xs text-[#29232C] focus:outline-none focus:border-[#542744]"
              />
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#EDE5E8] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2.5 rounded-button text-xs font-semibold text-[#77717A] hover:bg-[#F5EDF3]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSaveLeadChanges}
                className="px-6 py-2.5 rounded-button bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] text-xs font-bold shadow-sm transition-all"
              >
                Save Updates
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

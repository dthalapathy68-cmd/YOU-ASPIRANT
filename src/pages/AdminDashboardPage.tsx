import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../services/db';
import { EnquiryItem } from '../types/careerDna';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Briefcase, 
  GraduationCap, 
  MessageSquare, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Settings,
  Sparkles,
  Search
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const user = db.getCurrentUser();

  useEffect(() => {
    // If not logged in as admin, auto-login for testing demo convenience or redirect
    if (!user || user.role !== 'admin') {
      db.loginDemoAdmin();
    }
    setEnquiries(db.getEnquiries());
  }, []);

  // Calculate actual statistics from stored records
  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => e.status === 'New').length;
  const inProgressEnquiries = enquiries.filter((e) => e.status === 'In Progress' || e.status === 'Contacted').length;
  const resolvedEnquiries = enquiries.filter((e) => e.status === 'Resolved').length;

  // Breakdown by enquiry type
  const typeCounts: Record<string, number> = {};
  enquiries.forEach((e) => {
    typeCounts[e.enquiryType] = (typeCounts[e.enquiryType] || 0) + 1;
  });

  const chartData = Object.entries(typeCounts).map(([type, count]) => ({
    name: type.replace('Preparation', 'Prep').replace('Guidance', 'Guide'),
    count,
  }));

  const recentEnquiries = enquiries.slice(0, 5);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 md:py-16 text-left space-y-10">
      {/* Top Welcome Card */}
      <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 sm:p-9 shadow-elevated relative overflow-hidden">
        <div 
          className="absolute -top-12 -right-12 w-64 h-64 rounded-full filter blur-[70px] opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #F4A340 0%, #542744 70%)' }}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EDF3] border border-[#DBCBD6] text-xs font-bold text-[#542744]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#27845D]" />
              <span>Company Administration</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#542744]">
              Operations & Lead Oversight
            </h1>
            <p className="text-sm text-[#77717A]">
              Real-time metrics calculated from active student enquiries and database records.
            </p>
          </div>

          {/* Quick Sub-navigation */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/admin/leads"
              className="px-4 py-2.5 rounded-button bg-[#542744] hover:bg-[#754565] text-[#FFFCF7] text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Users className="w-4 h-4 text-[#F4A340]" />
              <span>Student Leads ({totalEnquiries})</span>
            </Link>
            <Link
              to="/admin/content"
              className="px-4 py-2.5 rounded-button bg-[#F5EDF3] hover:bg-[#EDE5E8] text-[#542744] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Briefcase className="w-4 h-4 text-[#542744]" />
              <span>Career Content</span>
            </Link>
            <Link
              to="/admin/testimonials"
              className="px-4 py-2.5 rounded-button bg-[#F5EDF3] hover:bg-[#EDE5E8] text-[#542744] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#F4A340]" />
              <span>Testimonials</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Real Statistics Metric Cards (Calculated from actual database / demo storage) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-5 shadow-subtle space-y-1">
          <span className="text-xs font-bold text-[#77717A] uppercase tracking-wider">Total Leads</span>
          <div className="flex items-baseline justify-between">
            <span className="font-heading font-extrabold text-3xl text-[#542744]">{totalEnquiries}</span>
            <Users className="w-5 h-5 text-[#542744] opacity-50" />
          </div>
          <span className="text-[11px] text-[#77717A]">All recorded submissions</span>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-5 shadow-subtle space-y-1">
          <span className="text-xs font-bold text-[#F4A340] uppercase tracking-wider">New Enquiries</span>
          <div className="flex items-baseline justify-between">
            <span className="font-heading font-extrabold text-3xl text-[#F4A340]">{newEnquiries}</span>
            <Clock className="w-5 h-5 text-[#F4A340] opacity-70" />
          </div>
          <span className="text-[11px] text-[#77717A]">Awaiting first contact</span>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-5 shadow-subtle space-y-1">
          <span className="text-xs font-bold text-[#754565] uppercase tracking-wider">In Progress</span>
          <div className="flex items-baseline justify-between">
            <span className="font-heading font-extrabold text-3xl text-[#754565]">{inProgressEnquiries}</span>
            <MessageSquare className="w-5 h-5 text-[#754565] opacity-50" />
          </div>
          <span className="text-[11px] text-[#77717A]">Counselling active</span>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-5 shadow-subtle space-y-1">
          <span className="text-xs font-bold text-[#27845D] uppercase tracking-wider">Resolved</span>
          <div className="flex items-baseline justify-between">
            <span className="font-heading font-extrabold text-3xl text-[#27845D]">{resolvedEnquiries}</span>
            <CheckCircle2 className="w-5 h-5 text-[#27845D] opacity-70" />
          </div>
          <span className="text-[11px] text-[#77717A]">Guidance completed</span>
        </div>
      </div>

      {/* Chart & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Enquiries by Category Chart (Col 5) */}
        <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 shadow-subtle space-y-4">
          <h3 className="font-heading font-bold text-lg text-[#542744]">
            Enquiries by Discipline / Type
          </h3>
          <p className="text-xs text-[#77717A]">
            Real volume distribution across guidance categories.
          </p>

          <div className="h-[220px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#77717A' }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: '#77717A' }} />
                <Tooltip
                  formatter={(val: any) => [val, 'Submissions']}
                  contentStyle={{
                    backgroundColor: '#FFFCF7',
                    borderColor: '#EDE5E8',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {chartData.map((_, idx) => (
                    <Cell key={idx} fill={idx % 2 === 0 ? '#542744' : '#F4A340'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Submissions Feed (Col 7) */}
        <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#EDE5E8] rounded-card p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EDE5E8]">
            <h3 className="font-heading font-bold text-lg text-[#542744]">
              Recent Student Submissions
            </h3>
            <Link
              to="/admin/leads"
              className="text-xs font-semibold text-[#542744] hover:text-[#754565] flex items-center gap-1"
            >
              <span>View All Leads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentEnquiries.map((enq) => (
              <div
                key={enq.id}
                className="p-3.5 rounded-xl bg-[#FFFCF7] border border-[#EDE5E8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-sm text-[#542744]">
                      {enq.fullName}
                    </span>
                    <span className="text-[11px] text-[#77717A]">{enq.email}</span>
                  </div>
                  <span className="text-xs text-[#754565] font-medium block mt-0.5">
                    {enq.enquiryType} · {enq.areaOfInterest}
                  </span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                      enq.status === 'Resolved'
                        ? 'bg-green-100 text-[#27845D]'
                        : enq.status === 'In Progress'
                        ? 'bg-amber-100 text-[#F4A340]'
                        : enq.status === 'Contacted'
                        ? 'bg-purple-100 text-[#754565]'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {enq.status}
                  </span>

                  <Link
                    to={`/admin/leads?id=${enq.id}`}
                    className="px-2.5 py-1 rounded-lg bg-[#F5EDF3] text-[#542744] font-semibold hover:bg-[#EDE5E8]"
                  >
                    Manage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

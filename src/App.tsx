import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AtmosphereBackground } from './components/AtmosphereBackground';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DemoModeBanner } from './components/DemoModeBanner';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { AssessmentResultsPage } from './pages/AssessmentResultsPage';
import { CareerExplorerPage } from './pages/CareerExplorerPage';
import { CareerDetailPage } from './pages/CareerDetailPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { TrainingProgramsPage } from './pages/TrainingProgramsPage';
import { TrainingDetailPage } from './pages/TrainingDetailPage';
import { SuccessStoriesPage } from './pages/SuccessStoriesPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Student Pages
import { StudentLoginPage } from './pages/StudentLoginPage';
import { StudentRegisterPage } from './pages/StudentRegisterPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';

// Admin Pages
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminLeadsPage } from './pages/AdminLeadsPage';
import { AdminContentPage } from './pages/AdminContentPage';
import { AdminTestimonialsPage } from './pages/AdminTestimonialsPage';

// Helper component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#FFFCF7] text-[#29232C] relative selection:bg-[#542744] selection:text-[#FFFCF7]">
        {/* Signature Light-Themed Mist and Sparkle Atmosphere Background */}
        <AtmosphereBackground />

        {/* Global Navigation */}
        <Navbar />

        {/* Main Routed Content Area */}
        <main className="flex-grow relative z-10">
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/assessment/results" element={<AssessmentResultsPage />} />
            <Route path="/assessment-results" element={<AssessmentResultsPage />} />
            <Route path="/careers" element={<CareerExplorerPage />} />
            <Route path="/careers/:id" element={<CareerDetailPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/roadmap/:id" element={<RoadmapPage />} />
            <Route path="/training" element={<TrainingProgramsPage />} />
            <Route path="/training/:id" element={<TrainingDetailPage />} />
            <Route path="/stories" element={<SuccessStoriesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />

            {/* Student Pages */}
            <Route path="/student/login" element={<StudentLoginPage />} />
            <Route path="/student/register" element={<StudentRegisterPage />} />
            <Route path="/student/dashboard" element={<StudentDashboardPage />} />
            <Route path="/student/profile" element={<StudentDashboardPage />} />
            <Route path="/student/saved-careers" element={<StudentDashboardPage />} />
            <Route path="/student/my-roadmap" element={<RoadmapPage />} />
            <Route path="/student/enquiries" element={<StudentDashboardPage />} />

            {/* Admin Pages */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/leads" element={<AdminLeadsPage />} />
            <Route path="/admin/leads/:id" element={<AdminLeadsPage />} />
            <Route path="/admin/content" element={<AdminContentPage />} />
            <Route path="/admin/testimonials" element={<AdminTestimonialsPage />} />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Development Demo Mode Indicator Banner */}
        <DemoModeBanner />
      </div>
    </BrowserRouter>
  );
}

export default App;

-- ==============================================================================
-- YOU ASPIRANT — CAREER DNA & FUTUREPATH DATABASE SCHEMA
-- PostgreSQL schema for Supabase with Row Level Security (RLS) & Indexes
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PROFILES (Extended user profile linked to Supabase auth.users)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    education_level TEXT NOT NULL, -- e.g. 'school', 'undergraduate', 'graduate', 'early-career'
    career_interest_area TEXT,
    role TEXT NOT NULL DEFAULT 'student', -- 'student' | 'admin'
    privacy_consent BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 2. CAREER CATEGORIES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.career_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 3. CAREER PROFILES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.career_profiles (
    id TEXT PRIMARY KEY,
    category_id TEXT NOT NULL REFERENCES public.career_categories(id) ON DELETE RESTRICT,
    title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    growth_outlook TEXT NOT NULL,
    is_beginner_friendly BOOLEAN NOT NULL DEFAULT true,
    is_published BOOLEAN NOT NULL DEFAULT true,
    responsibilities JSONB NOT NULL DEFAULT '[]'::jsonb,
    core_skills JSONB NOT NULL DEFAULT '[]'::jsonb,
    practice_project JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 4. ROADMAP TEMPLATES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.roadmap_templates (
    id TEXT PRIMARY KEY,
    career_id TEXT NOT NULL REFERENCES public.career_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    overview TEXT NOT NULL,
    total_stages INT NOT NULL DEFAULT 5,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 5. ROADMAP MILESTONES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.roadmap_milestones (
    id TEXT PRIMARY KEY,
    template_id TEXT NOT NULL REFERENCES public.roadmap_templates(id) ON DELETE CASCADE,
    stage_number INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    prerequisites TEXT,
    skills_to_learn JSONB NOT NULL DEFAULT '[]'::jsonb,
    suggested_task TEXT NOT NULL,
    recommended_resources JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 6. ASSESSMENT SESSIONS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.assessment_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    session_token TEXT UNIQUE,
    current_question_index INT NOT NULL DEFAULT 0,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    completed_at TIMESTAMPTZ
);

-- ------------------------------------------------------------------------------
-- 7. ASSESSMENT ANSWERS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.assessment_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.assessment_sessions(id) ON DELETE CASCADE,
    question_id INT NOT NULL,
    selected_option_id TEXT NOT NULL,
    answered_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(session_id, question_id)
);

-- ------------------------------------------------------------------------------
-- 8. ASSESSMENT RESULTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.assessment_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.assessment_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    scores JSONB NOT NULL, -- e.g. { "tech": 85, "design": 70, "data": 60, "people": 45, "business": 50, "engineering": 75 }
    primary_dimensions JSONB NOT NULL,
    secondary_dimensions JSONB NOT NULL,
    learning_preference TEXT NOT NULL,
    learning_preference_explanation TEXT NOT NULL,
    recommended_careers JSONB NOT NULL,
    alternative_careers JSONB NOT NULL,
    starter_skills JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 9. STUDENT ROADMAPS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.student_roadmaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    career_id TEXT NOT NULL REFERENCES public.career_profiles(id) ON DELETE CASCADE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    progress_percentage NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, career_id)
);

-- ------------------------------------------------------------------------------
-- 10. STUDENT MILESTONE PROGRESS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.student_milestone_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_roadmap_id UUID NOT NULL REFERENCES public.student_roadmaps(id) ON DELETE CASCADE,
    milestone_id TEXT NOT NULL REFERENCES public.roadmap_milestones(id) ON DELETE CASCADE,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    personal_notes TEXT,
    completed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(student_roadmap_id, milestone_id)
);

-- ------------------------------------------------------------------------------
-- 11. STUDENT SKILLS (Skill Gap Map)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.student_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    proficiency_level TEXT NOT NULL, -- 'Not Started' | 'Beginner' | 'Familiar' | 'Comfortable'
    target_career_id TEXT REFERENCES public.career_profiles(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, skill_name, target_career_id)
);

-- ------------------------------------------------------------------------------
-- 12. SAVED CAREERS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.saved_careers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    career_id TEXT NOT NULL REFERENCES public.career_profiles(id) ON DELETE CASCADE,
    saved_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, career_id)
);

-- ------------------------------------------------------------------------------
-- 13. TRAINING PROGRAMS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.training_programs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category_id TEXT NOT NULL REFERENCES public.career_categories(id) ON DELETE RESTRICT,
    difficulty_level TEXT NOT NULL, -- 'Beginner' | 'Foundations' | 'Career Readiness'
    skills_covered JSONB NOT NULL DEFAULT '[]'::jsonb,
    duration TEXT,
    format TEXT NOT NULL DEFAULT 'Self-Paced with Mentor Reviews',
    tagline TEXT NOT NULL,
    overview TEXT NOT NULL,
    prerequisites TEXT,
    intended_audience TEXT,
    modules JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 14. ENQUIRIES (Student Leads)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    education_level TEXT NOT NULL,
    area_of_interest TEXT NOT NULL,
    enquiry_type TEXT NOT NULL, -- 'Career Guidance' | 'Training Program' | 'Internship Preparation' | 'General Enquiry'
    message TEXT NOT NULL,
    assessment_result_ref TEXT,
    status TEXT NOT NULL DEFAULT 'New', -- 'New' | 'Contacted' | 'In Progress' | 'Resolved'
    consent_given BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 15. ENQUIRY NOTES (Internal Admin Notes)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.enquiry_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enquiry_id UUID NOT NULL REFERENCES public.enquiries(id) ON DELETE CASCADE,
    admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    admin_email TEXT NOT NULL,
    note TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 16. TESTIMONIALS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_name TEXT NOT NULL,
    course_category TEXT NOT NULL,
    testimonial_text TEXT NOT NULL,
    avatar_url TEXT,
    display_date TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_career_profiles_cat ON public.career_profiles(category_id);
CREATE INDEX IF NOT EXISTS idx_milestones_template ON public.roadmap_milestones(template_id);
CREATE INDEX IF NOT EXISTS idx_assessment_sessions_user ON public.assessment_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_answers_session ON public.assessment_answers(session_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_type ON public.enquiries(enquiry_type);
CREATE INDEX IF NOT EXISTS idx_student_skills_user ON public.student_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_careers_user ON public.saved_careers(user_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_milestone_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiry_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Helper check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Public can read published career info
CREATE POLICY "Public can view published categories" ON public.career_categories FOR SELECT USING (true);
CREATE POLICY "Public can view published careers" ON public.career_profiles FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view roadmap templates" ON public.roadmap_templates FOR SELECT USING (true);
CREATE POLICY "Public can view roadmap milestones" ON public.roadmap_milestones FOR SELECT USING (true);
CREATE POLICY "Public can view published training" ON public.training_programs FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view verified published testimonials" ON public.testimonials FOR SELECT USING (is_published = true AND is_verified = true);

-- Public/Unauthenticated visitors can insert enquiries
CREATE POLICY "Anyone can submit enquiry" ON public.enquiries FOR INSERT WITH CHECK (true);

-- Students can read & update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Students can manage their own roadmaps, skills, saved careers, and assessments
CREATE POLICY "Users manage own roadmaps" ON public.student_roadmaps FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own skills" ON public.student_skills FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own saved careers" ON public.saved_careers FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users view own assessment results" ON public.assessment_results FOR SELECT USING (auth.uid() = user_id);

-- Admin can manage everything
CREATE POLICY "Admin full access enquiries" ON public.enquiries FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access enquiry notes" ON public.enquiry_notes FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access careers" ON public.career_profiles FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access training" ON public.training_programs FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access testimonials" ON public.testimonials FOR ALL USING (public.is_admin());

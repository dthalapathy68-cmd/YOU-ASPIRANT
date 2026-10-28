import { 
  CareerProfileItem, 
  CareerRoadmapTemplate, 
  StudentMilestoneState, 
  StudentSkillRecord, 
  SkillProficiency,
  EnquiryItem, 
  TestimonialItem, 
  TrainingProgramItem,
  UserAccount,
  AssessmentResultData
} from '../types/careerDna';
import { 
  SEED_CAREERS, 
  SEED_ROADMAPS, 
  SEED_TRAINING_PROGRAMS, 
  SEED_TESTIMONIALS 
} from '../data/seedData';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const STORAGE_KEYS = {
  USER: 'you_aspirant_user',
  ENQUIRIES: 'you_aspirant_enquiries',
  CAREERS: 'you_aspirant_careers',
  ROADMAP_PROGRESS: 'you_aspirant_roadmap_progress',
  SKILLS: 'you_aspirant_student_skills',
  SAVED_CAREERS: 'you_aspirant_saved_careers',
  TESTIMONIALS: 'you_aspirant_testimonials',
  ASSESSMENT_RESULT: 'you_aspirant_assessment_result',
  ASSESSMENT_PROGRESS: 'you_aspirant_assessment_in_progress',
  ACTIVE_CAREER_ROADMAP: 'you_aspirant_active_career_id',
};

// Seed initial demo enquiries if empty
const INITIAL_DEMO_ENQUIRIES: EnquiryItem[] = [
  {
    id: 'enq-101',
    fullName: 'Rahul Verma',
    email: 'rahul.v@example.com',
    phone: '+91 98765 43210',
    educationLevel: 'Undergraduate (Final Year)',
    areaOfInterest: 'software-tech',
    enquiryType: 'Career Guidance',
    message: 'Completed the Career DNA check. My top dimension was Technology (88%). Wondering how to transition from college theory to frontend web development internships.',
    assessmentResultRef: 'result-demo-101',
    status: 'New',
    consentGiven: true,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    notes: [
      {
        id: 'note-1',
        author: 'Admin Team',
        text: 'Assigned to mentor for 1-on-1 preliminary roadmap consultation.',
        date: new Date(Date.now() - 3600000 * 2).toISOString(),
      }
    ],
  },
  {
    id: 'enq-102',
    fullName: 'Pooja Sundaram',
    email: 'pooja.s@example.com',
    phone: '+91 98111 22334',
    educationLevel: 'Undergraduate (1st Year)',
    areaOfInterest: 'design-creativity',
    enquiryType: 'Training Program',
    message: 'Interested in UI/UX Design Essentials cohort. Does the course cover Figma Auto-Layout and design systems?',
    status: 'In Progress',
    consentGiven: true,
    createdAt: new Date(Date.now() - 3600000 * 26).toISOString(),
    notes: [
      {
        id: 'note-2',
        author: 'Admissions Lead',
        text: 'Shared curriculum overview and scheduled introductory orientation call.',
        date: new Date(Date.now() - 3600000 * 12).toISOString(),
      }
    ],
  },
  {
    id: 'enq-103',
    fullName: 'Aditya Sen',
    email: 'aditya.sen@example.com',
    phone: '+91 99223 88441',
    educationLevel: 'Graduate',
    areaOfInterest: 'data-analytics',
    enquiryType: 'Internship Preparation',
    message: 'Looking for advice on building a GitHub data portfolio using SQL and Pandas to apply for entry-level analyst positions.',
    status: 'Contacted',
    consentGiven: true,
    createdAt: new Date(Date.now() - 3600000 * 50).toISOString(),
  },
];

// Helper to safely read and write LocalStorage
function getLocalItem<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to write to localStorage for key: ${key}`, err);
  }
}

// Data Access API
export const db = {
  isDemoMode: (): boolean => !isSupabaseConfigured,

  // --------------------------------------------------------------------------
  // AUTHENTICATION & USER MANAGEMENT
  // --------------------------------------------------------------------------
  getCurrentUser: (): UserAccount | null => {
    return getLocalItem<UserAccount | null>(STORAGE_KEYS.USER, null);
  },

  setCurrentUser: (user: UserAccount | null) => {
    if (user) {
      setLocalItem(STORAGE_KEYS.USER, user);
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  },

  loginDemoStudent: (): UserAccount => {
    const studentUser: UserAccount = {
      id: 'demo-student-1',
      email: 'ananya.student@youaspirant.com',
      fullName: 'Ananya Sharma',
      phone: '+91 98450 12345',
      educationLevel: 'Undergraduate (2nd Year)',
      careerInterestArea: 'software-tech',
      role: 'student',
    };
    db.setCurrentUser(studentUser);
    return studentUser;
  },

  loginDemoAdmin: (): UserAccount => {
    const adminUser: UserAccount = {
      id: 'demo-admin-1',
      email: 'admin@youaspirant.com',
      fullName: 'Director of Student Guidance',
      educationLevel: 'Administrative Lead',
      role: 'admin',
    };
    db.setCurrentUser(adminUser);
    return adminUser;
  },

  registerStudent: async (data: {
    fullName: string;
    email: string;
    phone?: string;
    educationLevel: string;
    careerInterestArea?: string;
    privacyConsent: boolean;
  }): Promise<UserAccount> => {
    if (isSupabaseConfigured && supabase) {
      // In production Supabase Auth
      try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: data.email,
          password: 'TemporaryDemoPassword123!',
          options: {
            data: { full_name: data.fullName }
          }
        });
        if (authError) throw authError;
        if (authData.user) {
          await supabase.from('profiles').insert({
            id: authData.user.id,
            email: data.email,
            full_name: data.fullName,
            phone: data.phone,
            education_level: data.educationLevel,
            career_interest_area: data.careerInterestArea,
            role: 'student',
            privacy_consent: data.privacyConsent
          });
        }
      } catch (e) {
        console.warn('Supabase signup fallback to demo mode:', e);
      }
    }

    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      email: data.email,
      fullName: data.fullName,
      phone: data.phone,
      educationLevel: data.educationLevel,
      careerInterestArea: data.careerInterestArea,
      role: 'student',
    };
    db.setCurrentUser(newUser);
    return newUser;
  },

  logout: () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut().catch(() => {});
    }
    db.setCurrentUser(null);
  },

  // --------------------------------------------------------------------------
  // CAREERS CONTENT
  // --------------------------------------------------------------------------
  getCareers: (): CareerProfileItem[] => {
    return getLocalItem<CareerProfileItem[]>(STORAGE_KEYS.CAREERS, SEED_CAREERS);
  },

  getCareerById: (id: string): CareerProfileItem | undefined => {
    const careers = db.getCareers();
    return careers.find((c) => c.id === id);
  },

  saveCareer: (career: CareerProfileItem) => {
    const careers = db.getCareers();
    const idx = careers.findIndex((c) => c.id === career.id);
    let updated: CareerProfileItem[];
    if (idx >= 0) {
      updated = [...careers];
      updated[idx] = career;
    } else {
      updated = [career, ...careers];
    }
    setLocalItem(STORAGE_KEYS.CAREERS, updated);

    if (isSupabaseConfigured && supabase) {
      Promise.resolve(
        supabase.from('career_profiles').upsert({
          id: career.id,
          category_id: career.categoryId,
          title: career.title,
          tagline: career.tagline,
          description: career.description,
          growth_outlook: career.growthOutlook,
          is_beginner_friendly: career.isBeginnerFriendly,
          is_published: career.isPublished,
          responsibilities: career.responsibilities,
          core_skills: career.coreSkills,
          practice_project: career.practiceProject,
        })
      ).catch(console.error);
    }
  },

  // --------------------------------------------------------------------------
  // FUTUREPATH ROADMAP TEMPLATES & STUDENT PROGRESS
  // --------------------------------------------------------------------------
  getRoadmapTemplate: (careerId: string): CareerRoadmapTemplate | undefined => {
    return SEED_ROADMAPS[careerId] || SEED_ROADMAPS['frontend-developer'];
  },

  getActiveCareerId: (): string => {
    return getLocalItem<string>(STORAGE_KEYS.ACTIVE_CAREER_ROADMAP, 'frontend-developer');
  },

  setActiveCareerId: (careerId: string) => {
    setLocalItem(STORAGE_KEYS.ACTIVE_CAREER_ROADMAP, careerId);
  },

  getMilestoneProgress: (careerId: string): Record<string, StudentMilestoneState> => {
    const allProgress = getLocalItem<Record<string, Record<string, StudentMilestoneState>>>(
      STORAGE_KEYS.ROADMAP_PROGRESS,
      {
        'frontend-developer': {
          'fe-stage-1': { milestoneId: 'fe-stage-1', isCompleted: true, personalNotes: 'Reviewed HTTP & inspected network tab.', completedAt: new Date(Date.now() - 86400000 * 3).toISOString() },
          'fe-stage-2': { milestoneId: 'fe-stage-2', isCompleted: true, personalNotes: 'Built flexbox responsive portfolio wireframe.', completedAt: new Date(Date.now() - 86400000 * 1).toISOString() },
        }
      }
    );
    return allProgress[careerId] || {};
  },

  toggleMilestoneComplete: (careerId: string, milestoneId: string, notes?: string): Record<string, StudentMilestoneState> => {
    const allProgress = getLocalItem<Record<string, Record<string, StudentMilestoneState>>>(
      STORAGE_KEYS.ROADMAP_PROGRESS,
      {}
    );
    const careerMap = allProgress[careerId] || {};
    const existing = careerMap[milestoneId];

    const isNowCompleted = !existing?.isCompleted;
    careerMap[milestoneId] = {
      milestoneId,
      isCompleted: isNowCompleted,
      personalNotes: notes !== undefined ? notes : (existing?.personalNotes || ''),
      completedAt: isNowCompleted ? new Date().toISOString() : undefined,
    };

    allProgress[careerId] = careerMap;
    setLocalItem(STORAGE_KEYS.ROADMAP_PROGRESS, allProgress);
    return careerMap;
  },

  saveMilestoneNotes: (careerId: string, milestoneId: string, notes: string): Record<string, StudentMilestoneState> => {
    const allProgress = getLocalItem<Record<string, Record<string, StudentMilestoneState>>>(
      STORAGE_KEYS.ROADMAP_PROGRESS,
      {}
    );
    const careerMap = allProgress[careerId] || {};
    const existing = careerMap[milestoneId];

    careerMap[milestoneId] = {
      milestoneId,
      isCompleted: existing ? existing.isCompleted : false,
      personalNotes: notes,
      completedAt: existing?.completedAt,
    };

    allProgress[careerId] = careerMap;
    setLocalItem(STORAGE_KEYS.ROADMAP_PROGRESS, allProgress);
    return careerMap;
  },

  // --------------------------------------------------------------------------
  // SKILL GAP MAP (Proficiency Tracking)
  // --------------------------------------------------------------------------
  getStudentSkills: (careerId: string): Record<string, SkillProficiency> => {
    const allSkills = getLocalItem<Record<string, Record<string, SkillProficiency>>>(
      STORAGE_KEYS.SKILLS,
      {
        'frontend-developer': {
          'HTML5 & Semantic Markup': 'Familiar',
          'CSS3 & Tailwind CSS': 'Beginner',
          'JavaScript (ES6+)': 'Beginner',
          'TypeScript': 'Not Started',
          'React.js': 'Not Started',
          'Git & GitHub': 'Familiar',
          'Web Accessibility': 'Not Started',
        }
      }
    );
    return allSkills[careerId] || {};
  },

  updateStudentSkill: (careerId: string, skillName: string, level: SkillProficiency): Record<string, SkillProficiency> => {
    const allSkills = getLocalItem<Record<string, Record<string, SkillProficiency>>>(
      STORAGE_KEYS.SKILLS,
      {}
    );
    const careerSkills = allSkills[careerId] || {};
    careerSkills[skillName] = level;
    allSkills[careerId] = careerSkills;
    setLocalItem(STORAGE_KEYS.SKILLS, allSkills);
    return careerSkills;
  },

  // --------------------------------------------------------------------------
  // SAVED CAREERS
  // --------------------------------------------------------------------------
  getSavedCareers: (): string[] => {
    return getLocalItem<string[]>(STORAGE_KEYS.SAVED_CAREERS, ['frontend-developer', 'ui-ux-designer']);
  },

  toggleSaveCareer: (careerId: string): boolean => {
    const list = db.getSavedCareers();
    const exists = list.includes(careerId);
    let updated: string[];
    if (exists) {
      updated = list.filter((id) => id !== careerId);
    } else {
      updated = [...list, careerId];
    }
    setLocalItem(STORAGE_KEYS.SAVED_CAREERS, updated);
    return !exists;
  },

  // --------------------------------------------------------------------------
  // ASSESSMENT RESULTS & IN-PROGRESS SESSION
  // --------------------------------------------------------------------------
  getLatestAssessmentResult: (): AssessmentResultData | null => {
    return getLocalItem<AssessmentResultData | null>(STORAGE_KEYS.ASSESSMENT_RESULT, null);
  },

  saveAssessmentResult: (result: AssessmentResultData) => {
    setLocalItem(STORAGE_KEYS.ASSESSMENT_RESULT, result);
    // Clear in-progress session once completed
    localStorage.removeItem(STORAGE_KEYS.ASSESSMENT_PROGRESS);
  },

  getAssessmentProgress: (): { currentQuestionIndex: number; answers: { questionId: number; optionId: string }[] } | null => {
    return getLocalItem(STORAGE_KEYS.ASSESSMENT_PROGRESS, null);
  },

  saveAssessmentProgress: (currentQuestionIndex: number, answers: { questionId: number; optionId: string }[]) => {
    setLocalItem(STORAGE_KEYS.ASSESSMENT_PROGRESS, { currentQuestionIndex, answers });
  },

  clearAssessmentProgress: () => {
    localStorage.removeItem(STORAGE_KEYS.ASSESSMENT_PROGRESS);
  },

  // --------------------------------------------------------------------------
  // ENQUIRIES & STUDENT LEADS (Lead Management)
  // --------------------------------------------------------------------------
  getEnquiries: (): EnquiryItem[] => {
    return getLocalItem<EnquiryItem[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_DEMO_ENQUIRIES);
  },

  getEnquiryById: (id: string): EnquiryItem | undefined => {
    const list = db.getEnquiries();
    return list.find((e) => e.id === id);
  },

  submitEnquiry: async (enquiryData: Omit<EnquiryItem, 'id' | 'status' | 'createdAt'>): Promise<EnquiryItem> => {
    const newEnquiry: EnquiryItem = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString(),
      notes: [],
    };

    const currentList = db.getEnquiries();
    const updated = [newEnquiry, ...currentList];
    setLocalItem(STORAGE_KEYS.ENQUIRIES, updated);

    // Save to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('enquiries').insert({
          full_name: newEnquiry.fullName,
          email: newEnquiry.email,
          phone: newEnquiry.phone,
          education_level: newEnquiry.educationLevel,
          area_of_interest: newEnquiry.areaOfInterest,
          enquiry_type: newEnquiry.enquiryType,
          message: newEnquiry.message,
          assessment_result_ref: newEnquiry.assessmentResultRef,
          status: newEnquiry.status,
          consent_given: newEnquiry.consentGiven,
        });
      } catch (err) {
        console.warn('Supabase insert failed, safely saved in local demo storage:', err);
      }
    }

    return newEnquiry;
  },

  updateEnquiryStatus: (id: string, status: EnquiryItem['status'], internalNote?: string): EnquiryItem | undefined => {
    const list = db.getEnquiries();
    const item = list.find((e) => e.id === id);
    if (!item) return undefined;

    item.status = status;
    if (internalNote && internalNote.trim() !== '') {
      const notes = item.notes || [];
      notes.unshift({
        id: `note-${Date.now()}`,
        author: 'Administrator',
        text: internalNote.trim(),
        date: new Date().toISOString(),
      });
      item.notes = notes;
    }

    setLocalItem(STORAGE_KEYS.ENQUIRIES, [...list]);

    if (isSupabaseConfigured && supabase) {
      Promise.resolve(
        supabase.from('enquiries').update({ status }).eq('id', id)
      ).catch(console.error);
    }
    return item;
  },

  // --------------------------------------------------------------------------
  // TESTIMONIALS MANAGEMENT
  // --------------------------------------------------------------------------
  getTestimonials: (): TestimonialItem[] => {
    return getLocalItem<TestimonialItem[]>(STORAGE_KEYS.TESTIMONIALS, SEED_TESTIMONIALS);
  },

  saveTestimonial: (item: TestimonialItem) => {
    const list = db.getTestimonials();
    const idx = list.findIndex((t) => t.id === item.id);
    let updated: TestimonialItem[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = item;
    } else {
      updated = [item, ...list];
    }
    setLocalItem(STORAGE_KEYS.TESTIMONIALS, updated);
  },

  deleteTestimonial: (id: string) => {
    const list = db.getTestimonials();
    const updated = list.filter((t) => t.id !== id);
    setLocalItem(STORAGE_KEYS.TESTIMONIALS, updated);
  },

  // --------------------------------------------------------------------------
  // TRAINING PROGRAMS
  // --------------------------------------------------------------------------
  getTrainingPrograms: (): TrainingProgramItem[] => {
    return SEED_TRAINING_PROGRAMS;
  },

  getTrainingProgramById: (id: string): TrainingProgramItem | undefined => {
    return SEED_TRAINING_PROGRAMS.find((p) => p.id === id);
  },
};

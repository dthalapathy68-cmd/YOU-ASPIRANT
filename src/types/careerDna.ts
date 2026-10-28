export type DimensionKey = 
  | 'tech' 
  | 'design' 
  | 'data' 
  | 'people' 
  | 'business' 
  | 'engineering';

export interface DimensionInfo {
  key: DimensionKey;
  label: string;
  description: string;
  color: string;
}

export type LearningStylePreference = 
  | 'Project-based learning' 
  | 'Structured learning' 
  | 'Visual learning' 
  | 'Collaborative learning';

export interface AssessmentOption {
  id: string;
  text: string;
  weights: Partial<Record<DimensionKey, number>>;
  learningWeight?: LearningStylePreference;
}

export interface AssessmentQuestion {
  id: number;
  category: 
    | 'Interests' 
    | 'Preferred activities' 
    | 'Problem-solving preferences' 
    | 'Creative preferences' 
    | 'Analytical preferences' 
    | 'Collaboration preferences' 
    | 'Learning preferences' 
    | 'Career goals';
  question: string;
  explanationHint?: string;
  options: AssessmentOption[];
}

export interface CareerMatch {
  careerId: string;
  title: string;
  categoryName: string;
  matchScore: number;
  whyMatch: string;
  coreSkills: string[];
  suggestedStarterActivity: string;
}

export interface AssessmentResultData {
  id: string;
  createdAt: string;
  scores: Record<DimensionKey, number>;
  primaryDimensions: { key: DimensionKey; label: string; score: number }[];
  secondaryDimensions: { key: DimensionKey; label: string; score: number }[];
  learningPreference: LearningStylePreference;
  learningPreferenceExplanation: string;
  recommendedCareers: CareerMatch[];
  alternativeCareers: CareerMatch[];
  starterSkills: { name: string; category: string; description: string }[];
}

export type SkillProficiency = 'Not Started' | 'Beginner' | 'Familiar' | 'Comfortable';

export interface StudentSkillRecord {
  skillName: string;
  proficiency: SkillProficiency;
  targetCareerId: string;
  updatedAt: string;
}

export interface CareerMilestone {
  id: string;
  stageNumber: number;
  title: string;
  description: string;
  prerequisites?: string;
  skillsToLearn: string[];
  suggestedTask: string;
  recommendedResources?: { title: string; type: string }[];
}

export interface CareerRoadmapTemplate {
  careerId: string;
  title: string;
  overview: string;
  milestones: CareerMilestone[];
}

export interface StudentMilestoneState {
  milestoneId: string;
  isCompleted: boolean;
  personalNotes: string;
  completedAt?: string;
}

export interface CareerCategoryItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  exampleRoles: string[];
  displayOrder: number;
}

export interface CareerProfileItem {
  id: string;
  categoryId: string;
  title: string;
  tagline: string;
  description: string;
  growthOutlook: string;
  isBeginnerFriendly: boolean;
  isPublished: boolean;
  responsibilities: string[];
  coreSkills: string[];
  practiceProject: {
    title: string;
    description: string;
    deliverables: string[];
  };
  hasRoadmap: boolean;
}

export interface TrainingProgramItem {
  id: string;
  title: string;
  categoryId: string;
  difficultyLevel: 'Beginner' | 'Foundations' | 'Career Readiness';
  skillsCovered: string[];
  duration?: string;
  format: string;
  tagline: string;
  overview: string;
  prerequisites?: string;
  intendedAudience?: string;
  modules: { week: string; topic: string; details: string }[];
  isPublished: boolean;
}

export interface EnquiryItem {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  educationLevel: string;
  areaOfInterest: string;
  enquiryType: 'Career Guidance' | 'Training Program' | 'Internship Preparation' | 'General Enquiry';
  message: string;
  assessmentResultRef?: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Resolved';
  consentGiven: boolean;
  createdAt: string;
  notes?: { id: string; author: string; text: string; date: string }[];
}

export interface TestimonialItem {
  id: string;
  studentName: string;
  courseCategory: string;
  testimonialText: string;
  avatarUrl?: string;
  displayDate?: string;
  isVerified: boolean;
  isPublished: boolean;
}

export interface UserAccount {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  educationLevel: string;
  careerInterestArea?: string;
  role: 'student' | 'admin';
}

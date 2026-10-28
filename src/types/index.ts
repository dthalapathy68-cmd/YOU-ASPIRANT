export type AcademicStage = 
  | 'school' 
  | 'undergrad' 
  | 'graduate' 
  | 'working-pro';

export type CareerDomainId = 
  | 'tech' 
  | 'business' 
  | 'govt' 
  | 'creative' 
  | 'employability';

export interface CareerDomain {
  id: CareerDomainId;
  name: string;
  tagline: string;
  badge: string;
  description: string;
  iconName: string;
  sampleRoles: string[];
  growthTrends: string;
}

export interface CareerRecommendation {
  domainId: CareerDomainId;
  stage: AcademicStage;
  title: string;
  overview: string;
  skillPillars: {
    name: string;
    description: string;
  }[];
  roadmapPhases: {
    phase: string;
    title: string;
    focus: string;
  }[];
  recommendedPrograms: string[];
  suggestedAction: string;
}

export interface TrainingProgram {
  id: string;
  title: string;
  domain: CareerDomainId;
  targetStage: string;
  duration: string;
  format: string;
  badge: string;
  tagline: string;
  summary: string;
  modules: {
    week: string;
    topic: string;
    details: string;
  }[];
  keyOutcomes: string[];
  prerequisites: string;
  mentorProfile: string;
  seatsNote: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  offers: string[];
  designedFor: string;
  achievements: string[];
  iconName: string;
  badgeText: string;
  detailedScope: string;
}

export interface TestimonialStory {
  id: string;
  studentName: string;
  academicBackground: string;
  verifiedProgram: string;
  cohortYear: string;
  avatarUrl: string;
  quote: string;
  verifiedMilestone: string;
  fullNarrative: string;
  domain: CareerDomainId;
  verificationBadge: string;
}

export interface FaqItem {
  id: string;
  category: 'Admissions & Guidance' | 'Training & Cohorts' | 'Career Trajectory' | 'Trust & Eligibility';
  question: string;
  answer: string;
}

export interface LeadFormData {
  fullName: string;
  email: string;
  phone: string;
  academicStage: AcademicStage;
  areaOfInterest: CareerDomainId;
  preferredSlot: 'morning' | 'afternoon' | 'evening' | 'weekend';
  specificGoal: string;
  consent: boolean;
}

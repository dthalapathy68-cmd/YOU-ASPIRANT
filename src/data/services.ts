import { ServiceItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'career-guidance',
    title: 'Career Guidance & Direction',
    subtitle: 'Transform exploratory ambition into clear, validated milestone roadmaps.',
    badgeText: 'Foundation Pillar',
    iconName: 'Compass',
    offers: [
      'Personalized 1-on-1 career diagnostic and aptitude mapping session',
      'Evaluation of student strengths, cognitive tendencies, and industry fit',
      'Realistic timeline planning with clear milestone check-ins'
    ],
    designedFor: 'School graduates, undecided college students, and young professionals seeking a structured path rather than guesswork.',
    achievements: [
      'Clarity on 2–3 viable career domains tailored to personal interests',
      'A structured 12-to-24 month milestone roadmap',
      'Elimination of common career myths and herd-mentality choices'
    ],
    detailedScope: 'Our career direction service begins with a thorough diagnostic that examines academic background, natural problem-solving habits, and genuine curiosity. We do not use superficial personality tests; instead, our senior mentors conduct structured discussions that evaluate realistic market opportunities, educational requirements, and financial realities to build an authentic journey.'
  },
  {
    id: 'skill-development',
    title: 'Skill Development & Practical Training',
    subtitle: 'Bridge textbook theory with production-grade tooling and workflows.',
    badgeText: 'Hands-on Cohorts',
    iconName: 'Code',
    offers: [
      'Curated curriculum led by industry practitioners, not academic lecturers',
      'Live code reviews, Figma critiques, and real business case deconstructions',
      'Portfolio-grade deliverables that demonstrate tangible capability'
    ],
    designedFor: 'Undergraduates and recent graduates who want actionable skills that recruiters respect, beyond theoretical diplomas.',
    achievements: [
      'Proof of work: published code repos, design prototypes, or business case briefs',
      'Hands-on fluency with contemporary tools (Git, Figma, SQL, modern frameworks)',
      'Constructive feedback loops that mimic professional team environments'
    ],
    detailedScope: 'Education is only valuable when it converts into competence. Our training programs focus entirely on practical mastery. Every participant works on realistic projects, presents their work, handles edge cases, and receives granular feedback from professionals who perform these roles daily in leading enterprises.'
  },
  {
    id: 'competitive-exams',
    title: 'Competitive Exam Preparation',
    subtitle: 'Strategic syllabus mastery, disciplined study routines, and analytical rigor.',
    badgeText: 'Targeted Guidance',
    iconName: 'Award',
    offers: [
      'Micro-level syllabus mapping that prevents wasted study hours',
      'Regular answer evaluation with actionable margin-of-improvement pointers',
      'CSAT, analytical reasoning, and speed-accuracy optimization drills'
    ],
    designedFor: 'Aspirants targeting civil services (UPSC/State PSC), banking (SBI/IBPS), regulatory bodies (RBI), and central competitive examinations.',
    achievements: [
      'Comprehensive conceptual clarity across core static and current subjects',
      'Proven test-taking strategy to maximize net scores and reduce negative marking',
      'Disciplined mental stamina for multi-hour written examination papers'
    ],
    detailedScope: 'Competitive exams are tests of endurance, strategy, and analytical composure. We avoid superficial shortcut tricks in favor of deep conceptual clarity. Students learn how to read policy papers, analyze constitutional questions, structure multi-dimensional answers, and manage negative-marking risk with precision.'
  },
  {
    id: 'interview-readiness',
    title: 'Interview & Career Readiness',
    subtitle: 'Deconstruct hiring filters and articulate your value with poise.',
    badgeText: 'Execution Sprint',
    iconName: 'Users',
    offers: [
      'Resume architecture: translating past coursework into high-impact achievements',
      'Video-recorded 1-on-1 mock interviews with technical and HR panels',
      'Structured behavioral frameworks (STAR methodology, executive articulation)'
    ],
    designedFor: 'Final year university students, campus placement aspirants, and professionals preparing for off-campus lateral interviews.',
    achievements: [
      'An ATS-optimized, high-conversion single-page resume',
      'Poised executive presence and spontaneous response articulation',
      'Detailed feedback report highlighting blind spots in communication and posture'
    ],
    detailedScope: 'Many talented students falter at the final hiring step not due to lack of competence, but because they struggle to articulate their value under scrutiny. Our interview readiness track deconstructs the psychological dynamic of interview rooms, giving students repeated simulated exposure until confidence becomes second nature.'
  },
  {
    id: 'academic-development',
    title: 'Academic & Professional Development',
    subtitle: 'Profile building, research synthesis, and higher education direction.',
    badgeText: 'Long-term Growth',
    iconName: 'BookOpen',
    offers: [
      'Statement of Purpose (SOP) and academic profile positioning guidance',
      'Guidance on identifying specialized Master’s and postgraduate programs',
      'Academic research methodology and technical writing fundamentals'
    ],
    designedFor: 'Students planning higher education in India or abroad, research fellowships, or specialized academic degrees.',
    achievements: [
      'A differentiated personal statement and coherent academic narrative',
      'Strategic selection of target universities and scholarship opportunities',
      'Readiness for academic admissions panels and technical interviews'
    ],
    detailedScope: 'Navigating graduate admissions or specialized academic pathways demands an authentic, compelling narrative. We help candidates unearth the cohesive thread in their academic journey, synthesize their research curiosity, and present an articulate Statement of Purpose that stands out to admissions faculties.'
  }
];

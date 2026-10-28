import { CareerDomain, AcademicStage, CareerRecommendation } from '../types';

export const CAREER_DOMAINS: CareerDomain[] = [
  {
    id: 'tech',
    name: 'Technology & Digital Systems',
    tagline: 'Engineering software, cloud architectures, AI systems & data platforms',
    badge: 'High Evolution',
    description: 'Transform analytical thinking into real production code, systems thinking, and intelligent automation.',
    iconName: 'Code2',
    sampleRoles: ['Full-Stack Engineer', 'Data Scientist / ML Engineer', 'Cloud Architect', 'Cybersecurity Analyst'],
    growthTrends: 'Substantial demand for engineers who pair foundational algorithms with cloud & AI integration.',
  },
  {
    id: 'business',
    name: 'Business & Management Strategy',
    tagline: 'Product ownership, market analytics, growth operations & consulting',
    badge: 'High Impact',
    description: 'Bridging technical capabilities with market reality, organizational leadership, and financial viability.',
    iconName: 'TrendingUp',
    sampleRoles: ['Associate Product Manager', 'Strategy Analyst', 'Operations Lead', 'Growth Specialist'],
    growthTrends: 'Rising need for data-literate leaders who can navigate cross-functional execution.',
  },
  {
    id: 'govt',
    name: 'Government & Competitive Services',
    tagline: 'Public administration, policy execution, banking & state civil leadership',
    badge: 'Public Service',
    description: 'Disciplined preparation for competitive civil, banking, regulatory, and administrative roles.',
    iconName: 'ShieldAlert',
    sampleRoles: ['Civil Services Officer (UPSC/State)', 'Reserve Bank / Regulatory Officer', 'Public Policy Fellow', 'Banking Probationary Officer'],
    growthTrends: 'High stability with rigorous meritocratic entry requiring sustained intellectual depth.',
  },
  {
    id: 'creative',
    name: 'Communication & Creative Design',
    tagline: 'UI/UX design, brand systems, storytelling, media & content architecture',
    badge: 'Creative Craft',
    description: 'Translating complex ideas into human-centered interfaces, digital products, and compelling narratives.',
    iconName: 'Palette',
    sampleRoles: ['Product Designer (UI/UX)', 'Brand Strategist', 'Interaction Designer', 'Digital Editorial Director'],
    growthTrends: 'Organizations now compete on user experience quality, elevating design to boardroom priority.',
  },
  {
    id: 'employability',
    name: 'Professional Employability & Core Skills',
    tagline: 'Cognitive agility, executive communication, interview mastery & workplace fluency',
    badge: 'Foundational',
    description: 'Mastering the non-negotiable fundamentals that turn academic qualifications into corporate readiness.',
    iconName: 'Briefcase',
    sampleRoles: ['Consulting Associate', 'Enterprise Analyst', 'Client Engagement Lead', 'Management Trainee'],
    growthTrends: 'Communication clarity and structured problem-solving remain the #1 filter across recruiters.',
  },
];

export const ACADEMIC_STAGES = [
  {
    id: 'school' as AcademicStage,
    label: 'High School (11th–12th)',
    hint: 'Choosing college streams, foundational discovery & early entrance clarity',
  },
  {
    id: 'undergrad' as AcademicStage,
    label: 'College Undergrad (1st–3rd Yr)',
    hint: 'Skill building, internship readiness & domain specialization',
  },
  {
    id: 'graduate' as AcademicStage,
    label: 'Final Year / Fresh Graduate',
    hint: 'Placement execution, off-campus hiring & competitive exams',
  },
  {
    id: 'working-pro' as AcademicStage,
    label: 'Early Career Professional (0–2 Yrs)',
    hint: 'Career pivot, acceleration, or transition to high-trajectory roles',
  },
];

export function getCareerRecommendation(domainId: string, stage: AcademicStage): CareerRecommendation {
  // Domain specific customization
  switch (domainId) {
    case 'tech':
      return {
        domainId: 'tech',
        stage,
        title: stage === 'school' 
          ? 'Foundational Computer Science & Algorithmic Exploration'
          : stage === 'undergrad'
          ? 'Modern Software Engineering & Full-Stack Systems Blueprint'
          : stage === 'graduate'
          ? 'Production-Ready Software Engineering & Placement Sprint'
          : 'High-Impact Engineering Transition & Architecture Track',
        overview: 'A disciplined progression from computational problem-solving to building deployable software systems. Emphasizes clean code, architecture patterns, and portfolio proof.',
        skillPillars: [
          { name: 'Core Foundations & DSA', description: 'Data structures, algorithm complexity, and systematic problem breakdown.' },
          { name: 'Modern Systems Architecture', description: 'API architecture, distributed storage, and cloud deploy workflows.' },
          { name: 'Portfolio Synthesis', description: 'Building 2 production-grade repositories that prove hands-on engineering ability.' }
        ],
        roadmapPhases: [
          { phase: 'Weeks 1–4', title: 'Diagnostic & Foundations', focus: 'Skill baseline, computational logic, and version control mastery.' },
          { phase: 'Weeks 5–8', title: 'Architecture & Fullstack Build', focus: 'Backend services, database normalization, and frontend component states.' },
          { phase: 'Weeks 9–12', title: 'Deployment & System Design', focus: 'Cloud CI/CD pipelines, latency optimization, and testing paradigms.' },
          { phase: 'Weeks 13+', title: 'Interview Architecture & Reviews', focus: 'Mock technical interviews, system whiteboard rounds, and resume calibration.' }
        ],
        recommendedPrograms: ['Tech Career Acceleration Cohort', 'Comprehensive Placement & Interview Readiness'],
        suggestedAction: 'Schedule an exploratory diagnostic session to benchmark your coding fundamentals and map your target tech stack.'
      };

    case 'business':
      return {
        domainId: 'business',
        stage,
        title: stage === 'school'
          ? 'Economics, Commerce & Business Foundations Explorer'
          : stage === 'undergrad'
          ? 'Product Management & Strategic Business Analytics Pathway'
          : stage === 'graduate'
          ? 'Management Consulting & Corporate Strategy Readiness'
          : 'Strategic Product Leadership & Business Operations Track',
        overview: 'Develop quantitative rigor, market intuition, and structured problem-solving to lead products and high-stakes business initiatives.',
        skillPillars: [
          { name: 'Business Case Structuring', description: 'Issue trees, profitability frameworks, and hypothesis-driven analysis.' },
          { name: 'Data-Driven Decisioning', description: 'SQL, spreadsheet financial modeling, and metric dashboarding.' },
          { name: 'Product Lifecycle Strategy', description: 'User discovery, PRD drafting, roadmap prioritization, and go-to-market.' }
        ],
        roadmapPhases: [
          { phase: 'Weeks 1–4', title: 'Problem Structuring', focus: 'Deconstructing real business cases using MECE issue trees.' },
          { phase: 'Weeks 5–8', title: 'Financial & Metrics Literacy', focus: 'Unit economics, cohort retention curves, and valuation models.' },
          { phase: 'Weeks 9–12', title: 'Product & Growth Sprint', focus: 'Drafting live product requirement documents and running mock sprints.' },
          { phase: 'Weeks 13+', title: 'Executive Case Presentation', focus: 'Defending strategy recommendations before seasoned business mentors.' }
        ],
        recommendedPrograms: ['Business Analytics & Product Strategy', 'Comprehensive Placement & Interview Readiness'],
        suggestedAction: 'Connect with a senior product mentor to evaluate your analytical profile and review sample business teardowns.'
      };

    case 'govt':
      return {
        domainId: 'govt',
        stage,
        title: stage === 'school'
          ? 'Civil Services & Public Policy Early Orientation'
          : stage === 'undergrad'
          ? 'Integrated Civil Services & Public Administration Roadmap'
          : stage === 'graduate'
          ? 'Targeted UPSC / State PSC / Banking Examination Sprint'
          : 'Strategic Competitive Exam Transition & Analytical Writing Track',
        overview: 'A disciplined, holistic framework for civil service and competitive entrance mastery, balancing static syllabus depth with analytical answer synthesis.',
        skillPillars: [
          { name: 'Syllabus Micro-Deconstruction', description: 'Mapping every keyword in the notification to authoritative study references.' },
          { name: 'Analytical Answer Writing', description: 'Structuring multi-dimensional answers with policy frameworks and case citations.' },
          { name: 'Static & Current Affairs Synthesis', description: 'Contextualizing daily policy shifts within constitutional and economic history.' }
        ],
        roadmapPhases: [
          { phase: 'Phase 1', title: 'Foundational Knowledge Core', focus: 'NCERT mastery, constitutional landmarks, and macroeconomic principles.' },
          { phase: 'Phase 2', title: 'Answer Writing & Mains Alignment', focus: 'Daily 150-word answer structuring, peer evaluation, and feedback loops.' },
          { phase: 'Phase 3', title: 'Test Series & Speed Drills', focus: 'Timed objective sectional tests and negative-marking risk optimization.' },
          { phase: 'Phase 4', title: 'Interview & Personality Simulation', focus: 'Detailed application form (DAF) cross-examination and board composure.' }
        ],
        recommendedPrograms: ['Civil Services & Public Policy Foundation', 'Banking & Regulatory Exams Master Track'],
        suggestedAction: 'Take a complimentary syllabus diagnostic to identify your baseline strengths in General Studies and CSAT aptitude.'
      };

    case 'creative':
      return {
        domainId: 'creative',
        stage,
        title: stage === 'school'
          ? 'Visual Communication & Digital Storytelling Explorer'
          : stage === 'undergrad'
          ? 'Human-Centered UI/UX & Product Design Fellowship'
          : stage === 'graduate'
          ? 'Design Portfolio Architecture & Industry Placement Track'
          : 'Senior UX Strategy & Digital Experience Leadership',
        overview: 'Transform creative empathy into rigorous product design. Learn user research, interface prototyping, design systems, and product communication.',
        skillPillars: [
          { name: 'User Research & Wireframing', description: 'Conducting user interviews, empathy maps, and low-fidelity user journeys.' },
          { name: 'Design Systems & Figma Mastery', description: 'Auto-layout, responsive components, tokens, and micro-interaction states.' },
          { name: 'Case Study Storytelling', description: 'Articulating the business rationale and problem constraints behind your UI.' }
        ],
        roadmapPhases: [
          { phase: 'Weeks 1–4', title: 'Design Thinking & Research', focus: 'Problem statement framing, competitor audits, and user personas.' },
          { phase: 'Weeks 5–8', title: 'Visual Systems & Prototyping', focus: 'Typography scale, color psychology, and interactive prototyping in Figma.' },
          { phase: 'Weeks 9–12', title: 'Live Client / Capstone Build', focus: 'End-to-end mobile/web app design validated through usability testing.' },
          { phase: 'Weeks 13+', title: 'Portfolio Defense & Review', focus: 'Critique sessions with lead product designers from tech startups.' }
        ],
        recommendedPrograms: ['UI/UX & Digital Product Design Bootcamp'],
        suggestedAction: 'Submit your existing creative samples or sketches for an honest 1-on-1 portfolio review with a lead designer.'
      };

    default: // employability
      return {
        domainId: 'employability',
        stage,
        title: 'Executive Professional Readiness & Campus Placement Sprint',
        overview: 'Bridge the critical gap between academic knowledge and corporate hiring standards through behavioral mastery, aptitude speed, and articulation.',
        skillPillars: [
          { name: 'Structured Articulation', description: 'STAR methodology, executive presence, and succinct spontaneous speaking.' },
          { name: 'Quantitative & Logical Aptitude', description: 'Speed math shortcuts, pattern recognition, and critical reasoning.' },
          { name: 'Resume & Portfolio Architecture', description: 'ATS-compliant formatting, achievement-driven bullet points, and LinkedIn optimization.' }
        ],
        roadmapPhases: [
          { phase: 'Module 1', title: 'Aptitude & Diagnostic Drill', focus: 'Speed arithmetic, logical puzzles, and verbal reasoning baselines.' },
          { phase: 'Module 2', title: 'Resume Crafting & ATS Polish', focus: 'Restructuring past projects into high-impact measurable achievements.' },
          { phase: 'Module 3', title: 'Group Discussion & Spontaneous Speech', focus: 'Handling current debate topics, body language, and constructive rebuttals.' },
          { phase: 'Module 4', title: 'High-Stakes Mock Interviews', focus: '3 recorded 1-on-1 mock interviews with video playback critique.' }
        ],
        recommendedPrograms: ['Comprehensive Placement & Interview Readiness'],
        suggestedAction: 'Get your resume reviewed with our proprietary rubric to spot red flags before campus recruitment drives start.'
      };
  }
}

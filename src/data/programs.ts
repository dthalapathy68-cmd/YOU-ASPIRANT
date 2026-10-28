import { TrainingProgram } from '../types';

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 'tech-accel',
    title: 'Tech Career Acceleration Cohort',
    domain: 'tech',
    targetStage: 'College Undergrads & Recent Grads',
    duration: '14 Weeks (Part-time, 8 hrs/week)',
    format: 'Live Mentor Masterclasses + Daily Code Sprints',
    badge: 'Flagship Tech Track',
    tagline: 'Master modern full-stack engineering, production-grade cloud deployment, and system architecture.',
    summary: 'An intensive, project-first bootcamp designed to take students from textbook theory to deploying scalable web systems. Includes real-world code reviews and GitHub portfolio curation.',
    modules: [
      { week: 'Weeks 1–3', topic: 'Data Structures & Algorithmic Patterns', details: 'Binary search variants, sliding window, graph traversals, and complexity optimization.' },
      { week: 'Weeks 4–7', topic: 'Modern Distributed Backends', details: 'Node.js/Go microservices, PostgreSQL normalization, indexing, Redis caching & REST/GraphQL API design.' },
      { week: 'Weeks 8–10', topic: 'Interactive Web Systems & State', details: 'React, TypeScript, component architecture, server state caching, and client performance.' },
      { week: 'Weeks 11–12', topic: 'Cloud CI/CD & Production Deploy', details: 'Docker containerization, AWS ECS/Vercel pipelines, logging, and environment secret handling.' },
      { week: 'Weeks 13–14', topic: 'System Design & Engineering Defense', details: 'High-level architecture diagrams, mock technical interviews, and portfolio repository polishing.' }
    ],
    keyOutcomes: [
      '2 deployed, production-grade fullstack web applications with live URLs & GitHub repos',
      'Solid command over high-frequency technical interview algorithms',
      'Hands-on experience with Docker, relational schema design, and cloud deployments',
      'Personalized code review sessions with experienced industry software engineers'
    ],
    prerequisites: 'Basic familiarity with any programming language (Python, C++, Java, or JavaScript). No advanced experience required.',
    mentorProfile: 'Led by senior engineers from high-growth tech firms with 6+ years of production experience.',
    seatsNote: 'Limited to 35 aspirants per cohort to ensure individualized code review attention.'
  },
  {
    id: 'civil-foundations',
    title: 'Civil Services & Public Policy Foundation',
    domain: 'govt',
    targetStage: 'Degree Students & Competitive Aspirants',
    duration: '24 Weeks (Modular Schedule)',
    format: 'Interactive Lecture Series + Weekly Analytical Writing Drills',
    badge: 'Public Administration',
    tagline: 'Build multi-disciplinary conceptual depth, answer structuring rigor, and CSAT mastery.',
    summary: 'A structured, evidence-oriented preparation system for civil service and state administrative examinations. Replaces passive rote memorization with contextual frameworks and consistent writing practice.',
    modules: [
      { week: 'Weeks 1–6', topic: 'Constitutional Architecture & Indian Polity', details: 'Fundamental rights jurisprudence, federal dynamics, judicial review, and parliamentary procedure.' },
      { week: 'Weeks 7–12', topic: 'Macroeconomics, Budgeting & Public Finance', details: 'Monetary policy, fiscal deficits, rural infrastructure, agricultural reforms, and external trade.' },
      { week: 'Weeks 13–18', topic: 'Modern History, Geography & Ecology', details: 'Decolonization, world physical geography, biodiversity conservation treaties, and climate policy.' },
      { week: 'Weeks 19–21', topic: 'Analytical Mains Answer Synthesis', details: 'Structuring 10-marker and 15-marker answers using schematics, data points, and committee recommendations.' },
      { week: 'Weeks 22–24', topic: 'CSAT Aptitude & Timed Simulation', details: 'Reading comprehension logic, quantitative shortcuts, and full-length simulated prelims papers.' }
    ],
    keyOutcomes: [
      'Structured mastery of core General Studies syllabus across all static pillars',
      'Over 60 evaluated answer scripts with personalized rubric feedback',
      'Comprehensive current affairs synthesis repository updated weekly',
      'Confidence to navigate negative-marking risk and time management under pressure'
    ],
    prerequisites: 'Open to enrolled college students and graduates passionate about public governance.',
    mentorProfile: 'Guided by retired civil servants, public policy researchers, and subject-matter educators.',
    seatsNote: 'Small cohort discussion circles (maximum 25 aspirants per mentor group).'
  },
  {
    id: 'product-strategy',
    title: 'Business Analytics & Product Strategy',
    domain: 'business',
    targetStage: 'Pre-final & Final Year Students, Early Professionals',
    duration: '10 Weeks (Weekend Live Cohort)',
    format: 'Live Case Deconstructions + Product Teardowns',
    badge: 'Strategic Leadership',
    tagline: 'Learn how modern products are conceived, measured, optimized, and brought to market.',
    summary: 'A real-world simulation cohort where students master product discovery, user metrics, financial unit economics, and data-driven storytelling.',
    modules: [
      { week: 'Weeks 1–2', topic: 'Problem Framing & User Discovery', details: 'Customer interviews, empathy mapping, identifying unmet needs, and problem-solution fit.' },
      { week: 'Weeks 3–4', topic: 'Product Metrics & Analytics Core', details: 'North star metrics, cohort retention, funnel drop-off analysis, and SQL for business queries.' },
      { week: 'Weeks 5–6', topic: 'PRD Creation & Wireframe Prototypes', details: 'Drafting clear Product Requirement Documents, feature scoping, and low-fi user flows.' },
      { week: 'Weeks 7–8', topic: 'Go-To-Market & Pricing Mechanics', details: 'Customer acquisition cost (CAC), lifetime value (LTV), distribution channels, and launch playbooks.' },
      { week: 'Weeks 9–10', topic: 'Live Product Case Defense', details: 'Presenting an end-to-end product proposal before a panel of startup product managers.' }
    ],
    keyOutcomes: [
      'One end-to-end published Product Case Study ready for LinkedIn and portfolio review',
      'Fluency with SQL queries, conversion funnels, and metric tracking frameworks',
      'Mastery of Product Requirement Document (PRD) drafting standards',
      '1-on-1 resume transformation tailored for APM and Strategy Analyst applications'
    ],
    prerequisites: 'Strong curiosity about technology businesses. No coding background required.',
    mentorProfile: 'Instructed by Product Managers and Strategy Leads from verified digital enterprises.',
    seatsNote: 'Selective admissions based on short interest diagnostic.'
  },
  {
    id: 'uiux-design',
    title: 'UI/UX & Digital Product Design Bootcamp',
    domain: 'creative',
    targetStage: 'College Students & Creative Career Changers',
    duration: '12 Weeks (Project Studio Model)',
    format: 'Design Studio Critiques + Figma Live Workshops',
    badge: 'Design Craft',
    tagline: 'Turn design intuition into professional interface architecture and research-backed design systems.',
    summary: 'An apprenticeship-style design studio teaching user research, layout psychology, auto-layout design systems in Figma, and interactive micro-interactions.',
    modules: [
      { week: 'Weeks 1–3', topic: 'Design Thinking & User Research', details: 'Heuristic evaluation, competitive benchmarking, user journey maps, and information architecture.' },
      { week: 'Weeks 4–6', topic: 'Visual Hierarchy & Typography Foundations', details: 'Type pairing, 8pt grid systems, accessible color contrast (WCAG), and responsive layout rules.' },
      { week: 'Weeks 7–9', topic: 'Advanced Figma & Design Systems', details: 'Variables, component variants, auto-layout, interactive prototypes, and developer handoff.' },
      { week: 'Weeks 10–12', topic: 'Capstone Case Study & Portfolio Curation', details: 'Documenting the design process, writing compelling case studies, and presentation critiques.' }
    ],
    keyOutcomes: [
      'A polished online portfolio featuring 2 comprehensive case studies with rationale',
      'Advanced Figma proficiency matching industry agency standards',
      'Understanding of WCAG accessibility standards and responsive UI patterns',
      'Readiness for junior UI/UX designer and product design internship interviews'
    ],
    prerequisites: 'A laptop capable of running Figma in browser. Prior graphic design experience is not required.',
    mentorProfile: 'Led by senior product designers and creative directors from digital design studios.',
    seatsNote: 'Strictly limited to 20 seats per cohort to guarantee weekly design critique time.'
  },
  {
    id: 'placement-readiness',
    title: 'Comprehensive Placement & Interview Readiness',
    domain: 'employability',
    targetStage: 'Final Year Students & Off-Campus Aspirants',
    duration: '8 Weeks (Sprint Format)',
    format: 'Weekly Aptitude Speed Sprints + 1:1 Video Mock Rounds',
    badge: 'High Conversion',
    tagline: 'Transform your resume, sharpen your aptitude speed, and master high-stakes interview rooms.',
    summary: 'A rigorous bootcamp targeting the three classic placement filters: online aptitude screening, technical/functional domain checks, and executive HR interviews.',
    modules: [
      { week: 'Weeks 1–2', topic: 'Quantitative Speed & Logical Reasoning', details: 'Speed calculation techniques, probability shortcuts, syllogisms, and data interpretation.' },
      { week: 'Weeks 3–4', topic: 'Resume Engineering & ATS Optimization', details: 'Deconstructing past projects into quantifiable achievements using the Google XYZ formula.' },
      { week: 'Weeks 5–6', topic: 'Executive Communication & Group Discussions', details: 'Handling impromptu topics, persuasive debate etiquette, and articulation under pressure.' },
      { week: 'Weeks 7–8', topic: '1-on-1 Behavioral & Technical Mocks', details: 'STAR methodology storytelling, handling weakness questions, salary etiquette, and post-round debriefs.' }
    ],
    keyOutcomes: [
      'A professionally calibrated, ATS-compliant single-page resume',
      'Three recorded 1-on-1 mock interviews with written scorecards and improvement points',
      'Measurable speed improvements on quantitative screening test simulations',
      'Elevated communication poise and professional executive presence'
    ],
    prerequisites: 'Open to all final year undergraduate and postgraduate students from any academic discipline.',
    mentorProfile: 'Guided by corporate hiring managers, technical interviewers, and soft-skill specialists.',
    seatsNote: 'Continuous rolling batches with weekend and evening timings.'
  },
  {
    id: 'banking-regulatory',
    title: 'Banking & Regulatory Exams Master Track',
    domain: 'govt',
    targetStage: 'Graduates & Final Year Aspirants',
    duration: '16 Weeks (Intensive Practice Model)',
    format: 'Sectional Speed Drills + Economic Awareness Briefs',
    badge: 'Specialized Track',
    tagline: 'Crack SBI PO, IBPS PO, and RBI Grade B with structured sectional focus and interview prep.',
    summary: 'A numbers-driven, speed-centric program built for banking and regulatory examinations, focusing on high-difficulty reasoning, financial awareness, and descriptive English writing.',
    modules: [
      { week: 'Weeks 1–4', topic: 'High-Level Quantitative Aptitude', details: 'Data sufficiency, quadratic comparisons, probability, and advanced caselet interpretation.' },
      { week: 'Weeks 5–8', topic: 'Complex Reasoning & Critical Logic', details: 'Multi-variable seating arrangements, input-output machines, and conditional statements.' },
      { week: 'Weeks 9–12', topic: 'Financial Economics & Banking Awareness', details: 'Monetary instruments, NPA management, Basel norms, priority sector lending, and union budget.' },
      { week: 'Weeks 13–16', topic: 'Descriptive Writing & Interview Readiness', details: 'Essay structure on economic themes, formal letter writing, and panel interview simulations.' }
    ],
    keyOutcomes: [
      'Mastery of high-difficulty puzzle solving under strict countdown constraints',
      'Weekly sectional mock tests with percentile analytics and question-selection strategy',
      'Comprehensive banking awareness handbook updated for the current financial year',
      'Simulated panel interview preparation covering personal bio-data and economic awareness'
    ],
    prerequisites: 'Graduation in any stream (completed or appearing in final semester).',
    mentorProfile: 'Delivered by experienced banking exam trainers and former banking professionals.',
    seatsNote: 'Small batch size for regular speed-test evaluation.'
  }
];

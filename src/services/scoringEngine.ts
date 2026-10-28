import { 
  DimensionKey, 
  DimensionInfo,
  AssessmentResultData, 
  CareerMatch, 
  LearningStylePreference 
} from '../types/careerDna';
import { SEED_QUESTIONS, SEED_CAREERS, SEED_CATEGORIES } from '../data/seedData';

export const DIMENSIONS: Record<DimensionKey, DimensionInfo> = {
  tech: {
    key: 'tech',
    label: 'Technology & Logical Thinking',
    description: 'Writing code, understanding software architectures, algorithms, and digital tools.',
    color: '#542744',
  },
  design: {
    key: 'design',
    label: 'Creativity & Visual Design',
    description: 'Human-centred design, user interfaces, aesthetic harmony, and visual communication.',
    color: '#F4A340',
  },
  data: {
    key: 'data',
    label: 'Data & Analytical Rigor',
    description: 'Examining statistics, querying databases, identifying patterns, and objective reasoning.',
    color: '#754565',
  },
  people: {
    key: 'people',
    label: 'Communication & People',
    description: 'Empathy, storytelling, group collaboration, community building, and mentoring.',
    color: '#A984A1',
  },
  business: {
    key: 'business',
    label: 'Business & Leadership',
    description: 'Strategy, project planning, operational roadmaps, and organizational impact.',
    color: '#27845D',
  },
  engineering: {
    key: 'engineering',
    label: 'Engineering & Systems',
    description: 'Infrastructure, deployment pipelines, automation, reliability, and physical/digital structures.',
    color: '#C54A4A',
  },
};

export interface UserAnswerInput {
  questionId: number;
  optionId: string;
}

export function calculateAssessmentResult(answers: UserAnswerInput[]): AssessmentResultData {
  // 1. Initialize raw dimension scores & learning style tallies
  const rawScores: Record<DimensionKey, number> = {
    tech: 0,
    design: 0,
    data: 0,
    people: 0,
    business: 0,
    engineering: 0,
  };

  const learningTallies: Record<LearningStylePreference, number> = {
    'Project-based learning': 0,
    'Structured learning': 0,
    'Visual learning': 0,
    'Collaborative learning': 0,
  };

  // 2. Accumulate weights based on chosen options
  answers.forEach((ans) => {
    const q = SEED_QUESTIONS.find((item) => item.id === ans.questionId);
    if (!q) return;

    const opt = q.options.find((o) => o.id === ans.optionId);
    if (!opt) return;

    // Add dimension weights
    Object.entries(opt.weights).forEach(([dim, weight]) => {
      const key = dim as DimensionKey;
      if (rawScores[key] !== undefined && typeof weight === 'number') {
        rawScores[key] += weight;
      }
    });

    // Add learning style weight if present
    if (opt.learningWeight && learningTallies[opt.learningWeight] !== undefined) {
      learningTallies[opt.learningWeight] += 1;
    }
  });

  // 3. Find maximum possible points to normalize to 0–100 scale cleanly
  // Max possible in 15 questions is approximately 30-40 points per dimension
  const maxBenchmark = 35;
  const normalizedScores: Record<DimensionKey, number> = {
    tech: Math.min(100, Math.max(15, Math.round((rawScores.tech / maxBenchmark) * 100))),
    design: Math.min(100, Math.max(15, Math.round((rawScores.design / maxBenchmark) * 100))),
    data: Math.min(100, Math.max(15, Math.round((rawScores.data / maxBenchmark) * 100))),
    people: Math.min(100, Math.max(15, Math.round((rawScores.people / maxBenchmark) * 100))),
    business: Math.min(100, Math.max(15, Math.round((rawScores.business / maxBenchmark) * 100))),
    engineering: Math.min(100, Math.max(15, Math.round((rawScores.engineering / maxBenchmark) * 100))),
  };

  // 4. Sort dimensions from highest to lowest score
  const sortedDimensions = (Object.keys(normalizedScores) as DimensionKey[])
    .map((k) => ({
      key: k,
      label: DIMENSIONS[k].label,
      score: normalizedScores[k],
    }))
    .sort((a, b) => b.score - a.score);

  const primaryDimensions = sortedDimensions.slice(0, 2);
  const secondaryDimensions = sortedDimensions.slice(2, 4);

  // 5. Inferred learning style
  let topLearningStyle: LearningStylePreference = 'Project-based learning';
  let topTally = -1;
  Object.entries(learningTallies).forEach(([style, count]) => {
    if (count > topTally) {
      topTally = count;
      topLearningStyle = style as LearningStylePreference;
    }
  });

  const learningExplanations: Record<LearningStylePreference, string> = {
    'Project-based learning': 'Your responses show you learn best by constructing tangible applications and troubleshooting errors in real time rather than memorizing abstract theory.',
    'Structured learning': 'You thrive when learning follows a sequential syllabus with clear prerequisites, defined milestones, and objective benchmarks.',
    'Visual learning': 'You absorb concepts fastest through interactive diagrams, UI wireframes, flowcharts, and visual representations of complex systems.',
    'Collaborative learning': 'You gain maximum clarity when discussing ideas with peers, participating in study cohorts, and explaining concepts back to others.',
  };

  // 6. Transparent Career Recommendations
  // Map dimensions to careers deterministically
  const careerScoringMap: Record<string, { primary: DimensionKey[]; secondary: DimensionKey[] }> = {
    'frontend-developer': { primary: ['tech', 'design'], secondary: ['engineering'] },
    'fullstack-developer': { primary: ['tech', 'engineering'], secondary: ['data'] },
    'ui-ux-designer': { primary: ['design', 'people'], secondary: ['tech'] },
    'data-analyst': { primary: ['data', 'business'], secondary: ['tech'] },
    'digital-marketer': { primary: ['people', 'business'], secondary: ['design'] },
    'business-analyst': { primary: ['business', 'data'], secondary: ['people'] },
    'software-tester': { primary: ['tech', 'engineering'], secondary: ['data'] },
    'cloud-devops-beginner': { primary: ['engineering', 'tech'], secondary: ['data'] },
  };

  const scoredCareers = SEED_CAREERS.map((career) => {
    const rules = careerScoringMap[career.id] || { primary: ['tech'], secondary: ['business'] };
    
    // Calculate match score
    let scoreTotal = 0;
    rules.primary.forEach((dim) => {
      scoreTotal += normalizedScores[dim] * 0.7;
    });
    rules.secondary.forEach((dim) => {
      scoreTotal += normalizedScores[dim] * 0.3;
    });
    const avgScore = Math.min(98, Math.round(scoreTotal / (rules.primary.length * 0.7 + rules.secondary.length * 0.3)));

    const category = SEED_CATEGORIES.find((c) => c.id === career.categoryId);

    // Generate explainable match rationale
    const primaryLabels = rules.primary.map((d) => DIMENSIONS[d].label).join(' & ');
    const topPrimaryName = primaryDimensions[0].label;
    const whyMatch = `${career.title} appears in your recommendations because your assessment responses indicated high interest in ${primaryLabels}. Since your primary strength is ${topPrimaryName} (${primaryDimensions[0].score}%), this role offers a natural path to turn your natural curiosity into tangible accomplishments.`;

    const match: CareerMatch = {
      careerId: career.id,
      title: career.title,
      categoryName: category?.name || 'Career Exploration',
      matchScore: avgScore,
      whyMatch,
      coreSkills: career.coreSkills.slice(0, 4),
      suggestedStarterActivity: career.practiceProject.description,
    };
    return match;
  }).sort((a, b) => b.matchScore - a.matchScore);

  const recommendedCareers = scoredCareers.slice(0, 3);
  const alternativeCareers = scoredCareers.slice(3, 5);

  // 7. Starter skills for primary direction
  const topCareer = SEED_CAREERS.find((c) => c.id === recommendedCareers[0].careerId) || SEED_CAREERS[0];
  const starterSkills = topCareer.coreSkills.slice(0, 4).map((skillName, idx) => ({
    name: skillName,
    category: idx === 0 ? 'Foundation' : idx === 1 ? 'Core Syntax / Tool' : 'Practical Application',
    description: `Essential starting ability for beginner ${topCareer.title}s.`,
  }));

  return {
    id: `result-${Date.now()}`,
    createdAt: new Date().toISOString(),
    scores: normalizedScores,
    primaryDimensions,
    secondaryDimensions,
    learningPreference: topLearningStyle,
    learningPreferenceExplanation: learningExplanations[topLearningStyle],
    recommendedCareers,
    alternativeCareers,
    starterSkills,
  };
}

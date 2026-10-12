export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PracticalExample {
  title: string;
  scenario: string;
  aiWorkflow: string;
  result: string;
}

export interface ReusablePrompt {
  title: string;
  category: string;
  promptText: string;
  variables: string[];
  intendedPurpose: string;
}

export interface LessonContent {
  id: string;
  lessonNumber: number;
  moduleId: string;
  moduleTitle: string;
  title: string;
  durationMinutes: number;
  learningObjectives: string[];
  trainerScript: string;
  demonstrationInstructions: string[];
  practicalExamples: PracticalExample[];
  prompts: ReusablePrompt[];
  studentActivity: {
    title: string;
    description: string;
    steps: string[];
    submissionExpected: string;
  };
  keyTakeaways: string[];
  suggestedVisuals: string[];
  downloadableNotes: string;
  quiz: QuizQuestion[];
}

export interface CourseModule {
  id: string;
  moduleNumber: number;
  title: string;
  totalDurationMinutes: number;
  lessons: string[];
}

export interface ProjectRubricCriterion {
  category: string;
  weight: number; // percentage
  excellent: string;
  good: string;
  needsImprovement: string;
}

export const AI_TOOLS_COURSE_METADATA = {
  id: 'ai_tools_course',
  title: 'AI Tools for Students & Professionals',
  subtitle: 'Master Everyday Productivity, Research, Slide Decks, Professional Emails, and Ethical AI Workflows in 4 Hours',
  priceINR: 499,
  originalPriceINR: 1999,
  discountPercentage: 75,
  totalDurationMinutes: 240,
  totalHours: 4,
  totalLessons: 15,
  courseType: 'Self-paced, pre-recorded online course',
  difficulty: 'Beginner',
  language: 'Simple English with practical Indian student & professional examples',
  prerequisites: 'Basic computer or smartphone usage and an internet connection. No coding or mathematics background needed.',
  targetAudience: [
    'School and college students (Arts, Commerce, Engineering, Science)',
    'Fresh graduates and competitive exam aspirants',
    'Working professionals (HR, Sales, Operations, Marketing, Admin)',
    'School and college teachers, lecturers, and corporate trainers',
    'Small business owners, freelancers, and shopkeepers',
    'Complete beginners with zero prior artificial intelligence experience'
  ],
  mainObjective: 'By the end of this course, learners will confidently and responsibly use tools like ChatGPT, Gemini, and Copilot for study notes, literature research, dynamic presentation decks, formal workplace emails, resume bullet points, and daily task orchestration without falling for hallucinations or academic integrity traps.',
  trainer: {
    name: 'VeeGo Applied AI Engineering Team',
    role: 'Senior AI Productivity Consultants & Full-Stack Engineers',
    bio: 'Engineers and practitioners at VeeGo Technologies with hands-on experience building enterprise workflow automation engines, student LMS architectures, and practical applied AI cohorts across Tamil Nadu and India.'
  }
};

export const AI_TOOLS_MODULES: CourseModule[] = [
  {
    id: 'aitools_module1',
    moduleNumber: 1,
    title: 'Module 1: Introduction to AI',
    totalDurationMinutes: 30,
    lessons: ['aitools_lesson1', 'aitools_lesson2']
  },
  {
    id: 'aitools_module2',
    moduleNumber: 2,
    title: 'Module 2: Prompt Engineering Basics',
    totalDurationMinutes: 40,
    lessons: ['aitools_lesson3', 'aitools_lesson4']
  },
  {
    id: 'aitools_module3',
    moduleNumber: 3,
    title: 'Module 3: AI for Students and Learning',
    totalDurationMinutes: 45,
    lessons: ['aitools_lesson5', 'aitools_lesson6', 'aitools_lesson7']
  },
  {
    id: 'aitools_module4',
    moduleNumber: 4,
    title: 'Module 4: AI for Presentations and Content',
    totalDurationMinutes: 45,
    lessons: ['aitools_lesson8', 'aitools_lesson9', 'aitools_lesson10']
  },
  {
    id: 'aitools_module5',
    moduleNumber: 5,
    title: 'Module 5: AI for Professional Productivity',
    totalDurationMinutes: 40,
    lessons: ['aitools_lesson11', 'aitools_lesson12', 'aitools_lesson13']
  },
  {
    id: 'aitools_module6',
    moduleNumber: 6,
    title: 'Module 6: Responsible AI and Final Assessment',
    totalDurationMinutes: 40,
    lessons: ['aitools_lesson14', 'aitools_lesson15']
  }
];

export const aiToolsCourseInfo = AI_TOOLS_COURSE_METADATA;
export const aiToolsModules = AI_TOOLS_MODULES;
export const aiToolsTrainerInfo = AI_TOOLS_COURSE_METADATA.trainer;

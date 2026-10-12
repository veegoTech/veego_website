import { LessonContent, CourseModule, aiToolsCourseInfo, aiToolsModules, aiToolsTrainerInfo } from './aiToolsCourseData';
import { module1Lessons } from './aiToolsLessonsModule1';
import { module2Lessons } from './aiToolsLessonsModule2';
import { module3Lessons } from './aiToolsLessonsModule3';
import { module4Lessons } from './aiToolsLessonsModule4';
import { module5Lessons } from './aiToolsLessonsModule5';
import { module6Lessons, finalAssessmentQuestions, projectRubricCriteria } from './aiToolsLessonsModule6';

export const allAIToolsLessons: LessonContent[] = [
  ...module1Lessons,
  ...module2Lessons,
  ...module3Lessons,
  ...module4Lessons,
  ...module5Lessons,
  ...module6Lessons
];

export {
  aiToolsCourseInfo,
  aiToolsModules,
  aiToolsTrainerInfo,
  finalAssessmentQuestions,
  projectRubricCriteria
};

export function getLessonById(id: string): LessonContent | undefined {
  return allAIToolsLessons.find(l => l.id === id);
}

export function getLessonByNumber(lessonNum: number): LessonContent | undefined {
  return allAIToolsLessons.find(l => l.lessonNumber === lessonNum);
}

export function getLessonsByModule(moduleId: string): LessonContent[] {
  return allAIToolsLessons.filter(l => l.moduleId === moduleId);
}

export function getTotalDurationMinutes(): number {
  return allAIToolsLessons.reduce((sum, lesson) => sum + lesson.durationMinutes, 0);
}

export function getTotalQuizQuestionsCount(): number {
  const lessonQuizzesCount = allAIToolsLessons.reduce((sum, lesson) => sum + lesson.quiz.length, 0);
  return lessonQuizzesCount + finalAssessmentQuestions.length; // 75 + 20 = 95 questions total
}

import { api } from './client';
import { CourseSummary, EnrollmentItem } from './types';

export interface CourseSection {
  id: string;
  order: number;
  title: string;
  items: string[];
}
export interface CourseFaq {
  id: string;
  order: number;
  question: string;
  answer: string;
}
export interface CourseLessonMeta {
  id: string;
  slug: string;
  type: 'TEXT' | 'VIDEO' | 'QUIZ';
  order: number;
  durationMinutes: number;
  title: string;
}
export interface CourseModuleDetail {
  id: string;
  slug: string;
  emoji?: string | null;
  order: number;
  title: string;
  description?: string | null;
  lessons: CourseLessonMeta[];
}
export interface CourseDetail extends CourseSummary {
  description?: string | null;
  trailLabel?: string | null;
  extraContent: string[];
  sections: CourseSection[];
  faqs: CourseFaq[];
  modules: CourseModuleDetail[];
}

let courseCache: CourseSummary[] | null = null;

export const coursesApi = {
  async list(locale = 'pt-BR'): Promise<CourseSummary[]> {
    courseCache = await api.get<CourseSummary[]>('/courses', {
      auth: false,
      query: { locale },
    });
    return courseCache;
  },

  getBySlug(slug: string, locale = 'pt-BR'): Promise<CourseDetail> {
    return api.get<CourseDetail>(`/courses/${slug}`, {
      auth: false,
      query: { locale },
    });
  },

  /** Resolve o UUID do curso a partir do legacyId numérico (1,2,3). */
  async resolveId(legacyId: number, locale = 'pt-BR'): Promise<string | null> {
    const list = courseCache ?? (await this.list(locale));
    return list.find((c) => c.legacyId === legacyId)?.id ?? null;
  },

  myEnrollments(): Promise<EnrollmentItem[]> {
    return api.get<EnrollmentItem[]>('/me/enrollments');
  },

  enroll(courseId: string): Promise<EnrollmentItem> {
    return api.post<EnrollmentItem>('/enrollments', { courseId });
  },
};

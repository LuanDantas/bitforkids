import { api } from './client';
import { coursesApi } from './courses';

interface CourseMap {
  courseUuid: string;
  /** lessonSlug -> lessonUuid */
  slugToUuid: Map<string, string>;
  /** lessonUuid -> `${moduleSlug}-${lessonSlug}` (chave usada pelo StudyContext) */
  uuidToKey: Map<string, string>;
}

interface ProgressResponse {
  percentComplete: number;
  completedLessonIds: string[];
}

const cache = new Map<number, CourseMap>();

async function buildMap(legacyId: number): Promise<CourseMap | null> {
  if (cache.has(legacyId)) return cache.get(legacyId)!;
  try {
    const detail = await coursesApi.getBySlug(`curso-${legacyId}`);
    const slugToUuid = new Map<string, string>();
    const uuidToKey = new Map<string, string>();
    for (const m of detail.modules ?? []) {
      for (const l of m.lessons ?? []) {
        slugToUuid.set(l.slug, l.id);
        uuidToKey.set(l.id, `${m.slug}-${l.slug}`);
      }
    }
    const map: CourseMap = { courseUuid: detail.id, slugToUuid, uuidToKey };
    cache.set(legacyId, map);
    return map;
  } catch {
    return null;
  }
}

export const progressApi = {
  /** Persiste a conclusão de uma aula na API (best-effort). */
  async completeLesson(legacyId: number, lessonSlug: string): Promise<void> {
    const map = await buildMap(legacyId);
    const lessonUuid = map?.slugToUuid.get(lessonSlug);
    if (!lessonUuid) return;
    try {
      await api.post(`/progress/lessons/${lessonUuid}/complete`);
    } catch {
      // 403 (sem matrícula) ou offline — ignora; UI usa estado local.
    }
  },

  /**
   * Busca o progresso do curso no servidor e devolve as chaves
   * `${moduleSlug}-${lessonSlug}` das aulas concluídas.
   */
  async fetchCompletedKeys(legacyId: number): Promise<string[]> {
    const map = await buildMap(legacyId);
    if (!map) return [];
    try {
      const res = await api.get<ProgressResponse>(
        `/me/courses/${map.courseUuid}/progress`,
      );
      return res.completedLessonIds
        .map((id) => map.uuidToKey.get(id))
        .filter((k): k is string => typeof k === 'string');
    } catch {
      return [];
    }
  },
};

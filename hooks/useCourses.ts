import { useEffect, useState } from 'react';
import { coursesApi } from '@/services/api/courses';
import type { CourseSummary } from '@/services/api/types';

export interface CatalogCourse {
  id: number; // legacyId (1,2,3) usado pelas rotas/telas
  slug: string;
  trail: number; // 1 = iniciante, 2 = soberania
  title: string;
  subtitle: string;
  price: string; // ex "397,00"
}

const TRACK_TRAIL: Record<string, number> = {
  iniciante: 1,
  soberania: 2,
};

function mapCourse(c: CourseSummary): CatalogCourse | null {
  if (typeof c.legacyId !== 'number') return null;
  return {
    id: c.legacyId,
    slug: c.slug,
    trail: c.track ? (TRACK_TRAIL[c.track.slug] ?? 1) : 1,
    title: c.title,
    subtitle: c.subtitle ?? '',
    price: (c.priceCents / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  };
}

/**
 * Busca o catálogo de cursos da API. Retorna `null` em `courses` enquanto carrega
 * para a tela poder aplicar fallback local (i18n) se necessário.
 */
export function useCourses(locale = 'pt-BR') {
  const [courses, setCourses] = useState<CatalogCourse[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const list = await coursesApi.list(locale);
        if (!active) return;
        setCourses(
          list
            .map(mapCourse)
            .filter((c): c is CatalogCourse => c !== null)
            .sort((a, b) => a.id - b.id)
        );
      } catch {
        if (active) setError(true);
      }
    })();
    return () => {
      active = false;
    };
  }, [locale]);

  return { courses, error, loading: courses === null && !error };
}

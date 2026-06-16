import { useEffect, useState } from 'react';
import { coursesApi } from '@/services/api/courses';

export interface DetailFaq {
  q: string;
  a: string;
}

export interface CourseDetailData {
  title: string;
  subtitle: string;
  price: string;
  trailLabel: string;
  sections: { title: string; items: string[] }[];
  extraContent: string[];
  faq: DetailFaq[];
  coverUrl: string | null; // capa servida pela API; null -> usa asset local
}

/**
 * Busca o detalhe de um curso da API (por legacyId → slug `curso-N`) e o mapeia
 * para a forma consumida pela tela. Retorna `null` enquanto carrega para a tela
 * aplicar fallback local (i18n).
 */
export function useCourseDetail(legacyId: number, locale = 'pt-BR') {
  const [data, setData] = useState<CourseDetailData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setData(null);
    setError(false);
    (async () => {
      try {
        const c = await coursesApi.getBySlug(`curso-${legacyId}`, locale);
        if (!active) return;
        setData({
          title: c.title,
          subtitle: c.subtitle ?? '',
          // A tela renderiza "R$ {price},00" — usa o valor inteiro em reais.
          price: String(Math.round(c.priceCents / 100)),
          trailLabel: c.trailLabel ?? '',
          extraContent: c.extraContent ?? [],
          sections: (c.sections ?? []).map((s) => ({
            title: s.title,
            items: s.items,
          })),
          faq: (c.faqs ?? []).map((f) => ({ q: f.question, a: f.answer })),
          coverUrl: c.coverUrl ?? null,
        });
      } catch {
        if (active) setError(true);
      }
    })();
    return () => {
      active = false;
    };
  }, [legacyId, locale]);

  return { data, error };
}

import { api } from './client';

export interface ContentBundle {
  locale: string;
  items: Record<string, string>;
}

export const cmsApi = {
  /** Bundle achatado de textos gerenciáveis para um locale: { "ns.key": value }. */
  bundle(locale: string): Promise<ContentBundle> {
    return api.get<ContentBundle>(`/content/${locale}`, { auth: false });
  },
};

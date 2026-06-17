import { api } from './client';

// LGPD: portabilidade (exportar dados) e direito ao apagamento (excluir conta).
export const usersApi = {
  exportData(): Promise<Record<string, unknown>> {
    return api.get<Record<string, unknown>>('/users/me/export');
  },
  deleteAccount(): Promise<unknown> {
    return api.delete('/users/me');
  },
};

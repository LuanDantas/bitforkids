import { api } from './client';
import { tokenStore } from './tokenStore';
import { ApiUser, AuthResponse } from './types';

export const authApi = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>(
      '/auth/login',
      { email, password },
      { auth: false },
    );
    await tokenStore.save({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
    });
    return res;
  },

  async register(
    email: string,
    password: string,
    name: string,
    phone?: string,
  ): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>(
      '/auth/register',
      { email, password, name, phone },
      { auth: false },
    );
    await tokenStore.save({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
    });
    return res;
  },

  me(): Promise<ApiUser> {
    return api.get<ApiUser>('/auth/me');
  },

  forgotPassword(email: string): Promise<{ message: string }> {
    return api.post('/auth/forgot-password', { email }, { auth: false });
  },

  resetPassword(token: string, password: string): Promise<{ success: boolean }> {
    return api.post(
      '/auth/reset-password',
      { token, password },
      { auth: false },
    );
  },

  async logout(): Promise<void> {
    const refreshToken = tokenStore.getRefresh();
    try {
      await api.post('/auth/logout', { refreshToken });
    } catch {
      // ignora erro de logout no servidor
    }
    await tokenStore.clear();
  },
};

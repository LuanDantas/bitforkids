import { api } from './client';

export interface NotificationPreferences {
  bitcoinPrice: boolean;
  cashback: boolean;
  dailyDigest: boolean;
  marketing: boolean;
}

export const notificationsApi = {
  getPreferences(): Promise<NotificationPreferences> {
    return api.get<NotificationPreferences>('/me/notification-preferences');
  },
  updatePreferences(
    partial: Partial<NotificationPreferences>
  ): Promise<NotificationPreferences> {
    return api.patch<NotificationPreferences>(
      '/me/notification-preferences',
      partial
    );
  },
  registerDevice(expoPushToken: string): Promise<unknown> {
    return api.post('/me/devices', { expoPushToken });
  },
  removeDevice(token: string): Promise<unknown> {
    return api.delete(`/me/devices/${token}`);
  },
};

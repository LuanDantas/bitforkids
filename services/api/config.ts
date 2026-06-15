import Constants from 'expo-constants';
import { Platform } from 'react-native';

/**
 * URL base da API BitForKids.
 * - iOS simulator / web: localhost funciona.
 * - Android emulator: 10.0.2.2 mapeia o host.
 * Pode ser sobrescrita via `expo.extra.apiUrl` no app.json.
 */
function resolveApiUrl(): string {
  const configured = (Constants.expoConfig?.extra as { apiUrl?: string })
    ?.apiUrl;
  if (configured) {
    if (Platform.OS === 'android') {
      return configured.replace('localhost', '10.0.2.2');
    }
    return configured;
  }
  return Platform.OS === 'android'
    ? 'http://10.0.2.2:3000/api'
    : 'http://localhost:3000/api';
}

export const API_URL = resolveApiUrl();

export const STORAGE_KEYS = {
  accessToken: '@bitforkids_access_token',
  refreshToken: '@bitforkids_refresh_token',
} as const;

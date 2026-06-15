import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './config';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

let memoryAccess: string | null = null;
let memoryRefresh: string | null = null;

export const tokenStore = {
  async load(): Promise<Tokens | null> {
    const [accessToken, refreshToken] = await Promise.all([
      AsyncStorage.getItem(STORAGE_KEYS.accessToken),
      AsyncStorage.getItem(STORAGE_KEYS.refreshToken),
    ]);
    memoryAccess = accessToken;
    memoryRefresh = refreshToken;
    if (accessToken && refreshToken) return { accessToken, refreshToken };
    return null;
  },

  getAccess(): string | null {
    return memoryAccess;
  },

  getRefresh(): string | null {
    return memoryRefresh;
  },

  async save(tokens: Tokens): Promise<void> {
    memoryAccess = tokens.accessToken;
    memoryRefresh = tokens.refreshToken;
    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEYS.accessToken, tokens.accessToken),
      AsyncStorage.setItem(STORAGE_KEYS.refreshToken, tokens.refreshToken),
    ]);
  },

  async clear(): Promise<void> {
    memoryAccess = null;
    memoryRefresh = null;
    await Promise.all([
      AsyncStorage.removeItem(STORAGE_KEYS.accessToken),
      AsyncStorage.removeItem(STORAGE_KEYS.refreshToken),
    ]);
  },
};

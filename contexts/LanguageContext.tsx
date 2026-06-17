import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cmsApi } from '@/services/api/cms';

type Locale = 'pt-BR' | 'en-US' | 'es-ES';

// Prévia ao vivo (admin /pages): aceita mensagens postMessage apenas no web e
// somente de origens locais de desenvolvimento. Sem efeito no app nativo.
const PREVIEW_MESSAGE_TYPE = 'BFK_PREVIEW';
const isAllowedPreviewOrigin = (origin: string) =>
  /^https?:\/\/localhost(:\d+)?$/.test(origin);
const isLocale = (v: unknown): v is Locale =>
  v === 'pt-BR' || v === 'en-US' || v === 'es-ES';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const STORAGE_KEY = '@bitforkids_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Lazy-load translations to avoid circular imports
let translationsCache: Record<Locale, Record<string, any>> | null = null;

function getTranslations(): Record<Locale, Record<string, any>> {
  if (!translationsCache) {
    translationsCache = {
      'pt-BR': require('../locales/pt-BR').default,
      'en-US': require('../locales/en-US').default,
      'es-ES': require('../locales/es-ES').default,
    };
  }
  return translationsCache;
}

function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current === undefined || current === null) return path;
    current = current[key];
  }
  return typeof current === 'string' ? current : path;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt-BR');
  const [isLoaded, setIsLoaded] = useState(false);
  // Textos gerenciáveis vindos do CMS (sobrepõem os locales bundlados).
  const [cmsBundle, setCmsBundle] = useState<Record<string, string>>({});
  // Prévia ao vivo do admin (somente web): tem prioridade máxima quando presente.
  const [previewBundle, setPreviewBundle] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
      if (saved && (saved === 'pt-BR' || saved === 'en-US' || saved === 'es-ES')) {
        setLocaleState(saved as Locale);
      }
      setIsLoaded(true);
    });
  }, []);

  // Busca o bundle do CMS sempre que o locale muda (best-effort; cai nos locales locais).
  useEffect(() => {
    let active = true;
    cmsApi
      .bundle(locale)
      .then((b) => {
        if (active) setCmsBundle(b.items ?? {});
      })
      .catch(() => {
        if (active) setCmsBundle({});
      });
    return () => {
      active = false;
    };
  }, [locale]);

  // Prévia ao vivo: escuta postMessage do admin (somente web). Atualiza um bundle
  // efêmero (não persistido) com prioridade máxima e segue o locale enviado.
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    const handler = (event: MessageEvent) => {
      if (!isAllowedPreviewOrigin(event.origin)) return;
      const data = event.data;
      if (!data || data.type !== PREVIEW_MESSAGE_TYPE) return;
      if (data.items && typeof data.items === 'object') {
        setPreviewBundle(data.items as Record<string, string>);
      }
      if (isLocale(data.locale)) setLocaleState(data.locale);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    AsyncStorage.setItem(STORAGE_KEY, newLocale);
  }, []);

  const t = useCallback(
    (key: string): string => {
      // 0) Prévia ao vivo do admin (web) tem prioridade absoluta quando presente.
      if (previewBundle && key in previewBundle) return previewBundle[key];

      // 1) CMS (gerenciável) tem prioridade.
      const fromCms = cmsBundle[key];
      if (typeof fromCms === 'string' && fromCms.length > 0) return fromCms;

      // 2) Locales bundlados (offline / chaves não gerenciadas).
      const translations = getTranslations();
      const result = getNestedValue(translations[locale], key);
      if (result === key && locale !== 'pt-BR') {
        // Fallback para português se a chave não existir no locale atual.
        return getNestedValue(translations['pt-BR'], key);
      }
      return result;
    },
    [locale, cmsBundle, previewBundle]
  );

  if (!isLoaded) return null;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

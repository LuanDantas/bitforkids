import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cmsApi } from '@/services/api/cms';

type Locale = 'pt-BR' | 'en-US' | 'es-ES';

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

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    AsyncStorage.setItem(STORAGE_KEY, newLocale);
  }, []);

  const t = useCallback(
    (key: string): string => {
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
    [locale, cmsBundle]
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

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeColors {
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  border: string;
  borderLight: string;
  primary: string;
  success: string;
  warning: string;
  error: string;
  tabBar: string;
  tabBarBorder: string;
}

interface ThemeContextType {
  theme: ThemeMode;
  colors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
}

const lightColors: ThemeColors = {
  background: '#ffffff',
  surface: '#f8f9fa',
  card: '#ffffff',
  text: '#1a1a1a',
  textSecondary: '#6b7280',
  textTertiary: '#9ca3af',
  border: '#e5e7eb',
  borderLight: '#f3f4f6',
  primary: '#8B5CF6',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  tabBar: '#ffffff',
  tabBarBorder: '#e5e7eb',
};

const darkColors: ThemeColors = {
  background: '#0a0a0a',
  surface: '#1a1a1a',
  card: '#1a1a1a',
  text: 'white',
  textSecondary: '#9CA3AF',
  textTertiary: '#6B7280',
  border: '#2a2a2a',
  borderLight: '#2a2a2a',
  primary: '#8B5CF6',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  tabBar: '#1a1a1a',
  tabBarBorder: '#2a2a2a',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme);
    });

    return () => subscription?.remove();
  }, []);

  const isDark = theme === 'dark' || (theme === 'system' && systemColorScheme === 'dark');
  const colors = isDark ? darkColors : lightColors;

  const toggleTheme = () => {
    setTheme(current => {
      switch (current) {
        case 'dark':
          return 'light';
        case 'light':
          return 'system';
        case 'system':
          return 'dark';
        default:
          return 'dark';
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, colors, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
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
  primaryLight: string;
  secondary: string;
  tertiary: string;
  success: string;
  warning: string;
  error: string;
  tabBar: string;
  tabBarBorder: string;
  surfaceGlass: string;
  borderAccent: string;
  glow: string;
  gradientStart: string;
  gradientEnd: string;
}

interface ThemeFonts {
  body: string;
  bodyMedium: string;
  bodySemiBold: string;
  bodyBold: string;
  display: string;
  displaySemiBold: string;
  displayMedium: string;
  secondary: string;
  secondaryMedium: string;
  secondarySemiBold: string;
  secondaryBold: string;
}

const fonts: ThemeFonts = {
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
  display: 'SpaceGrotesk_700Bold',
  displaySemiBold: 'SpaceGrotesk_600SemiBold',
  displayMedium: 'SpaceGrotesk_500Medium',
  secondary: 'Manrope_400Regular',
  secondaryMedium: 'Manrope_500Medium',
  secondarySemiBold: 'Manrope_600SemiBold',
  secondaryBold: 'Manrope_700Bold',
};

interface ThemeContextType {
  theme: ThemeMode;
  colors: ThemeColors;
  fonts: ThemeFonts;
  isDark: boolean;
  toggleTheme: () => void;
  setDarkMode: (enabled: boolean) => void;
}

const lightColors: ThemeColors = {
  background: '#f8fafc',
  surface: '#f1f5f9',
  card: '#ffffff',
  text: '#0f172a',
  textSecondary: '#475569',
  textTertiary: '#94a3b8',
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
  primary: '#6366f1',
  primaryLight: '#818cf8',
  secondary: '#3b82f6',
  tertiary: '#06b6d4',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  tabBar: '#ffffff',
  tabBarBorder: '#e2e8f0',
  surfaceGlass: 'rgba(255, 255, 255, 0.7)',
  borderAccent: 'rgba(99, 102, 241, 0.2)',
  glow: '#6366f1',
  gradientStart: '#4f46e5',
  gradientEnd: '#3b82f6',
};

const darkColors: ThemeColors = {
  background: '#0f172a',
  surface: '#1e293b',
  card: '#1e293b',
  text: '#ffffff',
  textSecondary: '#d1d5db',
  textTertiary: '#9ca3af',
  border: 'rgba(99, 102, 241, 0.15)',
  borderLight: 'rgba(99, 102, 241, 0.08)',
  primary: '#6366f1',
  primaryLight: '#818cf8',
  secondary: '#3b82f6',
  tertiary: '#06b6d4',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  tabBar: '#0f172a',
  tabBarBorder: 'rgba(99, 102, 241, 0.1)',
  surfaceGlass: 'rgba(30, 41, 59, 0.6)',
  borderAccent: 'rgba(99, 102, 241, 0.25)',
  glow: '#6366f1',
  gradientStart: '#4f46e5',
  gradientEnd: '#3b82f6',
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

  const setDarkMode = (enabled: boolean) => {
    setTheme(enabled ? 'dark' : 'light');
  };

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
    <ThemeContext.Provider value={{ theme, colors, fonts, isDark, toggleTheme, setDarkMode }}>
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

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { VSLProvider } from '@/contexts/VSLContext';
import { UserProvider } from '@/contexts/UserContext';
import { StudyProvider } from '@/contexts/StudyContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ThemeProvider>
      <LanguageProvider>
      <UserProvider>
      <StudyProvider>
      <VSLProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </VSLProvider>
      </StudyProvider>
      </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

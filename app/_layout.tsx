import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { VSLProvider } from '@/contexts/VSLContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ThemeProvider>
      <VSLProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </VSLProvider>
    </ThemeProvider>
  );
}

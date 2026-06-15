import React from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

interface GradientTextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  /** Cores do gradiente. Default: gradientHeading (indigo→azul→ciano da Landing 6). */
  colors?: readonly [string, string, ...string[]];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

/**
 * Texto com gradiente clipado (estilo da Landing 6 — CryptoVerse).
 * Usa MaskedView: o texto vira a máscara e o LinearGradient pinta apenas os glifos.
 */
export default function GradientText({
  children,
  style,
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
}: GradientTextProps) {
  const { colors: theme } = useTheme();
  const gradientColors = colors ?? theme.gradientHeading;

  return (
    <MaskedView
      maskElement={
        <Text style={[style, { backgroundColor: 'transparent' }]}>{children}</Text>
      }
    >
      <LinearGradient colors={gradientColors} start={start} end={end}>
        {/* Texto invisível define a área que o gradiente preenche */}
        <Text style={[style, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
}

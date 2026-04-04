import React from 'react';
import { View, StyleSheet, Platform, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '@/contexts/ThemeContext';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  borderRadius?: number;
}

export default function GlassCard({
  children,
  style,
  intensity = 30,
  borderRadius = 16,
}: GlassCardProps) {
  const { colors, isDark } = useTheme();

  const cardStyle: ViewStyle = {
    borderRadius,
    borderWidth: 1,
    borderColor: colors.borderAccent,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.glow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  };

  if (Platform.OS === 'ios') {
    return (
      <View style={[cardStyle, style]}>
        <BlurView
          intensity={intensity}
          tint={isDark ? 'dark' : 'light'}
          style={StyleSheet.absoluteFill}
        />
        <View style={[styles.content, { backgroundColor: colors.surfaceGlass }]}>
          {children}
        </View>
      </View>
    );
  }

  // Android and Web fallback - solid semi-transparent background
  return (
    <View
      style={[
        cardStyle,
        { backgroundColor: colors.surfaceGlass },
        style,
      ]}
    >
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
});

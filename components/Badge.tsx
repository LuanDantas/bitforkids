import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface BadgeProps {
  label: string;
  /** Mostra um dot à esquerda (cor de marca). */
  dot?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * Pill de vidro indigo (Landing 6 — CryptoVerse). Usado em badges de seção,
 * tags e rótulos de destaque.
 */
export default function Badge({ label, dot, icon, style, textStyle }: BadgeProps) {
  const { colors, fonts } = useTheme();

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: colors.badgeBg, borderColor: colors.badgeBorder },
        style,
      ]}
    >
      {dot && <View style={[styles.dot, { backgroundColor: colors.accentLight }]} />}
      {icon}
      <Text
        style={[
          styles.text,
          { color: colors.badgeText, fontFamily: fonts.bodySemiBold },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontSize: 12,
    letterSpacing: 0.2,
  },
});

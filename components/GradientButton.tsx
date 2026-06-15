import React from 'react';
import {
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
  ActivityIndicator,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedPressable from './AnimatedPressable';
import { useTheme } from '@/contexts/ThemeContext';

interface GradientButtonProps {
  label: string;
  onPress?: () => void;
  /** 'primary' = gradiente de marca com glow; 'ghost' = vidro com borda indigo. */
  variant?: 'primary' | 'ghost';
  colors?: [string, string] | [string, string, string];
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * Botão pill de marca (Landing 6 — CryptoVerse): gradiente indigo→azul,
 * cantos arredondados e glow indigo. Press scale via AnimatedPressable.
 */
export default function GradientButton({
  label,
  onPress,
  variant = 'primary',
  colors,
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
  textStyle,
}: GradientButtonProps) {
  const { colors: theme, fonts } = useTheme();
  const isGhost = variant === 'ghost';
  const gradientColors = colors ?? theme.gradientPrimary;

  const content = (
    <View style={styles.inner}>
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <>
          {iconPosition === 'left' && icon}
          <Text
            style={[
              styles.label,
              {
                fontFamily: fonts.bodyBold,
                color: isGhost ? theme.text : '#ffffff',
              },
              textStyle,
            ]}
          >
            {label}
          </Text>
          {iconPosition === 'right' && icon}
        </>
      )}
    </View>
  );

  const glow: ViewStyle = Platform.select({
    ios: {
      shadowColor: theme.glow,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: isGhost ? 0 : 0.4,
      shadowRadius: 16,
    },
    android: { elevation: isGhost ? 0 : 8 },
  }) as ViewStyle;

  return (
    <AnimatedPressable
      onPress={disabled || loading ? undefined : onPress}
      style={[
        styles.wrapper,
        fullWidth && styles.fullWidth,
        glow,
        { opacity: disabled ? 0.5 : 1 },
        style,
      ]}
    >
      {isGhost ? (
        <View
          style={[
            styles.gradient,
            {
              backgroundColor: theme.surfaceGlass,
              borderWidth: 1,
              borderColor: theme.badgeBorder,
            },
          ]}
        >
          {content}
        </View>
      ) : (
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {content}
        </LinearGradient>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 14,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  gradient: {
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  label: {
    fontSize: 15,
  },
});

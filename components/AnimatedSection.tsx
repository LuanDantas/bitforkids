import React, { useCallback, useState } from 'react';
import { LayoutChangeEvent, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  style?: ViewStyle;
}

export default function AnimatedSection({ children, delay = 0, style }: AnimatedSectionProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(24);

  const triggerAnimation = useCallback(() => {
    if (hasAnimated) return;
    setHasAnimated(true);
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: 500, easing: Easing.out(Easing.quad) })
    );
    translateY.value = withDelay(
      delay,
      withTiming(0, { duration: 500, easing: Easing.out(Easing.quad) })
    );
  }, [hasAnimated, delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (!hasAnimated) {
        runOnJS(triggerAnimation)();
      }
    },
    [hasAnimated, triggerAnimation]
  );

  return (
    <Animated.View style={[animatedStyle, style]} onLayout={onLayout}>
      {children}
    </Animated.View>
  );
}

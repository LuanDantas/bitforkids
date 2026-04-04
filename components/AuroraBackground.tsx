import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AuroraBackgroundProps {
  style?: ViewStyle;
}

const AuroraBackground = React.memo(function AuroraBackground({
  style,
}: AuroraBackgroundProps) {
  return (
    <View style={[StyleSheet.absoluteFill, style]} pointerEvents="none">
      {/* Blob 1: Top-right, indigo */}
      <LinearGradient
        colors={['rgba(99, 102, 241, 0.15)', 'transparent']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.blob1}
      />

      {/* Blob 2: Center-left, blue */}
      <LinearGradient
        colors={['rgba(59, 130, 246, 0.10)', 'transparent']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.blob2}
      />

      {/* Blob 3: Bottom-right, cyan */}
      <LinearGradient
        colors={['rgba(6, 182, 212, 0.08)', 'transparent']}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={styles.blob3}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  blob1: {
    position: 'absolute',
    top: -40,
    right: -30,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  blob2: {
    position: 'absolute',
    top: '40%',
    left: -40,
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  blob3: {
    position: 'absolute',
    bottom: 20,
    right: -20,
    width: 180,
    height: 180,
    borderRadius: 90,
  },
});

export default AuroraBackground;

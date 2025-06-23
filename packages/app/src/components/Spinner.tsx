import React from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface SpinnerProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const Spinner = ({
  size = 16,
  color = '#6B7280',
  strokeWidth = 1,
}: SpinnerProps) => {
  // Shared value for rotation
  const rotation = useSharedValue(0);

  // Start the rotation animation
  React.useEffect(() => {
    rotation.value = 0;
    rotation.value = withRepeat(
      withTiming(360, {
        // use 360 degrees for a full rotation
        duration: 1000, // 1 second for a full rotation
        easing: Easing.linear,
      }),
      -1, // Infinite loop
      false // No reset at the end
    );
  }, [rotation]);

  // Animated style for rotation
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={{ position: 'relative', width: size, height: size }}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: size,
            height: size,
            borderWidth: strokeWidth,
            borderColor: color,
            borderRadius: size / 2,
            borderTopColor: 'transparent',
          },
          animatedStyle,
        ]}
      />
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: size,
            height: size,
            borderWidth: strokeWidth,
            borderColor: color,
            borderRadius: size / 2,
            opacity: 0.3,
          },
        ]}
      />
    </View>
  );
};

export default Spinner;

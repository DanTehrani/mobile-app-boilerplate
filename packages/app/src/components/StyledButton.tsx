import colors from '@/lib/styles/colors';
import { ActivityIndicator, Pressable, PressableProps } from 'react-native';
import StyledText from './StyledText';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { triggerHapticFeedback } from '@/lib/utils';

const getVariantBgColor = (variant: StyledButtonProps['variant']) => {
  switch (variant) {
    case 'primary':
      return colors.text;
    case 'outline':
      return colors.background;
    case 'destructive':
      return colors.background;
  }
};

const getVariantBorderColor = (variant: StyledButtonProps['variant']) => {
  switch (variant) {
    case 'primary':
      return colors.background;
    case 'outline':
      return colors.subbedText;
    case 'destructive':
      return colors.warning;
  }
};

const getVariantTextColor = (variant: StyledButtonProps['variant']) => {
  switch (variant) {
    case 'primary':
      return colors.background;
    case 'outline':
      return colors.text;
    case 'destructive':
      return colors.warning;
  }
};

type StyledButtonProps = PressableProps & {
  isLoading?: boolean;
  title: string;
  loadingTitle?: string;
  variant?: 'primary' | 'outline' | 'destructive';
  icon?: React.ReactNode;
  name?: string;
};

const StyledButton = ({
  title,
  isLoading,
  loadingTitle,
  variant = 'primary',
  icon,
  ...props
}: StyledButtonProps) => {
  // Shared value for scale animation
  const scale = useSharedValue(1);

  // Animated style based on shared value
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, {
      mass: 0.05,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      mass: 0.05,
    });
  };

  const disabled = props.disabled || isLoading;

  return (
    <Pressable
      onPress={e => {
        triggerHapticFeedback();

        props.onPress?.(e);
      }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Animated.View
        style={[
          {
            height: 50,
            backgroundColor: getVariantBgColor(variant),
            borderColor: getVariantBorderColor(variant),
            borderWidth: variant === 'primary' ? 0 : 1,
            opacity: disabled ? 0.5 : 1,
            borderRadius: 32,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            columnGap: 8,
            shadowColor: colors.text,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          },
          animatedStyle,
        ]}
      >
        {icon}
        {isLoading && (
          <ActivityIndicator size={24} color={getVariantTextColor(variant)} />
        )}
        <StyledText
          style={{
            color: getVariantTextColor(variant),
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          {isLoading ? loadingTitle : title}
        </StyledText>
      </Animated.View>
    </Pressable>
  );
};

export default StyledButton;

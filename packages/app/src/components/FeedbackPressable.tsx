import { Pressable, PressableProps } from 'react-native';
import { triggerHapticFeedback } from '@/lib/utils';

const FeedbackPressable = ({ children, ...props }: PressableProps & {}) => {
  return (
    <Pressable
      {...props}
      onPress={e => {
        triggerHapticFeedback();

        props.onPress?.(e);
      }}
    >
      {children}
    </Pressable>
  );
};

export default FeedbackPressable;

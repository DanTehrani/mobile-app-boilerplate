import colors from '@/lib/styles/colors';
import fontSizes from '../lib/styles/fontSizes';
import { Text, TextProps } from 'react-native';

const StyledText = ({ children, ...props }: TextProps) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontSize: fontSizes.base,
          fontFamily:
            // @ts-ignore
            props.style?.fontWeight === 'bold' ? 'Lato-Italic' : 'Lato-Regular',
          color: colors.text,
        },
        typeof props.style === 'object' ? props.style : {},
      ]}
    >
      {children}
    </Text>
  );
};

export default StyledText;

import { BottomSheetModal, BottomSheetModalProps } from '@gorhom/bottom-sheet';
import SheetBackDrop from './SheetBackDrop';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useRef } from 'react';
import colors from '@/lib/styles/colors';
import fontSizes from '@/lib/styles/fontSizes';
import StyledText from './StyledText';
import { Keyboard } from 'react-native';

const StyleldBottomSheet = ({
  open,
  children,
  onClose,
  regularTitle,
  ...props
}: {
  open: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  regularTitle?: string;
} & BottomSheetModalProps) => {
  const insets = useSafeAreaInsets();
  const ref = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (open) {
      ref.current?.present();
    } else {
      ref.current?.dismiss();
    }
  }, [open]);

  return (
    <BottomSheetModal
      stackBehavior="push"
      ref={ref}
      handleIndicatorStyle={{
        backgroundColor: colors.text,
      }}
      style={{
        marginTop: insets.top,
        paddingTop: 16,
        paddingHorizontal: 16,
        ...{
          sheetTopShadow: {
            borderRadius: 32,
            shadowColor: colors.text,
            shadowOffset: {
              width: 0,
              height: -4,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
          },
        },
        ...(typeof props.style === 'object' ? props.style : {}),
      }}
      onAnimate={(fromIndex, toIndex) => {
        if (fromIndex !== toIndex && toIndex === -1) {
          Keyboard.dismiss();
        }
      }}
      backgroundStyle={{
        backgroundColor: colors.background,
      }}
      index={0}
      enablePanDownToClose
      enableDynamicSizing={false}
      snapPoints={['50%', '100%']}
      keyboardBlurBehavior="none" // Prevents the keyboard from dismissing
      backdropComponent={SheetBackDrop}
      onDismiss={onClose}
      {...props}
    >
      {regularTitle && (
        <StyledText
          style={{
            color: colors.text,
            fontWeight: 'bold',
            fontSize: fontSizes.large,
            marginBottom: 24,
          }}
        >
          {regularTitle}
        </StyledText>
      )}
      {children}
    </BottomSheetModal>
  );
};

export default StyleldBottomSheet;

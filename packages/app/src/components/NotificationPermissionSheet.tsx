import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { View } from 'react-native';
import colors from '@/lib/styles/colors';
import useConfigNotification from '@/hooks/useConfigNotification';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StyleldBottomSheet from './StyleldBottomSheet';
import StyledText from './StyledText';
import StyledButton from './StyledButton';
import { setConfigNotificationLater } from '@/lib/utils';

export interface NotificationPermissionSheetProps {
  open: boolean;
  onClose: () => void;
}

export const NotificationPermissionSheet = ({
  open,
  onClose,
}: NotificationPermissionSheetProps) => {
  const insets = useSafeAreaInsets();
  const { mutateAsync: configNotification } = useConfigNotification();

  const handleEnable = async () => {
    await configNotification();
    onClose();
  };

  const handleLater = async () => {
    await setConfigNotificationLater(true);
    onClose();
  };

  return (
    <StyleldBottomSheet
      open={open}
      onDismiss={onClose}
      snapPoints={['60%']}
      onClose={onClose}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          rowGap: 24,
          paddingBottom: insets.top + insets.bottom + 32,
        }}
      >
        <View style={{ flex: 1, gap: 8 }}>
          <StyledText style={{ textAlign: 'center', color: colors.text }}>
            {`通知を有効にしてください`}
          </StyledText>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.background,
            }}
          >
            <Feather name="bell" size={60} color={colors.subbedText} />
          </View>
        </View>
        <View style={{ gap: 8 }}>
          <StyledButton title={'通知を受け取る'} onPress={handleEnable} />
          <StyledButton
            title={'後で設定する'}
            variant="outline"
            onPress={handleLater}
            name="NotificationPermissionSheet:later"
          />
        </View>
      </View>
    </StyleldBottomSheet>
  );
};

export default NotificationPermissionSheet;

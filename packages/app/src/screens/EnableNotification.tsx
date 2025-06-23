import StyledButton from '@/components/StyledButton';
import colors from '@/lib/styles/colors';
import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import StyledText from '@/components/StyledText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FeedbackPressable from '@/components/FeedbackPressable';
import useConfigNotification from '@/hooks/useConfigNotification';
import useTypedNavigation from '@/hooks/useTypedNavigation';

const EnableNotification = () => {
  const insets = useSafeAreaInsets();

  const {
    mutateAsync: configNotification,
    isPending: isConfiguringNotification,
  } = useConfigNotification();

  const navigation = useTypedNavigation();

  const onEnableNotificationPress = async () => {
    await configNotification();
    navigation.navigate('Tabs');
  };

  const onSkipForNowPress = () => {
    navigation.navigate('Tabs');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: insets.bottom + 16,
        paddingHorizontal: 16,
        rowGap: 48,
      }}
    >
      <View
        style={{
          flexDirection: 'column',
          rowGap: 8,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Feather name="bell" size={48} color={colors.text} />
        <StyledText style={{ fontSize: 16, fontWeight: 'bold' }}>
          {`Receive notifications`}
        </StyledText>
      </View>
      <View style={{ rowGap: 16 }}>
        <StyledButton
          title="Enable Notification"
          onPress={onEnableNotificationPress}
          isLoading={isConfiguringNotification}
        />
        <FeedbackPressable onPress={onSkipForNowPress}>
          <StyledText
            style={{
              color: colors.subbedText,
              fontSize: 16,
              textAlign: 'center',
            }}
          >
            {`Skip for now`}
          </StyledText>
        </FeedbackPressable>
      </View>
    </View>
  );
};

export default EnableNotification;

import StyledText from '@/components/StyledText';
import { Alert, View } from 'react-native';
import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';
import colors from '@/lib/styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FeedbackPressable from '@/components/FeedbackPressable';
import useAsyncStorageValue from '@/hooks/useAsyncStorageValue';
import { UPDATE_AVAILABLE_KEY } from '@/lib/asyncStorageKeys';
import * as Application from 'expo-application';
import { clearAsyncStorage, clearSecureStorage } from '@/lib/utils';
import StyledButton from '@/components/StyledButton';
import { useQueryClient } from '@tanstack/react-query';
import useTypedNavigation from '@/hooks/useTypedNavigation';

const InfoItem = ({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string | null | undefined;
  onPress?: () => void;
}) => {
  return (
    <FeedbackPressable
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
      }}
      onPress={onPress}
    >
      <StyledText style={{ color: colors.subbedText }}>{label}</StyledText>
      <StyledText>{value ?? ''}</StyledText>
    </FeedbackPressable>
  );
};

const shortenUpdateId = (updateId: string) => {
  return updateId.slice(0, 6) + '...' + updateId.slice(-4);
};

const Advanced = () => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  const insets = useSafeAreaInsets();

  const { data: readyToUpdate } =
    useAsyncStorageValue<boolean>(UPDATE_AVAILABLE_KEY);

  useEffect(() => {
    (async () => {
      const { isAvailable } = await Updates.checkForUpdateAsync();
      setIsUpdateAvailable(isAvailable);
    })();
  }, []);

  const queryClient = useQueryClient();
  const navigation = useTypedNavigation();

  const onClearLocalStorage = async () => {
    Alert.alert(
      'Clear Local Storage',
      'This will clear all local data and reset the app to the initial state.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          onPress: async () => {
            await clearAsyncStorage();
            await clearSecureStorage();
            queryClient.invalidateQueries();

            navigation.navigate('Welcome');
          },
        },
      ]
    );
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingHorizontal: 16,
        paddingBottom: insets.bottom + 16,
      }}
    >
      <View
        style={{
          backgroundColor: colors.background,
          borderRadius: 20,
          padding: 16,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: colors.border,
          shadowColor: colors.text,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
          width: '100%',
        }}
      >
        <InfoItem
          label="Build Version"
          value={Application.nativeBuildVersion}
        />
        <InfoItem label="Bundle Id" value={Application.applicationId} />
        <InfoItem label="Runtime Version" value={Updates.runtimeVersion} />
        <InfoItem
          label="Update ID"
          value={Updates.updateId ? shortenUpdateId(Updates.updateId) : ''}
        />
        <InfoItem label="Update Available" value={String(isUpdateAvailable)} />
        <InfoItem label="Ready to Update" value={String(readyToUpdate)} />
      </View>
      <View>
        <StyledButton
          title="Clear Local Storage"
          onPress={onClearLocalStorage}
          variant="outline"
        />
      </View>
    </View>
  );
};

export default Advanced;

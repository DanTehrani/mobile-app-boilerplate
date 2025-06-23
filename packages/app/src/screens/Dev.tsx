import StyledButton from '@/components/StyledButton';
import colors from '@/lib/styles/colors';
import { clearAsyncStorage } from '@/lib/utils';
import * as Updates from 'expo-updates';
import { useQueryClient } from '@tanstack/react-query';
import { Alert, View } from 'react-native';

const Dev = () => {
  const queryClient = useQueryClient();

  const onClearAsyncStorage = () => {
    Alert.alert(
      'Clear Async Storage',
      'Are you sure you want to clear the async storage?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: clearAsyncStorage },
      ]
    );

    queryClient.invalidateQueries({ queryKey: ['*'] });
  };

  const onReloadApp = async () => {
    await Updates.reloadAsync();
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        rowGap: 16,
        padding: 16,
        backgroundColor: colors.background,
      }}
    >
      <StyledButton
        title={'Clear Async Storage'}
        onPress={onClearAsyncStorage}
      />
      <StyledButton title={'Reload app'} onPress={onReloadApp} />
    </View>
  );
};

export default Dev;

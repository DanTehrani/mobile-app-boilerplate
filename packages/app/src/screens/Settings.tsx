import useTypedNavigation from '@/hooks/useTypedNavigation';
import { View } from 'react-native';
import TapToUpdateButton from '@/components/TapToUpdateButton';
import StyledButton from '@/components/StyledButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Settings = () => {
  const navigation = useTypedNavigation();
  const insets = useSafeAreaInsets();

  const onAdvancedPress = () => {
    navigation.navigate('Advanced');
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 16,
        paddingTop: insets.top,
      }}
    >
      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TapToUpdateButton />
        </View>
      </View>
      <StyledButton
        title={'Advanced'}
        onPress={onAdvancedPress}
        variant={'outline'}
      />
    </View>
  );
};

export default Settings;

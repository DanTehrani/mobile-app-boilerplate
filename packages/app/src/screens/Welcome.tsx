import StyledButton from '@/components/StyledButton';
import StyledText from '@/components/StyledText';
import useTypedNavigation from '@/hooks/useTypedNavigation';
import colors from '@/lib/styles/colors';
import { trpc } from '@/lib/trpc';
import { getUserId, setUserId } from '@/lib/utils';
import queryKeys from '@/queryKeys/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { Alert, View } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

const Welcome = () => {
  const navigation = useTypedNavigation();

  const { mutateAsync: registerUser, isPending: isRegisteringUser } =
    trpc.registerUser.useMutation();

  const queryClient = useQueryClient();

  const onGetStartedPress = async () => {
    const userId = await getUserId();

    if (userId !== null) {
      Alert.alert('Error', 'User ID already exists');
      return;
    }

    const newUserId = uuidv4();

    await setUserId(newUserId);

    await registerUser({ userId: newUserId });

    await queryClient.invalidateQueries({ queryKey: queryKeys.userId });

    navigation.navigate('Tabs');
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: colors.background,
        paddingBottom: 32,
        rowGap: 24,
      }}
    >
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <StyledText
          style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}
        >
          {`Welcome!`}
        </StyledText>
      </View>
      <View style={{ paddingBottom: 16 }}>
        <StyledButton
          onPress={onGetStartedPress}
          title="Get Started"
          isLoading={isRegisteringUser}
        ></StyledButton>
      </View>
    </View>
  );
};

export default Welcome;

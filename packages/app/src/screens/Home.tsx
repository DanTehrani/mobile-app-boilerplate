import React, { useEffect } from 'react';
import { View } from 'react-native';
import useFetchUpdates from '@/hooks/useFetchUpdates';
import colors from '@/lib/styles/colors';
import { getUserId } from '@/lib/utils';
import useUserId from '@/hooks/useUserId';
import useTypedNavigation from '@/hooks/useTypedNavigation';
import StyledText from '@/components/StyledText';

const Home = () => {
  useFetchUpdates();

  const { data: userId } = useUserId();
  const navigation = useTypedNavigation();

  useEffect(() => {
    (async () => {
      const userId = await getUserId();

      if (!userId) {
        navigation.navigate('Welcome');
      }
    })();
  }, []);

  if (!userId) {
    return (
      <View
        style={{
          flex: 1,
        }}
      ></View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StyledText>{`Hello World`}</StyledText>
    </View>
  );
};

export default Home;

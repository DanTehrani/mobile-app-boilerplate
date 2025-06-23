import colors from '@/lib/styles/colors';
import { Image } from 'expo-image';
import { useState } from 'react';
import { View } from 'react-native';

const ProfileImage = ({
  imageUri,
  size = 24,
}: {
  imageUri: string | null;
  size?: number;
}) => {
  const [isError, setIsError] = useState(false);

  if (isError || imageUri === null) {
    return (
      <View
        style={{
          backgroundColor: colors.border,
          borderRadius: 1000,
          width: size,
          height: size,
        }}
      />
    );
  }

  return (
    <View
      style={{
        borderRadius: 1000,
        elevation: 5,
      }}
    >
      <Image
        source={{ uri: imageUri }}
        onError={() => setIsError(true)}
        style={{
          width: size,
          height: size,
          borderRadius: 1000,
        }}
      />
    </View>
  );
};

export default ProfileImage;

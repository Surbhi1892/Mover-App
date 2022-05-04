import { Image, Pressable, View } from 'native-base';
import React from 'react';
import { useTheme } from 'theme';

const HeaderNotification = props => {
  const { Images } = useTheme();
  return (
    <Pressable mr={4} {...props}>
      <Image alt="notification" source={Images.notification} />
      <View
        width={2}
        height={2}
        borderRadius={4}
        backgroundColor="green.100"
        overflow="hidden"
        position="absolute"
        right={0}
        top={1}
      />
    </Pressable>
  );
};

export default HeaderNotification;

import { Button, HStack, Image, Pressable, Text } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'theme';

const SectionHeader = ({ title, onPress, rightButtonTitle, isLoading }) => {
  const { Images } = useTheme();
  const { t } = useTranslation();
  return (
    <HStack alignItems="center" justifyContent="space-between" width="100%">
      <Text color="primary.100" fontSize="md" fontWeight="semibold">
        {title}
      </Text>
      <Pressable onPress={onPress}>
        <Button
          leftIcon={<Image alt="editIcon" source={Images.edit} />}
          variant="ghost"
          disabled
          isLoading={isLoading}
          colorScheme="black">
          {rightButtonTitle}
        </Button>
      </Pressable>
    </HStack>
  );
};

export default SectionHeader;

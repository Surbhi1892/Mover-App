import {
    Divider,
    Image,
    Input,
    Button,
    Text,
    Checkbox,
    View,
    Center,
    Pressable,
    Box, HStack, VStack,
    ScrollView,
  } from 'native-base';
import React, { useMemo, useState } from 'react';
import { Dimensions } from 'react-native';
import { useTheme } from 'theme';
import { useTranslation } from 'react-i18next';

const SUMMARY_DATA_COUNT = 2;

const PackageSelect = ({  }) => {
  const { Colors } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { t } = useTranslation();
 

  return (
    <Box borderRadius={10} px={5} py={4} mx={2} my={2} backgroundColor="black.800">
    <VStack>
      <HStack justifyContent="space-between">
        <Text fontSize="md" lineHeight="24px" fontWeight="500" color="white">
          {"Tredyol"}
        </Text>
        <Text fontSize="xs" lineHeight="24px" fontWeight="300" color="white">
          {"Tredyol"}
        </Text>
      </HStack>
      <Text color="white" fontSize={12} lineHeight="18px" fontWeight="300">
        Tracking:{' '}
        <Text color="white" fontSize="xs" lineHeight="18px" fontWeight="500">
          {"MVRM3462092641"}
        </Text>
      </Text>
    
      <HStack pt={4} justifyContent="space-between">
        <HStack marginRight={5}>
          <Text color="white" fontSize="10" fontWeight="300">
            {t('common.price')}{" "}
          </Text>
          <Text fontSize="11" color="white">
          145 TRY
          </Text>
        </HStack>
        <HStack>
          <Text color="white" fontSize="11" fontWeight="300">
            {t('common.weightAndShipping')}
          </Text>
          <Text fontSize="11" color="white">
          {" "}0,464 kq = $3
          </Text>
        </HStack>
      
      </HStack>
    </VStack>
  </Box>
  );
};

export default PackageSelect;

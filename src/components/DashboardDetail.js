import { Box, Divider, HStack, Stack, Text, VStack } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';

const TRY_UNICODE = '\u20BA';

const DashboardDetail = ({
  orders = 0,
  myOrders = 0,
  limit = 0,
  usdBalance = 0,
  tlBalance = 0,
}) => {
  const { t } = useTranslation();
  return (
    <Box width="100%">
      <Stack space={5}>
        <HStack space={5} justifyContent="space-between">
          <VStack alignItems="center">
            <Text fontSize={22} fontWeight="600">
              {Number(limit).toFixed(0)}$
            </Text>
            <Text fontSize={12} fontWeight="300">
              {t('dashboardDetail.limitDesc')}
            </Text>
          </VStack>
          <Divider orientation="vertical" />
          <VStack alignItems="center">
            <Text fontSize={22} fontWeight="600">
              {Number(tlBalance).toFixed(2)}
              {TRY_UNICODE}
            </Text>
            <Text fontSize={12} fontWeight="300">
              {t('dashboardDetail.tryBalance')}
            </Text>
          </VStack>
          <Divider orientation="vertical" />
          <VStack alignItems="center">
            <Text fontSize={22} fontWeight="600">
              {Number(usdBalance).toFixed(2)}$
            </Text>
            <Text fontSize={12} fontWeight="300">
              {t('dashboardDetail.usdBalance')}
            </Text>
          </VStack>
        </HStack>
        <Divider />
        <HStack space={5} justifyContent="space-between">
          <Text fontSize={14} fontWeight="500">
            {t('dashboardDetail.activeMyOrders')}: {myOrders}
          </Text>
          <Divider orientation="vertical" />
          <Text fontSize={14} fontWeight="500">
            {t('dashboardDetail.activeOrders')}: {orders}
          </Text>
        </HStack>
      </Stack>
    </Box>
  );
};

export default DashboardDetail;

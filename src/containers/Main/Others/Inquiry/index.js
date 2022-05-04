import { SegmentControl } from 'components';
import {
  Box,
  FlatList,
  Fab,
  AddIcon,
  Pressable,
  Spinner,
  Divider,
  Text,
  Stack,
} from 'native-base';
import React, { useCallback, useMemo, useState } from 'react';
import { newsApi } from 'services/News';
import FastImage from 'react-native-fast-image';
import { RefreshControl, StyleSheet } from 'react-native';
import { useInfiniteQuery } from 'hooks/useInfiniteQuery';
import { useNavigation } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';

import NavigationHeader from 'components/NavigationHeader';
import NavigationBackButton from 'components/NavigationBackButton';

const InquiryContainer = () => {
  const navigation = useNavigation();
  const {
    data: news,
    isLoading,
    isFetching,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(newsApi.endpoints.listNews, {
    getNextPageParam: lastPage => {
      const nextPageUrl = lastPage.next_page_url;
      return nextPageUrl?.substr(nextPageUrl.length - 1) ?? undefined;
    },
  });

  const {
    data: campaign,
    isLoading: isLoadingCampaign,
    isFetching: isFetchingCampaign,
    fetchNextPage: fetchNextPageCampaign,
    refetch: refetchCampaign,
  } = useInfiniteQuery(newsApi.endpoints.listCampaign, {
    getNextPageParam: lastPage => {
      const nextPageUrl = lastPage.next_page_url;
      return nextPageUrl?.substr(nextPageUrl.length - 1) ?? undefined;
    },
  });

  const tabs = useMemo(() => ['Xeberler', 'Kampaniyalar'], []);
  const [selectedType, setSelectedType] = useState(0);

  const goToNewsDetail = useCallback(
    item => {
      navigation.navigate('NewsDetail', { id: item.id });
    },
    [navigation]
  );

  const keyExtractor = useCallback(item => String(item.id), []);

  const renderItem = useCallback(
    ({ item }) => {
      const { id, cleanContent, image_path } = item;
      const { title, date } = cleanContent;
      return (
        <Pressable onPress={() => goToNewsDetail(item)}>
          <Box bg="#000" shadow={2} rounded="lg" mb={5}>
            <Stack space={3} px={5} py={4}>
              <Text fontSize={12} color="white">
                {title}
              </Text>
              <Divider />
              <Text fontSize={11} color="white">
                {
                  'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam ....'
                }
              </Text>
              <Text color="white">{date}</Text>
            </Stack>
          </Box>
        </Pressable>
      );
    },
    [goToNewsDetail]
  );

  const onEndReached = useCallback(() => {
    if (selectedType === 0) {
      fetchNextPage();
    } else {
      fetchNextPageCampaign();
    }
  }, [fetchNextPage, fetchNextPageCampaign, selectedType]);

  const renderListFooter = useCallback(() => {
    if (isFetching || isFetchingCampaign) {
      return <Spinner size="sm" />;
    }
    return null;
  }, [isFetching, isFetchingCampaign]);

  const renderNewsFlatList = useCallback(
    () => (
      <FlatList
        mx="4"
        mt="4"
        keyExtractor={keyExtractor}
        data={news}
        renderItem={renderItem}
        onEndReached={onEndReached}
        contentContainerStyle={styles.listContentContainer}
        ListFooterComponent={renderListFooter}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      />
    ),
    [
      isLoading,
      keyExtractor,
      news,
      onEndReached,
      refetch,
      renderItem,
      renderListFooter,
    ]
  );

  const goToNewCourierOrder = useCallback(
    () => navigation.navigate('NewInquiry'),
    []
  );

  const renderCampaignFlatList = useCallback(
    () => (
      <FlatList
        mx="4"
        mt="4"
        keyExtractor={keyExtractor}
        data={campaign}
        renderItem={renderItem}
        onEndReached={onEndReached}
        contentContainerStyle={styles.listContentContainer}
        ListFooterComponent={renderListFooter}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingCampaign}
            onRefresh={refetchCampaign}
          />
        }
      />
    ),
    [
      campaign,
      isLoadingCampaign,
      keyExtractor,
      onEndReached,
      refetchCampaign,
      renderItem,
      renderListFooter,
    ]
  );

  const renderContent = useCallback(() => {
    if (selectedType === 0) {
      return renderNewsFlatList();
    }
    return renderCampaignFlatList();
  }, [renderCampaignFlatList, renderNewsFlatList, selectedType]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationHeader
        title={'Sorğu'}
        headercolor={'white'}
        titleColor={'primary.900'}
        left={<NavigationBackButton color={'primary.900'} />}
      />

      <Box>{renderContent()}</Box>

      <Fab
        borderRadius="40px"
        placement="bottom-right"
        icon={<AddIcon size="4" />}
        py={2}
        px={2}
        mr={1}
        style={{ backgroundColor: '#139A10' }}
        onPress={goToNewCourierOrder}
        label="Sorğu yarat"
        renderInPortal={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContentContainer: {
    paddingBottom: 16,
  },
});

export default InquiryContainer;

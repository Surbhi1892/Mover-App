import { SegmentControl } from 'components';
import { Box, FlatList, Pressable, Spinner, Text, VStack } from 'native-base';
import React, { useCallback, useMemo, useState } from 'react';
import { newsApi } from 'services/News';
import FastImage from 'react-native-fast-image';
import { RefreshControl, StyleSheet } from 'react-native';
import { useInfiniteQuery } from 'hooks/useInfiniteQuery';
import { useNavigation } from '@react-navigation/native';

import NavigationHeader from 'components/NavigationHeader'
import NavigationBackButton from 'components/NavigationBackButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const NewsContainer = () => {
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
          <VStack borderRadius="5px" mb="4" overflow="hidden">
            <FastImage
              source={{ uri: image_path }}
              style={{ width: '100%', height: 160 }}
            />
            <VStack backgroundColor="black.900" p="4" space="3">
              <Text color="white" fontWeight="semibold" fontSize="xs">
                {title}
              </Text>
              <Text color="white" fontSize="2xs">
                {date}
              </Text>
            </VStack>
          </VStack>
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
    <SafeAreaView style={{flex:1}}>
    
      
    <NavigationHeader
        title={'Xəbərlər'}
        headercolor={"white"}
        titleColor={"primary.900"}
        left={<NavigationBackButton color ={"primary.900"} />}
      />
    <Box flex="1">
      {useMemo(
        () => (
          <Box mx="4" mt="4">
            <SegmentControl
              tabs={tabs}
              currentIndex={selectedType}
              onChange={setSelectedType}
            />
          </Box>
        ),
        [selectedType, tabs]
      )}
      {renderContent()}
    </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContentContainer: {
    paddingBottom: 16,
  },
});

export default NewsContainer;

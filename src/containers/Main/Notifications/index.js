import {
  Box,
  Container,
  Divider,
  FlatList,
  Heading,
  HStack,
  Stack,
  Text,
} from 'native-base';
import React, { useCallback, useRef, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchNotifications,
  selectAllNotifications,
  selectNotifications,
} from 'store/Notifications';
import moment from 'moment';
import { RefreshControl } from 'react-native';
import NavigationHeader from 'components/NavigationHeader'
import NavigationBackButton from 'components/NavigationBackButton';
import { SafeAreaView } from 'react-native-safe-area-context';


const NotificationsContainer = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);
  const { isLoading } = useSelector(selectNotifications);
  const page = useRef(1);

  const fetchNotificationsWithPage = () => {
    dispatch(fetchNotifications({ page: page.current }));
  };

  useLayoutEffect(() => {
    fetchNotificationsWithPage();
  }, []);

  const keyExtractor = useCallback(item => String(item.id), []);

  const onRefresh = useCallback(() => {
    page.current = 1;
    fetchNotificationsWithPage();
  }, []);

  const onEndReached = useCallback(() => {
    page.current += 1;
    fetchNotificationsWithPage();
  }, []);

  const renderItem = useCallback(({ item }) => {
    const { title, text, created_at } = item;
    const formattedDate = moment(created_at).format('MMM DD, YYYY');
    return (
      <Box bg="#000" shadow={2} rounded="lg" mb={5}>
        <Stack space={3} px={5} py={4}>
          <Text fontSize={12} color="white">
            {title}
          </Text>
          <Divider />
          <Text color="white">{text}</Text>
          <Text color="white">{formattedDate}</Text>
        </Stack>
      </Box>
    );
  }, []);

  return (
    <SafeAreaView >
        <NavigationHeader
        title={'Bildirişlər'}
        headercolor={"white"}
        titleColor={"primary.900"}
        left={<NavigationBackButton color ={"primary.900"} />}
      />
      
      <FlatList
        pt={2}
        ml={5}
        mr={5}
        keyExtractor={keyExtractor}
        data={notifications}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.8}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default NotificationsContainer;

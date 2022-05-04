import { useRoute } from '@react-navigation/native';
import { Box, ScrollView, Text, VStack } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSingleNewsQuery } from 'services/News';
import NavigationHeader from 'components/NavigationHeader'
import NavigationBackButton from 'components/NavigationBackButton';
import { SafeAreaView } from 'react-native-safe-area-context';
const NewsDetailContainer = () => {
  const { params } = useRoute();
  const newsId = params.id;

  const { data, isLoading } = useSingleNewsQuery({ id: newsId });

  if (isLoading) {
    return null;
  }

  const { id, cleanContent, image_path, data_created } = data;
  const { title, date, description, shortDescription } = cleanContent;

  return (
    <SafeAreaView style={{flex:1}}>
    
      
    
    <Box >
    <NavigationHeader
        title={'Ətraflı'}
        headercolor={"transparent"}
        titleColor={"primary.900"}
        left={<NavigationBackButton color ={"primary.900"} />}
      />
      <FastImage source={{ uri: image_path }} style={styles.image} />
      <ScrollView mx="6" contentContainerStyle={styles.scrollContentContainer}>
        <VStack space="4">
          <Text>{date}</Text>
          <Text fontSize="17px" fontWeight="semibold">
            {title}
          </Text>
          <Text>{description}</Text>
        </VStack>
      </ScrollView>
    </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContentContainer: {
    paddingVertical: 24,
  },
  image: {
    width: '100%',
    height: 280,
  },
});

export default NewsDetailContainer;

import { Box, Divider, Text } from 'native-base';
import React, { useMemo } from 'react';
import OrderImages from './OrderImages';
import OrderOperations from './OrderOperations';
import OrderMainSteps from './OrdersMainSteps';
import { SegmentControl } from 'components';
import { Dimensions } from 'react-native';
import ActionsTab from './ActionsTab';
import ProductTab from './ProductTab';

const CONTAINER_BORDER_RADIUS = 20;

const DetailContent = ({ order }) => {
  const { images } = order;
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabsChange = index => {
    setTabIndex(index);
  };

  return (
    
    <Box
      flex={1}
      backgroundColor="white"
      p={6}
      borderTopLeftRadius={CONTAINER_BORDER_RADIUS}
      borderTopRightRadius={CONTAINER_BORDER_RADIUS}>
      <OrderMainSteps />
      <Divider mt={5} />
      {useMemo(
        () => (
          <OrderImages images={images} />
        ),
        [images]
      )}
      <Divider />
      <OrderOperations order={order} />

      <SegmentControl
        tabs={['Hərəkətlər', 'Məhsullar']}
        paddingVertical={10}
        width={Dimensions.get('screen').width - 50}
        currentIndex={tabIndex}
        onChange={handleTabsChange}
      />
      {tabIndex == 0 ? (
        <ActionsTab order={order} />
      ) : (
        <ProductTab order={order} />
      )}
    </Box>
  );
};

export default DetailContent;

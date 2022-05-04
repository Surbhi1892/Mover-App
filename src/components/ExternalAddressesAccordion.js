import { Accordion, Pressable, Stack, Text } from 'native-base';
import React, { useMemo, useState } from 'react';
import { Dimensions } from 'react-native';
import { useTheme } from 'theme';
import ExternalAddressItem from './ExternalAddressItem';
import SegmentControl from './SegmentControl';

const SUMMARY_DATA_COUNT = 2;

const ExternalAddressesAccordion = ({ addresses }) => {
  const { Colors } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const countries = useMemo(
    () => addresses.map(address => address.name),
    [addresses]
  );
  const summaryData = useMemo(
    () => addresses[selectedIndex].data.slice(0, SUMMARY_DATA_COUNT),
    [addresses, selectedIndex]
  );
  const detailData = useMemo(
    () =>
      addresses[selectedIndex].data.slice(
        SUMMARY_DATA_COUNT,
        addresses[selectedIndex].length
      ),
    [addresses, selectedIndex]
  );

  return (
    <Pressable
      bg="black.800"
      width="100%"
      mt={5}
      mb={6}
      p={4}
      borderRadius={10}>
      <Accordion index={[0]} borderColor="transparent">
        <Accordion.Item>
          <Accordion.Summary
            p={0}
            mb={5}
            alignItems="center"
            style={{ backgroundColor: 'transparent' }}>
            <Text fontWeight="500" lineHeight="24px" color="white">
              Xaricdəki ünvanlarım
            </Text>
            <Accordion.Icon color="white" />
          </Accordion.Summary>
          <SegmentControl
            tabs={countries}
            width={Dimensions.get('screen').width - 68}
            currentIndex={selectedIndex}
            onChange={setSelectedIndex}
          />
          <Stack mt={4} space={3}>
            {summaryData.map((data, index) => (
              <ExternalAddressItem key={index} data={data} />
            ))}
          </Stack>
          <Accordion.Details mt={4} p={0}>
            <Stack space={3}>
              {detailData.map((data, index) => (
                <ExternalAddressItem key={index} data={data} />
              ))}
            </Stack>
          </Accordion.Details>
        </Accordion.Item>
      </Accordion>
    </Pressable>
  );
};

export default ExternalAddressesAccordion;

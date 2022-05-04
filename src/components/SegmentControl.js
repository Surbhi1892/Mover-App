import React from 'react';
import SegmentedControl from 'rn-segmented-control';
import { useTheme } from 'theme';

const SegmentControl = ({ tabs = [], width, ...rest }) => {
  const { Colors } = useTheme();
  return (
    <SegmentedControl
      tabs={tabs}
      paddingVertical={6}
      segmentedControlBackgroundColor={Colors.secondaryGray}
      activeSegmentBackgroundColor={Colors.white}
      textColor={Colors.lightGray}
      activeTextColor={Colors.primaryRed}
      activeTextWeight="500"
      textStyle={{
        fontSize: 11,
        fontFamily: 'Poppins',
        fontWeight: '400',
      }}
      tileStyle={{
        borderRadius: 17,
      }}
      containerStyle={{
        //   marginHorizontal: 10,
        height: 34,
        borderRadius: 17,
      }}
      width={width}
      theme="LIGHT"
      {...rest}
    />
  );
};

export default SegmentControl;

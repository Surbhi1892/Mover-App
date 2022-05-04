import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { useTheme } from 'theme';

const Brand = ({ height, width, mode, color }) => {
  const { Layout, Images } = useTheme();

  return (
    <View style={{ height, width }}>
      <Image
        style={[Layout.fullSize, { tintColor: color }]}
        source={Images.logo}
        resizeMode={mode}
      />
    </View>
  );
};

Brand.propTypes = {
  height: PropTypes.number,
  mode: PropTypes.oneOf(['contain', 'cover', 'stretch', 'repeat', 'center']),
  width: PropTypes.number,
};

Brand.defaultProps = {
  height: 100,
  mode: 'contain',
  width: 100,
};

export default Brand;

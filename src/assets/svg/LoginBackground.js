import * as React from 'react';
import {Dimensions} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const {width, height} = Dimensions.get('screen');

function SvgComponent(props) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      style={{backgroundColor: 'green'}}
      {...props}>
      <Path
        data-name="Path 1"
        d="M350.485 620.148L31.535 482.97C12.691 474.865-.001 452.3-.001 426.901V44.129C-.001 19.757 15.466 0 34.545 0h325.9c17.391 0 31.49 18.009 31.49 40.224v529.648a77.734 77.734 0 01-4.645 26.994c-6.727 18.055-18.807 27.761-36.805 23.282z"
        fill="#fff"
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default SvgComponent;

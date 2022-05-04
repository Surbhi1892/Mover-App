import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import PropTypes from 'prop-types';

function Locked(props) {
  const {fill} = props;
  return (
    <Svg width={15.708} height={20.437} viewBox="0 0 15.708 20.437" {...props}>
      <Path
        data-name="Path 25"
        d="M70.907 8.253h-.4V6.39A6.354 6.354 0 0064.354 0h-.373a6.354 6.354 0 00-6.155 6.39v1.863h-.4a1.293 1.293 0 00-1.114 1.415v9.348a1.3 1.3 0 001.114 1.42h13.481a1.3 1.3 0 001.114-1.42V9.669a1.293 1.293 0 00-1.114-1.416zm-5.477 6.08v2.825a.6.6 0 01-.594.6H63.5a.6.6 0 01-.595-.6v-2.825a1.71 1.71 0 011.076-2.91h.373a1.71 1.71 0 011.076 2.91zm2.454-6.08H60.45V6.39a3.717 3.717 0 117.434 0v1.863z"
        transform="translate(-56.313)"
        fill={fill}
        opacity={0.5}
      />
    </Svg>
  );
}

Locked.propTypes = {
  fill: PropTypes.string,
};

export default Locked;

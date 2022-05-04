import * as React from 'react';
import Svg, {Defs, ClipPath, Path, G} from 'react-native-svg';
import PropTypes from 'prop-types';

function ManUser(props) {
  const {fill} = props;
  return (
    <Svg width={15.521} height={20.407} viewBox="0 0 15.521 20.407" {...props}>
      <Defs>
        <ClipPath id="a">
          <Path fill="none" d="M0 0H15.521V20.407H0z" />
        </ClipPath>
      </Defs>
      <G data-name="man-user" fill={fill} clipPath="url(#a)">
        <Path
          data-name="Path 21"
          d="M108.643 9.98c2.269 0 4.108-2.234 4.108-4.99S112.148 0 108.643 0s-4.108 2.234-4.108 4.99 1.839 4.99 4.108 4.99z"
          transform="translate(-100.883)"
        />
        <Path
          data-name="Path 22"
          d="M41.9 300.458c0-.168 0-.047 0 0z"
          transform="translate(-41.895 -282.859)"
        />
        <Path
          data-name="Path 23"
          d="M308.085 301.639c0-.046 0-.319 0 0z"
          transform="translate(-292.565 -283.908)"
        />
        <Path
          data-name="Path 24"
          d="M57.419 184.775c-.076-4.8-.7-6.169-5.5-7.035a3.371 3.371 0 01-4.5 0c-4.746.857-5.411 2.2-5.5 6.879-.007.382-.011.4-.012.357v.5s1.142 2.3 7.759 2.3 7.759-2.3 7.759-2.3v-.373a3.086 3.086 0 01-.006-.328z"
          transform="translate(-41.907 -167.377)"
        />
      </G>
    </Svg>
  );
}

ManUser.propTypes = {
  fill: PropTypes.string,
};

export default ManUser;

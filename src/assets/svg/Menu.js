import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function MenuIcon(props) {
  return (
    <Svg width={33.865} height={16.932} viewBox="0 0 33.865 16.932" {...props}>
      <G fill={props.fill}>
        <Path
          data-name="Path 17"
          d="M32.806 98.36H1.058a1.058 1.058 0 010-2.117h31.748a1.058 1.058 0 010 2.117z"
          transform="translate(0 -96.243)"
        />
        <Path
          data-name="Path 18"
          d="M1.058 180.455h31.748a1.058 1.058 0 110 2.116H1.058a1.058 1.058 0 110-2.116z"
          transform="translate(0 -173.047)"
        />
        <Path
          data-name="Path 19"
          d="M121.361 264.667h21.165a1.058 1.058 0 010 2.116h-21.165a1.058 1.058 0 110-2.116z"
          transform="translate(-120.303 -249.851)"
        />
      </G>
    </Svg>
  );
}

export default MenuIcon;

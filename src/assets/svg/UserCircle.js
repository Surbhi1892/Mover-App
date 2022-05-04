import * as React from 'react';
import Svg, {G, Path, Circle} from 'react-native-svg';

function UserCircle(props) {
  return (
    <Svg
      data-name="Group 15"
      width={99.874}
      height={99.874}
      viewBox="0 0 99.874 99.874"
      {...props}>
      <G fill="#fff">
        <Path
          data-name="Path 21"
          d="M117.906 32.48c7.384 0 13.37-7.271 13.37-16.24S129.311 0 117.906 0s-13.371 7.271-13.371 16.24 5.986 16.24 13.371 16.24z"
          transform="translate(24.969 16.443) translate(-92.649)"
        />
        <Path
          data-name="Path 22"
          d="M41.9 300.653c0-.547 0-.154 0 0z"
          transform="translate(24.969 16.443) translate(-41.895 -243.376)"
        />
        <Path
          data-name="Path 23"
          d="M308.085 301.983c.007-.15 0-1.039 0 0z"
          transform="translate(24.969 16.443) translate(-257.575 -244.279)"
        />
        <Path
          data-name="Path 24"
          d="M92.387 200.635c-.248-15.624-2.288-20.077-17.9-22.895 0 0-2.2 2.8-7.321 2.8s-7.322-2.8-7.322-2.8c-15.445 2.787-17.609 7.174-17.894 22.387-.023 1.242-.034 1.308-.038 1.163v1.642s3.718 7.494 25.252 7.494 25.252-7.494 25.252-7.494v-1.214a10.06 10.06 0 01-.029-1.083z"
          transform="translate(24.969 16.443) translate(-41.906 -144.014)"
        />
      </G>
      <G data-name="Ellipse 2" fill="none" stroke="#fff" strokeWidth={4}>
        <Circle cx={49.937} cy={49.937} r={49.937} stroke="none" />
        <Circle cx={49.937} cy={49.937} r={47.937} />
      </G>
    </Svg>
  );
}

export default UserCircle;

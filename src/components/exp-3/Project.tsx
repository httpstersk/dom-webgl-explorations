import {
  animated,
  config,
  useSpring,
  useTransition,
} from '@react-spring/three';
import { useLoader, useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Mesh, TextureLoader } from 'three';
import WebGLImage from './WebGLImage';

function Project({ image, isPage, ...rest }) {
  const ref = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, image);
  const viewport = useThree((state) => state.viewport);
  const { height, width } = texture.image;
  const scaleDiff = viewport.height / height;

  const { scale } = useSpring({
    scale: [width * scaleDiff, height * scaleDiff, 1],
    config: config.gentle,
  });

  const transitions = useTransition(isPage, {
    from: {},
    enter: {},
    config: config.stiff,
  });

  return transitions((styles) => {
    return (
      <animated.group ref={ref} scale={scale} {...rest} {...styles}>
        <WebGLImage isPage={isPage} texture={texture} />
      </animated.group>
    );
  });
}

export default React.memo(Project);

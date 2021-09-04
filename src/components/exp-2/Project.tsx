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

function Project({ isPage, texture1, texture2, ...rest }) {
  const ref = useRef<Mesh>(null);
  const startTexture = useLoader(TextureLoader, texture1);
  const endTexture = useLoader(TextureLoader, texture2);
  const viewport = useThree((state) => state.viewport);
  const { height, width } = startTexture.image;
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
        <WebGLImage
          isPage={isPage}
          startTexture={startTexture}
          endTexture={endTexture}
        />
      </animated.group>
    );
  });
}

export default React.memo(Project);

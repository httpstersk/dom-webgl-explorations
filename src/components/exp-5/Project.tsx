import { animated, config, useSpring } from '@react-spring/three';
import { Html } from '@react-three/drei';
import { useLoader, useThree } from '@react-three/fiber';
import { useDrag } from '@use-gesture/react';
import React, { useCallback, useRef, useState } from 'react';
import { Mesh, TextureLoader } from 'three';
import Title from '../common/Title';
import WebGLImage from './WebGLImage';

function Project({ isPage, texture1, ...rest }) {
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef<Mesh>(null);
  const startTexture = useLoader(TextureLoader, texture1);
  const viewport = useThree((state) => state.viewport);
  const { height, width } = startTexture.image;
  const aspect = viewport.height / height;
  const getScale = useCallback(
    (multiplier: number = 1) => [
      width * aspect * multiplier,
      height * aspect * multiplier,
      1,
    ],
    [],
  );

  const [{ opacity, ...transforms }, api] = useSpring(() => ({
    config: { ...config.wobbly },
    opacity: 1,
    position: [0, 0, 0],
    scale: getScale(),
  }));

  const bind = useDrag(({ offset: [x, y], dragging, down }) => {
    api.start({
      opacity: down ? 1 : 0,
      position: [x, -y, 0],
      scale: down ? getScale(0.5) : getScale(),
    });

    setIsDragging(dragging);
  }) as any;

  return (
    <animated.mesh ref={ref} {...bind()} {...transforms} {...rest}>
      <WebGLImage isPage={isPage} startTexture={startTexture} />

      <Html
        center
        distanceFactor={1}
        style={{
          opacity,
          pointerEvents: 'none',
        }}
      >
        <Title blendMode="difference" opacity={isDragging ? 0 : 1}>
          №5
        </Title>
      </Html>
    </animated.mesh>
  );
}

export default React.memo(Project);

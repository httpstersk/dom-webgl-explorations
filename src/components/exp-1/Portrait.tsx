import useStore from '@/helpers/store';
import {
  animated,
  config,
  useSpring,
  useTransition,
} from '@react-spring/three';
import { useLoader, useThree } from '@react-three/fiber';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTimeoutEffect } from 'react-timing-hooks';
import { Mesh, TextureLoader } from 'three';
import WebGLImage from './WebGLImage';

function Portrait({ image, index, isPage, onClick, ...rest }) {
  const ref = useRef<Mesh>(null);
  const [initialScale, exp1Imgs] = useStore((state) => [
    state.initialScale,
    state.exp1Imgs,
  ]);
  const [isActive, setIsActive] = useState(false);
  const [isScaling, setIsScaling] = useState(false);
  const texture = useLoader(TextureLoader, image);
  const viewport = useThree((state) => state.viewport);
  const rotationZ = useMemo(
    () => -Math.PI / 2 + (exp1Imgs.length + index) / exp1Imgs.length,
    [],
  );

  const onPointerOver = useCallback((e) => {
    e.stopPropagation();
    setIsActive(true);
  }, []);

  const onPointerOut = useCallback((e) => {
    e.stopPropagation();
    setIsActive(false);
  }, []);

  useTimeoutEffect(
    (timeout, clear) => {
      if (isPage) {
        timeout(() => setIsScaling(true), 700);
      }
    },
    [isPage],
  );

  const { height, width } = texture.image;
  const scaleDiff = viewport.width / width;
  const scaleActive = isActive ? initialScale + 0.015 : initialScale;
  const scaleMultiplier = !isScaling ? scaleActive : scaleDiff;

  const { scale } = useSpring({
    scale: [width * scaleMultiplier, height * scaleMultiplier, 1],
    config: config.gentle,
  });

  const { position } = useSpring({
    position: isActive ? [0, 0, 1] : [0, 0, -1],
  });

  const transitions = useTransition(isPage, {
    from: {
      rotation: [0, 0, isPage ? rotationZ : 0],
    },
    enter: {
      rotation: [0, 0, isPage ? 0 : rotationZ],
      delay: 350,
    },
    config: config.stiff,
    ...{
      lazy: true,
      reset: false,
      unique: true,
    },
  });

  return transitions((styles) => {
    return (
      <animated.group
        onClick={(event) => {
          setIsActive(false);
          return onClick(event);
        }}
        onPointerOut={onPointerOut}
        onPointerOver={onPointerOver}
        position={position}
        ref={ref}
        scale={scale}
        {...rest}
        {...styles}
      >
        <WebGLImage isPage={isPage} opacity={1} shift={1} texture={texture} />
      </animated.group>
    );
  });
}

export default React.memo(Portrait);

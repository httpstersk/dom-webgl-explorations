import useStore, { top } from '@/helpers/store';
import { useFrame, useThree } from '@react-three/fiber';
import lerp from 'lerp';
import React, { forwardRef, useMemo, useRef } from 'react';
import { Color, ShaderMaterial, Texture, Vector2 } from 'three';
import { AnimatedShaderMaterial } from './ShaderMaterial';

type WebGLImageProps = {
  color?: Color;
  isPage: boolean;
  startTexture: Texture;
};

const WebGLImage = forwardRef(
  ({ color, isPage, startTexture, ...rest }: WebGLImageProps, ref) => {
    const LERP_AMOUNT = 0.1;
    const materialRef = useRef<ShaderMaterial>();
    const vhMultiplier = useStore((state) => state.vhMultiplier);
    const viewport = useThree((state) => state.viewport);
    const resolution = useMemo(
      () => new Vector2(viewport.width, viewport.height),
      [viewport],
    );

    useFrame(({ clock }) => {
      const material = materialRef.current;
      if (!material) return;

      material.uScrollPos = lerp(
        material.uScrollPos,
        Number(top.current) / (vhMultiplier * viewport.height),
        LERP_AMOUNT,
      );

      material.uTime = clock.getElapsedTime();
    });

    return (
      <mesh ref={ref} {...rest}>
        <planeBufferGeometry args={[1, 1, 32, 32]} attach="geometry" />
        <AnimatedShaderMaterial
          attach="material"
          ref={materialRef}
          uColor={new Color(color)}
          uHasTexture={!!startTexture}
          uResolution={resolution}
          uTexture={startTexture}
          uScrollPos={0}
          uTime={0}
        />
      </mesh>
    );
  },
);

export default React.memo(WebGLImage);

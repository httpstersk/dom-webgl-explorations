import useStore, { top } from '@/helpers/store';
import { useFrame, useThree } from '@react-three/fiber';
import lerp from 'lerp';
import React, { forwardRef, useRef } from 'react';
import { Color, ShaderMaterial, Texture } from 'three';
import './ShaderMaterial';

type WebGLImageProps = {
  color?: Color;
  isPage: boolean;
  startTexture: Texture;
  endTexture: Texture;
};

const WebGLImage = forwardRef(
  (
    { color, isPage, startTexture, endTexture, ...rest }: WebGLImageProps,
    ref,
  ) => {
    const LERP_AMOUNT = 0.1;
    const materialRef = useRef<ShaderMaterial>();
    const vhMultiplier = useStore((state) => state.vhMultiplier);
    const viewport = useThree((state) => state.viewport);

    useFrame(({ clock }) => {
      if (materialRef.current) {
        materialRef.current.uScrollPos = lerp(
          materialRef.current.uScrollPos,
          Number(top.current) / (vhMultiplier * viewport.height),
          LERP_AMOUNT,
        );

        materialRef.current.uTime = clock.getElapsedTime();
      }
    });

    return (
      <mesh ref={ref} {...rest}>
        <planeBufferGeometry args={[1, 1, 32, 32]} attach="geometry" />
        <webGLShaderMaterial
          attach="material"
          ref={materialRef}
          uColor={new Color(color)}
          uHasTexture={!!startTexture}
          uTexture={startTexture}
          uTexture2={endTexture}
          uScrollPos={0}
          uTime={0}
        />
      </mesh>
    );
  },
);

export default React.memo(WebGLImage);

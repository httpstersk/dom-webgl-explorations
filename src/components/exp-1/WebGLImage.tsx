import { RoundedPlane } from '@/components/common/RoundedPlane';
import { top } from '@/helpers/store';
import { useFrame } from '@react-three/fiber';
import lerp from 'lerp';
import React, { forwardRef, useMemo, useRef } from 'react';
import { Color, LinearFilter, ShaderMaterial, Texture } from 'three';
import './ShaderMaterial';

type WebGLImageProps = {
  color?: Color;
  isPage: boolean;
  opacity: number;
  shift: number;
  texture: Texture;
};

const WebGLImage = forwardRef(
  (
    { color, isPage, opacity, shift = 1, texture, ...rest }: WebGLImageProps,
    ref,
  ) => {
    const LERP_AMOUNT = 0.1;
    const SHIFT_FACTOR = 0.025;
    const materialRef = useRef<ShaderMaterial>();
    const lerpAmount = isPage ? 1 : LERP_AMOUNT;

    let last = top.current;

    useMemo(() => (texture.minFilter = LinearFilter), [texture]);

    useFrame(() => {
      if (!materialRef.current) return;
      if (!isPage) {
        materialRef.current.uShift = lerp(
          materialRef.current.uShift,
          ((Number(top.current) - Number(last)) / shift) * SHIFT_FACTOR,
          lerpAmount,
        );
      } else {
        materialRef.current.uShift = 0;
      }

      last = top.current;
    });

    return (
      <RoundedPlane {...rest} ref={ref}>
        <webGLShaderMaterial
          attach="material"
          ref={materialRef}
          transparent
          uColor={new Color(color)}
          uHasTexture={!!texture}
          uOpacity={opacity}
          uScale={1}
          uShift={shift}
          uTexture={texture}
        />
      </RoundedPlane>
    );
  },
);

export default React.memo(WebGLImage);

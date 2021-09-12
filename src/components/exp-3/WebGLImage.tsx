import { RoundedPlane } from '@/components/common/RoundedPlane';
import useStore, { top } from '@/helpers/store';
import { clamp } from '@/utils';
import { useFrame, useThree } from '@react-three/fiber';
import lerp from 'lerp';
import React, { forwardRef, useMemo, useRef, useState } from 'react';
import { Color, ShaderMaterial, Texture, Vector2 } from 'three';
import './ShaderMaterial';

type WebGLImageProps = {
  color?: Color;
  isPage: boolean;
  texture: Texture;
};

const WebGLImage = forwardRef(
  ({ color, isPage, texture, ...rest }: WebGLImageProps, ref) => {
    const LERP_AMOUNT = 0.1;
    const materialRef = useRef<ShaderMaterial>();
    const [radius, setRadius] = useState(0);
    const vhMultiplier = useStore((state) => state.vhMultiplier);
    const viewport = useThree((state) => state.viewport);
    const resolution = useMemo(
      () => new Vector2(viewport.width, viewport.height),
      [viewport],
    );

    useFrame(() => {
      if (materialRef.current) {
        materialRef.current.uScale = lerp(
          materialRef.current.uScale,
          Number(top.current) / (vhMultiplier + 1) / viewport.height,
          LERP_AMOUNT,
        );

        materialRef.current.uScrollPos = lerp(
          materialRef.current.uScrollPos,
          Number(top.current) / ((vhMultiplier + 1) * viewport.height),
          LERP_AMOUNT,
        );

        setRadius(1 - Number(top.current) / viewport.height);
      }
    });

    const clampedRadius = useMemo(() => clamp(radius, 0.1, 0.2), [radius]);

    return (
      <RoundedPlane radius={clampedRadius} ref={ref} {...rest}>
        <webGLShaderMaterial
          attach="material"
          ref={materialRef}
          uColor={new Color(color)}
          uHasTexture={!!texture}
          uResolution={resolution}
          uScale={1}
          uScrollPos={0}
          uTexture={texture}
        />
      </RoundedPlane>
    );
  },
);

export default React.memo(WebGLImage);

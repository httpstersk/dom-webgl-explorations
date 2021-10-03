import { NextRouter } from 'next/router';
import { Color, Texture, Vector2 } from 'three';
import { State } from 'zustand';

type OptionalUniforms = {
  uOpacity?: number;
  uResolution?: Vector2;
  uScale?: number;
  uScrollPos?: number;
  uSegments?: number;
  uShift?: number;
  uTime?: number;
  uTexture2?: Texture | null;
};

export type ShaderMaterialUniforms = OptionalUniforms & {
  uColor: Color;
  uHasTexture: boolean;
  uTexture: Texture | null;
};

export type ShaderMaterialImplementation = ShaderMaterialUniforms &
  JSX.IntrinsicElements['shaderMaterial'];

export type MixBlendMode =
  | 'color'
  | 'color-burn'
  | 'color-dodge'
  | 'darken'
  | 'difference'
  | 'exclusion'
  | 'hard-light'
  | 'hue'
  | 'lighten'
  | 'luminosity'
  | 'multiply'
  | 'normal'
  | 'overlay'
  | 'revert'
  | 'saturation'
  | 'screen'
  | 'soft-light'
  | 'unset';

export type ScrollDirection = 'vertical' | 'horizontal';

export type ReactThreeFiberProps = {
  r3f: boolean;
};

export type UnsplashImage = {
  _id: number;
  author: string;
  src: string;
  url: string;
};

export type Viewport = {
  x: number;
  y: number;
};

export interface IZustandState extends State {
  allImgs: UnsplashImage[];
  exp1Imgs: UnsplashImage[];
  exp2Imgs: UnsplashImage[];
  exp3Imgs: UnsplashImage[];
  exp4Imgs: UnsplashImage[];
  events: unknown;
  initialScale: number;
  router: NextRouter;
  vhMultiplier: number;
  viewport: Viewport;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      webGLShaderMaterial: ShaderMaterialImplementation;
    }
  }
}

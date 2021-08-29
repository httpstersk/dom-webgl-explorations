import { ShaderMaterialUniforms } from '@/types/';
import { Color } from 'three';

export const CONSTANTS = {
  FONTS: [
    'Aeonik Pro',
    'Gellix',
    'GT Walsheim',
    'Helvetica Now Display',
    'HK Grotesk Wide',
    'Labil Grotesk',
    'Mabry Pro',
    'Monument Grotesk',
    'Object Sans',
  ],
  SIZES: {
    INSTAGRAM: 1080,
  },
  UNSPLASH_URL: 'https://unsplash.com/',
};

export const initialUniforms: ShaderMaterialUniforms = {
  uColor: new Color('blue'),
  uHasTexture: false,
  uResolution: 1,
  uOpacity: 1,
  uScale: 0,
  uScrollPos: 0,
  uSegments: 1,
  uShift: 1,
  uTexture: null,
  uTexture2: null,
  uTime: 0,
};

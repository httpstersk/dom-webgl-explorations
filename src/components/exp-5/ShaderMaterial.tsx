import { initialUniforms } from '@/constants';
import { ShaderMaterialImplementation } from '@/types';
import { animated } from '@react-spring/three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { forwardRef } from 'react';
import fragmentShader from './shaders/fragment.glsl';
import vertexShader from './shaders/vertex.glsl';

const WebGLShaderMaterial = shaderMaterial(
  initialUniforms,
  vertexShader,
  fragmentShader,
);

extend({ WebGLShaderMaterial });

export const AnimatedShaderMaterial = animated(
  forwardRef<ShaderMaterialImplementation, any>((props, ref) => (
    <webGLShaderMaterial ref={ref} {...props} />
  )),
);

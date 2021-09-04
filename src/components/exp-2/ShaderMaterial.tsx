import { initialUniforms } from '@/constants';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import fragmentShader from './shaders/fragment.glsl';
import vertexShader from './shaders/vertex.glsl';

const WebGLShaderMaterial = shaderMaterial(
  initialUniforms,
  vertexShader,
  fragmentShader,
);

extend({ WebGLShaderMaterial });

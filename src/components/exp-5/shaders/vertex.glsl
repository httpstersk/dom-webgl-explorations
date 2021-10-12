uniform float uShift;
varying vec2 vUv;

#define PI 3.14159265359

void main() {
  vUv = uv;
  vec3 pos = position;
  pos.y = pos.y + ((cos(uv.x * PI) * uShift * 2.0) * 0.015);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

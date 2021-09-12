uniform vec3 uColor;
uniform bool uHasTexture;
uniform vec2 uResolution;
uniform float uScale;
uniform float uScrollPos;
uniform sampler2D uTexture;
varying vec2 vUv;

#pragma glslify: aastep = require("glsl-aastep")

float circle(vec2 st, float radius, vec2 resolution) {
  st.x *= resolution.x / resolution.y;
  vec2 center = vec2(0.5);
  center.x *= resolution.x / resolution.y;
  float dist = distance(st, center);
  return aastep(dist, radius);
}

void main() {
  if (uHasTexture) {
    vec2 uv = gl_FragCoord.xy / uResolution.xy - 0.5;
    vec2 scaledUv = (vUv - vec2(0.5)) * (1.0 - uScale) + vec2(0.5);
    vec4 color = texture2D(uTexture, scaledUv);
    float mask = circle(uv, 0.15 + uScrollPos * 10.0, uResolution);
    gl_FragColor = vec4(color.rgb, color.a * mask);
  } else {
    gl_FragColor = vec4(uColor, 1.0);
  }
}

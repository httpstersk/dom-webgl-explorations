uniform vec3 uColor;
uniform bool uHasTexture;
uniform float uScrollPos;
uniform float uTime;
uniform sampler2D uTexture;
uniform sampler2D uTexture2;
varying vec2 vUv;

#define BLUR 0.8
#define FRACTAL_SCALE 6.0
#define FRACTAL_OCTAVES 6
#define MAX_OCTAVES 8

const float SPEED = 0.00025;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

float fractalNoise(vec2 st, float time, float scale, int octaves) {
  st *= scale;
  float fractNoise = 0.0;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  float octaveScale = 1.0;

  for (int i = 0; i < MAX_OCTAVES; i++) {
    if (i <= octaves) {
      octaveScale *= 0.5;
      fractNoise += octaveScale * snoise3(vec3(st, time));
      st = m * st;
    }
  }

  return 0.5 + 0.5 * fractNoise;
}

float interpolate(float start, float end, float t) {
  return start * (1.0 - t) + end * t;
}

float transitionWipe(vec2 st) {
  float transition = st.x + interpolate(-1.0 - BLUR, 1.0 + BLUR, uScrollPos * 2.0);
  return smoothstep(transition - BLUR, transition + BLUR, st.y);
}

void main() {
  if (uHasTexture) {
    vec2 st = vUv;
    st -= 0.5;
    float noise = fractalNoise(st, uTime * SPEED, FRACTAL_SCALE, FRACTAL_OCTAVES);
    float transition = transitionWipe(st);
    st += 0.5;

    vec2 mixerFrom = mix(st, st * noise, 1.0 - transition);
    vec2 mixerTo = mix(st, st * noise, transition);
    vec4 startTexture = texture2D(uTexture, mixerFrom);
    vec4 endTexture = texture2D(uTexture2, mixerTo);

    gl_FragColor = mix(endTexture, startTexture, transition);
  } else {
    gl_FragColor = vec4(uColor, 1.0);
  }
}

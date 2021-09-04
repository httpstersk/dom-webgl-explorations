uniform vec3 uColor;
uniform bool uHasTexture;
uniform float uScrollPos;
uniform float uTime;
uniform sampler2D uTexture;
uniform sampler2D uTexture2;
varying vec2 vUv;

#pragma glslify: random = require(glsl-random)

float noise(vec2 uv) {
  vec2 uv_index = floor(uv);
  vec2 uv_fract = fract(uv);
  vec2 blur = smoothstep(0.0, 1.0, uv_fract);

  // Four corners in 2D of a tile
  float a = random(uv_index);
  float b = random(uv_index + vec2(1.0, 0.0));
  float c = random(uv_index + vec2(0.0, 1.0));
  float d = random(uv_index + vec2(1.0, 1.0));

  return mix(a, b, blur.x) + (c - a) * blur.y * (1.0 - blur.x) + (d - b) * blur.x * blur.y;
}

void main() {
  if (uHasTexture) {
    vec2 uv = vUv;
    uv -= 0.5;
    float wave = noise(10.0 * uv + uTime * 0.5);
    float distortion = mix(1.0, 1.0 + uScrollPos, wave);
    uv *= distortion;
    uv += 0.5;

    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
      discard;
    }

    vec4 startTexture = texture2D(uTexture, uv);
    vec4 endTexture = texture2D(uTexture2, uv);
    float morphTextures = smoothstep(0.5, 2.0, 0.5 + uScrollPos * 3.0);
    float mixer = step(morphTextures, wave);

    gl_FragColor = mix(startTexture, endTexture, mixer);
  } else {
    gl_FragColor = vec4(uColor, 1.0);
  }
}

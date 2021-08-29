uniform vec3 uColor;
uniform float uOpacity;
uniform bool uHasTexture;
uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
  if (uHasTexture) {
    vec2 uv = vUv;
    vec4 color = texture2D(uTexture, uv);
    gl_FragColor = color;
  } else {
    gl_FragColor = vec4(uColor, uOpacity);
  }
}

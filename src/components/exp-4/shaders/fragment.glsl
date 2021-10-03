uniform vec3 uColor;
uniform bool uHasTexture;
uniform float uTime;
uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
  if (uHasTexture) {
    vec2 uv = vUv;
    float distortionStrength = 0.1;

    // Making a safe area
    uv = mix(vec2(distortionStrength), vec2(1.0 - distortionStrength), uv);

    float columns = 20.0;
    float x = floor(uv.x * columns) / columns;
    float y = floor(uv.x * columns) / columns;

    vec2 distortion = distortionStrength * vec2(
      sin(uTime * 0.5 + x + y * 2.0),
      cos(uTime * 0.5 + x * 2.0 + y * 5.0)
    );

    vec4 color = texture2D(uTexture, uv + distortion);
    gl_FragColor = color;
  } else {
    gl_FragColor = vec4(uColor, 1.0);
  }
}

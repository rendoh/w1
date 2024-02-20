attribute vec3 position;
attribute float concave;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform float uTime;

void main() {
  vec3 pos = position + position * concave * 0.5 * sin(uTime * 0.001);
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);
}

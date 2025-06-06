import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

const noise2D = createNoise2D();
const geometry = new THREE.PlaneGeometry(300, 300, 100, 100);

// 使用顶点着色器材质来实现颜色变化
const material = new THREE.ShaderMaterial({
  vertexShader: `
    varying float vHeight;
    void main() {
      vHeight = position.z;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying float vHeight;
    void main() {
      float colorMix = (vHeight + 50.0) / 100.0;
      vec3 color1 = vec3(0.1, 0.2, 0.8); // 蓝色（低处）
      vec3 color2 = vec3(1.0, 0.6, 0.1); // 橙色（高处）
      gl_FragColor = vec4(mix(color1, color2, colorMix), 1.0);
    }
  `,
  wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(Math.PI / 2);

export default mesh;

export function updatePosition() {
  const positions = geometry.attributes.position;
  const time = Date.now() * 0.001;
  
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    
    // 多层噪声叠加
    const noise1 = noise2D(x / 150 + time * 0.2, y / 150 + time * 0.3) * 30;
    const noise2 = noise2D(x / 80 + time * 0.1, y / 80 - time * 0.15) * 15;
    const noise3 = noise2D(x / 40 + time * 0.4, y / 40 + time * 0.2) * 8;
    
    // 波浪效果
    const wave1 = Math.sin(time * 2 + x * 0.02 + y * 0.01) * 12;
    const wave2 = Math.cos(time * 1.5 + y * 0.03 - x * 0.015) * 8;
    
    const finalHeight = noise1 + noise2 + noise3 + wave1 + wave2;
    positions.setZ(i, finalHeight);
  }
  positions.needsUpdate = true;
}
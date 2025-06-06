import * as THREE from 'three'

export function createEarth() {
  const texture = new THREE.TextureLoader().load('/assets/earth.jpg')

  const material = new THREE.MeshPhongMaterial({
    map: texture,
    transparent: true,
    shininess: 10,
  })

  const geometry = new THREE.SphereGeometry(5, 64, 64)
  return new THREE.Mesh(geometry, material)
}

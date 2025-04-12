import * as THREE from 'three'
import { GUI } from 'dat.gui'

export function createLights(scene) {
  const ambientLight = new THREE.AmbientLight(0xffffff, 1)
  const pointLight = new THREE.PointLight(0xffffff, 1.66)
  pointLight.position.set(27.6, 12.2, 23.4)

  scene.add(ambientLight, pointLight)

  const gui = new GUI()
  return { ambientLight, pointLight, gui }
}

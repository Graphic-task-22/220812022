import './style.css'
import * as THREE from 'three'
import { createEarth } from './mesh/createEarth.js'
import { createCamera } from './camera/createCamera.js'
import { createScene } from './scene/createScene.js'
import { createLights } from './light/createLights.js'
import { setupLightGUI } from './light/setupLightGUI.js'

const scene = createScene()
const camera = createCamera()
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webgl'), antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

const earth = createEarth()
scene.add(earth)

const { ambientLight, pointLight, gui } = createLights(scene)
setupLightGUI(gui, earth, pointLight, ambientLight)

function animate() {
  requestAnimationFrame(animate)
  earth.rotation.y += 0.001
  renderer.render(scene, camera)
}
animate()

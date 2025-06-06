export function setupLightGUI(gui, mesh, pointLight, ambientLight) {
    const material = mesh.material
  
    const earthFolder = gui.addFolder('地球')
    const posFolder = earthFolder.addFolder('位置')
    posFolder.add(mesh.position, 'x', -50, 50).name('x')
    posFolder.add(mesh.position, 'y', -50, 50).name('y')
    posFolder.add(mesh.position, 'z', -50, 50).name('z')
  
    const matFolder = earthFolder.addFolder('材质')
    matFolder.addColor({ color: material.color.getHex() }, 'color')
      .onChange(val => material.color.set(val))
      .name('颜色')
    matFolder.add(material, 'transparent').name('透明')
    matFolder.add(material, 'opacity', 0, 1).name('透明度')
    matFolder.addColor({ specular: material.specular.getHex() }, 'specular')
      .onChange(val => material.specular.set(val))
      .name('高光')
  
    const lightFolder = gui.addFolder('光源')
    const ambientFolder = lightFolder.addFolder('环境光')
    ambientFolder.add(ambientLight, 'intensity', 0, 2).name('强度')
  
    const pointFolder = lightFolder.addFolder('点光源')
    pointFolder.add(pointLight, 'intensity', 0, 5).name('强度')
    const pointPosFolder = pointFolder.addFolder('位置')
    pointPosFolder.add(pointLight.position, 'x', -50, 50).name('x')
    pointPosFolder.add(pointLight.position, 'y', -50, 50).name('y')
    pointPosFolder.add(pointLight.position, 'z', -50, 50).name('z')
  }
  
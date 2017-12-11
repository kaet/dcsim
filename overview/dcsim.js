'use strict'

class NodeRepresentation {

  constructor(identity) {
    this.identity = identity
    this.leds = Array(10).fill(Array(10).fill(0))
  }

  draw() {
    const _drawLED = (x, y, val) => {

      const scale = 10
      const square = new paper.Shape.Rectangle(
        y * scale + this.identity.self[1] * (scale + 1) * scale,
        x * scale + this.identity.self[0] * (scale + 1) * scale,
        scale - 1, scale - 1)

      square.fillColor = `rgba(255,255,255,${val <= 0 ? 0.1 : val})`
    }
    this.leds.map((arr, x) => arr.map((val, y) => _drawLED(x, y, val)))
  }

  update() { }

}

class Matrix {

  constructor() {
    this.nodes = {}
  }

  update(data) {
    if (data.type != 'update') return
    paper.project.clear()

    if (!this.nodes.hasOwnProperty(data.id)) this.addNode(data)
    this.nodes[data.id].update(data)
    Object.values(this.nodes).map(node => node.draw())

    paper.view.draw()
  }

  addNode(node) {
    const implementation = eval(node.implementation[0])
    this.nodes[node.id] = new implementation(node)
  }

}

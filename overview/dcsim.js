'use strict'

class NodeRepresentation {

  constructor(identity) {
    this.identity = identity
    this.leds = Array(10).fill(Array(10).fill(0))
  }

  update() { }

  draw() {
    const _drawLED = (x, y, val) => {
      const square = new paper.Shape.Rectangle(y * 10 + this.identity.self[1] * 11 * 10, x * 10 + this.identity.self[0] * 11 * 10, 9, 9)
      square.fillColor = `rgba(255,255,255,${val <= 0 ? 0.1 : val})`
    }
    this.leds.map((arr, x) => arr.map((val, y) => _drawLED(x, y, val)))
  }

}

class Matrix {

  constructor() {
    this.nodes = { }
  }

  update(data) {
    if (data.type != 'update') return
    paper.project.clear()

    if (!(data.id in this.nodes)) this.addNode(data)
    this.nodes[data.id].update(data)
    Object.values(this.nodes).map(node => node.draw())

    paper.view.draw()
  }

  addNode(node) {
    const behaviour = eval(node.implementation[0])
    this.nodes[node.id] = new behaviour(node)
  }

}

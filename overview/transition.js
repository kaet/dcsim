'use strict'

class Network {
  constructor() {
    this.nodes = []
    this.layout = {}
  }
  addNode(opts) {
    this.nodes.push(new Node(opts))
    this.layout['' + opts.x + opts.y] = this.nodes.length - 1
  }
  draw() {
    paper.project.clear()
    this.nodes.map(node => node.draw())
    paper.view.draw()
  }
  multicast(obj) {
    this.nodes.map(node => node.event(obj))
    this.draw()
  }
  unicast(x, y, obj) {
    this.nodes[this.layout['' + x + y]].receive(obj)
    this.draw()
  }
}

class Node {
  constructor(opts) {
    this.opts = opts
    this.leds = 10 // * 10, the LED matrix is always square
    this.scale = 10
    this.matrix = []
    this.value = 0
    for (let i = 0; i < this.leds * this.leds; i++) this.matrix.push(.1)
  }
  receive(obj) {
    const center = ((this.leds - 1) / 2)
    let radius = 0
    switch (obj.type) {
      case 'init_light_body': // I won't implement radius on this
        this.matrix = this.matrix.map(val => 100)
        this.value = 100
        break;
      case 'receive':
        //*
        this.value += obj.value
        radius = center - Math.floor(this.value / 10)
        this.matrix = this.matrix.map((val, i) =>
          (Math.floor(i / 10) < radius)
        || (Math.floor(i / 10) >= Math.floor(this.leds - radius))
        || (i % 10 < radius)
        || (i % 10 >= Math.floor(this.leds - radius))
         ? .1 : 1)
        /*/this.matrix = this.matrix.map((val, i) =>
          (this.matrix.length - i <= this.value + obj.value) ? 1 : val)
        this.value += obj.value//*/
        break;
      case 'send':
        //*
        this.value -= obj.value
        radius = this.leds - Math.floor(this.value / 10)
        this.matrix = this.matrix.map((val, i) =>
          (Math.floor(i / 10) < radius)
        || (Math.floor(i / 10) >= Math.floor(this.leds - radius))
        || (i % 10 < radius)
        || (i % 10 >= Math.floor(this.leds - radius))
         ? .1 : 1)
        /*/this.matrix = this.matrix.map((val, i) =>
          (i >= this.value - obj.value) ? .1 : val)
        this.value -= obj.value//*/
        break;
    }
  }
  draw() {
    const _drawPixel = (x, y, alpha) => {
      const rect = new paper.Shape.Rectangle(
          y * this.scale + this.opts.y * (this.leds + 1) * this.scale
        , x * this.scale + this.opts.x * (this.leds + 1) * this.scale
        , this.scale - 1, this.scale - 1)
      rect.fillColor = `rgba(255,255,255,${alpha})`
    }
    this.matrix.map((alpha, i) =>
      _drawPixel(Math.floor(i / this.leds), i % this.leds, alpha)
    )
  }
}


 const canvas = document.getElementById('canvas')
 paper.setup(canvas)

const WIDTH = 5
    , HEIGHT = 5

const network = new Network(paper)
for (let x = 0; x < WIDTH; x++) {
  for (let y = 0; y < HEIGHT; y++) {
    const opts = { x, y }
    network.addNode(opts)
  }
}
network.draw()

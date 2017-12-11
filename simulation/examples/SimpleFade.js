/**
 * SimpleFade.js
 *
 * Basic example of a node implementation.
 */

'use strict'

const Node = require('../node')
const helpers = require('../helpers')

class SimpleFade extends Node {

  constructor() {
    super(...arguments)

    this.identity.bank = 0

    this.events.on('reset', this.onReset.bind(this))
    this.events.on('receive', this.onReceive.bind(this))
    this.events.on('spread', this.onSpread.bind(this))
    this.events.on('send', this.onSend.bind(this))
  }

  onReceive(data) {
    this.identity.bank += data.value
    this.log(`received ${data.value} currency`)
    this.update()
  }

  onSend(data) {
    this.identity.bank -= data.value
    const obj = { unicast: data.target, value: data.value }
    this.sendTo(data.target, 'receive', obj)
    this.log(`sent ${data.target } ${data.value} currency`)
    this.update()
  }

  onReset(data) {
    this.identity.bank = 0
    this.log(`reset bank to 0`)
    this.update()
  }

  onSpread(data) {
    const value = this.identity.bank / this.identity.neighbours.length
    this.identity.neighbours.map(xy => this.sendTo(xy, 'receive', { value }))
    this.identity.bank = value
    this.update()
  }

}

module.exports = {
  nodes: helpers.generateRegularNodeList(5, 5, ['SimpleFade', __filename]),
  SimpleFade
}

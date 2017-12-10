/**
 * CenterFade.js
 *
 * Basic example of a node implementation.
 */

'use strict'

const Node = require('../node')
const helpers = require('../helpers')

class CenterFade extends Node {

  constructor() {
    super(...arguments)

    this.identity.bank = 0

    this.events.on('reset', this.onReset.bind(this))
    this.events.on('receive', this.onReceive.bind(this))
    this.events.on('spread', this.onSpread.bind(this))
  }

  onReceive(data) {
    this.identity.bank += data.value
    this.log(`received ${data.value} currency`)
    this.update()
  }

  onReset(data) {
    this.identity.bank = 0
    this.log(`reset bank to 0`)
  }

  onSpread(data) {
    const _spread = () => {
      const value = this.identity.bank / this.identity.neighbours.length + 1
      this.sendTo(neighbour, 'receive', { value })
    }
    this.identity.neighbours.map(_spread)
    this.identity.bank = value
    this.update()
  }

}

module.exports = {
  nodes: helpers.generateRegularNodeList(3, 3, ['CenterFade', __filename]),
  CenterFade
}

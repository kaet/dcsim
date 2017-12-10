/**
 * node.js
 *
 * Node behaviour implementation template. Extend this class to implement your
 * own behaviour. Default behaviour is to connect to the socket server and emit
 * a periodic update (interval defined by `this.interval`).
 */

'use strict'

const EventEmitter = require('events')
    , io = require('socket.io-client')

class Node {

  constructor(identity, server) {
    this.identity = identity
    this.events = new EventEmitter

    this.log(`new ${this.constructor.name} node at ${identity.self}`)

    this.io = io(server)
    this.io.on('connect', this._onConnect.bind(this))
    this.io.on('*', this._onReceive.bind(this))
  }

  log(msg) {
    process.send(msg)
  }

  send(type, data) {
    this.io.emit('*', Object.assign({ type }, data))
  }

  sendTo(unicast, type, data) {
    this.send(type, Object.assign({ unicast }, data))
  }

  update() {
    this.send('update', this.identity)
  }

  _onConnect() {
    setInterval(this.update.bind(this), 5000)
  }

  _onReceive(data) {
    if (data.unicast && `${data.unicast}` != `${this.identity.self}`) return
    this.events.emit(data.type, data)
  }

}

module.exports = Node

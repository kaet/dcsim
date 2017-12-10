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
    this.interval = 5000
    this.events = new EventEmitter

    this.log(`new ${this.constructor.name} node at ${identity.self}`)

    this.io = io(server)
    this.io.on('connect', this._onConnect.bind(this))
    this.io.on('*', this._onReceive.bind(this))
    this.io.on('disconnect', this._onDisconnect.bind(this))
  }

  log(msg) {
    process.send(msg)
  }

  send(type, data) {
    const obj = Object.assign({ type }, data)
    this.io.emit('*', obj)
  }

  sendTo(type, data, unicast) {
    const obj = Object.assign({ unicast }, data)
    this.send(type, obj)
  }

  update() {
    this.send('update', this.identity)
  }

  _onConnect() {
    this.log(`io connected`)
    setInterval(this.update.bind(this), this.interval)
  }

  _onDisconnect() {
    this.log(`io disconnected`)
  }

  _onReceive(data) {
    const unicast = data.unicast
    if (!!unicast && `${unicast}` != `${this.identity.self}`) {
      return
    }
    this.events.emit(data.type, data)
  }

}

module.exports = Node

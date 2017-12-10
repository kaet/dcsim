/**
 * child.js
 *
 * dcsim child process, spawned by `dcsim`. This file's sole purpose is to
 * autoload the node behaviour implementation. For defining node behaviour,
 * see the Node class (`node.js`), and example (`examples/CenterFade.js`)
 * for assigning behaviour to specific nodes.
 */

'use strict'

const path = require('path')

const createNode = identity => {
  const [className, classPath] = identity.implementation

  const behaviour = require(path.resolve(classPath))
  new behaviour[className](identity, 'http://localhost:3008')
}
process.on('message', createNode)

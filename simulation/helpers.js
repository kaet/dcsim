/**
 * helpers.js
 *
 * Helper functions for miscellaneous simulator tasks, such as generating the
 * { nodes } list in configuration files.
 */

'use strict'

/*
 * Generates an x * y node list with neighbour data and identical behaviour for
 * all nodes.
 *
 * @param {int} x - Matrix width
 * @param {int} y - Matrix height
 * @param {Array} implementation - Behaviour definition for all nodes.
 *                               [0] {string} implementation class name
 *                               [1] {string} implementation class file path
 * @example generateRegularNodeList(5, 5, ['Node', '/path/to/node.js'])
 */
const generateRegularNodeList = (x, y, implementation) => {

  const _calculateNeighbours = (self, id) => {

    const neighbours = [ [0, -1], [0, 1], [-1, 0], [1, 0] ]
      .map(n => [n[0] + self[0], n[1] + self[1]])
      .filter(n => n[0] >= 0 & n[0] < x & n[1] >= 0 & n[1] < y)

    return { id, self, neighbours, implementation }
  }

  return Array(x).fill(0)
           .map((val, i) => Array(y).fill(0)
             .map((val, j) =>_calculateNeighbours([i, j], i + j * x + 1)))
}

module.exports = { generateRegularNodeList }

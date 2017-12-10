/**
 * CurrencyExchange.js
 *
 * Basic example of a node implementation.
 */

'use strict'

class CurrencyExchange extends NodeRepresentation {

  update(data) {
    this.identity = data

    const _update = (x, y) => {
      return this.identity.bank / 100
    }
    this.leds = this.leds.map((arr, x) => arr.map((led, y) => _update(x, y)))
  }

}

# Decentralized Control Simulator

This project simulates a basic decentralized lighting system in Node.js.

## Installation

```
$ git clone https://github.com/kaet/dcsim.git
$ cd dcsim/simulation
$ npm install
```

## Usage

This simulator is run from the command line and takes a JS config file as input. An annotated example of the configuration and implementation format can be found in [`examples/CurrencyExchange.js`](https://github.com/kaet/dcsim/blob/master/examples/CurrencyExchange.js).

```
$ ./dcsim <input_file>
```
- `<input_file>` Path to the JS config file.

The simulator can then be viewed through the browser overview (see `overview/index.html`) and interacted with through the touch screen (see `interface/index.html`).

**Example**

```
$ ./dcsim examples/CurrencyExchange.js
```

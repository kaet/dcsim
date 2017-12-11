# Decentralized Control Simulator

This project simulates a basic decentralized lighting system in Node.js.

## Installation

```
$ git clone https://github.com/kaet/dcsim.git
$ cd dcsim/simulation
$ npm install
$ chmod +x dcsim
```

## Usage

This simulator is run from the command line and takes a JS config file as input. An annotated example of the configuration and implementation format can be found in [`simulation/examples/SimpleFade.js`](https://github.com/kaet/dcsim/blob/master/simulation/examples/SimpleFade.js).

```
$ ./dcsim <input_file>
```
- `<input_file>` Path to the JS config file.

The simulator can then be viewed through the browser overview (`overview/index.html`) and interacted with through the touch screen (`interface/index.html`). Note that animation behaviour should be defined in the corresponding front-end implementation (e.g., [`overview/examples/SimpleFade.js`](https://github.com/kaet/dcsim/blob/master/overview/examples/SimpleFade.js)).

**Example**

```
$ ./dcsim examples/SimpleFade.js
```

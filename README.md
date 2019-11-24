# Neural Network in JavaScript

Implementantion of a Perceptron neural network in JavaScript. It is a simple implementation that can serve as an example for learning, not for production use. It does not use GPU and the only activation function implemented is a `sigmoid` function.

For a ready to use implementation please refer to [BrainJS](https://github.com/BrainJS/brain.js)
## Installation
```
npm install --save vt-neural-network
```

## Usage 

```javascript
import { Network } from 'vt-neural-network'

// Define the layer structure
const layers = [
  2, // This is the input layer
  10, // Hidden layer 1
  10, // Hidden layer 2
  1 // Output
]

const network = new Network(layers)

// Start training
const numberOfIterations = 20000

// Training data for a "XOR" logic gate
const trainingData = [{
  input : [0,0],
  output: [0]
}, {
  input : [0,1],
  output: [1]
}, {
  input : [1,0],
  output: [1]
}, {
  input : [1,1],
  output: [0]
}]

for(var i = 0; i < numberOfIterations; i ++) {
  // Get a random training sample
  const trainingItem = trainingData[Math.floor((Math.random()*trainingData.length))]
  network.train(trainingItem.input, trainingItem.output);
}

// After training we can see if it works
// we call activate to set a input in the first layer
network.activate(trainingData[0].input)
const resultA = network.run()

network.activate(trainingData[1].input)
const resultB = network.run()

network.activate(trainingData[2].input)
const resultC = network.run()

network.activate(trainingData[3].input)
const resultD = network.run()
console.log('Expected 0 got', resultA[0])
console.log('Expected 1 got', resultB[0])
console.log('Expected 1 got', resultC[0])
console.log('Expected 0 got', resultD[0])

```

If you want to see other logic gates implementations, check the test folder.

## API

- `network.setLearningRate(0.3)`: Adjust the learning rate of the network,
- `network.toJSON()`: returns the structure of the network
- `network.layers`: contains the different layers of the network
  - `layer.neurons`: contains the different neurons on each layer
  

## How to develop the application?

```bash
npm install
npm run watch
# Open public/ directory in browser
```

## Remove generated directory

If you would like to remove `public/dist` directory (created by Webpack):

```bash
npm run clear
```

If you would like to remove `node_modules/` and remove `public/dist/`

```bash
npm run clear:all
```

## Count LOC (Lines of Code)

If you would like to know how many lines of code you write:

```bash
npm run count
```

## Analysis of bundle file weight

If you would like to check how much a bundle file weight:

```bash
npm run audit
```

## Information of interest

### Backpropagation
https://mattmazur.com/2015/03/17/a-step-by-step-backpropagation-example/

### Neural networks
https://scrimba.com/g/gneuralnetworks
https://franpapers.com/en/machine-learning-ai-en/2017-neural-network-implementation-in-javascript-by-an-example/
http://karpathy.github.io/neuralnets/

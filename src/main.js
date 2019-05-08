import Layer from './layer'
import Neuron from './neuron'
import Network from './network'
import Connection from './connection'

const createLayer = (numberOfNeurons) => {
  const neurons = []
  for (var j = 0; j < numberOfNeurons; j++) {
    const value = Math.random()
    const neuron = new Neuron(value)
    neurons.push(neuron)
  }

  return new Layer(neurons)
}

const connectLayers = (layers) => {
  for (var i = 0; i < layers.length; i++) {
    const layer = layers[i]
    if (i !== 0) {
      // It is not the first layer
      const prevLayer = layers[i - 1]
      // Get each neuron of this layer and connect to the prevLayer
      for (var j = 0; j < layer.neurons.length; j++) {
        const neuron = layer.neurons[j]

        for (var z = 0; z < prevLayer.neurons.length; z++) {
          const neuronInPreviousLayer = prevLayer.neurons[z]
          const connection = new Connection(neuronInPreviousLayer)
          neuron.addConnection(connection)
        }
      }
    }
  }

  return layers
}


const inputLayer = createLayer(2)
const hiddenLayers = [createLayer(16), createLayer(16)]
const outputLayer = createLayer(1)

// Reset bias of inputlayer 
inputLayer.neurons.forEach(n => n.setBias(0))

// Create the network
const network = new Network(connectLayers([inputLayer].concat(hiddenLayers).concat([outputLayer])))

const learningRate = 0.4

let resulta, resultb,resultc, resultd;

console.log('Training....')

for(var i = 0; i < 20000; i ++) {
  // 0,0 => 0
  network.activate([0,0]);
  resulta = network.propagate(learningRate, [0]);
  network.updateWeights()
  
  // 0,1 => 1
  network.activate([0,1]);
  resultb = network.propagate(learningRate, [1]);
  network.updateWeights()
  
  // 1,0 => 1
  network.activate([1,0]);
  resultc = network.propagate(learningRate, [1]);
  network.updateWeights()
  
  // 1,1 => 0
  network.activate([1,1]);
  resultd = network.propagate(learningRate, [0]);
  network.updateWeights()
}

console.log('Expected 0 got', resulta[0])
console.log('Expected 0 got', resultd[0])
console.log('Expected 1 got', resultb[0])
console.log('Expected 1 got', resultc[0])


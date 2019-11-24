import sigmoid from './sigmoid'
import Connection from './connection'
import Layer from './layer'

class Network {
  constructor(numberOfLayers) {
    this.layers = numberOfLayers.map((length, index) => {
      const layer = new Layer(length) 
      if (index !== 0 ) {
        layer.neurons.forEach(neuron => {
          neuron.setBias(neuron.getRandomBias())
        })
      }
      return layer
    })
    this.learningRate = 0.3  // multiply's against the input and the delta then adds to momentum
    this.momentum =  0.1       // multiply's against the specified "change" then adds to learning rate for change
    this.iterations = 0
    this.connectLayers()
  }

  toJSON() {
    return {
      learningRate: this.learningRate,
      iterations: this.iterations,
      layers: this.layers.map(l => l.toJSON())
    }
  }

  setLearningRate(value) {
    this.learningRate = value
  }

  setIterations(val) {
    this.iterations = val
  }

  connectLayers() {
    for (var layer = 1; layer < this.layers.length; layer++) {
      const thisLayer = this.layers[layer]
      const prevLayer = this.layers[layer - 1]
      for (var neuron = 0; neuron < prevLayer.neurons.length; neuron++) {
        for(var neuronInThisLayer = 0; neuronInThisLayer < thisLayer.neurons.length; neuronInThisLayer++) {
          const connection = new Connection(prevLayer.neurons[neuron], thisLayer.neurons[neuronInThisLayer])
          prevLayer.neurons[neuron].addOutputConnection(connection)
          thisLayer.neurons[neuronInThisLayer].addInputConnection(connection)
        }
      }
    }
  }

  // When training we will run this set of functions each time
  train(input, output) {
    this.activate(input)

    // Forward propagate
    this.runInputSigmoid()

    // backpropagate
    this.calculateDeltasSigmoid(output)
    this.adjustWeights()
    // console.log(this.layers.map(l => l.toJSON()))
    this.setIterations(this.iterations + 1)
  }

  activate(values) {
    this.layers[0].neurons.forEach((n, i) => {
      n.setOutput(values[i])
    })
  }

  run() {
    // For now we only use sigmoid function
    this.runInputSigmoid()
  }

  runInputSigmoid() {
    for (var layer = 1; layer < this.layers.length; layer++) {
      for (var neuron = 0; neuron < this.layers[layer].neurons.length; neuron++) {
        const bias = this.layers[layer].neurons[neuron].bias
        // For each neuron in this layer we compute its output value

        const connectionsValue = this.layers[layer].neurons[neuron].inputConnections.reduce((prev, conn)  => {
          const val = conn.weight * conn.from.output
          return prev + val
        }, 0) 

        this.layers[layer].neurons[neuron].setOutput(sigmoid(bias + connectionsValue))
      }
    }

    return this.layers[this.layers.length - 1].neurons.map(n => n.output)
  }

  calculateDeltasSigmoid(target) {
    for (let layer = this.layers.length - 1; layer >= 0; layer--) {
      const currentLayer = this.layers[layer]

      for (let neuron = 0; neuron < currentLayer.neurons.length; neuron++) {
        const currentNeuron = currentLayer.neurons[neuron]
        let output = currentNeuron.output;

        let error = 0;
        if (layer === this.layers.length -1 ) {
          // Is output layer
          error = target[neuron] - output;
          // console.log('calculate delta, error, last layer', error)
        }
        else {
          // Other than output layer
          for (let k = 0; k < currentNeuron.outputConnections.length; k++) {
            const currentConnection = currentNeuron.outputConnections[k]
            error += currentConnection.to.delta * currentConnection.weight
            // console.log('calculate delta, error, inner layer', error)
          }


        }
        currentNeuron.setError(error)
        currentNeuron.setDelta(error * output * (1 - output))
      }
    }
  }

  adjustWeights() {
    
    for (let layer = 1; layer <= this.layers.length -1; layer++) {
      const prevLayer = this.layers[layer - 1]
      const currentLayer = this.layers[layer]

      for (let neuron = 0; neuron < currentLayer.neurons.length; neuron++) {
         const currentNeuron = currentLayer.neurons[neuron]
         let delta = currentNeuron.delta
         
        for (let i = 0; i < currentNeuron.inputConnections.length; i++) {
          const currentConnection = currentNeuron.inputConnections[i]
          let change = currentConnection.change
         
          change = (this.learningRate * delta * currentConnection.from.output)
              + (this.momentum * change);
          
          currentConnection.setChange(change)
          currentConnection.setWeight(currentConnection.weight + change)
        }

        currentNeuron.setBias(currentNeuron.bias + (this.learningRate * delta))
       
      }
    }
  }

}

export default Network

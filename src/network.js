import sigmoid from './sigmoid'

// Calculating values
const computeNeuronValue = neuron => {
  if (neuron.connections.length === 0) {
    // Starting layer
    neuron.setOutput(neuron.value)
    return neuron.output  
  } else {
    // Go back to each connection and calcule its value
    const connectionsValue = neuron.connections.reduce((prev, conn)  => {
      // Improve can be done by not computing it if it has already been computed
      const val = conn.weight * computeNeuronValue(conn.from)
      return prev + val
    }, 0) 
    
    const value = sigmoid(connectionsValue + neuron.bias)
    neuron.setOutput(value)
    return neuron.output
  }
}

// Backtracking
const applyChangesToPreviousNeuron = (n, learningRate, totalChangeRequired, partialDerivativeOfTheLogisticFunction, error) => {
  
  const summatoryOfErrorInLayer = n.connections.reduce((prev, next) => {
    const errorOfConnection = totalChangeRequired * partialDerivativeOfTheLogisticFunction * next.weight
    return 0 + error
  }, 0 )

  const affectOfErrorInLayer = n.output * ( 1 - n.output)
  
  n.connections.forEach(c => {
    // how much does affect a change in the weight to the total
    const totalChangeOfWeightAffects = c.from.output * affectOfErrorInLayer  * summatoryOfErrorInLayer
    const newWeight = c.weight - (learningRate * totalChangeOfWeightAffects)
    c.setNextWeight(newWeight)

    applyChangesToPreviousNeuron(c.from, learningRate, totalChangeRequired , partialDerivativeOfTheLogisticFunction, error)
  })

}



const calculateMeanSquaredError = (target, value) => {
  return 0.5 * (Math.pow(target - value, 2))
}

class Network {
  constructor(layers) {
    this.layers = layers
  }

  activate(values) {
    this.layers[0].neurons.forEach((n, i) => {
      n.setValue(values[i])
    })
  }

  propagate(learningRate, expectedValue) {
    const outputLayer = this.layers[this.layers.length - 1]
    
    // Calculate the result of each neuron
    outputLayer.neurons.forEach((n) => computeNeuronValue(n))

    // Back propagate
    const output = outputLayer.neurons.map((n, i) => {
      const result = n.output
      const error = calculateMeanSquaredError(expectedValue[i], result)
      const totalChangeRequired = -(expectedValue[i] - result)
      const partialDerivativeOfTheLogisticFunction = result * (1 - result)

      // Update neuron bias
      n.setBias(n.bias * learningRate * error)

      // Store error
      n.error = error

     // n.delta = n.output * partialDerivativeOfTheLogisticFunction * error

      n.connections.forEach(c => {
        // how much does affect a change in the weight to the total
        const totalChangeOfWeightAffects = c.from.output * partialDerivativeOfTheLogisticFunction  * totalChangeRequired
        const newWeight = c.weight - (learningRate * totalChangeOfWeightAffects)
        c.setNextWeight(newWeight)

        applyChangesToPreviousNeuron(c.from, learningRate, totalChangeRequired , partialDerivativeOfTheLogisticFunction, error)
      })

      return {
        result,
        error
      }
    })

    return output
  }

  updateWeights() {
    this.layers.forEach(l => {
      l.neurons.forEach(n => {
        n.connections.forEach(c => {
          c.applyUpdateOfWeight()
        })
      })
    })
  }
}

export default Network

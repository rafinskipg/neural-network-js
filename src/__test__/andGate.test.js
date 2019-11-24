import Network from '../network'

// Training data for a xor gate
const trainingData = [{
  input : [0,0],
  output: [0]
}, {
  input : [0,1],
  output: [0]
}, {
  input : [1,0],
  output: [0]
}, {
  input : [1,1],
  output: [1]
}]


describe('AND Gate', () => {
  let network

  beforeAll(done => {
    // Create the network
    network = new Network([2, 10, 10, 1])
    
    // Set a learning rate
    const learningRate = 0.3
    network.setLearningRate(learningRate)
    
    // Train the network
    for(var i = 0; i < 20000  ; i ++) {
      const trainingItem = trainingData[Math.floor((Math.random()*trainingData.length))]
      // Randomly train
      network.train(trainingItem.input, trainingItem.output);
    }

    done()
  })

  it('should return 0 for a [0,0] input', () => {
    network.activate([0, 0])
    const result = network.runInputSigmoid()
    expect(Math.round(result[0])).toEqual(0)
  })

  it('should return 0 for a [0,1] input', () => {
    network.activate([0, 1])
    const result = network.runInputSigmoid()
    expect(Math.round(result[0])).toEqual(0)
  })

  it('should return 0 for a [1,0] input', () => {
    network.activate([1, 0])
    const result = network.runInputSigmoid()
    expect(Math.round(result[0])).toEqual(0)
  })

  it('should return 1 for a [1,1] input', () => {
    network.activate([1, 1])
    const result = network.runInputSigmoid()
    expect(Math.round(result[0])).toEqual(1)
  })
})

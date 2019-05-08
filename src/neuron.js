
class Neuron {
  constructor(value) {
    this.value = value
    this.connections = []
    this.bias = this.getRandomBias()
    this.output = 0
  }

  getRandomBias() {
    const min = -3;
    const max = 3
    return Math.floor(Math.random() * (+max - +min)) +min; 
  }

  addConnection(connection) {
    this.connections.push(connection)
  }

  setValue(val) {
    this.value = val
  }

  setBias(val) {
    this.bias = val
  }

  setOutput(val) {
    this.output = val
  }
}

export default Neuron
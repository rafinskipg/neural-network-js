class Connection {
  constructor(from) {
    this.from = from
    this.weight = Math.random()
    this.nextWeight = 0
  }

  setNextWeight (w) {
    this.nextWeight = w
  }

  setWeight(w) {
    this.weight = w
  }

  applyUpdateOfWeight() {
    this.weight = this.nextWeight
  }
}

export default Connection
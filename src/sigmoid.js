function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

export default sigmoid
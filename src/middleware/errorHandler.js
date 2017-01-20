module.exports = log => (err, context) => {
  log.error(
    `Server error: ${err}
    Context: ${context}`)
}

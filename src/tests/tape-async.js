const test = require('tape')

const tapeasync = description => {
  return new Promise((resolve, reject) => {
    try {
      // test.onFinish(() => process.exit(0))
      test(description, resolve)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = tapeasync

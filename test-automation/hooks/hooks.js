const Promise = require('bluebird')
const { defineSupportCode } = require('cucumber')

defineSupportCode(({ Before, After }) => {
  Before(() => new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 500)
  }), (err) => {
    console.log('Caught an error before scenario:', err)
  })

  After(() => new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 500)
  }), (err) => {
    console.log('Caught an error during scenario:', err)
  })
})

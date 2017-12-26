const Promise = require('bluebird')
const { defineSupportCode } = require('cucumber')
const Commons = require('../steps/common-steps')

const dataMap = Commons.dataMap

defineSupportCode(({ Before, After }) => {
  Before(() => new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 500)
  }), (err) => {
    console.log('Caught an error before scenario:', err)
  })

  After(() => new Promise((resolve) => {
    dataMap.clear()
    setTimeout(() => {
      resolve()
    }, 500)
  }), (err) => {
    console.log('Caught an error during scenario:', err)
  })
})

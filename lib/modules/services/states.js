const Mongoose = require('mongoose')
const State = Mongoose.model('State')

const getStates = (callback) => {
  State.find({})
    .sort({ name: 1 })
    .exec()
    .then((states) => callback(null, states))
    .catch((err) => callback(err, null))
}

module.exports = [
  {
    name: 'services.states.list',
    method: getStates
  }
]

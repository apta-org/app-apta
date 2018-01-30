const Mongoose = require('mongoose')
const UniqueValidator = require('mongoose-unique-validator')

const Schema = Mongoose.Schema

const StateSchema = new Schema({
  name: {
    type: String,
    trim: true,
    lowerCase: false,
    unique: true,
    index: true,
    required: 'State name is required'
  },
  districts: [{ type: String }]
}, { timestamps: true })

StateSchema.plugin(UniqueValidator, { message: 'is already taken' })

StateSchema.methods.toJSON = (state) => {
  return {
    id: state._id,
    name: state.name,
    districts: state.districts
  }
}

module.exports = Mongoose.model('State', StateSchema)

const Mongoose = require('mongoose')
const UniqueValidator = require('mongoose-unique-validator')

const Schema = Mongoose.Schema

const StudentSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    lowerCase: false,
    unique: false,
    index: true,
    required: 'Student firstName is required'
  },
  lastName: {
    type: String,
    trim: true,
    lowerCase: false,
    unique: false,
    index: true,
    required: 'Student lastName is required'
  },
  email: {
    type: String,
    trim: true,
    lowerCase: false,
    unique: true,
    index: true,
    required: 'Student email is required'
  },
  dateOfBirth: {
    type: Date,
    trim: false,
    unique: false,
    index: false
  },
  placeOfBirth: {
    type: String,
    trim: true,
    lowerCase: false,
    unique: false,
    index: false
  },
  phonePrimary: {
    type: String,
    trim: true,
    unique: false,
    index: false
  },
  phoneSecondary: {
    type: String,
    trim: true,
    unique: false,
    index: false
  },
  addressLane1: {
    type: String,
    trim: true,
    lowerCase: false,
    unique: false,
    index: false
  },
  addressLane2: {
    type: String,
    trim: true,
    lowerCase: false,
    unique: false,
    index: false
  },
  city: {
    type: String,
    trim: true,
    lowerCase: false,
    unique: false,
    index: false
  },
  district: {
    type: String,
    trim: true,
    lowerCase: false,
    unique: false,
    index: false
  },
  state: {
    type: String,
    trim: true,
    lowerCase: false,
    unique: false,
    index: false
  },
  pinCode: {
    type: String,
    trim: true,
    lowerCase: false,
    unique: false,
    index: false
  }
}, { timestamps: true })

StudentSchema.plugin(UniqueValidator, { message: 'is already taken' })

StudentSchema.method.toJSON = (student) => {
  return {
    id: student._id,
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    dateOfBirth: student.dateOfBirth,
    placeOfBirth: student.placeOfBirth,
    phonePrimary: student.phonePrimary,
    phoneSecondary: student.phoneSecondary,
    addressLane1: student.addressLane1,
    addressLane2: student.addressLane2,
    city: student.city,
    district: student.district,
    state: student.state,
    pinCode: student.pinCode
  }
}

module.exports = Mongoose.model('Student', StudentSchema)

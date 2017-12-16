const Mongoose = require('mongoose')
const UniqueValidator = require('mongoose-unique-validator')

const Schema = Mongoose.Schema

const CourseSchema = new Schema({
  name: {
    type: String,
    trim: true,
    lowerCase: false,
    unique: true,
    index: true,
    required: 'Course name is required'
  },
  description: {
    type: String,
    trim: true,
    lowerCase: false,
    unique: true,
    index: false,
    required: 'Course description is required'
  },
  length: {
    type: Number,
    unique: false,
    index: false,
    required: 'Course length is required'
  },
  rank: {
    type: Number,
    unique: true,
    index: false,
    required: 'Course rank is required'
  },
  minimumMarks: {
    type: Number,
    unique: false,
    index: false,
    required: 'Course minimumMarks is required'
  },
  allowedForProgram: {
    type: Boolean,
    unique: false,
    index: false,
    required: 'Course allowedForProgram is required'
  }
}, { timestamps: true })

CourseSchema.plugin(UniqueValidator, { message: 'is already taken' })

CourseSchema.methods.toJSON = (course) => {
  return {
    id: course._id,
    name: course.name,
    description: course.description,
    length: course.length,
    rank: course.rank,
    minimumMarks: course.minimumMarks,
    allowedForProgram: course.allowedForProgram
  }
}

module.exports = Mongoose.model('Course', CourseSchema)

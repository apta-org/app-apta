import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

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
  }
}, { timestamps: true })

CourseSchema.plugin(uniqueValidator, { message: 'is already taken' })

CourseSchema.methods.toJSON = (course) => {
  return {
    id: course._id,
    name: course.name,
    description: course.description,
    length: course.length,
    rank: course.rank
  }
}

export default mongoose.model('Course', CourseSchema)

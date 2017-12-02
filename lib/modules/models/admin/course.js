import mongoose from 'mongoose'

const Schema = mongoose.Schema

const courseSchema = new Schema({
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
})

export default mongoose.model('Course', courseSchema)

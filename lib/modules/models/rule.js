const Mongoose = require('mongoose')
const UniqueValidator = require('mongoose-unique-validator')

const Schema = Mongoose.Schema

const RuleSchema = new Schema({
  course: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  name: {
    type: String,
    trim: true,
    unique: false,
    required: 'Rule name is required'
  },
  academicYear: {
    type: Number,
    unique: false,
    required: 'Rule academicYear is required'
  },
  requiredCourseDescription: {
    type: String,
    trim: true,
    unique: false,
    required: 'Rule requiredCourseDescription is required'
  },
  order: {
    type: Number,
    unique: false,
    required: 'Rule order is required'
  },
  qualifiedMarks: {
    type: Number,
    unique: false,
    required: 'Rule qualifiedMarks is required'
  }
}, { timestamps: true })

RuleSchema.index({ 'course': 1, 'academicYear': 1, 'requiredCourseDescription': 1 }, { unique: true })

RuleSchema.plugin(UniqueValidator, { message: 'is already taken' })

RuleSchema.methods.toJSONWithoutCourse = (rule) => {
  return {
    id: rule._id,
    course: rule.course,
    name: rule.name,
    academicYear: rule.academicYear,
    requiredCourseDescription: rule.requiredCourseDescription,
    qualifiedMarks: rule.qualifiedMarks,
    order: rule.order
  }
}

RuleSchema.methods.toJSON = (course, rule) => {
  return {
    id: rule._id,
    course: course._id,
    name: rule.name,
    requiredCourseDescription: rule.requiredCourseDescription,
    qualifiedMarks: rule.qualifiedMarks
  }
}

module.exports = Mongoose.model('Rule', RuleSchema)

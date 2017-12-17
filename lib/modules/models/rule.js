const Mongoose = require('mongoose')
const UniqueValidator = require('mongoose-unique-validator')

const Schema = Mongoose.Schema

const RuleSchema = new Schema({
  course: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Course'
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
  }
}, { timestamps: true })

RuleSchema.index({ 'course': 1, 'academicYear': 1, 'requiredCourseDescription': 1 }, { unique: true })

RuleSchema.plugin(UniqueValidator, { message: 'is already taken' })

RuleSchema.methods.toJSON = (rule) => {
  return {
    id: rule._id,
    name: rule.course.name,
    academicYear: rule.academicYear,
    requiredCourseDescription: rule.requiredCourseDescription,
    order: rule.order
  }
}

module.exports = Mongoose.model('Rule', RuleSchema)

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
  },
  enabled: {
    type: Boolean,
    unique: false,
    required: 'Rule enabled is required'
  }
}, { timestamps: true })

RuleSchema.index({ 'academicYear': 1, 'requiredCourseDescription': 1, 'order': 1 }, { unique: true })

RuleSchema.plugin(UniqueValidator, { message: 'is already taken' })

RuleSchema.methods.toJSONFor = (rule, includeAllProperties) => {
  const jsonObject = {
    id: rule._id,
    course: rule.course,
    name: rule.name,
    requiredCourseDescription: rule.requiredCourseDescription,
    academicYear: rule.academicYear,
    qualifiedMarks: rule.qualifiedMarks
  }
  if (includeAllProperties) {
    jsonObject.order = rule.order
    jsonObject.enabled = rule.enabled
  }
  return jsonObject
}

module.exports = Mongoose.model('Rule', RuleSchema)

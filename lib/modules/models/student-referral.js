const Mongoose = require('mongoose')
const Crypto = require('crypto')
const RandomString = require('randomstring')
const UniqueValidator = require('mongoose-unique-validator')

const Schema = Mongoose.Schema

const StudentReferralSchema = new Schema({
  students: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  memberFirstName: {
    type: String,
    trim: true,
    uppercase: true,
    unique: false,
    index: true,
    required: 'Member firstName is required'
  },
  memberLastName: {
    type: String,
    trim: true,
    uppercase: true,
    unique: false,
    index: true,
    required: 'Member lastName is required'
  },
  memberPhone: {
    type: String,
    trim: true,
    unique: false,
    index: false,
    required: 'Member phone is required'
  },
  memberEmail: {
    type: String,
    trim: true,
    lowercase: true,
    unique: false,
    index: false,
    required: 'Member email is required'
  },
  asepYear: {
    type: String,
    trim: true,
    unique: false,
    index: false,
    required: 'ASEP year is required'
  },
  salt: String,
  secret: String,
  hash: String
}, { timestamps: true })

StudentReferralSchema.index({ 'students': 1, 'memberFirstName': 1, 'memberLastName': 1, 'asepYear': 1 }, { unique: true })

StudentReferralSchema.plugin(UniqueValidator, { message: 'is already taken' })

StudentReferralSchema.methods.setHash = (studentReferral) => {
  studentReferral.salt = Crypto.randomBytes(16).toString('hex')
  studentReferral.secret = RandomString.generate({
    length: 12,
    charset: 'alphabetic'
  })
  studentReferral.hash = Crypto.pbkdf2Sync(studentReferral.secret, studentReferral.salt, 10000, 12, 'sha512').toString('hex')
}

StudentReferralSchema.methods.validateHash = (inputHash, studentReferral) => {
  const hash = Crypto.pbkdf2Sync(studentReferral.secret, studentReferral.salt, 10000, 12, 'sha512').toString('hex')
  return inputHash === hash
}

const constructStudents = (students) => {
  let studentList = []
  students.forEach((student) => {
    studentList.push(student.toJSON(student))
  })
  return studentList
}

StudentReferralSchema.methods.toJSON = (studentReferral) => {
  return {
    id: studentReferral._id,
    memberFirstName: studentReferral.memberFirstName,
    memberLastName: studentReferral.memberLastName,
    memberEmail: studentReferral.memberEmail,
    memberPhone: studentReferral.memberPhone,
    asepYear: studentReferral.asepYear,
    students: constructStudents(studentReferral.students)
  }
}

StudentReferralSchema.methods.toHash = (studentReferral) => {
  return {
    hash: studentReferral.hash,
    memberEmail: studentReferral.memberEmail,
    studentEmail: studentReferral.students[0].email
  }
}

module.exports = Mongoose.model('StudentReferral', StudentReferralSchema)

const Mongoose = require('mongoose')
const Student = Mongoose.model('Student')
const StudentReferral = Mongoose.model('StudentReferral')

const findReferralById = (id, callback) => {
  StudentReferral.findOne({ _id: id })
    .populate('students')
    .exec()
    .then((student) => callback(null, student))
    .catch((err) => callback(err, null))
}

const findReferralByStudentEmailAndYear = (student, year, callback) => {
  StudentReferral.findOne({ students: [ student._id ], asepYear: year })
    .populate('students')
    .exec()
    .then((studentReferral) => callback(null, studentReferral))
    .catch((err) => callback(err, null))
}

const findReferralsByYear = (year, callback) => {
  StudentReferral.find({ asepYear: year })
    .sort({ memberFirstName: 1, memberLastName: 1 })
    .populate('students')
    .exec()
    .then((studentReferrals) => callback(null, studentReferrals))
    .catch((err) => callback(err, null))
}

const findReferralsByMemberEmailAndYear = (email, year, callback) => {
  StudentReferral.find({ memberEmail: email, asepYear: year })
    .sort({ memberFirstName: 1, memberLastName: 1 })
    .populate('students')
    .exec()
    .then((studentReferrals) => callback(null, studentReferrals))
    .catch((err) => callback(err, null))
}

const findReferralsByMemberAndYear = (memberFirstName, memberLastName, year, callback) => {
  const query = {
    memberFirstName: { $regex: new RegExp(`.*${memberFirstName}.*`, 'i') },
    memberLastName: { $regex: new RegExp(`.*${memberLastName}.*`, 'i') },
    asepYear: year
  }

  StudentReferral.find(query)
    .sort({ memberFirstName: 1, memberLastName: 1 })
    .populate('students')
    .exec()
    .then((studentReferrals) => callback(null, studentReferrals))
    .catch((err) => callback(err, null))
}

const createReferral = (payload, callback) => {
  const studentReferral = new StudentReferral(Object.assign(payload))
  studentReferral.setHash(studentReferral)
  studentReferral.save((err, savedStudentReferral) => {
    if (err) {
      return callback(err, null)
    }
    return callback(null, savedStudentReferral)
  })
}

const createStudentReferral = (payload, callback) => {
  const studentPayload = {
    firstName: payload.studentFirstName,
    lastName: payload.studentLastName,
    email: payload.studentEmail
  }

  const referralPayload = {
    memberFirstName: payload.memberFirstName,
    memberLastName: payload.memberLastName,
    memberPhone: payload.memberPhone,
    memberEmail: payload.memberEmail,
    asepYear: payload.asepYear
  }

  const student = new Student(Object.assign(studentPayload))
  const studentReferral = new StudentReferral(Object.assign(referralPayload))

  student.save((err, savedStudent) => {
    if (err) {
      return callback(err, null)
    }
    studentReferral.students = [savedStudent]
    studentReferral.setHash(studentReferral)
    studentReferral.save((err, savedStudentReferral) => {
      if (err) {
        // If an error happens during saving referral data, remove the student saved
        savedStudent.remove()
        return callback(err, null)
      }
      return callback(null, savedStudentReferral)
    })
  })
}

module.exports = [
  {
    name: 'services.studentreferrals.findReferralById',
    method: findReferralById
  },
  {
    name: 'services.studentreferrals.findReferralByStudentEmailAndYear',
    method: findReferralByStudentEmailAndYear
  },
  {
    name: 'services.studentreferrals.findReferralsByYear',
    method: findReferralsByYear
  },
  {
    name: 'services.studentreferrals.findReferralsByMemberEmailAndYear',
    method: findReferralsByMemberEmailAndYear
  },
  {
    name: 'services.studentreferrals.findReferralsByMemberAndYear',
    method: findReferralsByMemberAndYear
  },
  {
    name: 'services.studentreferrals.createStudentReferral',
    method: createStudentReferral
  },
  {
    name: 'services.studentreferrals.createReferral',
    method: createReferral
  }
]

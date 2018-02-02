const Mongoose = require('mongoose')
const Student = Mongoose.model('Student')

const buildLocationQueryParameters = (queryParams) => {
  const parameters = {}

  if (queryParams.city) {
    parameters.city = { $regex: new RegExp(queryParams.city, 'i') }
  }

  if (queryParams.district) {
    parameters.district = { $regex: new RegExp(queryParams.district, 'i') }
  }

  if (queryParams.state) {
    parameters.state = { $regex: new RegExp(queryParams.state, 'i') }
  }

  if (queryParams.pinCode) {
    parameters.pinCode = queryParams.pinCode
  }

  return parameters
}

const findStudentById = (id, callback) => {
  Student.findOne({ _id: id })
    .exec()
    .then((student) => callback(null, student))
    .catch((err) => callback(err, null))
}

const findStudentByEMail = (emailId, callback) => {
  Student.findOne({ email: { $regex: new RegExp(emailId, 'i') } })
    .exec()
    .then((student) => callback(null, student))
    .catch((err) => callback(err, null))
}

const findStudentByName = (fName, lName, callback) => {
  Student.findOne({ firstName: fName, lastName: lName })
    .exec()
    .then((student) => callback(null, student))
    .catch((err) => callback(err, null))
}

const findStudentsByFirstName = (fName, callback) => {
  Student.find({ firstName: { $regex: new RegExp(`.*${fName}.*`, 'i') } })
    .exec()
    .then((students) => callback(null, students))
    .catch((err) => callback(err, null))
}

const findStudentsByLastName = (lName, callback) => {
  Student.find({ lastName: { $regex: new RegExp(`.*${lName}.*`, 'i') } })
    .exec()
    .then((students) => callback(null, students))
    .catch((err) => callback(err, null))
}

const findStudentsByPhone = (phone, callback) => {
  Student.find({ $or: [{ phonePrimary: phone }, { phoneSecondary: phone }] })
    .exec()
    .then((students) => callback(null, students))
    .catch((err) => callback(err, null))
}

const findStudentsByLocation = (queryParams, callback) => {
  Student.find(buildLocationQueryParameters(queryParams))
    .exec()
    .then((students) => callback(null, students))
    .catch((err) => callback(err, null))
}

const createStudent = (payload, callback) => {
  const student = new Student(Object.assign(payload))
  student.save((err, savedStudent) => {
    if (err) {
      return callback(err, null)
    }
    return callback(null, savedStudent)
  })
}

const updateStudent = (student, payload, callback) => {
  let studentToBeUpdated = new Student(student)
  studentToBeUpdated = Object.assign(studentToBeUpdated, payload)
  studentToBeUpdated.save((err, updatedStudent) => {
    if (err) {
      return callback(err, null)
    }
    return callback(null, updatedStudent)
  })
}

module.exports = [
  {
    name: 'services.students.findById',
    method: findStudentById
  },
  {
    name: 'services.students.findByEmail',
    method: findStudentByEMail
  },
  {
    name: 'services.students.findByName',
    method: findStudentByName
  },
  {
    name: 'services.students.findByFirstName',
    method: findStudentsByFirstName
  },
  {
    name: 'services.students.findByLastName',
    method: findStudentsByLastName
  },
  {
    name: 'services.students.findByPhone',
    method: findStudentsByPhone
  },
  {
    name: 'services.students.findByLocation',
    method: findStudentsByLocation
  },
  {
    name: 'services.students.create',
    method: createStudent
  },
  {
    name: 'services.students.update',
    method: updateStudent
  }
]

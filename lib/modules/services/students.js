const Mongoose = require('mongoose')
const Student = Mongoose.model('Student')

const buildLocationQueryParameters = (queryParams) => {
  const parameters = {}

  if (queryParams.city) {
    parameters.city = queryParams.city
  }

  if (queryParams.district) {
    parameters.district = queryParams.district
  }

  if (queryParams.state) {
    parameters.state = queryParams.state
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
  Student.findOne({ email: emailId })
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

const findStudentsByFistName = (fName, callback) => {
  Student.find({ firstName: fName })
    .exec()
    .then((students) => callback(null, students))
    .catch((err) => callback(err, null))
}

const findStudentsByLastName = (lName, callback) => {
  Student.find({ lastName: lName })
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
    method: findStudentsByFistName
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

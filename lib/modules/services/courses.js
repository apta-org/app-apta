const Mongoose = require('mongoose')

const Course = Mongoose.model('Course')

const findCourse = (id, callback) => {
  Course.findOne({ _id: id })
    .exec()
    .then((course) => callback(null, course))
    .catch((err) => callback(err, null))
}

const getCourses = (callback) => {
  Course.find({})
    .sort({ rank: 1 })
    .select('name description length rank')
    .exec()
    .then((courses) => callback(null, courses))
    .catch((err) => callback(err, null))
}

const createCourse = (payload, callback) => {
  const course = new Course(Object.assign(payload))
  course.save((err, savedCourse) => {
    if (err) {
      return callback(err, null)
    }
    return callback(null, savedCourse)
  })
}

const deleteCourse = (course, callback) => {
  const courseToBeDeleted = new Course(Object.assign(course))
  courseToBeDeleted.remove((err, removedCourse) => {
    if (err) {
      return callback(err, null)
    }
    return callback(null, removedCourse)
  })
}

const updateCourse = (course, payload, callback) => {
  let courseToBeUpdated = new Course(course)
  courseToBeUpdated = Object.assign(courseToBeUpdated, payload)
  courseToBeUpdated.save((err, updatedCourse) => {
    if (err) {
      return callback(err, null)
    }
    return callback(null, updatedCourse)
  })
}

module.exports = [
  {
    name: 'services.courses.findById',
    method: findCourse
  },
  {
    name: 'services.courses.list',
    method: getCourses
  },
  {
    name: 'services.courses.create',
    method: createCourse
  },
  {
    name: 'services.courses.delete',
    method: deleteCourse
  },
  {
    name: 'services.courses.update',
    method: updateCourse
  }
]

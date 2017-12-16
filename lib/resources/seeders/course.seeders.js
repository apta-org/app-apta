const { Seeder } = require('mongoose-data-seed')
const Course = require('../../modules/models/course')

const courses = [
  {
    name: 'SSC',
    description: 'Secondary School Certificate',
    length: 1,
    rank: 1,
    minimumMarks: 70,
    allowedForProgram: false
  },
  {
    name: 'Inter',
    description: 'Intermediate',
    length: 2,
    rank: 2,
    minimumMarks: 70,
    allowedForProgram: true
  },
  {
    name: 'DA',
    description: 'Diploma in Agriculture',
    length: 2,
    rank: 3,
    minimumMarks: 70,
    allowedForProgram: true
  },
  {
    name: 'Polytechnic',
    description: 'Technical Education',
    length: 3,
    rank: 4,
    minimumMarks: 70,
    allowedForProgram: true
  },
  {
    name: 'PUC',
    description: 'Pre University Course',
    length: 2,
    rank: 5,
    minimumMarks: 70,
    allowedForProgram: true
  },
  {
    name: 'BA',
    description: 'Bachelor of Administration',
    length: 3,
    rank: 6,
    minimumMarks: 70,
    allowedForProgram: true
  },
  {
    name: 'BBA',
    description: 'Bachelor of Business Administration',
    length: 3,
    rank: 7,
    minimumMarks: 70,
    allowedForProgram: true
  },
  {
    name: 'BBM',
    description: 'Bachelor of Business Management',
    length: 3,
    rank: 8,
    minimumMarks: 70,
    allowedForProgram: true
  },
  {
    name: 'BCom',
    description: 'Bachelor of Commerce',
    length: 3,
    rank: 9,
    minimumMarks: 70,
    allowedForProgram: true
  },
  {
    name: 'BDS',
    description: 'Bachelor of Dental Science',
    length: 5,
    rank: 10,
    minimumMarks: 60,
    allowedForProgram: true
  },
  {
    name: 'BE',
    description: 'Bachelor of Economics',
    length: 3,
    rank: 11,
    minimumMarks: 70,
    allowedForProgram: true
  },
  {
    name: 'MBBS',
    description: 'Bachelor of Medicine/Bachelor of Surgery',
    length: 5,
    rank: 12,
    minimumMarks: 60,
    allowedForProgram: true
  },
  {
    name: 'BPharmacy',
    description: 'Bachelor of Pharmacy',
    length: 4,
    rank: 13,
    minimumMarks: 70,
    allowedForProgram: true
  },
  {
    name: 'BPT',
    description: 'Bachelor of Physical Therapy',
    length: 4.5,
    rank: 14,
    minimumMarks: 60,
    allowedForProgram: true
  },
  {
    name: 'BSc',
    description: 'Bachelor of Science',
    length: 3,
    rank: 15,
    minimumMarks: 70,
    allowedForProgram: true
  },
  {
    name: 'AgBSc',
    description: 'Bachelor of Science in Agriculture',
    length: 4,
    rank: 16,
    minimumMarks: 70,
    allowedForProgram: true
  },
  {
    name: 'BTech',
    description: 'Bachelor of Technology',
    length: 4,
    rank: 17,
    minimumMarks: 70,
    allowedForProgram: true
  },
  {
    name: 'MA',
    description: 'Master of Administration',
    length: 2,
    rank: 18,
    minimumMarks: 70,
    allowedForProgram: true
  },
  {
    name: 'MBA',
    description: 'Master of Business Administration',
    length: 2,
    rank: 19,
    minimumMarks: 60,
    allowedForProgram: true
  },
  {
    name: 'MCom',
    description: 'Master of Commerce',
    length: 2,
    rank: 20,
    minimumMarks: 70,
    allowedForProgram: true
  },
  {
    name: 'MCA',
    description: 'Master of Computer Applications',
    length: 3,
    rank: 21,
    minimumMarks: 70,
    allowedForProgram: true
  },
  {
    name: 'ME',
    description: 'Master of Economics',
    length: 2,
    rank: 22,
    minimumMarks: 70,
    allowedForProgram: true
  },
  {
    name: 'MSc',
    description: 'Master of Science',
    length: 2,
    rank: 23,
    minimumMarks: 70,
    allowedForProgram: true
  },
  {
    name: 'CA',
    description: 'Chartered Accountancy',
    length: 3,
    rank: 24,
    minimumMarks: 35,
    allowedForProgram: true
  },
  {
    name: 'ICWAI',
    description: 'Institute of Cost & Works Accounts of India',
    length: 1,
    rank: 25,
    minimumMarks: 35,
    allowedForProgram: true
  }
]

const CourseSeeder = Seeder.extend({
  shouldRun: () => {
    return Course.count().exec().then((count) => count === 0)
  },
  run: () => {
    return Course.create(courses)
  }
})

module.exports = CourseSeeder

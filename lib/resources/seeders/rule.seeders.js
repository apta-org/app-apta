const Mongoose = require('mongoose')
const { Seeder } = require('mongoose-data-seed')
const Rule = require('../../modules/models/rule')
const Course = require('../../modules/models/course')

Mongoose.Promise = require('bluebird')

const finalRules = []

const rules = [
  {
    name: 'Inter',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 1,
    enabled: true
  },
  {
    name: 'Inter',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Inter 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'Inter',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 2,
    enabled: true
  },
  {
    name: 'DA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 1,
    enabled: true
  },
  {
    name: 'DA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Diploma in Agriculture 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'DA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 2,
    enabled: true
  },
  {
    name: 'Polytechnic',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 1,
    enabled: true
  },
  {
    name: 'Polytechnic',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Polytechnic 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'Polytechnic',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 2,
    enabled: true
  },
  {
    name: 'Polytechnic',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Polytechnic 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'Polytechnic',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Polytechnic 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'Polytechnic',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'SSC',
    order: 3,
    enabled: true
  },
  {
    name: 'PUC',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 1,
    enabled: true
  },
  {
    name: 'PUC',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Pre University Course 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'PUC',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 2,
    enabled: true
  },
  {
    name: 'BA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 3,
    enabled: true
  },
  {
    name: 'BA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Administration 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 4,
    enabled: true
  },
  {
    name: 'BA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor of Administration 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor of Administration 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 4,
    enabled: true
  },
  {
    name: 'BA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'SSC',
    order: 5,
    enabled: true
  },
  {
    name: 'BBA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BBA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BBA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 3,
    enabled: true
  },
  {
    name: 'BBA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Business Administration 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BBA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BBA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BBA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 4,
    enabled: true
  },
  {
    name: 'BBA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor of Business Administration 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BBA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor of Business Administration 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BBA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BBA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 4,
    enabled: true
  },
  {
    name: 'BBA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'SSC',
    order: 4,
    enabled: true
  },
  {
    name: 'BBM',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BBM',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BBM',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 3,
    enabled: true
  },
  {
    name: 'BBM',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Business Management 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BBM',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BBM',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BBM',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 4,
    enabled: true
  },
  {
    name: 'BBM',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor of Business Management 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BBM',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor of Business Management 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BBM',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BBM',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 4,
    enabled: true
  },
  {
    name: 'BBM',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'SSC',
    order: 5,
    enabled: true
  },
  {
    name: 'BCom',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BCom',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BCom',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 3,
    enabled: true
  },
  {
    name: 'BCom',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Commerce 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BCom',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BCom',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BCom',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 4,
    enabled: true
  },
  {
    name: 'BCom',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor of Commerce 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BCom',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor of Commerce 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BCom',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BCom',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BCom',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'SSC',
    order: 4,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 3,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Dental Science 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 4,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor of Dental Science 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor of Dental Science 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 4,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'SSC',
    order: 5,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Bachelor of Dental Science 3rd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Bachelor of Dental Science 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Bachelor of Dental Science 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 4,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 5,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'SSC',
    order: 6,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 5,
    requiredCourseDescription: 'Bachelor of Dental Science 4th Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 5,
    requiredCourseDescription: 'Bachelor of Dental Science 3rd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 5,
    requiredCourseDescription: 'Bachelor of Dental Science 2nd Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 5,
    requiredCourseDescription: 'Bachelor of Dental Science 1st Year',
    order: 4,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 5,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 5,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 5,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 6,
    enabled: true
  },
  {
    name: 'BDS',
    course: {},
    academicYear: 5,
    requiredCourseDescription: 'SSC',
    order: 7,
    enabled: true
  },
  {
    name: 'BE',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BE',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BE',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 3,
    enabled: true
  },
  {
    name: 'BE',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Economics 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BE',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BE',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BE',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 4,
    enabled: true
  },
  {
    name: 'BE',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor of Economics 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BE',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor of Economics 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BE',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BE',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 4,
    enabled: true
  },
  {
    name: 'BE',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'SSC',
    order: 5,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 3,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'MBBS 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 4,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'MBBS 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'MBBS 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 3,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 4,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'SSC',
    order: 5,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'MBBS 3rd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'MBBS 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'MBBS 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 4,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 5,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'SSC',
    order: 6,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 5,
    requiredCourseDescription: 'MBBS 4th Year',
    order: 1,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 5,
    requiredCourseDescription: 'MBBS 3rd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 5,
    requiredCourseDescription: 'MBBS 2nd Year',
    order: 3,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 5,
    requiredCourseDescription: 'MBBS 1st Year',
    order: 4,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 5,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 5,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 5,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 6,
    enabled: true
  },
  {
    name: 'MBBS',
    course: {},
    academicYear: 5,
    requiredCourseDescription: 'SSC',
    order: 7,
    enabled: true
  },
  {
    name: 'BPharmacy',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BPharmacy',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BPharmacy',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 3,
    enabled: true
  },
  {
    name: 'BPharmacy',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Pharmacy 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BPharmacy',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BPharmacy',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BPharmacy',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 4,
    enabled: true
  },
  {
    name: 'BPharmacy',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor of Pharmacy 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BPharmacy',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor of Pharmacy 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BPharmacy',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BPharmacy',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 4,
    enabled: true
  },
  {
    name: 'BPharmacy',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'SSC',
    order: 5,
    enabled: true
  },
  {
    name: 'BPharmacy',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Bachelor of Pharmacy 3rd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BPharmacy',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Bachelor of Pharmacy 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BPharmacy',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Bachelor of Pharmacy 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BPharmacy',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 4,
    enabled: true
  },
  {
    name: 'BPharmacy',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 5,
    enabled: true
  },
  {
    name: 'BPharmacy',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'SSC',
    order: 6,
    enabled: true
  },
  {
    name: 'BPT',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BPT',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BPT',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 3,
    enabled: true
  },
  {
    name: 'BPT',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Physical Therapy 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BPT',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BPT',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BPT',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 4,
    enabled: true
  },
  {
    name: 'BPT',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor of Physical Therapy 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BPT',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor of Physical Therapy 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BPT',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BPT',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 4,
    enabled: true
  },
  {
    name: 'BPT',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'SSC',
    order: 5,
    enabled: true
  },
  {
    name: 'BPT',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Bachelor of Physical Therapy 3rd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BPT',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Bachelor of Physical Therapy 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BPT',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Bachelor of Physical Therapy 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BPT',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 4,
    enabled: true
  },
  {
    name: 'BPT',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 5,
    enabled: true
  },
  {
    name: 'BPT',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'SSC',
    order: 6,
    enabled: true
  },
  {
    name: 'BSc',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BSc',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BSc',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 3,
    enabled: true
  },
  {
    name: 'BSc',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Science 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BSc',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BSc',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BSc',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 4,
    enabled: true
  },
  {
    name: 'BSc',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor of Science 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BSc',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor of Science 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BSc',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BSc',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 4,
    enabled: true
  },
  {
    name: 'BSc',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'SSC',
    order: 5,
    enabled: true
  },
  {
    name: 'AgBSc',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'AgBSc',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'AgBSc',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 3,
    enabled: true
  },
  {
    name: 'AgBSc',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Science in Agriculture 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'AgBSc',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'AgBSc',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'AgBSc',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 4,
    enabled: true
  },
  {
    name: 'AgBSc',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor of Science in Agriculture 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'AgBSc',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor of Science in Agriculture 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'AgBSc',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 3,
    enabled: true
  },
  {
    name: 'AgBSc',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 4,
    enabled: true
  },
  {
    name: 'AgBSc',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'SSC',
    order: 5,
    enabled: true
  },
  {
    name: 'AgBSc',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Bachelor of Science in Agriculture 3rd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'AgBSc',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Bachelor of Science in Agriculture 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'AgBSc',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Bachelor of Science in Agriculture 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'AgBSc',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 4,
    enabled: true
  },
  {
    name: 'AgBSc',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 5,
    enabled: true
  },
  {
    name: 'AgBSc',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'SSC',
    order: 6,
    enabled: true
  },
  {
    name: 'BTech',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BTech',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BTech',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 3,
    enabled: true
  },
  {
    name: 'BTech',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Technology 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BTech',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BTech',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BTech',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 4,
    enabled: true
  },
  {
    name: 'BTech',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor of Technology 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BTech',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor of Technology 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BTech',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BTech',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 4,
    enabled: true
  },
  {
    name: 'BTech',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'SSC',
    order: 5,
    enabled: true
  },
  {
    name: 'BTech',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Bachelor of Technology 3rd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'BTech',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Bachelor of Technology 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'BTech',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Bachelor of Technology 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'BTech',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 4,
    enabled: true
  },
  {
    name: 'BTech',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 5,
    enabled: true
  },
  {
    name: 'BTech',
    course: {},
    academicYear: 4,
    requiredCourseDescription: 'SSC',
    order: 6,
    enabled: true
  },
  {
    name: 'MA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Bachelor of Administration 3rd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'MA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Bachelor of Administration 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'MA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Bachelor of Administration 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'MA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 4,
    enabled: true
  },
  {
    name: 'MA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 5,
    enabled: true
  },
  {
    name: 'MA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 6,
    enabled: true
  },
  {
    name: 'MA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Master of Administration 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'MA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Administration 3rd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'MA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Administration 2nd Year',
    order: 3,
    enabled: true
  },
  {
    name: 'MA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Administration 1st Year',
    order: 4,
    enabled: true
  },
  {
    name: 'MA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 5,
    enabled: true
  },
  {
    name: 'MA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 6,
    enabled: true
  },
  {
    name: 'MA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 7,
    enabled: true
  },
  {
    name: 'MBA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Bachelor Degree 3rd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'MBA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Bachelor Degree 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'MBA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Bachelor Degree 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'MBA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 4,
    enabled: true
  },
  {
    name: 'MBA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 5,
    enabled: true
  },
  {
    name: 'MBA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 6,
    enabled: true
  },
  {
    name: 'MBA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Master of Business Administration 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'MBA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor Degree 3rd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'MBA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor Degree 2nd Year',
    order: 3,
    enabled: true
  },
  {
    name: 'MBA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor Degree 1st Year',
    order: 4,
    enabled: true
  },
  {
    name: 'MBA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 5,
    enabled: true
  },
  {
    name: 'MBA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 6,
    enabled: true
  },
  {
    name: 'MBA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 7,
    enabled: true
  },
  {
    name: 'MCom',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Bachelor of Commerce 3rd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'MCom',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Bachelor of Commerce 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'MCom',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Bachelor of Commerce 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'MCom',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 4,
    enabled: true
  },
  {
    name: 'MCom',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 5,
    enabled: true
  },
  {
    name: 'MCom',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 6,
    enabled: true
  },
  {
    name: 'MCom',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Master of Commerce 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'MCom',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Commerce 3rd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'MCom',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Commerce 2nd Year',
    order: 3,
    enabled: true
  },
  {
    name: 'MCom',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Commerce 1st Year',
    order: 4,
    enabled: true
  },
  {
    name: 'MCom',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 5,
    enabled: true
  },
  {
    name: 'MCom',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 6,
    enabled: true
  },
  {
    name: 'MCom',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 7,
    enabled: true
  },
  {
    name: 'MCA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Bachelor Degree 3rd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'MCA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Bachelor Degree 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'MCA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Bachelor Degree 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'MCA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 4,
    enabled: true
  },
  {
    name: 'MCA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 5,
    enabled: true
  },
  {
    name: 'MCA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 6,
    enabled: true
  },
  {
    name: 'MCA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Master of Computer Applications 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'MCA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor Degree 3rd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'MCA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor Degree 2nd Year',
    order: 3,
    enabled: true
  },
  {
    name: 'MCA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor Degree 1st Year',
    order: 4,
    enabled: true
  },
  {
    name: 'MCA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 5,
    enabled: true
  },
  {
    name: 'MCA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 6,
    enabled: true
  },
  {
    name: 'MCA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 7,
    enabled: true
  },
  {
    name: 'MCA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Master of Computer Applications 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'MCA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Master of Computer Applications 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'MCA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor Degree 3rd Year',
    order: 3,
    enabled: true
  },
  {
    name: 'MCA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor Degree 2nd Year',
    order: 4,
    enabled: true
  },
  {
    name: 'MCA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Bachelor Degree 1st Year',
    order: 5,
    enabled: true
  },
  {
    name: 'MCA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 6,
    enabled: true
  },
  {
    name: 'MCA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 7,
    enabled: true
  },
  {
    name: 'MCA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'SSC',
    order: 8,
    enabled: true
  },
  {
    name: 'ME',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Bachelor of Economics 3rd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'ME',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Bachelor of Economics 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'ME',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Bachelor of Economics 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'ME',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 4,
    enabled: true
  },
  {
    name: 'ME',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 5,
    enabled: true
  },
  {
    name: 'ME',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 6,
    enabled: true
  },
  {
    name: 'ME',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Master of Economics 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'ME',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Economics 3rd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'ME',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Economics 2nd Year',
    order: 3,
    enabled: true
  },
  {
    name: 'ME',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Economics 1st Year',
    order: 4,
    enabled: true
  },
  {
    name: 'ME',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 5,
    enabled: true
  },
  {
    name: 'ME',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 6,
    enabled: true
  },
  {
    name: 'ME',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 7,
    enabled: true
  },
  {
    name: 'MSc',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Bachelor of Science 3rd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'MSc',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Bachelor of Science 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'MSc',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Bachelor of Science 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'MSc',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 4,
    enabled: true
  },
  {
    name: 'MSc',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 5,
    enabled: true
  },
  {
    name: 'MSc',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 6,
    enabled: true
  },
  {
    name: 'MSc',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Master of Science 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'MSc',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Science 3rd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'MSc',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Science 2nd Year',
    order: 3,
    enabled: true
  },
  {
    name: 'MSc',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Bachelor of Science 1st Year',
    order: 4,
    enabled: true
  },
  {
    name: 'MSc',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 5,
    enabled: true
  },
  {
    name: 'MSc',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 6,
    enabled: true
  },
  {
    name: 'MSc',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 7,
    enabled: true
  },
  {
    name: 'CA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'CA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'CA',
    course: {},
    academicYear: 1,
    requiredCourseDescription: 'SSC',
    order: 3,
    enabled: true
  },
  {
    name: 'CA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Chartered Accountancy 1st Year',
    order: 1,
    enabled: true
  },
  {
    name: 'CA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 2,
    enabled: true
  },
  {
    name: 'CA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 3,
    enabled: true
  },
  {
    name: 'CA',
    course: {},
    academicYear: 2,
    requiredCourseDescription: 'SSC',
    order: 4,
    enabled: true
  },
  {
    name: 'CA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Chartered Accountancy 2nd Year',
    order: 1,
    enabled: true
  },
  {
    name: 'CA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Chartered Accountancy 1st Year',
    order: 2,
    enabled: true
  },
  {
    name: 'CA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 2nd Year',
    order: 3,
    enabled: true
  },
  {
    name: 'CA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'Intermediate 1st Year',
    order: 4,
    enabled: true
  },
  {
    name: 'CA',
    course: {},
    academicYear: 3,
    requiredCourseDescription: 'SSC',
    order: 5,
    enabled: true
  }
]

/**
 * Filter rules to find unique course from rule by course name.
 * @returns {Array.<*>}
 */
const filterRules = () => {
  let flags = {}
  let filteredRules = rules.filter((rule) => {
    if (flags[rule.name]) {
      return false
    }
    flags[rule.name] = true
    return true
  })
  return filteredRules
}

/**
 * Prepare final rule object by replacing with actual course for each rule.
 * @param course
 * @param rule
 * @returns {{course: *, academicYear: (number|*|RuleSchema.academicYear|{type, unique, required}), requiredCourseDescription: (string|string|string|string|*|string), order}}
 */
const prepareRule = (course, rule) => {
  return {
    course: course,
    name: rule.name,
    academicYear: rule.academicYear,
    requiredCourseDescription: rule.requiredCourseDescription,
    order: rule.order,
    enabled: rule.enabled
  }
}

/**
 * From courses promise, prepare all rules.
 * @param courses
 */
const prepareFinalRules = (courses) => {
  const tmpFinalRules = []
  courses.forEach((course) => {
    rules.forEach((rule) => {
      if (rule.name === course.name) {
        tmpFinalRules.push(prepareRule(course, rule))
      }
    })
  })
  tmpFinalRules.forEach((rule) => {
    courses.forEach((course) => {
      if (rule.requiredCourseDescription.startsWith(course.description) ||
      rule.requiredCourseDescription.startsWith(course.name)) {
        rule.qualifiedMarks = course.minimumMarks
        finalRules.push(rule)
      }
    })
  })
}

/**
 * Find unique courses for each rule.
 * @returns {Promise.<*>}
 */
const findCourses = () => {
  let courseQueries = []
  courseQueries.push(Course.findOne({ name: 'SSC' }).exec())
  courseQueries.push(Course.findOne({ name: 'Degree' }).exec())
  filterRules().forEach((rule) => {
    courseQueries.push(Course.findOne({ name: rule.name }).exec())
  })

  return Promise.all(courseQueries)
}

const RuleSeeder = Seeder.extend({
  beforeRun: () => {
    return findCourses()
      .then((courses) => {
        prepareFinalRules(courses)
      })
      .catch((err) => {
        throw err
      })
  },
  shouldRun: () => {
    return Rule.count().exec().then((count) => count === 0)
  },
  run: () => {
    return Rule.create(finalRules)
  }
})

module.exports = RuleSeeder

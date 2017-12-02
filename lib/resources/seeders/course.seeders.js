import { Seeder } from 'mongoose-data-seed'
import { Course } from '../../modules/models'

const courses = [
  {
    name: 'SSC',
    description: 'Secondary School Certificate',
    length: 1,
    rank: 1
  },
  {
    name: 'Inter',
    description: 'Intermediate',
    length: 2,
    rank: 2
  },
  {
    name: 'DA',
    description: 'Diploma in Agriculture',
    length: 2,
    rank: 3
  },
  {
    name: 'Polytechnic',
    description: 'Technical Education',
    length: 3,
    rank: 4
  },
  {
    name: 'PUC',
    description: 'Pre University Course',
    length: 2,
    rank: 5
  },
  {
    name: 'BA',
    description: 'Bachelor of Administration',
    length: 3,
    rank: 6
  },
  {
    name: 'BBA',
    description: 'Bachelor of Business Administration',
    length: 3,
    rank: 7
  },
  {
    name: 'BBM',
    description: 'Bachelor of Business Management',
    length: 3,
    rank: 8
  },
  {
    name: 'BCom',
    description: 'Bachelor of Commerce',
    length: 3,
    rank: 9
  },
  {
    name: 'BDS',
    description: 'Bachelor of Dental Science',
    length: 5,
    rank: 10
  },
  {
    name: 'BE',
    description: 'Bachelor of Economics',
    length: 3,
    rank: 11
  },
  {
    name: 'Engineering',
    description: 'Bachelor of Engineering',
    length: 4,
    rank: 12
  },
  {
    name: 'MBBS',
    description: 'Bachelor of Medicine/Bachelor of Surgery',
    length: 5,
    rank: 13
  },
  {
    name: 'BPharmacy',
    description: 'Bachelor of Pharmacy',
    length: 4,
    rank: 14
  },
  {
    name: 'BPT',
    description: 'Bachelor of Physical Therapy',
    length: 4.5,
    rank: 15
  },
  {
    name: 'BSc',
    description: 'Bachelor of Science',
    length: 3,
    rank: 16
  },
  {
    name: 'AgBSc',
    description: 'Bachelor of Science in Agriculture',
    length: 4,
    rank: 17
  },
  {
    name: 'MA',
    description: 'Master of Administration',
    length: 2,
    rank: 18
  },
  {
    name: 'MBA',
    description: 'Master of Business Administration',
    length: 2,
    rank: 19
  },
  {
    name: 'MCom',
    description: 'Master of Commerce',
    length: 2,
    rank: 20
  },
  {
    name: 'MCA',
    description: 'Master of Computer Applications',
    length: 3,
    rank: 21
  },
  {
    name: 'ME',
    description: 'Master of Economics',
    length: 2,
    rank: 22
  },
  {
    name: 'MSc',
    description: 'Master of Science',
    length: 2,
    rank: 23
  },
  {
    name: 'CA',
    description: 'Chartered Accountancy',
    length: 3,
    rank: 24
  },
  {
    name: 'ICWAI',
    description: 'Institute of Cost & Works Accounts of India',
    length: 1,
    rank: 25
  }
]

class CourseSeeder extends Seeder {
  async shouldRun() {
    return Course.count().exec().then(count => count === 0)
  }

  async run() {
    return Course.create(courses)
  }
}

export default CourseSeeder

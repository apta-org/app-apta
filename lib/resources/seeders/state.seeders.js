const { Seeder } = require('mongoose-data-seed')
const State = require('../../modules/models/state')

const states = [
  {
    name: 'Andhra Pradesh',
    districts: [
      'Anantapur Dist',
      'Chittoor Dist',
      'East Godavari Dist',
      'Guntur Dist',
      'Krishna Dist',
      'Kurnool Dist',
      'Nellore Dist',
      'Prakasam Dist',
      'Srikakulam Dist',
      'Visakhapatnam Dist',
      'Vizianagaram Dist',
      'West Godavari Dist',
      'YSR Kadapa Dist'
    ]
  },
  {
    name: 'Telangana',
    districts: [
      'Adilabad Dist',
      'Bhadradri Kothagudem Dist',
      'Hyderabad Dist',
      'Jagtial Dist',
      'Jangaon Dist',
      'Jayashankar Bhupalapally Dist',
      'Jogulamba Gadwal Dist',
      'Kamareddy Dist',
      'Karimnagar Dist',
      'Khammam Dist',
      'Kumarambheem Asifabad Dist',
      'Mahabubabad Dist',
      'Mahabubnagar Dist',
      'Mancherial Dist',
      'Medak Dist',
      'Medchal–Malkajgiri Dist',
      'Nagarkurnool Dist',
      'Nalgonda Dist',
      'Nirmal Dist',
      'Nizamabad Dist',
      'Peddapalli Dist',
      'Rajanna Sircilla Dist',
      'Ranga Reddy Dist',
      'Sangareddy Dist',
      'Siddipet Dist',
      'Suryapet Dist',
      'Vikarabad Dist',
      'Wanaparthy Dist',
      'Warangal Rural Dist',
      'Warangal Urban Dist',
      'Yadadri Bhuvanagiri Dist'
    ]
  }
]

const StateSeeder = Seeder.extend({
  shouldRun: () => {
    return State.count().exec().then((count) => count === 0)
  },
  run: () => {
    return State.create(states)
  }
})

module.exports = StateSeeder

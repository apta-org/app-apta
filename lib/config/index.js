import Package from '../../package.json'

const conf = {}

conf.swagger = {
  info: {
    title: 'APTA API Documentation',
    version: Package.version
  },
  cors: true,
  documentationPath: '/',
  grouping: 'tags',
  sortEndpoints: 'path',
  jsonEditor: true,
  tags: [
    {
      name: 'user',
      description: 'Member integration'
    }
  ]

}

module.exports = conf

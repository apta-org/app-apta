import Config from './index'

const manifest = {
  connections: [
    {
      host: (process.env.PORT) ? '0.0.0.0' : 'localhost',
      port: (process.env.PORT || 8080),
      routes: {
        cors: true
      }
    }
  ],
  registrations: [
    {
      plugin: {
        register: 'blipp'
      }
    },
    {
      plugin: {
        register: 'inert'
      }
    },
    {
      plugin: {
        register: 'vision'
      }
    },
    {
      plugin: {
        register: 'hapi-swagger',
        options: Config.swagger
      }
    },
    {
      plugin: {
        register: './models'
      }
    },
    {
      plugin: {
        register: './services'
      }
    },
    {
      plugin: {
        register: './api'
      },
      options: {
        routes: {
          prefix: '/api'
        }
      }
    }
  ]
}

if (process.env.NODE_ENV !== 'test') {
  manifest.registrations.push({
    plugin: {
      register: 'good',
      options: {
        ops: {
          interval: 1000
        },
        reporters: {
          myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*', request: '*' }]
          }, {
            module: 'good-console'
          }, 'stdout']
        }
      }
    }
  })
}

module.exports = manifest

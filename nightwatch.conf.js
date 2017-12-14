const Chai = require('chai')

require('nightwatch-cucumber')({
  cucumberArgs: [
    '--compiler', 'js:babel-core/register',
    '--require', './test-automation/hooks',
    '--require', './test-automation/steps',
    '--format', './node_modules/cucumber-pretty',
    '--format', 'json:reports/e2e/cucumber.json',
    './test-automation/features']
})

// eslint-disable-next-line no-unused-vars
global.expect = Chai.expect
// eslint-disable-next-line no-unused-vars
global.assert = Chai.assert
// eslint-disable-next-line no-unused-vars
global.should = Chai.should()

const props = {
  output_folder: 'reports',
  custom_assertions_path: '',
  live_output: false,
  disable_colors: false,
  // test_workers: {
  //   enabled: true,
  //   workers: 'auto'
  // },
  selenium: {
    start_process: false
  },
  test_settings: {
    default: {
      launch_url: 'http://localhost:8080'
    }
  }
}

module.exports = props

global.baseUrl = props.test_settings.default.launch_url

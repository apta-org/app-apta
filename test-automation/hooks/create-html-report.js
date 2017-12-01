'use strict'

const reporter = require('cucumber-html-reporter')

try {
  var options = {
    theme: 'bootstrap',
    jsonFile: './reports/e2e/cucumber.json',
    output: './reports/e2e/cucumber.html',
    reportSuiteAsScenarios: true,
    launchReport: false
  }
  reporter.generate(options)
} catch (e) {
  console.log('E2E report generation is failed due to', e)
}

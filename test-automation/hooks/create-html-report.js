const Reporter = require('cucumber-html-reporter')

try {
  const options = {
    theme: 'bootstrap',
    jsonFile: './reports/e2e/cucumber.json',
    output: './reports/e2e/cucumber.html',
    reportSuiteAsScenarios: true,
    launchReport: false
  }
  Reporter.generate(options)
} catch (err) {
  console.log('E2E report generation is failed due to', err)
}

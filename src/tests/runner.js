import { Harness } from '../../browserrt.js'

function render(suites) {
  suites.forEach(([suiteName, suiteResults]) => {
    console.group(`%c${suiteName}`, 'color: dodgerblue')
    renderSuite(suiteResults)
    console.groupEnd()
  })
}

function renderSuite(suiteResults) {
  suiteResults.forEach(([testName, testResults]) => {
    if (testResults.length) {
      console.groupCollapsed('%cFAIL', 'color: indianred', testName)
      testResults.forEach(({expected, received, message, frameLocation}) => {
        console.group(message)
        console.log(`Expected: ${expected}`)
        console.log(`Received: ${received}`)
        console.log(`Failure @ ${frameLocation}`)
        console.groupEnd()
      })
      console.groupEnd()
    } else {
      console.log('%cPASS', 'color: mediumseagreen', testName)
    }
  })
}

Harness.run(render)

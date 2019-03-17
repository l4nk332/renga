import { Harness } from './index.js'

function render(suites) {
  suites.forEach(([suiteName, suiteResults]) => {
    console.groupCollapsed(`%c${suiteName}`, 'color: dodgerblue')
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
        console.group(`Expected:`)
        console.log(expected)
        console.groupEnd()
        console.group(`Received:`)
        console.log(received)
        console.groupEnd()
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

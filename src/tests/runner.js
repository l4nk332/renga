import { Harness } from '../../browserrt.js'

function render(suites) {
  document.body.innerHTML = suites.map(([suiteName, suiteResults]) => (
    `
    <dl>
      <dt><strong>${suiteName}</strong></dt>
      <dd>${renderSuite(suiteResults)}</dd>
    </dl>
    `.trim())
  ).join('')
}

function renderSuite(suiteResults) {
  return suiteResults.map(([testName, testResults]) => (
    `
    <dl>
      <dt>${testName}</dt>
      <dd>
        <ul>
          ${renderTestResults(testResults)}
        </ul>
      </dd>
    </dl>
    `
  )).join('')
}

function renderTestResults(testResults) {
  return (
    testResults.length
      ? testResults.map(testResult => `<li>${JSON.stringify(testResult)}</li>`).join('')
      : ''
  )
}

Harness.run(render)

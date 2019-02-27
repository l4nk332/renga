import assert from './assert.js'
import TestLogger from './logger.js'
import { partial } from './utils.js'

class Harness {
  constructor() {
    this.suites = []
    this.results = []
  }

  register(suite) {
    this.suites.push(suite)
  }

  runSuite(suite) {
    suite._before()

    const results = suite._tests.map(([testName, testFn]) => {
      suite._beforeEach()

      const logger = new TestLogger(testName)
      const loggedAssert = partial(assert, logger)
      testFn(loggedAssert)

      suite._afterEach()

      return [testName, logger.failures]
    })

    suite._after()

    return [suite._name, results]
  }

  run(render) {
    const suiteResults = this.suites.map(this.runSuite)
    render(suiteResults)
  }
}

const MasterHarness = new Harness()

export default MasterHarness

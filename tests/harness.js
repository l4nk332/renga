class Harness {
  constructor() {
    this.suites = []
  }

  register(suite) {
    this.suites.push(suite)
  }

  runSuite(suite) {
    console.log(`Running Suite: ${suite._name}`)
    suite._before()
    suite._tests.forEach(([testName, testFn]) => {
      suite._beforeEach()
      console.log(`Running test: ${testName}`)
      testFn()
      suite._afterEach()
    })
    suite._after()
  }

  run() { this.suites.forEach(this.runSuite) }
}

class Suite {
  constructor(name) {
    this._name = name
    return this
  }

  before(setupSuite) {
    this._before = setupSuite
    return this
  }

  after(tearDownSuite) {
    this._after = tearDownSuite
    return this
  }

  beforeEach(setupTest) {
    this._beforeEach = setupTest
    return this
  }

  afterEach(tearDownTest) {
    this._afterEach = tearDownTest
    return this
  }

  tests(testModules) {
    this._tests = testModules
    return this
  }

  register(harness) {
    if (!harness instanceof Harness) {
      console.error(`All test suites must be registered with a harness.`)
      return
    }

    harness.register(this)
    return this
  }
}

const basicHarness = new Harness()

new Suite('My First Test Suite...')
  .before(() => console.log('set up for test suite...'))
  .beforeEach(() => console.log('set up per test...'))
  .afterEach(() => console.log('tear down per test'))
  .after(() => console.log('tear down for test suite...'))
  .tests([
    ['Test 1', () => { console.log('basic test 1 here...') }],
    ['Test 2', () => { console.log('basic test 2 here...') }],
    ['Test 3', () => { console.log('basic test 3 here...') }]
  ])
  .register(basicHarness)

basicHarness.run()

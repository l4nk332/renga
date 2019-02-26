import Harness from './harness.js'

export default class Suite {
  constructor(name) {
    Harness.register(this)
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
}

import Harness from './harness.js'

import { noop } from './utils.js'

export default class Suite {
  constructor(name) {
    Harness.register(this)

    this._name = name
    this._before = noop
    this._after = noop
    this._beforeEach = noop
    this._afterEach = noop
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

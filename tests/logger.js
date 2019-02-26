export default class TestLogger {
  constructor(testName) {
    this.failures = []
    this.name = testName
  }

  log(failure) {
    this.failures.push(failure)
  }
}


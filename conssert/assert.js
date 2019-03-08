import { deepEquals, negateIf, getFrameLocation } from './utils.js'

export default function assert(logger, lhs) {
  return {
    _negated: false,
    logFailures({expected, received, result, message}) {
      if (!result) {
        const frameLocation = getFrameLocation(2)
        logger.log({
          expected,
          received,
          message,
          frameLocation
        })
      }
    },
    equalTo(rhs) {
      const result = negateIf(this._negated, deepEquals(lhs, rhs))

      this.logFailures({
        result,
        expected: rhs,
        received: lhs,
        message:  `Expected ${rhs} but received ${lhs}`
      })

      return result
    },
    sameAs(rhs) {
      const result = negateIf(this._negated, Object.is(lhs, rhs))

      this.logFailures({
        result,
        expected: lhs,
        received: rhs,
        message:  `Expected a shared reference between ${lhs} and ${rhs}`
      })

      return result
    },
    instanceOf(rhs) {
      const result = negateIf(this._negated, lhs instanceof rhs)

      this.logFailures({
        result,
        expected: lhs,
        received: rhs,
        message:  `Expected ${lhs} to be an instance of ${rhs}`
      })

      return result
    },
    not() {
      this._negated = !this._negated
      return this
    }
  }
}

import { deepEquals, negateIf } from './utils.js'

export default function assert(logger, lhs) {
  return {
    _negated: false,
    logFailures({expected, received, result, message}) {
      if (!result) logger.log({ expected, received, message })
    },
    equalTo(rhs) {
      const result = negateIf(this._negated, deepEquals(lhs, rhs))

      this.logFailures({
        result,
        expected: lhs,
        received: rhs,
        message:  `Expected RHS to equal LHS...`
      })

      return result
    },
    sameAs(rhs) {
      const result = negateIf(this._negated, Object.is(lhs, rhs))

      this.logFailures({
        result,
        expected: lhs,
        received: rhs,
        message:  `Expected RHS to share reference with LHS...`
      })

      return result
    },
    instanceOf(rhs) {
      const result = negateIf(this._negated, lhs instanceof rhs)

      this.logFailures({
        result,
        expected: lhs,
        received: rhs,
        message:  `Expected RHS to be instance of LHS...`
      })

      return result
    },
    not() {
      this._negated = !this._negated
      return this
    }
  }
}

export function partial(fn, ...args) {
  return function(...remaining) {
    return fn(...args, ...remaining)
  }
}

export function deepEquals(lhs, rhs) {
  if (Object.is(lhs, rhs)) return true

  if (typeof lhs !== 'object' || typeof rhs !== 'object') return false

  const lhsKeys = Object.keys(lhs)
  const rhsKeys = Object.keys(rhs)

  if (lhsKeys.length !== rhsKeys.length) return false

  for (let key of lhsKeys) {
    if (!rhsKeys.includes(key) || !deepEquals(lhs[key], rhs[key])) {
      return false
    }
  }

  return true
}

export function negateIf(condition, value) {
  return condition ? !value : value
}

export function noop() {}

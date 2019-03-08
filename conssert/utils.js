export function partial(fn, ...args) {
  return function(...remaining) {
    return fn(...args, ...remaining)
  }
}

export function isPlainObject(value) {
  return (
    typeof value === 'object' &&
    !Array.isArray(value) &&
    value !== null
  )
}

export function deepEquals(lhs, rhs) {
  if (Object.is(lhs, rhs)) return true

  const bothPlainObjects = [lhs, rhs].every(isPlainObject)
  const bothArrays = [lhs, rhs].every(Array.isArray)

  if (bothPlainObjects || bothArrays) {
    const lhsKeys = Object.keys(lhs)
    const rhsKeys = Object.keys(rhs)

    if (lhsKeys.length !== rhsKeys.length) return false

    for (let key of lhsKeys) {
      if (!rhsKeys.includes(key) || !deepEquals(lhs[key], rhs[key])) {
        return false
      }
    }

    return true
  } else return false
}

export function negateIf(condition, value) {
  return condition ? !value : value
}

export function noop() {}

export function last(iterable) {
  return iterable.slice(-1)[0]
}

export function getFrameLocation(frameIdx) {
  try {
    throw new Error()
  } catch (err) {
    const [errType, thisFrame, ...frameList] = err.stack.split('\n')
    const frameLocation = last(
      frameList[frameIdx]
        .replace(/[()]/g, '')
        .split(' ')
    )
    return frameLocation
  }
}

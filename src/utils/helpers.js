export function coerceTrue(value) {
  return (
    value && typeof value === 'boolean'
      ? ''
      : value
  )
}

export function isValidChild(child) {
  return (
    isOneOfType(['string', 'number'], child) ||
    (isPlainObject(child) &&
     'nodeName' in child &&
     'nodeType' in child)
  )
}

export function areValidChildren(children) {
  return (
    Array.isArray(children)
      ? children.every(isValidChild)
      : isValidChild(children)
  )
}

export function extractClassNames(string) {
  const extracted = string.match(/\.[a-z-_]+/gi)

  return (
    Array.isArray(extracted)
      ? unique(extracted).map(className => className.slice(1))
      : []
  )
}

export function isPlainObject(value) {
  return (
    typeof value === 'object' &&
    !Array.isArray(value) &&
    value !== null
  )
}

export function isOneOfType(types, value) {
  return types.some(type => typeof value === type)
}

export function unique(values) {
  return values.reduce((acc, c) => (
    acc.find(v => deepEquals(v, c)) ? acc : [...acc, c]
  ), [])
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

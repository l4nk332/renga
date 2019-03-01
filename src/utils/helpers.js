export function coerceTrue(value) {
  return (
    value && typeof value === 'boolean'
      ? ''
      : value
  )
}

// TODO: recurse through array and validate children...
export function areValidChildren(children) {
  return (
    Array.isArray(children) ||
    typeof children === 'string' ||
    (isPlainObject(children) &&
     'nodeName' in children &&
     'nodeType' in children)
  )
}

export function extractClassNames(string) {
  return string.match(/\.[a-z-_]+/gi).map(className => className.slice(1))
}

export function isPlainObject(value) {
  return (
    typeof value === 'object' &&
    !Array.isArray(value) &&
    value !== null
  )
}

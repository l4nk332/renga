export function coerceBoolean(value) {
  return (
    value && typeof value === 'boolean'
      ? ''
      : value
  )
}

export function areValidChildren(children) {
  return (
    Array.isArray(children) ||
    typeof children === 'string' ||
    // TODO: Fix scenario with null being passed through...
    ('nodeName' in children && 'nodeType' in children)
  )
}

export function extractClassNames(string) {
  return string.match(/\.[a-z-_]+/gi).map(className => className.slice(1))
}

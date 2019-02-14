function kabob2Camel(string) {
  const [head, ...tail] = string.split('-')
  const capitalizedTail = (
    tail
      .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join('')
  )

  return `${head}${capitalizedTail}`
}

function isValidCamelCase(string) {
  return /^[a-z]+([A-Z][a-z]*)+$/g.test(string)
}

function camel2Kabob(string) {
  return (
    isValidCamelCase(string)
      ? (
        string
          .split(/([A-Z][a-z]*)/g)
          .filter(v => v.length)
          .map(v => v.toLowerCase())
          .join('-')
      ) : string
  )
}

function coerceBoolean(value) {
  return (
    value && typeof value === 'boolean'
      ? ''
      : value
  )
}

function setAttributes(node, attributes) {
  Object
    .entries(attributes)
    .filter(([attrName, attrValue]) => attrValue !== false)
    .map(([attrName, attrValue]) => [
      camel2Kabob(attrName),
      coerceBoolean(attrValue)
    ])
    .forEach(([attrName, attrValue]) => {
      node.setAttribute(attrName, attrValue)
    })
}

function appendChild(node, child) {
  child = (
    typeof child === 'string'
      ? document.createTextNode(child)
      : child
  )

  node.appendChild(child)
}

function appendChildren(node, children) {
  Array.isArray(children)
    ? children.forEach(child => appendChild(node, child))
    : appendChild(node, children)
}

function template(type) {
  return function element(attributes = {}, children = []) {
    // TODO: Add logic to identify when attributes not provided
    // (default to children as first arg)...
    const node = document.createElement(type)

    setAttributes(node, attributes)
    appendChildren(node, children)

    return node
  }
}

const ELEMENT_TYPES = [
  'main', 'div', 'span', 'section', 'h1',
  'small', 'img', 'header', 'aside', 'ul',
  'li', 'figure', 'footer', 'style'
]

export const Q = ELEMENT_TYPES.reduce((collection, type) => ({
  ...collection,
  [type]: template(type)
}), {_: {}})

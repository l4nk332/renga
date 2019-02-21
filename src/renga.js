import { ELEMENT_TYPES, FRAGMENT } from './constants.js'

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

function areValidChildren(children) {
  return (
    Array.isArray(children) ||
    typeof children === 'string' ||
    // TODO: Fix scenario with null being passed through...
    ('nodeName' in children && 'nodeType' in children)
  )
}

function template(type) {
  return function element(attributes = null, children = null) {
    if (areValidChildren(attributes)) {
      children = attributes
      attributes = null
    }

    const node = (
      type === FRAGMENT
        ? document.createDocumentFragment()
        : document.createElement(type)
    )

    if (type !== FRAGMENT && attributes) setAttributes(node, attributes)

    if (children) appendChildren(node, children)

    return node
  }
}

function extractClassNames(string) {
  return string.match(/\.[a-z-_]+/gi).map(className => className.slice(1))
}

function scopeStyles(module, styles, hash = '') {
  let classNames = {}

  const scopedStyles = (
    styles
    .replace(/\.([a-z-_]+)/gi, (_, rawClassName) => {
      const normalizedName = kabob2Camel(rawClassName)
      const hashFragment = hash ? `${hash}__` : hash
      const scopedName = `${module}__${hashFragment}${normalizedName}`

      classNames[normalizedName] = scopedName

      return `.${scopedName}`
    })
  )

  return {classNames, styles: scopedStyles}
}

defaults = { scopeStyles }

const renga = ELEMENT_TYPES.reduce((collection, type) => ({
  ...collection,
  [type]: template(type)
}), defaults)

export default renga

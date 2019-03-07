import { coerceTrue } from './helpers.js'
import { camel2Kabob } from './translators.js'

// TODO: Add ability to set events...

export function setAttributes(node, attributes) {
  Object
    .entries(attributes)
    .filter(([attrName, attrValue]) => attrValue !== false)
    .map(([attrName, attrValue]) => [
      camel2Kabob(attrName),
      coerceTrue(attrValue)
    ])
    .forEach(([attrName, attrValue]) => {
      node.setAttribute(attrName, attrValue)
    })
}

export function appendChild(node, child) {
  child = (
    typeof child === 'string'
      ? document.createTextNode(child)
      : child
  )

  node.appendChild(child)
}

export function appendChildren(node, children) {
  Array.isArray(children)
    ? children.forEach(child => appendChild(node, child))
    : appendChild(node, children)
}

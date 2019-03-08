import { coerceTrue, isPlainObject } from './helpers.js'
import { camel2Kabob } from './translators.js'

export function setEventHandlers(node, handlers) {
  Object
    .entries(handlers)
    .forEach(([eventName, eventHandler]) => {
      node.addEventListener(eventName, eventHandler)
    })
}

export function setStyles(node, styles) {
  Object
    .entries(styles)
    .forEach(([styleProp, styleValue]) => {
      node.style[camel2Kabob(styleProp)] = styleValue
    })
}

export function setAttributes(node, attributes) {
  Object
    .entries(attributes)
    .filter(([attrName, attrValue]) => attrValue !== false)
    .map(([attrName, attrValue]) => [
      camel2Kabob(attrName),
      coerceTrue(attrValue)
    ])
    .forEach(([attrName, attrValue]) => {
      attrName === 'events' && isPlainObject(attrValue)
        ? setEventHandlers(node, attrValue)
        : attrName === 'style' && isPlainObject(attrValue)
          ? setStyles(node, attrValue)
            : node.setAttribute(attrName, attrValue)
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

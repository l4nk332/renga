import { ELEMENT_TYPES, FRAGMENT } from './constants.js'

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

defaults = { scopeStyles }

const renga = ELEMENT_TYPES.reduce((collection, type) => ({
  ...collection,
  [type]: template(type)
}), defaults)

export default renga

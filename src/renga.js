import { ELEMENT_TYPES, FRAGMENT, TEXT } from './utils/constants.js'
import { setAttributes, appendChildren } from './utils/dom-manipulators.js'
import { areValidChildren, shouldNullify } from './utils/helpers.js'

export { scopeStyles } from './scope-styles.js'

function template(type) {
  return function element(attributes = null, children = null) {
    if (areValidChildren(attributes)) {
      children = attributes
      attributes = null
    }

    const node = (
      type === FRAGMENT
        ? document.createDocumentFragment()
        : type === TEXT
          ? document.createTextNode(shouldNullify(children) ? '' : children)
          : document.createElement(type)
    )

    if (![FRAGMENT, TEXT].includes(type) && attributes) setAttributes(node, attributes)

    if (type !== TEXT && children) appendChildren(node, children)

    return node
  }
}

export const element = ELEMENT_TYPES.reduce((collection, type) => ({
  ...collection,
  [type]: template(type)
}), {})

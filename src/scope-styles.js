import { kabob2Camel } from './utils/translators.js'

export function scopeStyles(module, styles, hash = '') {
  let classNames = {}

  const scopedStyles = (
    styles
    .replace(/\.([a-z-_]+)/gi, (_, rawClassName) => {
      const normalizedName = kabob2Camel(rawClassName)
      const hashFragment = hash ? `__${hash}` : hash
      const scopedName = `${module}__${normalizedName}${hashFragment}`

      classNames[normalizedName] = scopedName

      return `.${scopedName}`
    })
  )

  return {classNames, styles: scopedStyles}
}

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

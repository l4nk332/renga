import { KABOB_CASE, CAMEL_CASE, CAPITALIZED_WORD } from './regexes.js'

export function isValidKabobCase(string) {
  return KABOB_CASE.test(string)
}

export function kabob2Camel(string) {
  if (!isValidKabobCase(string)) return string

  const [head, ...tail] = string.split('-')
  const capitalizedTail = (
    tail
      .filter(word => word.length)
      .map(word => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
      .join('')
  )

  return `${head}${capitalizedTail}`
}

export function isValidCamelCase(string) {
  return CAMEL_CASE.test(string)
}

export function camel2Kabob(string) {
  return (
    isValidCamelCase(string)
      ? (
        string
          .split(CAPITALIZED_WORD)
          .filter(v => v.length)
          .map(v => v.toLowerCase())
          .join('-')
      ) : string
  )
}

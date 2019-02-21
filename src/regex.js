// TODO: Possibly need to remove the ^ and $ to make less strict
export const KABOB_CASE = /^[a-z]+(-+[a-z]+)+$/gi

export const CAMEL_CASE = /^[a-z]+([A-Z][a-z]*)+$/g

export const CAPITALIZED_WORD = /([A-Z][a-z]*)/g

export function isValidKabobCase(string) {
  return KABOB_CASE.test(string)
}

// TODO: Handle repeated dashes/underscores in class name.
export function kabob2Camel(string) {
  if (!isValidKabobCase(string)) return string

  const [head, ...tail] = string.split('-')
  const capitalizedTail = (
    tail
      .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join('')
  )

  return `${head}${capitalizedTail}`
}

function isValidCamelCase(string) {
  return CAMEL_CASE.test(string)
}

// TODO: Handle underscores in class names ???
function camel2Kabob(string) {
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

const fuzzy = require('fuzzy')

export function groupBy<T>(xs: T[], fn: (x: T) => string): Map<string, T[]> {
  const map = new Map()
  for (let x of xs) {
    const key = fn(x)
    if (map.has(key)) {
      map.set(key, [...map.get(key), x])
    } else {
      map.set(key, [x])
    }
  }
  return map
}

export function mapBy<T>(xs: T[], fn: (x: T) => string): Map<string, T> {
  const map = new Map()
  for (let x of xs) {
    map.set(fn(x), x)
  }
  return map
}

export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function format(message: string, params: { [key: string]: string }) {
  Object.keys(params).forEach(key => {
    message = message.replace(`{${key}}`, params[key])
  })
  return message
}

export function startsWith<T>(text: string, map: Map<string, T>): T[] {
  const keys = [...map.keys()]
  return keys
    .filter(key => key.startsWith(text))
    .map(key => map.get(key) as T)
}

export function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

export function stringify(t: string | Item): string {
  if (typeof t === 'string') {
    return t
  } else {
    return t.name
  }
}

export function itemName(item: Item) {
  return item.name
}

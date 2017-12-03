import {capitalizeFirstLetter, format, groupBy} from './utils'
import {from} from './game'

const chalk = require('chalk')
const indentString = require('indent-string')

export const br = () => console.log('\n')
export const put = text => console.log(indentString(text, 2))

export function describe(game: Game) {
  const tile = from(game).currentTile()

  br()
  put(chalk`{${tile.style} ${capitalizeFirstLetter(tile.title)}}`)
  put(tile.description)
  br()

  const iSee = {
    male: `На {there} виден {what}`,
    female: `На {there} видена {what}`,
    neuter: `На {there} видено {what}`
  }

  const describe = (there: string, tile: Tile) => {
    put(format(iSee[tile.gender], {
      there,
      what: describeTile(tile)
    }))
  }

  if (tile.north) {
    describe(`севере`, from(game).tileAt(tile.north))
  }
  if (tile.east) {
    describe(`востоке`, from(game).tileAt(tile.east))
  }
  if (tile.south) {
    describe(`юге`, from(game).tileAt(tile.south))
  }
  if (tile.west) {
    describe(`западе`, from(game).tileAt(tile.west))
  }

  const rand = tile.point.i + tile.point.j
  let nothing = true

  if (tile.items.length > 0) {
    const items = describeItems(tile.items)
    put(
      rand % 2 == 0 ? `Неподалёку лежит ${items}.` : `На земле лежит ${items}.`
    )
    nothing = false
  }

  if (nothing) {
    put('Ничего интересного.')
  }

  br()
}

export function describeTile(tile: Tile) {
  return chalk`{${tile.style} ${tile.title}}`
}

export function describeItems(items: Item[]) {
  const types = groupBy(items.filter(x => x), x => x.name)

  return Array.from(types).map(([type, items]) => {
    if (items.length === 1) {
      return describeItem(items[0])
    } else {
      return `${describeItem(items[0])} (x${items.length})`
    }
  }).join(', ')
}

export function describeItem(item: Item) {
  return chalk`{${item.style} ${item.name}}`
}

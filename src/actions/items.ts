import {describeItem, describeItems, put} from '../describe'
import {from} from '../game'
import {itemName, mapBy} from '../utils'
import {Action} from './index'
import update = require('immutability-helper')
import chalk from 'chalk'

const actions: Action[] = [
  {
    command: 'инвентарь',
    reduce(game: Game) {
      const inventory = describeItems(game.player.inventory)
      put(`У вас в сумке ${inventory}`)
    }
  },
  {
    command: 'взять',
    param: {
      name: 'предмет',
      map(game: Game) {
        return mapBy(from(game).currentTile().items, itemName)
      },
      describe(item: Item) {
        return describeItem(item)
      },
      notFound: param => chalk`Не могу найти {grey ${param}}.`,
      empty: 'Скажите что взять?',
    },
    reduce(game: Game, item: Item) {
      put(`Вы взяли ${describeItem(item)}.`)
      return update(game, {
        world: {
          tiles: {
            [from(game).currentTileIndex()]: {
              items: {
                $remove: [item]
              }
            }
          }
        },
        player: {
          inventory: {
            $push: [item]
          }
        }
      })
    }
  },
  {
    command: 'выбросить',
    param: {
      name: 'предмет',
      map: game => mapBy(game.player.inventory, itemName),
      describe: describeItem,
      notFound: param => chalk`Не могу найти {grey ${param}}.`,
      empty: 'Скажите что выбросить?',
    },
    reduce(game: Game, item: Item) {
      put(`Вы выбросили ${describeItem(item)}.`)
      return update(game, {
        world: {
          tiles: {
            [from(game).currentTileIndex()]: {
              items: {
                $push: [item]
              }
            }
          }
        },
        player: {
          inventory: {
            $remove: [item]
          }
        }
      })
    }
  }
]

export default actions

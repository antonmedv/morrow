import {describe, put} from '../describe'
import {Action} from './index'

const go = {
  north: (game: Game) => {
    let point: Point = game.player.coordinates
    let {i, j} = point

    if (i > 0) {
      point = {i: i - 1, j}
      game = {
        ...game,
        player: {...game.player, coordinates: point}
      }
      describe(game)
    } else {
      put('На север некуда идти.')
    }

    return game
  },
  south: (game: Game) => {
    let point: Point = game.player.coordinates
    let {i, j} = point

    if (j + 1 < game.world.width) {
      point = {i, j: j + 1}
      game = {
        ...game,
        player: {...game.player, coordinates: point}
      }
      describe(game)
    } else {
      put('На восток некуда идти.')
    }

    return game
  },
  east: (game: Game) => {
    let point: Point = game.player.coordinates
    let {i, j} = point

    if (i + 1 < game.world.height) {
      point = {i: i + 1, j}
      game = {
        ...game,
        player: {...game.player, coordinates: point}
      }
      describe(game)
    } else {
      put('На юг некуда идти.')
    }

    return game
  },
  west: (game: Game) => {
    let point: Point = game.player.coordinates
    let {i, j} = point

    if (j > 0) {
      point = {i: i, j: j - 1}
      game = {
        ...game,
        player: {...game.player, coordinates: point}
      }
      describe(game)
    } else {
      put('На запад некуда идти.')
    }

    return game
  },
}

const actions: Action[] = [
  {
    command: 'север',
    reduce: go.north
  },
  {
    command: 'восток',
    reduce: go.south
  },
  {
    command: 'юг',
    reduce: go.east
  },
  {
    command: 'запад',
    reduce: go.west
  },
  {
    command: 'осмотреться вокруг',
    reduce: game => {
      describe(game)
    }
  },
  {
    command: 'идти',
    param: {
      name: 'куда',
      map: game => new Map([
        ['на север', 'north'],
        ['на восток', 'south'],
        ['на юг', 'east'],
        ['на запад', 'west'],
      ]),
      describe: direction => direction,
      notFound: direction => `Не могу идти ${direction}.`,
      empty: 'Куда идти?',
    },
    reduce(game: Game, direction: string) {
      return go[direction](game)
    }
  }
]

export default actions

import {generate} from './world'
import {WorldMap} from './map'

export function newGame(worldMap: WorldMap): Game {
  const world = generate(worldMap[0][0], worldMap[0][1])
  const player: Player = {
    coordinates: {i: 0, j: 0},
    inventory: [],
  }

  return {world, player}
}

class Selector {
  world: World
  player: Player

  constructor(game: Game) {
    this.world = game.world
    this.player = game.player
  }

  index({point}: Tile): number {
    return point.i * this.world.width + point.j
  }

  tileAt({i, j}: Point) {
    return this.world.tiles[i * this.world.width + j]
  }

  currentTile() {
    return this.tileAt(this.player.coordinates)
  }

  currentTileIndex() {
    return this.index(this.currentTile())
  }
}

export function from(game: Game) {
  return new Selector(game)
}

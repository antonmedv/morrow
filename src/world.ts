import {Legend} from './map'

const runes = require('runes')

export function mapToPoints(map: string): string[][] {
  return map
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(runes)
}

export function generate(map: string, legend: Legend): World {
  const points = mapToPoints(map)

  const tiles: Tile[] = []
  const height = points.length
  const width = Math.max(...points.map(p => p.length))

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const point = points[i][j]
      const generator = legend.get(point)
      if (!generator) {
        console.log(`Can't find tile for ${point}.`)
        process.exit(1)
      } else {
        const tile: Tile = generator()
        tiles.push({...tile, point: {i, j}})
      }
    }
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const tile = tiles[i * width + j]
      if (i > 0) {
        tile.north = {i: i - 1, j}
      }
      if (j + 1 < width) {
        tile.east = {i, j: j + 1}
      }
      if (i + 1 < height) {
        tile.south = {i: i + 1, j}
      }
      if (j > 0) {
        tile.west = {i, j: j - 1}
      }
    }
  }

  const world: World = {tiles, width, height}
  return world
}

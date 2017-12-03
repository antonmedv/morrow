import {maybe, moneyBag} from './inventory'
import {forest, glade, road} from './tiles'

export type WorldMap = Location[]
export type Location = [Plan, Legend]
export type Plan = string
export type Legend = Map<string, Generator>
export type Generator = () => Tile

const worldMap: WorldMap = [
  [
    `
💰🌲👣🌲🌲🌲🌲🌲🌲🌲
🌲💰👣💰🌲🌲🌲🌲🌲🌲
🌲🌲👣👣👣🌲🌲🌲🌲🌲
🌲🌲🌲💰👣👣💰🌲🌲🌲
🌲🌲🌲🌲🌲👣🌲🌲🌲🌲
🌲🌲🌲🌲🌲👣🌲💰🌲🌲
🌲🌲🌲🌲🌲👣👣👣🌲⛳️
🌲🌲🌲🌲🌲🌲🌲👣👣👣
🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲
🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲
    `,
    new Map([
      ['🌲', () => forest()],
      ['💰', () => forest({
        items: [
          moneyBag(),
          maybe(moneyBag(), 0.2),
          maybe(moneyBag(), 0.1),
        ]
      })],
      ['⛳️', () => glade()],
      ['👣', () => road()]
    ])
  ]
]

export default worldMap

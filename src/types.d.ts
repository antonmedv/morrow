type Game = {
  world: World
  player: Player
}

type Player = {
  coordinates: Point
  inventory: Item[]
}

type World = {
  tiles: Tile[]
  width: number
  height: number
}

type Point = {
  i: number
  j: number
}

type Gender = 'male' | 'female' | 'neuter'

type Tile = {
  title: string
  gender: Gender
  description: string
  style: string
  point: Point
  north?: Point
  south?: Point
  east?: Point
  west?: Point
  characters: Character[]
  items: Item[]
}

type Character = {
}

type Item = {
  name: string
  style: string
}

export function tile(partial: Partial<Tile> = {}): Tile {
  return {
    title: '',
    gender: 'neuter',
    description: '',
    style: 'gray',
    point: {i: 0, j: 0},
    items: [],
    characters: [],
    ...partial
  }
}

export function forest(partial: Partial<Tile> = {}): Tile {
  return tile({
    title: 'лес',
    gender: 'male',
    style: 'green',
    description: 'Вокруг обычный лес, большие деревья сгущаются вокруг.',
    ...partial
  })
}

export function glade(partial: Partial<Tile> = {}): Tile {
  return tile({
    title: 'поляна',
    gender: 'female',
    style: 'rgb(32, 232, 88)',
    description: 'Небольшая поляна, свет хорошо освещает её.',
    ...partial
  })
}

export function road(partial: Partial<Tile> = {}): Tile {
  return tile({
    title: 'дорога',
    gender: 'female',
    style: 'rgb(150, 144, 133)',
    description: 'Пыльная дорога идущая в лесу, одному по нец идти довольно жутко',
    ...partial
  })
}

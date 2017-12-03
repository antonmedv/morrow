export function maybe(item: Item, percent: number = 0.5): Item {
  return Math.random() < percent ? item : stone()
}

export function stone(): Item {
  return {
    name: 'камушек',
    style: 'gray'
  }
}

export function moneyBag(): Item {
  return {
    name: 'мешочек с золотом',
    style: 'rgb(229, 187, 0)',
  }
}

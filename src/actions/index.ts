import movements from './movements'
import items from './items'

type Param<T> = {
  name: string
  map: (game: Game) => Map<string, T>
  describe: (t: T) => string
  notFound: (param: string) => string
  empty: string
}

export type Action = {
  command: string
  param?: Param<any>
  reduce: (game: Game, param?: any) => Game | void
}

export const actionsMap = new Map<string, Action>()
export const actions: Action[] = [
  ...movements,
  ...items,
]

for (let action of actions) {
  actionsMap.set(action.command, action)
}

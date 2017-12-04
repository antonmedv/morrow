/// <reference path="./types.d.ts"/>
import {readFileSync, writeFile} from 'fs'
import {dirname} from 'path'
import * as readline from 'readline'
import * as update from 'immutability-helper'
import * as PrettyError from 'pretty-error'
import {describe} from './describe'
import worldMap from './map'
import {actions, actionsMap} from './actions'
import {noop, startsWith} from './utils'
import {newGame} from './game'

// Define other imports and configure immutability-helper

const mkdirp = require('mkdirp')
const chalk = require('chalk')
const pe = new PrettyError()
update.extend('$remove', (values, original) => {
  return values.reduce((acc, value) => {
    const index = acc.findIndex(x => x === value)
    return update(acc, {$splice: [[index, 1]]})
  }, original)
})


// Create new game or load from first param

let [file] = process.argv.slice(2)

let game: Game

if (file) {
  game = load(file) || newGame(worldMap)
} else {
  game = newGame(worldMap)
  file = 'game.json'
}

const actionNames = [...actionsMap.keys()]


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  completer: (line: string) => {
    const [command, ...argumentsArray] = line.split(' ')
    const argument = (argumentsArray || []).join(' ')

    let hits = actionNames.filter(c => c.startsWith(command))
    if (actionsMap.has(command)) {
      const action = actionsMap.get(command)
      if (action && action.param) {
        const keys = [...action.param.map(prevGame).keys()]
        hits = keys.filter(key => key.startsWith(argument)).map(key => `${command} ${key}`)
      }
    }
    return [hits.length ? hits : actionNames, line]
  }
})

let prevGame: Game

function loop(game: Game) {
  prevGame = game

  rl.question(chalk.cyan('> '), line => {
    try {
      const [commandToSearch, ...argumentsArray] = line.split(' ')
      const argumentToSearch = (argumentsArray || []).join(' ')

      if (commandToSearch === 'помощь' || commandToSearch === '?') {
        actions.map(action => {
          const arg = action.param ? action.param.name : ''
          console.log(chalk`· {cyan ${action.command}} ${arg}`)
        })
        return loop(game)
      }

      const found = startsWith(commandToSearch, actionsMap)

      if (found.length === 1) {
        const action = found[0]

        let argument

        if (action.param) {
          const foundedArguments = argumentToSearch
            ? startsWith(argumentToSearch, action.param.map(game))
            : []

          if (foundedArguments.length === 1) {
            argument = foundedArguments[0]
          } else if (foundedArguments.length === 2) {
            console.log(chalk`{cyan ?} ${action.param.describe(foundedArguments[0])} или ${action.param.describe(foundedArguments[1])}`)
            return loop(game)
          } else if (!argumentToSearch) {
            console.log(chalk`{cyan ?} ${action.param.empty}`)
            return loop(game)
          } else {
            console.log(chalk`{red X} ${action.param.notFound(argumentToSearch)}`)
            return loop(game)
          }
        }

        return loop(apply(game, action.reduce, argument))
      } else if (found.length === 2) {
        console.log(chalk`{cyan ?} {cyan ${found[0].command}} или {cyan ${found[1].command}}`)
        return loop(game)
      } else {
        console.log(chalk`{cyan ?} Что вы хотели сделать? Наберите "{cyan помощь}" или "{cyan ?}".`)
        return loop(game)
      }
    } catch (error) {
      console.log(pe.render(error))
      console.log(chalk`{red X} Произошло что-то страшное, тёмные силы вмешались в ход событий.`)
      console.log(`  Пожалуйста, сообщите разработчикам.`)
      return loop(game)
    }
  })

  save(prevGame, file)
}

function apply(game: Game, action: Function, arg: any = void 0): Game {
  const nextGame = action(game, arg)
  return nextGame || game
}

function save(game: Game, toFile: string) {
  mkdirp(dirname(toFile), (err) => {
    if (err) return
    writeFile(toFile, JSON.stringify(game, null, 2), noop)
  })
}

function load(file: string): Game | null {
  try {
    console.log(chalk`{green i} Загружаем игру из ${file}`)
    return JSON.parse(readFileSync(file, 'utf8'))
  } catch (err) {
    console.log(chalk`{red X} Не удаётся загрузить ${file}.`)
    return null
  }
}

describe(game)
loop(game)

import { assign, Machine, interpret, spawn, Interpreter } from 'xstate'

import { defaultSquareConfig } from '../config'

import { squareMachine, SquareContext, SquareEvent } from './square'

export interface ChessContext {
  // TODO: use SquareContext instead of x and y
  squares: {
    x: number
    y: number
    ref: Interpreter<SquareContext, any, SquareEvent, any>
  }[]
}

export type ChessEvent = { type: 'SELECT_SQUARE'; id: string }

export type ChessState =
  | { value: 'initializing'; context: ChessContext & { squares: undefined } }
  | {
      value: 'idle'
      context: ChessContext
    }
  | {
      value: 'playing'
      context: ChessContext
    }

export const chessMachine = Machine<ChessContext, any, ChessEvent>({
  id: 'chess',
  initial: 'initializing',
  states: {
    initializing: {
      entry: assign({
        squares: () => {
          return defaultSquareConfig().map(square => ({
            ...square,
            ref: spawn(squareMachine.withContext(square)),
          }))
        },
      }),
      always: 'idle',
    },
    idle: {
      /* ... */
    },
    playing: {},
  },
})

const chessService = interpret(chessMachine)

chessService.subscribe(state => {
  if (state.matches('playing')) {
    // from the ChessState typestate, `squares` will be defined
    console.log('playing context', state.context.squares)
  }
})

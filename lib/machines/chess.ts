import { assign, interpret, Interpreter, Machine, spawn } from 'xstate'

import { defaultSquareConfig } from '../config'
import { Color, Piece } from '../typing'

import { squareMachine, SquareContext, SquareEvent } from './square'

export interface ChessContext {
  squares: {
    ref: Interpreter<SquareContext, any, SquareEvent, any>
  }[]
}

export type ChessEvent = {
  type: 'CLICK_SQUARE'
  squareRef: Interpreter<SquareContext, any, SquareEvent, any>
}

export type ChessState =
  | {
      value: 'initializing'
      context: ChessContext & { squares: undefined }
    }
  | {
      value: 'idle'
      context: ChessContext
    }
  | {
      value: 'playing'
      context: ChessContext
    }

export const chessMachine = Machine<ChessContext, any, ChessEvent>(
  {
    id: 'chess',
    initial: 'initializing',
    states: {
      initializing: {
        entry: assign({
          squares: () => {
            return defaultSquareConfig().map(square => ({
              ref: spawn(squareMachine.withContext(square)),
            }))
          },
        }),
        always: 'idle',
      },
      idle: {
        on: {
          CLICK_SQUARE: { actions: ['unselectSquares', 'selectSquare'] },
        },
      },
      playing: {},
    },
  },
  {
    actions: {
      unselectSquares: ctx =>
        ctx.squares.forEach(square => square.ref.send('UNSELECT')),
      selectSquare: (_, event) => event.squareRef.send('SELECT'),
    },
  }
)

const chessService = interpret(chessMachine)

chessService.subscribe(state => {
  if (state.matches('playing')) {
    // from the ChessState typestate, `squares` will be defined
    console.log('playing context', state.context.squares)
  }
})

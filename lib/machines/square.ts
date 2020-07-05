import { createMachine } from 'xstate'

import { Piece } from '../typing'

export interface SquareContext {
  x: number
  y: number
  piece?: Piece
}

export type SquareEvent = { type: 'SELECT' } | { type: 'UNSELECT' }

export type SquareState =
  | {
      value: 'idle'
      context: SquareContext
    }
  | {
      value: 'selected'
      context: SquareContext
    }

export const squareMachine = createMachine<
  SquareContext,
  SquareEvent,
  SquareState
>({
  id: 'square',
  initial: 'idle',
  states: {
    idle: {},
    selected: {},
  },
})

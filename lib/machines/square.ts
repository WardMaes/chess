import { Machine } from 'xstate'

import { Piece } from '../typing'

export interface SquareContext {
  x: number
  y: number
  piece?: Piece
}

export type SquareEvent =
  | {
      type: 'SELECT'
    }
  | { type: 'UNSELECT' }

export type SquareState =
  | {
      value: 'idle'
      context: SquareContext
    }
  | {
      value: 'selected'
      context: SquareContext
    }

export const squareMachine = Machine<SquareContext, any, SquareEvent>({
  id: 'square',
  initial: 'idle',
  states: {
    idle: {
      on: { SELECT: 'selected' },
    },
    selected: {
      on: { UNSELECT: 'idle' },
    },
  },
})

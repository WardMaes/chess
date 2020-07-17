import { Machine } from 'xstate'

import { Color, Piece } from '../typing'

export interface SquareContext {
  x: number
  y: number
  piece?: Piece
  color?: Color
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
  | {
      value: 'highlighted'
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

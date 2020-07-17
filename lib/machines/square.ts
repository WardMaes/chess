import { assign, Machine } from 'xstate'

import { Color, Piece } from '../typing'

export interface SquareContext {
  x: number
  y: number
  piece?: Piece
  color?: Color
}

export type SquareEvent =
  | { type: 'SELECT' }
  | { type: 'UNSELECT' }
  | { type: 'HIGHLIGHT' }
  | { type: 'UPDATE'; values: { piece: Piece; color: Color } }

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
    idle: {},
    selected: {},
    highlighted: {},
  },
  on: {
    SELECT: 'selected',
    UNSELECT: 'idle',
    HIGHLIGHT: 'highlighted',
    UPDATE: {
      actions: assign({
        piece: (_, event) => event.values.piece,
        color: (_, event) => event.values.color,
      }),
    },
  },
})

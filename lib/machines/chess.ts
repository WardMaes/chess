import { assign, interpret, Interpreter, Machine, spawn } from 'xstate'

import { defaultSquareConfig } from '../config'
import { Color, Piece } from '../typing'

import { squareMachine, SquareContext, SquareEvent } from './square'

export type SquareRefType = Interpreter<SquareContext, any, SquareEvent, any>

export interface ChessContext {
  squares: {
    ref: SquareRefType
  }[]
}

export type ChessEvent = {
  type: 'CLICK_SQUARE'
  squareRef: SquareRefType
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
          CLICK_SQUARE: [
            {
              actions: ['move', 'unselectSquares'],
              cond: 'squareIsHighlighted',
            },
            {
              actions: ['unselectSquares', 'selectSquare', 'highlightMoves'],
            },
          ],
        },
      },
      playing: {},
    },
  },
  {
    actions: {
      unselectSquares: ctx =>
        ctx.squares.forEach(square => square.ref.send('UNSELECT')),
      setSelectedSquare: (_, event) =>
        assign({ selectedSquare: event.squareRef }),
      selectSquare: (_, event) => event.squareRef.send('SELECT'),
      highlightMoves: (ctx, event) => {
        const possibleMoves = getMoves(ctx.squares, event.squareRef) || []
        possibleMoves.forEach(squareRef => squareRef.send('HIGHLIGHT'))
      },
      move: (ctx, event) => {
        const selectedSquare = ctx.squares.find(
          s => s.ref.state.value === 'selected'
        )!.ref
        event.squareRef.send('UPDATE', {
          values: {
            ...selectedSquare.state.context,
          },
        })
        selectedSquare.send('UPDATE', { values: {} })
      },
    },
    guards: {
      squareIsHighlighted: (_, event) =>
        event.squareRef.state.value === 'highlighted',
    },
  }
)

const chessService = interpret(chessMachine)

chessService.subscribe(state => {
  if (state.matches('idle')) {
    // from the ChessState typestate, `squares` will be defined
    console.log('idle context', state.context.squares)
  }
})

const getMoves = (
  squares: any[], // TODO: find correct type
  squareRef: SquareRefType
): SquareRefType[] => {
  console.log(squareRef.state)
  const moves: SquareRefType[] = []

  const { context } = squareRef.state

  switch (context.piece) {
    case Piece.pawn:
      if (context.color === Color.black) {
        const move = squares.find(
          s =>
            s.ref.state.context.x === context.x &&
            s.ref.state.context.y === context.y + 1
        )
        if (move) {
          moves.push(move.ref)
        }
      } else {
        const move = squares.find(
          s =>
            s.ref.state.context.x === context.x &&
            s.ref.state.context.y === context.y - 1
        )
        if (move) {
          moves.push(move.ref)
        }
      }
      break
    default:
      break
  }

  return moves
}

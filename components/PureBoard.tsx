import React, { useState, useEffect } from 'react'
import { defaultSquareConfig } from '../lib/config'
import { Color, Piece as PieceName } from '../lib/typing'

const horse = [
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
]
const straight = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
]
const diagonal = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
]
const allDirections = straight.concat(diagonal)
const initialState = defaultSquareConfig()
  .filter((p) => p.piece)
  .map((p, key) => ({ ...p, key }))

export const ChessGame = () => {
  const [pieces, setPieces] = useState(initialState)
  const [selected, setSelected] = useState<PieceType | null>(null)
  const [moves, setMoves] = useState<MoveType[]>([])

  const move = (position: PositionType) => {
    if (selected && !(selected.x === position.x && selected.y === position.y)) {
      const killed = pieces.filter(
        (p) => p.x !== position.x || p.y !== position.y
      )
      selected.x = position.x
      selected.y = position.y
      setPieces(killed)
      setSelected(selected)
    }
  }

  useEffect(() => {
    setMoves(selected ? getMoves(selected, pieces) : [])
  }, [pieces, selected])
  return (
    <PureBoard
      pieces={pieces}
      moves={moves}
      onSquareClick={move}
      onSquareEnter={setSelected}
    />
  )
}

export const PureBoard = ({
  pieces,
  moves,
  onSquareClick,
  onSquareEnter,
}: Props) => {
  return (
    <div className="container">
      <div className="moves">
        {moves.map((move, key) => (
          <Move key={key} move={move} onSquareClick={onSquareClick} />
        ))}
      </div>
      <div className="pieces">
        {pieces.map((piece) => (
          <Piece
            key={piece.key}
            piece={piece}
            onSquareClick={onSquareClick}
            onSquareEnter={onSquareEnter}
          />
        ))}
      </div>
      <Squares />
    </div>
  )
}

function Move({ move, onSquareClick }: MoveProps) {
  // console.log('rerender move', move)
  return (
    <div
      className={'move ' + move.className}
      style={{
        left: 12.5 * move.x + '%',
        top: 12.5 * move.y + '%',
      }}
      onClick={() => onSquareClick(move)}
    />
  )
}

function Piece({ piece, onSquareClick, onSquareEnter }: PieceProps) {
  // console.log('rerender piece', piece)
  return (
    <div
      className="piece"
      style={{
        left: 12.5 * piece.x + '%',
        top: 12.5 * piece.y + '%',
        background: piece.color,
        color: piece.color === Color.black ? 'white' : 'black',
      }}
      onClick={() => onSquareClick(piece)}
      onMouseEnter={() => onSquareEnter(piece)}
    >
      {piece.piece}
    </div>
  )
}

function Squares() {
  // console.log('rerender squares')
  const squares = new Array(64)
    .fill(1)
    .map((_, i) => i % 2 === Math.floor(i / 8) % 2)
  return (
    <div className="grid grid-cols-8 grid-rows-8">
      {squares.map((team, key) => (
        <div
          key={key}
          className="square"
          style={
            team
              ? {}
              : {
                  background: 'black',
                }
          }
        />
      ))}
    </div>
  )
}

// Chess logic

const getMoves = (piece: PieceType, pieces: PieceType[]): MoveType[] => {
  const moves: MoveType[] = []
  const forward = piece.color === Color.black ? 1 : -1

  // Move
  switch (piece.piece) {
    case PieceName.pawn:
      oneStep([[0, forward]], Allow.Move)
      oneStep(diagonal, Allow.Kill)
      break
    case PieceName.rook:
      asFarAsPossible(straight)
      break
    case PieceName.knight:
      oneStep(horse)
      break
    case PieceName.bishop:
      asFarAsPossible(diagonal)
      break
    case PieceName.queen:
      asFarAsPossible(allDirections)
      break
    case PieceName.king:
      oneStep(allDirections)
      break
  }

  return moves

  function oneStep(directions: number[][], allow = Allow.MoveOrKill) {
    return directions.map(([dx, dy]) => {
      let { x, y } = piece
      x += dx
      y += dy
      if (x < 0 || x > 7 || y < 0 || y > 7) {
        return
      }
      if (pieceAt({ x, y })) {
        if (
          [Allow.MoveOrKill, Allow.Kill].includes(allow) &&
          isEnemy({ x, y })
        ) {
          kill(x, y)
        }
        return
      }
      if ([Allow.MoveOrKill, Allow.Move].includes(allow)) {
        highlight(x, y)
      }
    })
  }

  function asFarAsPossible(directions: number[][]) {
    return directions.map(([dx, dy]) => {
      let { x, y } = piece
      while (true) {
        x += dx
        y += dy
        if (x < 0 || x > 7 || y < 0 || y > 7) {
          return
        }
        if (pieceAt({ x, y })) {
          if (isEnemy({ x, y })) {
            kill(x, y)
          }
          return
        }
        highlight(x, y)
      }
    })
  }

  function pieceAt(position: PositionType) {
    return pieces.find((p) => p.x === position.x && p.y === position.y)
  }

  function isEnemy(position: PositionType) {
    const other = pieceAt(position)
    if (!other) {
      throw new Error('Unexpected enemy check, no piece found')
    }
    return other.color !== piece.color
  }

  function highlight(x: number, y: number) {
    return moves.push({
      x,
      y,
      className: 'highlighted',
    })
  }

  function kill(x: number, y: number) {
    return moves.push({
      x,
      y,
      className: 'kill',
    })
  }
}

// Types

enum Allow {
  Kill,
  Move,
  MoveOrKill,
}

type PositionType = {
  x: number
  y: number
}

type MoveType = {
  x: number
  y: number
  className: 'highlighted' | string
}

type PieceType = {
  key: number
  x: number
  y: number
  piece?: PieceName // Should be required?
  color?: Color
}

type Props = {
  onSquareClick: (i) => void
  onSquareEnter: (i) => void
  pieces: PieceType[]
  moves: MoveType[]
}

type MoveProps = {
  onSquareClick: (i) => void
  // onSquareEnter: (i) => void
  move: MoveType
}

type PieceProps = {
  onSquareClick: (i) => void
  onSquareEnter: (i) => void
  piece: PieceType
}

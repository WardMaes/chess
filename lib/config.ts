import { Color, Piece } from './typing'

export function defaultSquareConfig() {
  const squares = []

  squares.push({ x: 0, y: 0, piece: Piece.rook, Color: Color.black })
  squares.push({ x: 1, y: 0, piece: Piece.knight, Color: Color.black })
  squares.push({ x: 2, y: 0, piece: Piece.bishop, Color: Color.black })
  squares.push({ x: 3, y: 0, piece: Piece.queen, Color: Color.black })
  squares.push({ x: 4, y: 0, piece: Piece.king, Color: Color.black })
  squares.push({ x: 5, y: 0, piece: Piece.bishop, Color: Color.black })
  squares.push({ x: 6, y: 0, piece: Piece.knight, Color: Color.black })
  squares.push({ x: 7, y: 0, piece: Piece.rook, Color: Color.black })

  // 1 row of pawns
  for (let i = 0; i < 8; i++) {
    squares.push({
      x: i,
      y: 1,
      piece: Piece.pawn,
      color: Color.black,
    })
  }

  // 4 rows without pieces
  for (let j = 2; j < 6; j++) {
    for (let i = 0; i < 8; i++) {
      squares.push({ x: i, y: j })
    }
  }

  // 1 row of pawns
  for (let i = 0; i < 8; i++) {
    squares.push({
      x: i,
      y: 6,
      piece: Piece.pawn,
      color: Color.white,
    })
  }

  squares.push({ x: 0, y: 7, piece: Piece.rook, color: Color.white })
  squares.push({ x: 1, y: 7, piece: Piece.knight, color: Color.white })
  squares.push({ x: 2, y: 7, piece: Piece.bishop, color: Color.white })
  squares.push({ x: 3, y: 7, piece: Piece.queen, color: Color.white })
  squares.push({ x: 4, y: 7, piece: Piece.king, color: Color.white })
  squares.push({ x: 5, y: 7, piece: Piece.bishop, color: Color.white })
  squares.push({ x: 6, y: 7, piece: Piece.knight, color: Color.white })
  squares.push({ x: 7, y: 7, piece: Piece.rook, color: Color.white })

  return squares
}

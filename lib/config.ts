import { Piece } from "./typing";

export function defaultSquareConfig() {
  const squares = [];

  squares.push({ x: 0, y: 0, piece: Piece.rook });
  squares.push({ x: 1, y: 0, piece: Piece.knight });
  squares.push({ x: 2, y: 0, piece: Piece.bishop });
  squares.push({ x: 3, y: 0, piece: Piece.queen });
  squares.push({ x: 4, y: 0, piece: Piece.king });
  squares.push({ x: 5, y: 0, piece: Piece.bishop });
  squares.push({ x: 6, y: 0, piece: Piece.knight });
  squares.push({ x: 7, y: 0, piece: Piece.rook });

  // 1 row of pawns
  for (let i = 0; i < 8; i++) {
    squares.push({
      x: 1,
      y: i,
      piece: Piece.pawn
    });
  }

  // 4 rows without pieces
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 4; j++) {
      squares.push({ x: j, y: i });
    }
  }

  // 1 row of pawns
  for (let i = 0; i < 8; i++) {
    squares.push({
      x: 1,
      y: i,
      piece: Piece.pawn
    });
  }

  squares.push({ x: 0, y: 7, piece: Piece.rook });
  squares.push({ x: 1, y: 7, piece: Piece.knight });
  squares.push({ x: 2, y: 7, piece: Piece.bishop });
  squares.push({ x: 3, y: 7, piece: Piece.queen });
  squares.push({ x: 4, y: 7, piece: Piece.king });
  squares.push({ x: 5, y: 7, piece: Piece.bishop });
  squares.push({ x: 6, y: 7, piece: Piece.knight });
  squares.push({ x: 7, y: 7, piece: Piece.rook });

  return squares;
}

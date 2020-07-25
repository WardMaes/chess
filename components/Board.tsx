import { useContext } from 'react'

import { chessContext } from '../lib/context'
import { SquareRefType } from '../lib/machines/chess'

import Square from './Square'

const Board = () => {
  const [state, send] = useContext(chessContext)

  function handleSquareClick(square: SquareRefType) {
    send({ type: 'CLICK_SQUARE', squareRef: square })
  }

  return (
    <div className="container">
      <div className="grid grid-cols-8 grid-rows-8">
        {state.context.squares.map(square => (
          <Square
            key={square.ref.id}
            squareRef={square.ref}
            handleClick={handleSquareClick}
          />
        ))}
      </div>
    </div>
  )
}

export default Board

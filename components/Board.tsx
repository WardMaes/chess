import { Interpreter } from 'xstate'
import { useContext } from 'react'

import { chessContext } from '../lib/context'
import { SquareContext, SquareEvent } from '../lib/machines/square'

import Square from './Square'

const Board = () => {
  const [state, send] = useContext(chessContext)

  function handleSquareClick(
    square: Interpreter<SquareContext, any, SquareEvent, any>
  ) {
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

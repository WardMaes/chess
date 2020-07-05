import { Interpreter } from 'xstate'
import { useService } from '@xstate/react'

import { SquareContext, SquareEvent } from '../lib/machines/square'

type SquareProps = {
  squareRef: Interpreter<SquareContext, any, SquareEvent, any>
  handleClick: (
    squareRef: Interpreter<SquareContext, any, SquareEvent, any>
  ) => void
}

const Square = ({ squareRef, handleClick }: SquareProps) => {
  const [state] = useService(squareRef)
  const { x, y, piece } = state.context

  return (
    <div className="square" onClick={() => handleClick(squareRef)}>
      <div>
        <div>
          ({x}, {y})
        </div>
        <div> {piece} </div>
        {state.value}
      </div>
    </div>
  )
}

export default Square

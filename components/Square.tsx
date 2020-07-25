import { useService } from '@xstate/react'

import { SquareRefType } from '../lib/machines/chess'

type SquareProps = {
  squareRef: SquareRefType
  handleClick: (squareRef: SquareRefType) => void
}

const Square = ({ squareRef, handleClick }: SquareProps) => {
  const [state] = useService(squareRef)
  const { x, y, piece } = state.context

  return (
    <div
      className={
        'square ' +
        (state.value === 'highlighted'
          ? piece
            ? 'highlighted-enemy'
            : 'highlighted'
          : '')
      }
      onClick={() => handleClick(squareRef)}
    >
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

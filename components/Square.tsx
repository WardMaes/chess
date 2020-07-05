import { SquareContext } from '../lib/machines/square'

type SquareProps = {
  square: SquareContext
}

const Square = ({ square }: SquareProps) => {
  const { x, y, piece } = square
  return (
    <div className="square">
      <div>
        <div>
          ({x}, {y})
        </div>
        <div> {piece} </div>
      </div>
    </div>
  )
}

export default Square

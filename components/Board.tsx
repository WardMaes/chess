import { useContext } from 'react'

import { chessContext } from '../lib/context'

import Square from './Square'

const Board = () => {
  const [state] = useContext(chessContext)
  return (
    <div className="container">
      <div className="grid grid-cols-8 grid-rows-8">
        {state.context.squares.map(square => (
          <Square key={square.ref.id} square={square} />
        ))}
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  )
}

export default Board

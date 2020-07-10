import { NextComponentType } from 'next'
import { AppContext, AppInitialProps, AppProps } from 'next/app'
import { useMachine } from '@xstate/react'

import '../styles/index.css'
import { chessMachine } from '../lib/machines/chess'
import { chessContext as ChessContext } from '../lib/context'

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => {
  const modifiedPageProps = { ...pageProps }

  const machine = useMachine(chessMachine, { devTools: true })

  return (
    <ChessContext.Provider value={machine}>
      <Component {...modifiedPageProps} />
    </ChessContext.Provider>
  )
}

export default MyApp

import { NextComponentType } from 'next'
import { AppContext, AppInitialProps, AppProps } from 'next/app'
import { useMachine } from '@xstate/react'

import '../styles/index.css'
import { chessMachine } from '../lib/machines/chess'
import { chessContext as ChessContext } from '../lib/context'

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  // eslint-disable-next-line react/prop-types
  Component,
  // eslint-disable-next-line react/prop-types
  pageProps,
}) => {
  const modifiedPageProps = { ...pageProps }

  const [state, send, service] = useMachine(chessMachine, { devTools: true })
  const machine = [state, send, service]

  return (
    // @ts-ignore
    <ChessContext.Provider value={machine}>
      <Component {...modifiedPageProps} />
    </ChessContext.Provider>
  )
}

export default MyApp

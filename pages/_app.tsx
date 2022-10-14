import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WCComingChatProvider } from 'walletconnect-cc-provider'
import 'antd/dist/antd.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WCComingChatProvider>
      <Head>
        <title>walletconnect-example</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </WCComingChatProvider>
  )
}

export default MyApp


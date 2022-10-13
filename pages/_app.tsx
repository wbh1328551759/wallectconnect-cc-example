import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WCComingChatProvider } from 'walletconnect-cc-provider'
import 'antd/dist/antd.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WCComingChatProvider>
      <Component {...pageProps} />
    </WCComingChatProvider>
  )
}

export default MyApp


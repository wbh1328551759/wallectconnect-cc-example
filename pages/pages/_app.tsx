import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WCComingChatProvider } from 'walletconnect-cc-provider'
import 'antd/dist/antd.css'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { customChain } from '../constants/customChain'

export const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, ...customChain],
  [publicProvider()],
)

export const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
        shimChainChangedDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <WCComingChatProvider connectorOpts={{bridge: 'https://bridge.walletconnect.org'}}>
        <Component {...pageProps} />
      </WCComingChatProvider>
    </WagmiConfig>
  )
}

export default MyApp


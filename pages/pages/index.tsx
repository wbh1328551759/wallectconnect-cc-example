import { Button } from 'antd'
import type { NextPage } from 'next'
import { useState } from 'react'
import { useWCConnector } from 'walletconnect-cc-provider'
import SwitchNetwork from '../components/switchNetwork'

const Home: NextPage = () => {
  const {connect, evmAddress, chainId, connector, aptosAddress, chain} = useWCConnector()
  const [result, setResult] = useState<any>(null)

  const testAptosSignMessage = async () => {
    if (!connector) {
      return
    }

    const messageData = [
      {
        address: true,
        application: true,
        chainId: true,
        message:
          'Click to sign in and accept the Move China Terms of Service. This request will not cost any gas fees.',
        nonce: Math.floor(Math.random() * 10000),
      },
    ]

    try {
      const result = await connector.signAptosMessage(messageData)

      const formattedResult = {
        method: 'aptos_sign',
        aptosAddress,
        valid: true,
        result,
      }

      // updateConnector(connector)
      setResult(formattedResult)
    } catch (error) {
      console.error(error)
      // updateConnector(connector)
      setResult(null)
    }
  }

  const testAptosSignTransaction = async () => {
    if (!connector) {
      return
    }

    const txPayload = [
      {
        function: '0x1::coin::transfer',
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
        arguments: ['0xeb442855143ce3e26babc6152ad98e9da7db7f0820f08be3d006535b663a6292', '1000'],
      },
    ]

    try {
      const result = await connector.signAptosTransaction(txPayload)
      const formattedResult = {
        method: 'aptos_signTransaction',
        aptosAddress,
        valid: true,
        result,
      }

      // updateConnector(connector)
      setResult(formattedResult)
    } catch (error) {
      console.error(error)
      // updateConnector(connector)
      setResult(null)
    }
  }

  const testAptosSignAndSendTransaction = async () => {
    if (!connector) {
      return
    }

    const txPayload = [
      {
        function: '0x1::coin::transfer',
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
        arguments: ['0xeb442855143ce3e26babc6152ad98e9da7db7f0820f08be3d006535b663a6292', '1000'],
      },
    ]

    try {
      const result = await connector.sendAptosTransaction(txPayload)
      const formattedResult = {
        method: 'aptos_sendTransaction',
        aptosAddress,
        valid: true,
        result,
      }

      // updateConnector(connector)
      setResult(formattedResult)
    } catch (error) {
      console.error(error)
      // updateConnector(connector)
      setResult(null)
    }
  }

  const disconnect = () => {
    if (connector) {
      connector.killSession()
    }
  }
  return (
    <div style={{ padding: '20px'}}>
      <Button onClick={connect}>connect</Button>
      <Button onClick={disconnect}>disconnect</Button>

      <p>evmAddress: {evmAddress}</p>
      <p>aptosAddress: {aptosAddress}</p>
      <p>currentChain: {chain ? chain : chainId}</p>
      <p>chainId: {chainId && chainId}</p>
      <p>chain: {connector?.chain}</p>
      <p>
        <Button onClick={testAptosSignMessage}>{'aptos_sign'}</Button>
      </p>
      <p>
        <Button onClick={testAptosSignTransaction}>{'aptos_signTransaction'}</Button>
      </p>
      <p>
        <Button onClick={testAptosSignAndSendTransaction}>{'aptos_sendTransaction'}</Button>
      </p>
      <div>
        {result &&
        Object.keys(result).map(k => (
          <p key={k}>
            <span>{k}：</span>
            <span>{result[k].toString()}</span>
          </p>
        ))}
      </div>

      <SwitchNetwork />

    </div>
  )
}

export default Home

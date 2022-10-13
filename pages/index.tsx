import { Button } from 'antd'
import type { NextPage } from 'next'
import { useState } from 'react'
import { useWCConnector } from 'walletconnect-cc-provider'
import SwitchNetwork from '../components/switchNetwork'
import { apiGetAccountNonce, apiGetGasPrices } from '../utils/api'
import {convertAmountToRawNumber, convertStringToHex } from '../utils/bignumber'
import { eip712 } from '../utils/eip712'
import {hashMessage, hashTypedDataMessage, sanitizeHex, verifySignature } from '../utils/utilities'
import {convertUtf8ToHex} from '@walletconnect/utils'

const Home: NextPage = () => {
  const {connect, evmAddress, chainId, connector, aptosAddress, chain, updateConnector} = useWCConnector()
  const [result, setResult] = useState<any>(null)

  const testSendTransaction = async () => {
    if (!connector) {
      return;
    }

    const from = evmAddress;

    // to
    const to = evmAddress;

    // nonce
    const _nonce = await apiGetAccountNonce(evmAddress, chainId);
    const nonce = sanitizeHex(convertStringToHex(_nonce));

    // gasPrice
    const gasPrices = await apiGetGasPrices();
    const _gasPrice = gasPrices.slow.price;
    const gasPrice = sanitizeHex(convertStringToHex(convertAmountToRawNumber(_gasPrice, 9)));

    // gasLimit
    const _gasLimit = 21000;
    const gasLimit = sanitizeHex(convertStringToHex(_gasLimit));

    // value
    const _value = 0;
    const value = sanitizeHex(convertStringToHex(_value));

    // data
    const data = "0x";

    // test transaction
    const tx = {
      from,
      to,
      nonce,
      gasPrice,
      gasLimit,
      value,
      data,
    };

    try {
      const result = await connector.sendTransaction(tx);

      // format displayed result
      const formattedResult = {
        method: "eth_sendTransaction",
        txHash: result,
        from: evmAddress,
        to: evmAddress,
        value: `${_value} ETH`,
      };

      setResult(formattedResult)
      // updateConnector(connector)
    } catch (error) {
      console.error(error);
      // updateConnector(connector)
      setResult(null)
    }
  };

  const testSignTransaction = async () => {
    if (!connector) {
      return;
    }

    // from
    const from = evmAddress;

    // to
    const to = evmAddress;

    // nonce
    const _nonce = await apiGetAccountNonce(evmAddress, chainId);
    const nonce = sanitizeHex(convertStringToHex(_nonce));

    // gasPrice
    const gasPrices = await apiGetGasPrices();
    const _gasPrice = gasPrices.slow.price;
    const gasPrice = sanitizeHex(convertStringToHex(convertAmountToRawNumber(_gasPrice, 9)));

    // gasLimit
    const _gasLimit = 21000;
    const gasLimit = sanitizeHex(convertStringToHex(_gasLimit));

    // value
    const _value = 0;
    const value = sanitizeHex(convertStringToHex(_value));

    // data
    const data = "0x";

    // test transaction
    const tx = {
      from,
      to,
      nonce,
      gasPrice,
      gasLimit,
      value,
      data,
    };

    try {
      // send transaction
      const result = await connector.signTransaction(tx);

      // format displayed result
      const formattedResult = {
        method: "eth_signTransaction",
        from: evmAddress,
        to: evmAddress,
        value: `${_value} ETH`,
        result,
      };

      // display result

      // updateConnector(connector)
      setResult(formattedResult)
    } catch (error) {
      console.error(error);
      // updateConnector(connector)
      setResult(null)
    }
  };

  const testSignTypedData = async () => {
    if (!connector) {
      return;
    }

    const message = JSON.stringify(eip712.example);

    // eth_signTypedData params
    const msgParams = [evmAddress, message];

    try {
      // sign typed data
      const result = await connector.signTypedData(msgParams);

      // verify signature
      const hash = hashTypedDataMessage(message);
      const valid = await verifySignature(evmAddress, result, hash, chainId);

      // format displayed result
      const formattedResult = {
        method: "eth_signTypedData",
        evmAddress,
        valid,
        result,
      };

      // updateConnector(connector)
      setResult(formattedResult)

    } catch (error) {
      console.error(error);
      // updateConnector(connector)
      setResult(null)
    }
  };

  const testLegacySignMessage = async () => {
    if (!connector) {
      return;
    }

    // test message
    const message = `My email is john@doe.com - ${new Date().toUTCString()}`;

    // hash message
    const hash = hashMessage(message);

    // eth_sign params
    const msgParams = [evmAddress, hash];

    try {
      const result = await connector.signMessage(msgParams);

      // verify signature
      const valid = await verifySignature(evmAddress, result, hash, chainId);

      // format displayed result
      const formattedResult = {
        method: "eth_sign (legacy)",
        evmAddress,
        valid,
        result,
      };
      console.log('result', result)

      // display result
      setResult(formattedResult)
      // updateConnector(connector)
    } catch (error) {
      console.error(error);
      // updateConnector(connector)
      setResult(null)
    }
  };

  const testStandardSignMessage = async () => {
    if (!connector) {
      return;
    }

    // test message
    const message = `My email is john@doe.com - ${new Date().toUTCString()}`;

    // encode message (hex)
    const hexMsg = convertUtf8ToHex(message);

    // eth_sign params
    const msgParams = [evmAddress, hexMsg];

    try {
      // send message
      const result = await connector.signMessage(msgParams);

      // verify signature
      const hash = hashMessage(message);
      const valid = await verifySignature(evmAddress, result, hash, chainId);

      // format displayed result
      const formattedResult = {
        method: "eth_sign (standard)",
        evmAddress,
        valid,
        result,
      };

      // display result
      setResult(formattedResult)
      // updateConnector(connector)
    } catch (error) {
      console.error(error);
      setResult(null)
      // updateConnector(connector)
    }
  };

  const testPersonalSignMessage = async () => {
    if (!connector) {
      return;
    }

    // test message
    const message = `My email is john@doe.com - ${new Date().toUTCString()}`;

    // encode message (hex)
    const hexMsg = convertUtf8ToHex(message);

    // eth_sign params
    const msgParams = [hexMsg, evmAddress];

    try {
      const result = await connector.signPersonalMessage(msgParams);

      // verify signature
      const hash = hashMessage(message);
      const valid = await verifySignature(evmAddress, result, hash, chainId);

      // format displayed result
      const formattedResult = {
        method: "personal_sign",
        evmAddress,
        valid,
        result,
      };

      setResult(formattedResult)
      // updateConnector(connector)

    } catch (error) {
      console.error(error);
      setResult(null)
      // updateConnector(connector)
    }
  };

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
        nonce: Math.floor(Math.random() * 10000).toString(),
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

      updateConnector(connector)
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
      <div>
        <h2>evm transaction</h2>
          <Button onClick={testSendTransaction}>{'eth_sendTransaction'}</Button>
          <Button onClick={testSignTransaction}>{'eth_signTransaction'}</Button>
          <Button onClick={testSignTypedData}>{'eth_signTypedData'}</Button>
          <Button onClick={testLegacySignMessage}>{'eth_sign (legacy)'}</Button>
          <Button onClick={testStandardSignMessage}>{'eth_sign (standard)'}</Button>
          <Button onClick={testPersonalSignMessage}>{'personal_sign'}</Button>
      </div>
      <div>
        <h2>aptos transaction</h2>
        <Button onClick={testAptosSignMessage}>{'aptos_sign'}</Button>
        <Button onClick={testAptosSignTransaction}>{'aptos_signTransaction'}</Button>
        <Button onClick={testAptosSignAndSendTransaction}>{'aptos_sendTransaction'}</Button>
      </div>

      <div>
        <h2>Result</h2>
        {result &&
        Object.keys(result).map(k => (
          <p key={k}>
            <span>{k}：</span>
            <span>{result[k].toString()}</span>
          </p>
        ))}
      </div>

      <h2>network</h2>
      <SwitchNetwork />

    </div>
  )
}

export default Home


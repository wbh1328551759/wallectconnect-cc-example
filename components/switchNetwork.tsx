import { Button } from 'antd';
import React, {useEffect} from 'react';
import {useWCConnector} from 'walletconnect-cc-provider'
import {customChain} from '../constants/customChain'

const SwitchNetwork: React.FC = ({}) => {
  const { switchNetwork } = useWCConnector()

  return (
    <div style={{ marginBottom: '20px'}}>
      <div>
        <div>
          evm: {customChain.map(c => (
          <Button key={c.id} onClick={() => {
            switchNetwork({ chainId: c.id.toString(), chain: ''})
          }}>
            {c.name}
          </Button>
        ))}
        </div>

        <div style={{ marginTop: '20px'}}>
          aptos: {
            <>
              <Button onClick={() =>
                switchNetwork({ chainId: '', chain: 'aptos'})
              }>aptos</Button>
              <Button onClick={() =>
                switchNetwork({ chainId: '', chain: 'aptos_testnet'})
              }>aptos_testnet</Button>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default SwitchNetwork
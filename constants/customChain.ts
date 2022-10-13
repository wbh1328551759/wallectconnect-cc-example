export const customChain = [
  {
    id: 56,
    name: 'binance',
    network: 'binance',
    nativeCurrency: {
      decimals: 18,
      name: 'BNB',
      symbol: 'BNB',
    },
    rpcUrls: {
      default: 'https://bsc-dataseed3.ninicoin.io',
    },
    blockExplorers: {
      default: { name: 'binance', url: 'https://www.bscscan.com' },
    },
    testnet: false,
  },
  {
    id: 43114,
    name: 'avalanche',
    network: 'avalanche',
    nativeCurrency: {
      decimals: 18,
      name: 'AVAX',
      symbol: 'AVAX',
    },
    rpcUrls: {
      default: 'https://api.avax.network/ext/bc/C/rpc',
    },
    blockExplorers: {
      default: { name: 'avalanche', url: 'https://snowtrace.io' },
    },
    testnet: false,
  },
  {
    id: 137,
    name: 'polygon',
    network: 'polygon',
    nativeCurrency: {
      decimals: 18,
      name: 'MATIC',
      symbol: 'MATIC',
    },
    rpcUrls: {
      default: 'https://polygon-rpc.com',
    },
    blockExplorers: {
      default: { name: 'polygon', url: 'https://polygonscan.com' },
    },
    testnet: false,
  },
  {
    id: 42161,
    name: 'arbitrum',
    network: 'arbitrum',
    nativeCurrency: {
      decimals: 18,
      name: 'ARBITRUMETH',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: 'https://rpc.ankr.com/arbitrum',
    },
    blockExplorers: {
      default: { name: 'arbitrum', url: 'https://arbiscan.io' },
    },
    testnet: false,
  },
  {
    id: 10,
    name: 'optimism',
    network: 'optimism',
    nativeCurrency: {
      decimals: 18,
      name: 'OPTIMISMETH',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: 'https://mainnet.optimism.io',
    },
    blockExplorers: {
      default: { name: 'optimism', url: 'https://optimistic.etherscan.io' },
    },
    testnet: false,
  },

  {
    id: 4,
    name: 'rinkeby',
    network: 'rinkeby',
    nativeCurrency: {
      decimals: 18,
      name: 'RinkebyETH',
      symbol: 'RinkebyETH',
    },
    rpcUrls: {
      default: 'https://rinkeby.infura.io/v3/5f4fb75602d1400d8238df6041c207af',
    },
    blockExplorers: {
      default: { name: 'rinkeby', url: 'https://rinkeby.etherscan.io' },
    },
    testnet: true,
  },
  {
    id: 69,
    name: 'optimism-test',
    network: 'optimism-test',
    nativeCurrency: {
      decimals: 18,
      name: 'ETH',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: 'https://kovan.optimism.io',
    },
    blockExplorers: {
      default: { name: 'optimism-test', url: 'https://kovan-optimistic.etherscan.io' },
    },
    testnet: true,
  },
  {
    id: 80001,
    name: 'polygon-test',
    network: 'polygon-test',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://rpc-mumbai.maticvigil.com',
    },
    blockExplorers: {
      default: { name: 'optimism', url: 'https://mumbai.polygonscan.com' },
    },
    testnet: true,
  },
  {
    id: 43113,
    name: 'avax-test',
    network: 'avax-test',
    nativeCurrency: {
      decimals: 18,
      name: 'AVAX',
      symbol: 'AVAX',
    },
    rpcUrls: {
      default: 'https://api.avax-test.network/ext/bc/C/rpc',
    },
    blockExplorers: {
      default: { name: 'avax', url: 'https://testnet.avascan.info' },
    },
    testnet: true,
  }
]
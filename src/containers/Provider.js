import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
    binancechainwallet: {
        package: true
    },
    walletlink: {
      package: CoinbaseWalletSDK, // Required
      options: {
        rpc: {
            97: 'https://red-radial-cherry.bsc-testnet.discover.quiknode.pro/8f39ff05c377049e3e7b9b2335bb476f60d5befd/'
        },
        chainId: 97
      },
    },
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        rpc: {
            97: 'https://red-radial-cherry.bsc-testnet.discover.quiknode.pro/8f39ff05c377049e3e7b9b2335bb476f60d5befd/'
        },
        chainId: 97
      },
    },
  };
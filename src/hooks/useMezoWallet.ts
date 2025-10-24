import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// Boar API configuration
const BOAR_API_KEY = '81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c';
const MEZO_RPC_HTTP = `https://rpc-http.mezo.boar.network/${BOAR_API_KEY}`;
const MEZO_RPC_WSS = `wss://rpc-ws.mezo.boar.network/${BOAR_API_KEY}`;
const MEZO_CHAIN_ID = 31612;

export const useMezoWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    // Check if already connected
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
        if (accounts.length > 0) {
          window.ethereum.request({ method: 'eth_chainId' }).then((chainId: string) => {
            if (parseInt(chainId, 16) === MEZO_CHAIN_ID) {
              setAddress(accounts[0]);
              setIsConnected(true);
            }
          });
        }
      });

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
        } else {
          setAddress(null);
          setIsConnected(false);
        }
      });

      // Listen for chain changes
      window.ethereum.on('chainChanged', (chainId: string) => {
        if (parseInt(chainId, 16) === MEZO_CHAIN_ID) {
          window.ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
            if (accounts.length > 0) {
              setAddress(accounts[0]);
              setIsConnected(true);
            }
          });
        } else {
          setIsConnected(false);
        }
      });
    }

    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, []);

  const connect = async () => {
    try {
      if (!window.ethereum) {
        toast.error('Please install MetaMask or another Web3 wallet');
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Add or switch to Mezo Mainnet
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${MEZO_CHAIN_ID.toString(16)}` }],
        });
      } catch (switchError: any) {
        // Chain doesn't exist, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${MEZO_CHAIN_ID.toString(16)}`,
                chainName: 'Mezo Mainnet',
                nativeCurrency: {
                  name: 'Bitcoin',
                  symbol: 'BTC',
                  decimals: 18,
                },
                rpcUrls: [MEZO_RPC_HTTP],
                blockExplorerUrls: ['https://explorer.mezo.org'],
              },
            ],
          });
        } else {
          throw switchError;
        }
      }

      setAddress(accounts[0]);
      setIsConnected(true);
      toast.success('Connected to Mezo Mainnet via Boar Network!');
    } catch (error) {
      toast.error('Failed to connect to Mezo Mainnet');
      console.error(error);
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress(null);
    toast.info('Disconnected from Mezo Mainnet');
  };

  return {
    isConnected,
    address,
    connect,
    disconnect,
    chainId: MEZO_CHAIN_ID,
    rpcUrl: MEZO_RPC_HTTP,
    apiKey: BOAR_API_KEY,
  };
};

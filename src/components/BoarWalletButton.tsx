import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { toast } from 'sonner';
import { createWalletClient, custom, http } from 'viem';
import { mezoMainnet } from '@/config/wagmi';

// Boar API configuration
const BOAR_API_KEY = '81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c';
const MEZO_RPC_HTTP = `https://rpc-http.mezo.boar.network/${BOAR_API_KEY}`;
const MEZO_RPC_WSS = `wss://rpc-ws.mezo.boar.network/${BOAR_API_KEY}`;
const MEZO_CHAIN_ID = 31612;

export const BoarWalletButton = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      // Boar wallet connection with Mezo mainnet
      // RPC: https://rpc-http.mezo.boar.network/81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c
      // WSS: wss://rpc-ws.mezo.boar.network/81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c
      // Chain ID: 31612
      
      if (!window.ethereum) {
        toast.error('Please install a Web3 wallet (e.g., MetaMask)');
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
      toast.success(`Connected to Mezo Mainnet via Boar Network!`);
    } catch (error) {
      toast.error('Failed to connect to Mezo Mainnet');
      console.error(error);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAddress(null);
    toast.info('Disconnected from Mezo Mainnet');
  };

  if (isConnected && address) {
    return (
      <Button
        variant="wallet"
        size="lg"
        onClick={handleDisconnect}
        className="gap-3"
      >
        <Wallet className="w-5 h-5" />
        Mezo: {address.slice(0, 6)}...{address.slice(-4)}
      </Button>
    );
  }

  return (
    <Button
      variant="wallet"
      size="lg"
      onClick={handleConnect}
      className="gap-3"
    >
      <Wallet className="w-5 h-5" />
      Connect to Mezo
    </Button>
  );
};

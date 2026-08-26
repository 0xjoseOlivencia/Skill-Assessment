import React from "react";
import { useAccount, useDisconnect, useChainId, useSwitchChain } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { polygonAmoy } from "wagmi/chains";

const WalletConnect: React.FC = () => {
  const { address, isConnecting, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { openConnectModal } = useConnectModal();
  const disconnectWallet = () => {
    disconnect();
  };

  const isCorrectNetwork = chainId === polygonAmoy.id;

  const truncateAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  if (isConnecting) {
    return (
      <div className="wallet-card">
        <div className="flex items-center justify-center gap-3">
          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <span className="font-manrope text-sm text-muted-foreground">
            Connecting wallet...
          </span>
        </div>
      </div>
    );
  }

  if (!isConnected || !address) {
    return (
      <div className="wallet-card">
        <h3 className="font-fraunces text-lg font-bold text-foreground mb-2">
          Web3 Wallet
        </h3>
        <p className="font-manrope text-sm text-muted-foreground mb-4">
          Connect your wallet to interact with this property on-chain.
        </p>
        <button onClick={openConnectModal} className="wallet-btn-primary">
          Connect Wallet
        </button>
      </div>
    );
  }

  if (!isCorrectNetwork) {
    return (
      <div className="wallet-card">
        <h3 className="font-fraunces text-lg font-bold text-foreground mb-2">
          Web3 Wallet
        </h3>
        <div className="wallet-warning mb-4">
          <div className="flex items-start gap-2">
            <span className="text-amber-500 text-lg leading-none"></span>
            <div>
              <p className="font-manrope text-sm font-semibold text-amber-800">
                Wrong Network
              </p>
              <p className="font-manrope text-xs text-amber-700 mt-1">
                Please switch to Polygon Amoy to continue.
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => switchChain({ chainId: polygonAmoy.id })}
          className="wallet-btn-switch mb-2"
        >
          Switch to Polygon Amoy
        </button>
        <button onClick={disconnectWallet} className="wallet-btn-text">
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="wallet-card">
      <h3 className="font-fraunces text-lg font-bold text-foreground mb-4">
        Web3 Wallet
      </h3>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-accent rounded-full" />
        </div>
        <div>
          <p className="font-manrope text-sm font-semibold text-foreground">
            {truncateAddress(address)}
          </p>
          <span className="wallet-badge">Polygon Amoy</span>
        </div>
      </div>
      <button onClick={disconnectWallet} className="wallet-btn-disconnect">
        Disconnect
      </button>
    </div>
  );
};

export default WalletConnect;

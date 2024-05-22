import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const LoginPanel = () => {
  const { connected } = useWallet();

  return (
    <div>
      {connected ? (
        <p>Wallet connected</p>
      ) : (
        <WalletMultiButton />
      )}
    </div>
  );
};

export default LoginPanel;


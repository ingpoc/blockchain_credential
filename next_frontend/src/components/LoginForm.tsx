import React from 'react';
import { useWallet, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const LoginForm = () => {
  const wallet = useWallet();

  return (
    <div>
      {wallet.connected ? (
        <div>
          <p>Connected as {wallet.publicKey.toBase58()}</p>
          <button onClick={() => wallet.disconnect()}>Disconnect Wallet</button>
        </div>
      ) : (
        <WalletMultiButton />
      )}
    </div>
  );
};

export default LoginForm;

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction, clusterApiUrl } from '@solana/web3.js';

export const SolanaContext = createContext(null);

export const SolanaProvider = ({ children }) => {
  const wallet = useWallet();
  const [connection, setConnection] = useState(new Connection(clusterApiUrl('devnet')));

  // Function to add an executor using a public key
  const addExecutor = async (executorPublicKey) => {
    try {
      const executorPubKey = new PublicKey(executorPublicKey);
      const transaction = new Transaction();
      // Add transaction logic here
      const signature = await wallet.sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature);
      console.log('Transaction success:', signature);
    } catch (error) {
      console.error('Transaction failed:', error);
      throw new Error('Failed to add executor.'); // Enhance error handling
    }
  };

  // Listen to changes in wallet and connection
  useEffect(() => {
    if (wallet.connected) {
      setConnection(new Connection(clusterApiUrl('devnet'), 'confirmed'));
    }
  }, [wallet.connected]);

  return (
    <SolanaContext.Provider value={{ addExecutor, wallet, connection }}>
      {children}
    </SolanaContext.Provider>
  );
};

export const useSolana = () => useContext(SolanaContext);

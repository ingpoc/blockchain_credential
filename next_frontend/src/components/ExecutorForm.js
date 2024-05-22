import React, { useState } from 'react';
import { useSolana } from '../contexts/SolanaContext';
import { PublicKey } from '@solana/web3.js';

const ExecutorForm = () => {
  const [executorPublicKey, setExecutorPublicKey] = useState('');
  const { addExecutor } = useSolana();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      new PublicKey(executorPublicKey); // Validates the public key
      await addExecutor(executorPublicKey);
      setExecutorPublicKey('');
    } catch (error) {
      alert('Invalid public key');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="executorPublicKey"
        value={executorPublicKey}
        onChange={(e) => setExecutorPublicKey(e.target.value)}
        placeholder="Enter Executor's Public Key"
      />
      <button type="submit">Add Executor</button>
    </form>
  );
};

export default ExecutorForm;

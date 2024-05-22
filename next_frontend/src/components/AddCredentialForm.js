import React, { useState } from 'react';
import { useSolana } from '../contexts/SolanaContext';
import CryptoJS from 'crypto-js';

const AddCredentialForm = () => {
  const [credential, setCredential] = useState('');
  const { addCredential } = useSolana();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const encrypted = CryptoJS.AES.encrypt(credential, 'secret key 123').toString();
    await addCredential(encrypted);
    setCredential('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={credential}
        onChange={(e) => setCredential(e.target.value)}
        placeholder="Enter Credential"
      />
      <button type="submit">Add Credential</button>
    </form>
  );
};

export default AddCredentialForm;

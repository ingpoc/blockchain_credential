import React from 'react';
import { SolanaProvider } from '../contexts/SolanaContext';
import LoginForm from '../components/LoginPanel';
import AddCredentialForm from '../components/AddCredentialForm';

export default function Home() {
  return (
    <SolanaProvider>
      <LoginForm />
      <AddCredentialForm />
      {/* More components here */}
    </SolanaProvider>
  );
}

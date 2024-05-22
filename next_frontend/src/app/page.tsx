import React from 'react';
import LoginForm from '../components/LoginForm';
import AddCredentialForm from '../components/AddCredentialForm';
import ExecutorForm from '../components/ExecutorForm';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 text-gray-800">
      <h1 className="text-2xl font-bold">Blockchain Credential Manager</h1>
      
      <section className="my-4">
        <h2 className="text-lg font-semibold">Connect Your Wallet</h2>
        <LoginForm />
      </section>

      <section className="my-4">
        <h2 className="text-lg font-semibold">Add Your Credential</h2>
        <AddCredentialForm />
      </section>

      <section className="my-4">
        <h2 className="text-lg font-semibold">Manage Executors</h2>
        <ExecutorForm />
      </section>

      <footer className="mt-8 text-center text-sm text-gray-500">
        © 2024 Blockchain Credential Management. All rights reserved.
      </footer>
    </main>
  );
}

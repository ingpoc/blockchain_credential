(() => {
  const { Connection, clusterApiUrl, PublicKey, Transaction, SystemProgram } = solanaWeb3;

  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const programId = new PublicKey('GJYdZXvDZ9FEh8PTYeC41qFpVa11CR7265xkdbXNSHeB');
  let solflarePublicKey = null;

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'CONNECT_WALLET') {
      connectWallet().then(response => {
        sendResponse(response);
      });
      return true; // Indicate that the response will be sent asynchronously
    } else if (message.type === 'SAVE_CREDENTIALS') {
      saveCredentials(message.payload.username, message.payload.password).then(response => {
        sendResponse(response);
      });
      return true; // Indicate that the response will be sent asynchronously
    } else if (message.type === 'SOLFLARE_STATUS') {
      if (message.status === 'connected') {
        console.log("Solflare connected:", message.publicKey);
        solflarePublicKey = new PublicKey(message.publicKey);
        sendResponse({ status: 'connected', publicKey: solflarePublicKey.toString() });
      } else if (message.status === 'failed') {
        console.log("Solflare connection failed:", message.message);
        sendResponse({ status: 'failed', message: message.message });
      } else if (message.status === 'not_found') {
        console.log("Solflare not found");
        sendResponse({ status: 'not_found', message: 'Solflare wallet not found. Please install it.' });
      }
    }
  });

  async function connectWallet() {
    try {
      if (typeof window.solflare !== 'undefined' && window.solflare.isSolflare) {
        if (!window.solflare.isConnected) {
          await window.solflare.connect();
        }
        solflarePublicKey = window.solflare.publicKey;
        return { status: 'connected', publicKey: solflarePublicKey.toString() };
      } else {
        return { status: 'not_found', message: 'Solflare wallet not found. Please install it.' };
      }
    } catch (error) {
      return { status: 'failed', message: error.message };
    }
  }

  async function saveCredentials(username, password) {
    if (!solflarePublicKey) {
      return { status: 'failed', message: 'Solflare wallet not connected.' };
    }

    const encryptedCredentials = btoa(`${username}:${password}`);

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: solflarePublicKey,
          toPubkey: programId,
          lamports: 1000 // Example amount, should be set according to your needs
        })
      );

      const signedTransaction = await window.solflare.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());
      await connection.confirmTransaction(signature, 'confirmed');
      return { status: 'success', signature };
    } catch (error) {
      return { status: 'failed', message: error.message };
    }
  }
})();

import { Connection, clusterApiUrl, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import CryptoJS from 'crypto-js';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const programId = new PublicKey('GJYdZXvDZ9FEh8PTYeC41qFpVa11CR7265xkdbXNSHeB');
let solflarePublicKey = null;

async function connectWallet() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { type: 'CONNECT_WALLET' }, (response) => {
        if (response && response.status === 'connected') {
          solflarePublicKey = new PublicKey(response.publicKey);
          resolve({ status: 'connected', publicKey: solflarePublicKey.toString() });
        } else {
          reject({ status: 'failed', message: response.message || 'Failed to connect wallet' });
        }
      });
    });
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message in background:', message);
  if (message.type === 'CONNECT_WALLET') {
    console.log('CONNECT_WALLET message received');
    connectWallet().then(response => {
      console.log('Sending response from CONNECT_WALLET:', response);
      sendResponse(response);
    }).catch(error => {
      console.error('Error connecting wallet:', error);
      sendResponse(error);
    });
    return true; // Indicate that the response will be sent asynchronously
  } else if (message.type === 'SAVE_CREDENTIALS') {
    saveCredentials(message.payload.username, message.payload.password).then(response => {
      sendResponse(response);
    });
    return true; // Indicate that the response will be sent asynchronously
  }
});

// popup.js

document.addEventListener('DOMContentLoaded', () => {
  console.log("Popup script running");

  const connectButton = document.getElementById('connectWallet');
  connectButton.addEventListener('click', () => {
      console.log("Connect wallet button clicked");

      chrome.runtime.sendMessage({ type: 'CONNECT_WALLET' }, (response) => {
          if (chrome.runtime.lastError) {
              console.error("Runtime error:", chrome.runtime.lastError);
              document.getElementById('status').textContent = 'Error: ' + chrome.runtime.lastError.message;
          } else {
              console.log("Response from CONNECT_WALLET:", response);
              if (response.status === 'connected') {
                  document.getElementById('status').textContent = 'Wallet connected: ' + response.publicKey;
              } else {
                  document.getElementById('status').textContent = 'Error: ' + response.message;
              }
          }
      });
  });
});

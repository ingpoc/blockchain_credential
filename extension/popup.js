document.addEventListener('DOMContentLoaded', function() {
    const statusDiv = document.getElementById('status');
    const connectButton = document.getElementById('connectSolflare');
    const credentialForm = document.getElementById('credentialForm');
  
    connectButton.addEventListener('click', async () => {
      console.log('Connect wallet button clicked');
      chrome.runtime.sendMessage({ type: 'CONNECT_WALLET' }, (response) => {
        console.log('Response from CONNECT_WALLET:', response);
        if (response && response.status === 'connected') {
          statusDiv.textContent = `Wallet connected: ${response.publicKey}`;
        } else {
          statusDiv.textContent = `Failed to connect wallet: ${response ? response.message : 'No response'}`;
        }
      });
    });
  
    credentialForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      chrome.runtime.sendMessage({
        type: 'SAVE_CREDENTIALS',
        payload: { username, password }
      }, (response) => {
        console.log('Response from SAVE_CREDENTIALS:', response);
        if (response.status === 'success') {
          statusDiv.textContent = 'Credentials saved successfully!';
        } else {
          statusDiv.textContent = `Failed to save credentials: ${response.message}`;
        }
      });
    });
  });
  
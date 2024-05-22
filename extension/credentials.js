document.addEventListener('DOMContentLoaded', () => {
    console.log("Credentials script running");
  
    // Check wallet connection on page load
    chrome.runtime.sendMessage({ type: 'CHECK_WALLET_CONNECTION' }, (response) => {
      if (response && response.status === 'connected') {
        document.getElementById('walletStatus').textContent = response.publicKey;
      } else {
        document.getElementById('walletStatus').textContent = 'Wallet not connected.';
        window.location.href = 'connect.html';  // Redirect to connect page if not connected
      }
    });
  
    const addButton = document.getElementById('addCredential');
    addButton.addEventListener('click', () => {
      console.log("Add credential button clicked");
      // Implement the logic to add credentials
    });
  });
  
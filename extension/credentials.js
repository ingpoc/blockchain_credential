document.addEventListener('DOMContentLoaded', () => {
  console.log("Credentials script running");

  // Check wallet connection on page load
  chrome.runtime.sendMessage({ type: 'CHECK_WALLET_CONNECTION' }, (response) => {
      if (response && response.status === 'connected') {
          document.getElementById('walletStatus').textContent = response.publicKey;
          // Load stored credentials
          loadCredentials();
      } else {
          document.getElementById('walletStatus').textContent = 'Wallet not connected.';
          window.location.href = 'connect.html';  // Redirect to connect page if not connected
      }
  });

  const addButton = document.getElementById('addCredential');
  addButton.addEventListener('click', () => {
      console.log("Add credential button clicked");
      addCredential();
  });
});

function loadCredentials() {
  // Placeholder function to fetch and display stored credentials from the blockchain
  console.log("Loading credentials...");
  // Example implementation:
  chrome.runtime.sendMessage({ type: 'FETCH_CREDENTIALS' }, (response) => {
      if (response.status === 'success') {
          displayCredentials(response.credentials);
      } else {
          console.error("Failed to load credentials:", response.message);
      }
  });
}

function addCredential() {
  // Placeholder function to add new credentials to the blockchain
  const username = prompt("Enter username:");
  const password = prompt("Enter password:");
  
  if (username && password) {
      console.log("Adding new credential...");
      const newCredential = { username, password };
      chrome.runtime.sendMessage({ type: 'SAVE_CREDENTIAL', credential: newCredential }, (response) => {
          if (response.status === 'success') {
              loadCredentials();
          } else {
              console.error("Failed to save credential:", response.message);
          }
      });
  } else {
      console.log("Credential addition cancelled.");
  }
}

function displayCredentials(credentials) {
  // Placeholder function to display fetched credentials in the UI
  console.log("Displaying credentials:", credentials);
  const credentialContainer = document.getElementById('app');
  credentialContainer.innerHTML = '';  // Clear existing credentials

  credentials.forEach(credential => {
      const credentialElement = document.createElement('div');
      credentialElement.className = 'credential';
      credentialElement.textContent = `Username: ${credential.username}, Password: ${credential.password}`;
      credentialContainer.appendChild(credentialElement);
  });
}

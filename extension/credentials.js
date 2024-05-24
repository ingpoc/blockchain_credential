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
      fetchSiteName();
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

function fetchSiteName() {
  chrome.runtime.sendMessage({ type: 'GET_SITE_NAME' }, (response) => {
      if (response && response.siteName) {
          showAddCredentialForm(response.siteName);
      } else {
          console.error("Failed to get site name");
      }
  });
}

function showAddCredentialForm(siteName) {
  const formHtml = `
      <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Site Name</label>
          <input type="text" id="siteName" class="mt-1 block w-full" value="${siteName}">
      </div>
      <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" id="username" class="mt-1 block w-full">
      </div>
      <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" class="mt-1 block w-full">
      </div>
      <button id="saveCredential" class="btn btn-primary mt-4 w-full">Save Credential</button>
  `;
  const appDiv = document.getElementById('app');
  appDiv.innerHTML = formHtml;

  document.getElementById('saveCredential').addEventListener('click', () => {
      saveCredential();
  });
}

function saveCredential() {
  const siteName = document.getElementById('siteName').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (siteName && username && password) {
      console.log("Encrypting and saving credential...");
      const encryptedCredentials = encryptCredentials(username, password);
      chrome.runtime.sendMessage({ type: 'SAVE_CREDENTIAL', siteName, credentials: encryptedCredentials }, (response) => {
          if (response.status === 'success') {
              loadCredentials();
          } else {
              console.error("Failed to save credential:", response.message);
          }
      });
  } else {
      console.error("All fields are required");
  }
}

function encryptCredentials(username, password) {
  // Implement encryption logic here
  // For now, we will just return the plain credentials as a placeholder
  return { username, password };
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

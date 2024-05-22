document.addEventListener('DOMContentLoaded', () => {
    console.log("Connect script running");

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
                    window.location.href = 'credentials.html';
                } else {
                    document.getElementById('status').textContent = 'Error: ' + response.message;
                }
            }
        });
    });

    // Check wallet connection on page load
    chrome.runtime.sendMessage({ type: 'CHECK_WALLET_CONNECTION' }, (response) => {
        if (response && response.status === 'connected') {
            document.getElementById('status').textContent = 'Wallet connected: ' + response.publicKey;
            window.location.href = 'credentials.html';
        } else {
            document.getElementById('status').textContent = 'Wallet not connected.';
        }
    });
});

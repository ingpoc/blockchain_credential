console.log("Content script loaded");

// Inject the injected.js script into the web page
const script = document.createElement('script');
script.src = chrome.runtime.getURL('injected.js');
script.onload = () => {
    script.remove();
};
(document.head || document.documentElement).appendChild(script);

// Listen for messages from the injected script
window.addEventListener('message', (event) => {
    if (event.source !== window) return;

    if (event.data.type && event.data.type === 'SOLFLARE_STATUS') {
        console.log("Received message from injected script:", event.data);
        chrome.runtime.sendMessage(event.data);
    }
});

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'CONNECT_WALLET') {
        console.log("CONNECT_WALLET message received in content script");
        window.postMessage({ type: 'CONNECT_WALLET' }, '*');
        window.addEventListener('message', (event) => {
            if (event.source !== window) return;

            if (event.data.type && event.data.type === 'SOLFLARE_STATUS') {
                sendResponse(event.data);
            }
        });
        return true; // Indicate that the response will be sent asynchronously
    }
});

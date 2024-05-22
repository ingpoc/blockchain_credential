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

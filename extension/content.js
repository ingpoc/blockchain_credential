console.log("Content script running");

function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}

injectScript(chrome.runtime.getURL('injected.js'), 'body');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received message in content script:", message);

    if (message.type === 'CONNECT_WALLET') {
        console.log("Forwarding CONNECT_WALLET message to injected script");
        window.postMessage({ type: 'CONNECT_WALLET' }, '*');

        window.addEventListener('message', function handler(event) {
            if (event.data.type === 'SOLFLARE_STATUS') {
                console.log("SOLFLARE_STATUS message received in content script:", event.data);
                sendResponse(event.data);
                window.removeEventListener('message', handler);
            }
        });

        return true;  // Indicate that the response will be sent asynchronously
    }

    if (message.type === 'CHECK_WALLET_CONNECTION') {
        console.log("Forwarding CHECK_WALLET_CONNECTION message to injected script");
        window.postMessage({ type: 'CHECK_WALLET_CONNECTION' }, '*');

        window.addEventListener('message', function handler(event) {
            if (event.data.type === 'SOLFLARE_STATUS') {
                console.log("SOLFLARE_STATUS message received in content script:", event.data);
                sendResponse(event.data);
                window.removeEventListener('message', handler);
            }
        });

        return true;  // Indicate that the response will be sent asynchronously
    }
});

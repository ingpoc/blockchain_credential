console.log("Background script running");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received message in background:", message);

    if (message.type === 'CONNECT_WALLET') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'CONNECT_WALLET' }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Runtime error:", chrome.runtime.lastError);
                    sendResponse({
                        status: 'failed',
                        message: chrome.runtime.lastError.message
                    });
                } else {
                    console.log("Response from content script:", response);
                    sendResponse(response);
                }
            });
        });
        return true;  // Indicate that the response will be sent asynchronously
    }

    if (message.type === 'CHECK_WALLET_CONNECTION') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'CHECK_WALLET_CONNECTION' }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Runtime error:", chrome.runtime.lastError);
                    sendResponse({
                        status: 'failed',
                        message: chrome.runtime.lastError.message
                    });
                } else {
                    console.log("Response from content script:", response);
                    sendResponse(response);
                }
            });
        });
        return true;  // Indicate that the response will be sent asynchronously
    }
});

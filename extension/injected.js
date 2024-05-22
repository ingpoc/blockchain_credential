(function() {
    console.log("Injected script loaded");

    function connectSolflareWallet() {
        console.log("Attempting to connect Solflare wallet");
        if (typeof window.solflare !== 'undefined' && window.solflare.isSolflare) {
            if (!window.solflare.isConnected) {
                console.log("Solflare wallet found, connecting...");
                window.solflare.connect().then(() => {
                    console.log("Solflare wallet connected");
                    window.postMessage({
                        type: 'SOLFLARE_STATUS',
                        status: 'connected',
                        publicKey: window.solflare.publicKey.toString()
                    }, '*');
                }).catch(error => {
                    console.log("Solflare wallet connection failed:", error);
                    window.postMessage({
                        type: 'SOLFLARE_STATUS',
                        status: 'failed',
                        message: error.message
                    }, '*');
                });
            } else {
                console.log("Solflare wallet already connected");
                window.postMessage({
                    type: 'SOLFLARE_STATUS',
                    status: 'connected',
                    publicKey: window.solflare.publicKey.toString()
                }, '*');
            }
        } else {
            console.log("Solflare wallet not found");
            window.postMessage({
                type: 'SOLFLARE_STATUS',
                status: 'not_found',
                message: 'Solflare wallet not found. Please install it.'
            }, '*');
        }
    }

    window.addEventListener('message', (event) => {
        if (event.data.type === 'CONNECT_WALLET') {
            console.log("CONNECT_WALLET message received in injected script");
            connectSolflareWallet();
        }

        if (event.data.type === 'CHECK_WALLET_CONNECTION') {
            console.log("CHECK_WALLET_CONNECTION message received in injected script");
            if (typeof window.solflare !== 'undefined' && window.solflare.isSolflare && window.solflare.isConnected) {
                window.postMessage({
                    type: 'SOLFLARE_STATUS',
                    status: 'connected',
                    publicKey: window.solflare.publicKey.toString()
                }, '*');
            } else {
                window.postMessage({
                    type: 'SOLFLARE_STATUS',
                    status: 'not_connected'
                }, '*');
            }
        }
    });
})();

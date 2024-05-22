(function() {
    console.log("Injected script loaded");

    function connectSolflareWallet() {
        if (typeof window.solflare !== 'undefined' && window.solflare.isSolflare) {
            if (!window.solflare.isConnected) {
                window.solflare.connect().then(() => {
                    window.postMessage({
                        type: 'SOLFLARE_STATUS',
                        status: 'connected',
                        publicKey: window.solflare.publicKey.toString()
                    }, '*');
                }).catch(error => {
                    window.postMessage({
                        type: 'SOLFLARE_STATUS',
                        status: 'failed',
                        message: error.message
                    }, '*');
                });
            } else {
                window.postMessage({
                    type: 'SOLFLARE_STATUS',
                    status: 'connected',
                    publicKey: window.solflare.publicKey.toString()
                }, '*');
            }
        } else {
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
    });
})();

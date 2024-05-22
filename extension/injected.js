(function() {
    console.log("Injected script loaded");

    function checkSolflareWallet() {
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
                status: 'not_found'
            }, '*');
        }
    }

    checkSolflareWallet();
})();

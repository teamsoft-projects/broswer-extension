let _globalInterval;

setInterval(function () {
    if (typeof chrome.app.isInstalled !== 'undefined') {
        chrome.runtime.sendMessage({}, resp => {
            let tabId = resp['tabId'];
            let data = resp['data'][tabId];
            let status = data['status'];
            let during = data['during'];
            if (status === 'on') {
                if (!during || _globalInterval) {
                    return;
                }
                _globalInterval = setInterval(function () {
                    location.reload();
                }, during);
                console.log('Refresh interval during ' + during + ' started.')
            } else if (status === 'off' && _globalInterval) {
                clearInterval(_globalInterval);
                _globalInterval = undefined;
                console.log('Refresh interval stopped.')
            }
        });
    }
}, 300);

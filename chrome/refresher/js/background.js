chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
    let tabId = sender.tab.id;
    let data = window.data;
    if (!data[tabId]) {
        data[tabId] = data['_global'];
    }
    sendResponse({tabId: tabId, data: data});
});

let data = window.data;
if (data === 'undefined' || data === undefined || data['_global'] === undefined) {
    window.data = {
        _global: {status: 'on'}
    };
}
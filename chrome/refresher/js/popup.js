'use strict';

document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        let bg = chrome.extension.getBackgroundPage();
        if (!bg.data) {
            bg.data = {};
        }
        $(function () {
            let tabId = tabs[0].id;
            let $during = $('#during');
            switchEvent("#pageSwitch", function () {
                bg.data[tabId] = {status: 'on', during: $during.val()};
            }, function () {
                bg.data[tabId] = {status: 'off', during: $during.val()};
            });
            let pageData = bg.data[tabId];
            if (!pageData) {
                return;
            }
            let status = pageData['status'];
            let during = pageData['during'];
            if (status === 'on') {
                honeySwitch.showOn("#pageSwitch");
            } else if (status === 'off') {
                honeySwitch.showOff("#pageSwitch");
            }
            $during.val(during);
        });
    });
});
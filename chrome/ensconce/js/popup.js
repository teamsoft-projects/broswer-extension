'use strict';

function ensconce(option) {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {option: option}, function (response) {
			let bg = chrome.extension.getBackgroundPage();
			bg['data'][tabs[0].id] = option;
		});
	});
	setTimeout(function () {
		window.close();
	}, 300);
}

document.addEventListener('DOMContentLoaded', function () {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		let bg = chrome.extension.getBackgroundPage();
		if (!bg.data) {
			bg.data = {};
		}
		$(function () {
			switchEvent("#globelSwitch", function () {
				bg.data['_global'] = 'on';
			}, function () {
				bg.data['_global'] = 'off';
			});
			let tabId = tabs[0].id;
			switchEvent("#pageSwitch", function () {
				bg.data[tabId] = 'on';
			}, function () {
				bg.data[tabId] = 'off';
			});
			let global = bg.data['_global'];
			if (!global) {
				global = bg.data['_global'] = 'on';
			}
			if (global === 'off') {
				honeySwitch.showOff("#globelSwitch");
			}
			let page = bg.data[tabId];
			if (!page) {
				page = bg.data[tabId] = global;
			}
			if (page === 'off') {
				honeySwitch.showOff("#pageSwitch");
			}
		});
	});
});
const _mark = 'ensconce';
const canHide = [
	// all images and videos
	'img', 'video',
	// other videos
	'iframe[src^="https://www.zhihu.com/video"]', 'iframe[src^="https://video.zhihu.com/video"]'];
	// ads and sth boring
const alwaysHide = ['div.TopstoryItem--advertCard'];

function ensconce(visibilityState) {
	let $iframe = $("iframe").contents().find("body");
	let $body = $(document.body).add($iframe);
	$.each(canHide, function (k, v) {
		if (visibilityState === 'visible') {
			let $showing = $body.find(v).filter(function () {
				return ($(this).attr(_mark) !== undefined && $(this).attr(_mark) !== visibilityState)
					|| $(this).is(':visible');
			});
			$showing.attr(_mark, visibilityState)
				.css('visibility', visibilityState);
		} else {
			let $hidden = $body.find(v).filter(function () {
				return $(this).attr(_mark) !== visibilityState;
			});
			$hidden.attr(_mark, visibilityState)
				.css('visibility', visibilityState)
		}
	});
	// hide ads
	$.each(alwaysHide, function (k, v) {
		$(v).css('cssText', 'display: none!important');
	});
}

setInterval(function () {
	if (typeof chrome.app.isInstalled !== 'undefined') {
		chrome.runtime.sendMessage({}, resp => {
			let tabId = resp['tabId'];
			let status = resp['data'][tabId];
			if (status === 'on') {
				ensconce('visible');
			} else if (status === 'off') {
				ensconce('hidden');
			}
		});
	}
}, 100);

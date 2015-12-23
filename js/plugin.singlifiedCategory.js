(function () {

	kintone.events.on(['app.record.create.show', 'app.record.edit.show'], function (event) {
		var options = document.querySelectorAll('div.input-category-popup-cybozu input[type=checkbox]');
		var singlifier = function (event) {
			for (var key in options) {
				if (options[key] !== event.srcElement) {
					if (options[key].checked) {
						options[key].onclick = null;
						options[key].click();
						options[key].onclick = singlifier;
					}
				}
			}
		};
		for (var key in options) {
			options[key].onclick = singlifier;
		}
	});

	kintone.events.on(['app.record.create.submit', 'app.record.edit.submit'], function (event) {
		var options = document.querySelectorAll('div.input-category-popup-cybozu input[type=checkbox]');
		for (var key in options) {
			if (options[key].checked) {
				return;
			}
		}
		event.error = 'カテゴリが指定されていません。';
		return event;
	});

}());

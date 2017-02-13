(function () {

	kintone.events.on(['app.record.create.show', 'app.record.edit.show'], function (event) {
		var options = document.querySelectorAll('div.input-category-cybozu span.tree-node-label-cybozu');
		var singlifier = function (event) {
			options.forEach(function (option) {
				if (option !== event.srcElement) {
					if (option.classList.contains('tree-node-select-cybozu')) {
						option.onclick = null;
						option.click();
						option.onclick = singlifier;
					}
				}
			});
			event.srcElement.click();
			event.srcElement.click();
		};
		options.forEach(function (option) {
			option.onclick = singlifier;
		});
	});

	kintone.events.on(['app.record.create.submit', 'app.record.edit.submit'], function (event) {
		if (!document.querySelectorAll('div.input-category-cybozu span.tree-node-select-cybozu').length) {
			event.error = 'カテゴリが指定されていません。';
		}
		return event;
	});

}());

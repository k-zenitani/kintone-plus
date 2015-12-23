(function() {

	kintone.events.on('app.record.index.show', function (event) {
		var tbody = document.querySelector('table.recordlist-gaia tbody');
		var startpos = { x: 0, y: 0 };

		tbody.onmousedown = function (event) {
			startpos.x = event.pageX;
			startpos.y = event.pageY;
		};

		tbody.onclick = function (event) {

			if (document.querySelector('div.recordlist-save-gaia')) {
				return;
			}

			if (Math.abs(event.pageX - startpos.x) > 10 || Math.abs(event.pageY - startpos.y) > 10) {
				return;
			}

			var scanner = event.srcElement;
			var td = null;
			while (scanner && scanner !== event.currentTarget) {
				if (scanner.tagName == 'TD') {
					td = scanner;
				} else if (scanner.tagName == 'TR' && td !== null) {
					if (0 < td.cellIndex && td.cellIndex < scanner.getElementsByTagName('td').length - 1) {
						scanner.querySelector('td a').click();
					}
					return;
				}
				scanner = scanner.parentElement;
			}
		};
	});

}());

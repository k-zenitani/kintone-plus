(function () {

	kintone.events.on('app.record.index.show', function (event) {
		if (!('tableSummary' in settings())) {
			return;
		}
		var footer = document.createElement('tfoot').appendChild(document.createElement('tr'));
		var headings = document.querySelector('table.recordlist-gaia thead').getElementsByTagName('th');
		for (var key in headings) {
			var textKey = (headings[key].innerText === undefined ? 'textContent' : 'innerText');
			footer.appendChild(document.createElement('td')).setAttribute('label', ("" + headings[key][textKey]).trim());
		}

		var old_footer = document.querySelector('table.recordlist-gaia tfoot');
		if (old_footer) {
			old_footer.remove();
		}
		document.querySelector('table.recordlist-gaia').appendChild(footer.parentElement);

		for (var key in settings().tableSummary) {
			var cell = footer.querySelector('td[label="' + key + '"]');
			if (cell) {
				cell.classList.add(settings().tableSummary[key].class);
				settings().tableSummary[key].reducer(cell, event.records);
			}
		}
	});

}());

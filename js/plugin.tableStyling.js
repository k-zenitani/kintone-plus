(function() {

	var wrap = function (collection) {
		if (collection) {
			return collection;
		}
		return [];
	};

	var updateColumnsStyle = function (settings) {
		Object.keys(settings).forEach(function (fieldKey) {
			wrap(kintone.app.getFieldElements(fieldKey)).forEach(function (col) {
				var setting = settings[fieldKey];
				Object.keys(setting).forEach(function (prop) {
					switch (prop) {
					case 'class':
						col.classList.add(setting[prop]);
						break;

					case 'formatter':
						setting.formatter(col);
						break;

					default:
						col.style[prop] = setting[prop];
						break;
					}
				});
			});
		});
	};

	var updateRowsStyle = function (fieldKey, settings) {
		wrap(kintone.app.getFieldElements(fieldKey)).forEach(function (keyField) {
			if (keyField.textContent in settings) {
				var setting = settings[keyField.textContent];

				var row = keyField.parentElement;
				if ('row' in setting) {
					Object.keys(setting.row).forEach(function (prop) {
						if (prop !== 'class') {
							row.style[prop] = setting.row[prop];
						} else {
							row.classList.add(setting.row[prop]);
						}
					});
				}

				if ('col' in setting) {
					var cols = row.getElementsByTagName('td');
					Object.keys(setting.col).forEach(function (prop) {
						for (var i = 0; i < cols.length; i ++) {
							if (prop !== 'class') {
								cols[i].style[prop] = setting.col[prop];
							} else {
								cols[i].classList.add(setting.col[prop]);
							}
						}
					});
				}
			}
		});
	};

	var intervalID = null;
	var updateStyles = function () {
		updateColumnsStyle(settings().tableStyling.cols);
		Object.keys(settings().tableStyling.rows).forEach(function (fieldKey) {
			updateRowsStyle(fieldKey, settings().tableStyling.rows[fieldKey]);
		});
	};

	kintone.events.on('app.record.index.show', function (event) {

		if (!('tableStyling' in settings())) {
			return;
		}

		if (intervalID === null) {

			if ('headerMenuSpace' in settings().tableStyling) {
				kintone.app.getHeaderMenuSpaceElement().innerHTML = settings().tableStyling.headerMenuSpace;
			}

			if ('headerSpace' in settings().tableStyling) {
				kintone.app.getHeaderSpaceElement().innerHTML = settings().tableStyling.headerSpace;
			}

			intervalID = window.setInterval(function () {
				if (document.querySelector('div.recordlist-save-gaia') === null) {
					updateStyles();
				}
			}, 3000);
		}

		updateStyles();
	});

}());

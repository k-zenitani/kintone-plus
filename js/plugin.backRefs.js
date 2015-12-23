(function () {

	kintone.events.on('app.record.detail.show', function (event) {
		if (!('backRefs' in settings())) {
			return;
		}
		var config = settings().backRefs;
		for (var element_id in config) {
			kintone.api('/k/v1/records', 'GET', config[element_id].query(event.record)).then((function () {

				var list_element = kintone.app.record.getSpaceElement(element_id);
				if (!list_element) {
					console.log('ERROR: ' + element_id + ' is missing');
					return;
				}

				var setting = config[element_id];
				return function (response) {
					var html = '';
					if (response.records.length > 0) {
						var headings = [];
						for (var i in setting.values) {
							headings.push(setting.values[i].key);
						}
						for (var key in response.records) {
							var record = response.records[key];
							var values = [];
							for (var i in setting.values) {
								if ('formatter' in setting.values[i]) {
									values.push(setting.values[i].formatter(record));
								} else {
									values.push(record[setting.values[i].key].value);
								}
							}
							html += '<tr><td>' + values.join('</td><td>') + '</td></tr>';
						}
						html = '<thead><tr><th>' + headings.join('</th><th>') + '</th></tr></thead><tbody>' + html + '</tbody>';
						list_element.innerHTML = '<table class="user-backref-list">' + html + '</table>';
					} else {
						list_element.innerHTML = '関連するデータがありません。';
					}
				};
			})());
		}
	});

}());

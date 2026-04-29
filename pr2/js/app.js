let intervalId = null;
let isAutoMode = false;

function getRandomFloat(min, max) {
	let value = Math.random() * (max - min) + min;
	return parseFloat(value.toFixed(1));
}

function getRandomInt(min, max) {
	let value = Math.random() * (max - min) + min;
	return Math.floor(value);
}

function checkStatus(elementId, value, normMin, normMax) {
	let element = document.getElementById(elementId);

	if (value >= normMin && value <= normMax) {
		element.className = "mt-2 fs-5 text-success";
		element.textContent = "● В нормі";
	} else {
		element.className = "mt-2 fs-5 text-danger";
		element.textContent = "▲ Увага";
	}
}

function updateData() {
	let cons = getRandomFloat(0, 15);
	let gen = getRandomFloat(0, 8);
	let bat = getRandomInt(0, 100);
	let temp = getRandomFloat(18, 26);

	document.getElementById('val-consumption').textContent = cons;
	document.getElementById('val-generation').textContent = gen;
	document.getElementById('val-battery').textContent = bat;
	document.getElementById('val-temperature').textContent = temp;

	checkStatus('status-consumption', cons, 2, 10);
	checkStatus('status-generation', gen, 1, 7);
	checkStatus('status-battery', bat, 40, 90);
	checkStatus('status-temperature', temp, 20, 24);

	let balance = gen - cons;
	let balanceElement = document.getElementById('val-balance');

	if (balance > 0) {
		balanceElement.textContent = "+" + balance.toFixed(1) + " кВт";
		balanceElement.className = "float-end fs-5 text-success";
	} else {
		balanceElement.textContent = balance.toFixed(1) + " кВт";
		balanceElement.className = "float-end fs-5 text-danger";
	}

	let acElement = document.getElementById('val-ac');
	if (temp > 24) {
		acElement.innerHTML = '<span class="text-info">Охолодження (Увімк)</span>';
	} else if (temp < 20) {
		acElement.innerHTML = '<span class="text-warning">Обігрів (Увімк)</span>';
	} else {
		acElement.innerHTML = '<span class="text-secondary">Очікування (Вимк)</span>';
	}

	let savings = gen * 4.32 * 24;
	if (savings < 0) {
		savings = 0;
	}
	document.getElementById('val-savings').textContent = Math.floor(savings) + " ₴/доба";

	let now = new Date();
	document.getElementById('last-update').textContent = now.toLocaleTimeString('uk-UA');
}

function toggleAutoUpdate() {
	let btnAuto = document.getElementById('btn-auto');
	let statusText = document.getElementById('auto-status');

	if (isAutoMode === true) {
		clearInterval(intervalId);
		isAutoMode = false;
		btnAuto.className = "btn btn-outline-success";
		statusText.textContent = "Вимк";
	} else {
		intervalId = setInterval(updateData, 3000);
		isAutoMode = true;
		btnAuto.className = "btn btn-success";
		statusText.textContent = "Увімк (3с)";
	}
}

document.addEventListener('DOMContentLoaded', function() {
	let btnUpdate = document.getElementById('btn-update');
	let btnAuto = document.getElementById('btn-auto');

	btnUpdate.addEventListener('click', updateData);
	btnAuto.addEventListener('click', toggleAutoUpdate);

	updateData();
});

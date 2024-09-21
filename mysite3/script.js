// Функция для обновления текущего времени
function updateTime() {
	const now = new Date();
	const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
	document.getElementById('currentTime').textContent = now.toLocaleTimeString('ru-RU', options);
}

// Запускаем обновление времени каждую секунду
setInterval(updateTime, 1000);
updateTime(); // Начальное обновление

document.getElementById('addEntryButton').addEventListener('click', function () {
	const entryInput = document.getElementById('entryInput');
	const entryContent = entryInput.value.trim();

	if (entryContent) {
		const entriesList = document.getElementById('entriesList');
		const now = new Date();
		const timestamp = now.toLocaleString('ru-RU', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});

		const listItem = document.createElement('li');
		listItem.textContent = `${timestamp}: ${entryContent}`; // Добавляем временную метку
		entriesList.appendChild(listItem);

		entryInput.value = ''; // Очистить поле ввода
	} else {
		alert('Пожалуйста, введите запись!');
	}
});

// Функция для установки будильника
document.getElementById('setAlarmButton').addEventListener('click', function () {
	const alarmTimeInput = document.getElementById('alarmTime');
	const alarmTime = alarmTimeInput.value;

	if (!alarmTime) {
		alert('Пожалуйста, установите время будильника!');
		return;
	}

	const now = new Date();
	const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), alarmTime.split(':')[0], alarmTime.split(':')[1]);

	if (alarmDate <= now) {
		alert('Выберите время в будущем!');
		return;
	}

	const timeToAlarm = alarmDate - now;
	const alarmSound = document.getElementById('alarmSound');

	setTimeout(() => {
		alarmSound.play();
		showModal(); // Показываем модальное окно
	}, timeToAlarm);

	alert('Будильник установлен на ' + alarmTime);
});

// Функция для показа модального окна
function showModal() {
	const modal = document.getElementById('alarmModal');
	modal.style.display = "block";

	// Закрытие модального окна при нажатии на "X"
	const closeBtn = document.getElementsByClassName("close")[0];
	closeBtn.onclick = function () {
		modal.style.display = "none";
	};

	// Закрытие модального окна при клике вне его
	window.onclick = function (event) {
		if (event.target === modal) {
			modal.style.display = "none";
		}
	};
}

function initMailer($formName) {

	const message = {
		loading: "Запрос отправляется...",
		success: "Сообщение доставлено! Скоро с вами свяжутся",
		failure: "Ошибка почтового сервера"
	}

	// поиск всех полей input в форме
	let $form = document.querySelector($formName);
	let $input = $form.getElementsByTagName('input');

	// формирование элемента для вывода сообщения о результате
	let $statusDiv= document.createElement('div');
	$statusDiv.classList.add('status');

	// подключение обработчика при отправке формы
	$form.addEventListener('submit', event => {
		event.preventDefault();
		$form.appendChild($statusDiv);

		// формирование запроса и передача его на обработчик php
		let xhr = new XMLHttpRequest();
		xhr.open('POST', 'mailer.php');
		
		// добавление инпутов в объект FormData
		let formData = new FormData($form);

		xhr.send(formData);

		// обработка изменения статуса запрос
		xhr.addEventListener('readystatechange', () => {
			if (xhr.readyState < 4) {
				$statusDiv.textContent = message.loading;
			} else if (xhr.readyState === 4 && xhr.status == 200) {
				$statusDiv.textContent = message.success;
			} else {
				$statusDiv.textContent = message.failure;
			}
		});

		// очистка инпутов
		for (let i = 0; i < $input.length; i++) {
			$input[i].value = '';
		}

	});
}

function initMailerProm($formName) {

	const message = {
		loading: "Запрос отправляется...",
		success: "Сообщение доставлено! Скоро с вами свяжутся",
		failure: "Ошибка почтового сервера"
	}

	const $form = document.querySelector($formName);
	const $input = $form.getElementsByTagName('input');

	const $statusDiv= document.createElement('div');
	$statusDiv.classList.add('status');
	$form.appendChild($statusDiv);

	$form.addEventListener('submit', event => {
		
		event.preventDefault();
		const formData = new FormData($form);

		const postData = (formData) => {

			return new Promise((resolve, reject) => {

				const xhr = new XMLHttpRequest();
				xhr.open('POST', 'mailer.php');

				xhr.addEventListener('readystatechange', () => {
					if (xhr.readyState < 4) {
						resolve();
					} else if (xhr.readyState === 4 && xhr.status == 200) {
						resolve();
					} else {
						reject();
					}
				});

				xhr.send(formData);
			});			
		}

		const clearInput = () => {
			for (let i = 0; i < $input.length; i++) {
				$input[i].value = '';
			}
		}

		postData(formData)
			.then(() => $statusDiv.textContent = message.loading)
			.then(() => $statusDiv.textContent = message.success)
			.catch(() => $statusDiv.textContent = message.failure)
			.then(clearInput);
	});
}

window.addEventListener('DOMContentLoaded', () => {

	initMailer('main-form');
});
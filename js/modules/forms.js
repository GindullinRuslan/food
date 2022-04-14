import {closeModal, openModal} from './modal';

import {postData} from '../services/services';

function forms(formSelector, modalTimer) {
  // Forms

  const forms = document.querySelectorAll(formSelector); // поулчение всех форм со страницы

  const message = { // текстовые сообщения что что-то произошло
    loading: 'img/form/spinner.svg',
    success: 'Cпасибо, скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => { // под каждую форму подвязываем функцию отправки
    bindPostData(item);
  });



  // создается запрос который уходит на сервер( при это м это абсолютно асинхронный код, мф не знаем через сколько нам вернется ответ от сервера и так как это асинхронный код он не ждет другой код). Тоесть мы запустили запрос fetch, а код наш внутри функции начинает работать дальше (сonst = res), и фетча нам еще ничего не вернулось, там есть лишь обещание и соотвественно дальше у нас будет ошибка, тк обещание мы попытаемся обработать через джсон, а такого метода у промиса не будет. Поэтому нужно испаользовать механизм который превращает асинхронный код в синхронный. Для решения этой проблемы есть async/await. async -ставится перед функцией, await - ставится перед операциями которые мы хотим дождаться. Эти операторы всегда ставятся в паре. Это работает следующим образом - коода запускается функция postData, начинается запрос на сервер\. но за счет опператора await JS начинает ждать рездльутата этого запроса. Далее в res поместиться какой то результат и дальше уже можно с ним работать.

  function bindPostData(form) { // функция постинга данных
    form.addEventListener('submit', (e) => { // обработчик события 
      e.preventDefault(); // отменяем стандартное поведение браузера (перезагрузка страницы при отправке данных формы)

      const statusMessage = document.createElement('img'); // создаем элемент в котором показыватся статус 
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;

      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form); // объект который позволяет с определенной формы сформировать данные которые заполнил пользователь

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      // метод entries берет каждые свойства и формирует массив который состоит их значени ключей и значений через запятую, Например есть объект {a:23, b:50}; применим к объекту свйоство entries. Чтобы сделать обратное действие тоесть превратить массив в массиве есть метод fromEntries

      postData('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          showThanksModal(message.success);
          form.reset(); // сброс формы после отправки
          statusMessage.remove();
        }).catch(() => {
          showThanksModal(message.failure);
        }).finally(() => {
          form.reset();
        });
    });
  }

  //наводим красоту форме отправки

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal('.modal', modalTimer);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal('.modal');
    }, 4000);
  }

  fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));

}

export default forms;
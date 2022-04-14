// функция открытия модального окна
function openModal(modalSelector, modalTimer) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  // если пользователь открыл окно до вызова сеттаймаут, то не открывать через 3 секунды модальное окно
  console.log(modalTimer);
  if (modalTimer) {
    clearTimeout(modalTimer);
  }
}

// функция закрытия модального окна
function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.contains('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimer) {
  // Modal


  const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);



  //при нажатии на триггер срабатывает функция открытия модального окна
  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimer));
  });



  // если пользователь нажмет на область за пределами модалки, то модальное окно закроется
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  // закрытие модалки при нажатии на ESC
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimer);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

}

export default modal;

export { closeModal };
export { openModal };
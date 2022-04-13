function modal() {
  // Modal


  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');

  // функция открытия модального окна
  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    // если пользователь открыл окно до вызова сеттаймаут, то не открывать через 3 секунды модальное окно
    clearTimeout(modalTimer);
  }

  //при нажатии на триггер срабатывает функция открытия модального окна
  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  // функция закрытия модального окна
  function closeModal() {
    modal.classList.contains('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  // если пользователь нажмет на область за пределами модалки, то модальное окно закроется
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  // закрытие модалки при нажатии на ESC
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      closeModal();
    }
  });

  //открытие модального окна через 3 секунды
  const modalTimer = setTimeout(openModal, 3000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

}

module.exports = modal;
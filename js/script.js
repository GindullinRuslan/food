document.addEventListener('DOMContentLoaded', () => {





  // Tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.add('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });







  // Timer

  const deadline = '2022-05-01';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor(t / (1000 * 60 * 60) % 24),
      minutes = Math.floor((t / (1000 * 60) % 60)),
      seconds = Math.floor(t / 1000 % 60);

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline);








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







  // Используем классы для карточек

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>
        `;
      this.parent.append(element);
    }
  }

  const getResource = async (url) => {
    const res = await fetch(url);

    // фетч если столкнется с какйо нибудь ошиюкой в http  запросе (404,500,502) он нам не выдаст catch(reject) - это не будет для него ошибкой, а ошибка для него - это отсутствие интернета, неполадки в самом запросе, поэтому такое поведение мы должны обработать. И здесь мы используем два метода ok и status. throw используется чтобы выкинуть эту ошибку из функции. 
    if (!res.ok) {
      throw new Error(`Could nod fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };


  getResource('http://localhost:3000/menu')
    .then(data => {
      data.forEach(({ img, altimg, title, descr, price }) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      });
    });

  // Способ создания кароточек (создается функция createCard получает data начинает ее перебирать через forEach, деструктуризирует наши объекты на отдельные свойства, создает новый див помещает в него новый класс, формирует верстку, и апендит каротчку в какой то элемент верстки на странице)


  // getResource('http://localhost:3000/menu')
  // .then(data => createCard(data));

  // function createCard(data) {
  //   data.forEach(({img, altimg, title, descr, price}) => {
  //     const element = document.createElement('div');

  //     element.classList.add('menu__item');

  //     element.innerHTML = `
  //               <img src=${img} alt=${altimg}>
  //         <h3 class="menu__item-subtitle">${title}</h3>
  //         <div class="menu__item-descr">${descr}</div>
  //         <div class="menu__item-divider"></div>
  //         <div class="menu__item-price">
  //           <div class="menu__item-cost">Цена:</div>
  //           <div class="menu__item-total"><span>${price}</span> грн/день</div>
  //         </div>
  //     `;

  //     document.querySelector('.menu .container').append(element);
  //   });
  // }









  // Forms

  const forms = document.querySelectorAll('form'); // поулчение всех форм со страницы

  const message = { // текстовые сообщения что что-то произошло
    loading: 'img/form/spinner.svg',
    success: 'Cпасибо, скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => { // под каждую форму подвязываем функцию отправки
    bindPostData(item);
  });

  const postData = async (url, data) => { // функция настраивает наш запрос, она фетчит - посылает запрос на сервер, получает какой то ответ от сервера и после этого трансформирует в джсон
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });

    return await res.json(); //мы с постадаты возвращаем промис и через цепочку then обработаем

  };

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
    openModal();

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
      closeModal();
    }, 4000);
  }

  fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));







  // Slider 1

  // const slides = document.querySelectorAll('.offer__slide'),
  //   prev = document.querySelector('.offer__slider-prev'),
  //   next = document.querySelector('.offer__slider-next'),
  //   total = document.querySelector('#total'),
  //   current = document.querySelector('#current');

  // let slideIndex = 1;

  // showSlides(slideIndex);

  // if (slides.length < 10) {
  //   total.textContent = `0${slides.length}`;
  // } else {
  //   total.textContent = slides.length;
  // }

  // function showSlides(n) {
  //   if (n > slides.length) {
  //     slideIndex = 1;
  //   }

  //   if (n < 1) {
  //     slideIndex = slides.length;
  //   }

  //   slides.forEach(item => {
  //     item.style.display = 'none';
  //   });

  //   slides[slideIndex - 1].style.display = 'block';

  //   if (slides.length < 10) {
  //     current.textContent = `0${slideIndex}`;
  //   } else {
  //     current.textContent = slideIndex;
  //   }
  // }

  // function plusSlides(n) {
  //   showSlides(slideIndex += n);
  // }

  // prev.addEventListener('click', () => {
  //   plusSlides(-1);
  // });

  // next.addEventListener('click', () => {
  //   plusSlides(+1);
  // });





  // Slider 2

  const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
    dots = [];

  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {

    const dot = document.createElement('li');

    dot.setAttribute('data-slide-to', i + 1);

    dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
    `;

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;

      offset = +width.slice(0, width.length - 2) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      function num() {
        if (slides.length < 10) {
          current.textContent = `0${slideIndex}`;
        } else {
          current.textContent = slideIndex;
        }
      }

      num();

      function opac() {
        dots.forEach(dot => dot.style.opacity = 0.5);
        dots[slideIndex - 1].style.opacity = 1;
      }

      opac();
    });
  });

  next.addEventListener('click', () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = 0.5);
    dots[slideIndex - 1].style.opacity = 1;
  });

  prev.addEventListener('click', () => {

    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = 0.5);
    dots[slideIndex - 1].style.opacity = 1;
  });



  // Calculating

  const result = document.querySelector('.calculating__result span');
  let sex = 'female', height, weight, age, ratio = '1.375';

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '______';
      return;
    }

    if (sex === 'feamle') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }

  calcTotal();

  function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);

    elements.forEach(elem => {
      elem.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
        } else {
          sex = e.target.getAttribute('id');
        }

        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);

        calcTotal();
      });
    });
  }

  getStaticInformation('#gender', 'calculating__choose-item_active');

  getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

  function getDynamicIformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
      switch(input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }

      calcTotal();

    });





  }

  getDynamicIformation('#height');
  getDynamicIformation('#weight');
  getDynamicIformation('#age');
});





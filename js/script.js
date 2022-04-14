import tabs from './modules/tabs';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import {openModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {

  //открытие модального окна через 3 секунды
  const modalTimer = setTimeout(() => openModal('.modal', modalTimer) ,3000);

  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  calc();
  cards();
  forms('form', modalTimer);
  modal('[data-modal]', '.modal', modalTimer);
  slider({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    slide: '.offer__slide',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
  timer('.timer', '2022-06-11');
});






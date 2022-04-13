document.addEventListener('DOMContentLoaded', () => {
  const tabs = require('./modules/tabs.js'),
        calc = require('./modules/calc.js'),
        cards = require('./modules/cards.js'),
        forms = require('./modules/forms.js'),
        modal = require('./modules/modal.js'),
        slider = require('./modules/slider.js'),
        timer = require('./modules/timer.js');

  tabs();
  calc();
  cards();
  forms();
  modal();
  slider();
  timer();
});







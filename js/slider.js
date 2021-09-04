"use strict";

const $slider = document.querySelector('.swiper');

const swiper = new Swiper($slider, {
  direction: 'horizontal',
  loop: true,
  simulateTouch: false,

  autoplay: {
    delay: 5000,
  },

  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
    renderFraction: function (currentClass, totalClass) {
      return `0<span class="${currentClass}"></span> &horbar; <span class="${totalClass}--cleared">0</span><span class="${totalClass}"></span>`
    }
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
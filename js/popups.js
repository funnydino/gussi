"use strict";

// Popups:

const body = document.querySelector('.body');
const popupLinks = document.querySelectorAll('.popup-link');
const popupOverlay = document.querySelector('.popup-overlay');
const popups = document.querySelectorAll('.popup');

const bodyLock = () => {
  body.classList.add('body--lock');
};

const bodyUnlock = () => {
  body.classList.remove('body--lock');
};

popupLinks.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    bodyLock();
    const path = e.currentTarget.getAttribute('data-path');
    popups.forEach((el) => {
      el.classList.remove('popup--visible');
    });
    document.querySelector(`[data-target="${path}"]`).classList.add('popup--visible');
    popupOverlay.classList.add('popup-overlay--visible');
  });
});

popupOverlay.addEventListener('click', (e) => {
  if (e.target == popupOverlay) {
    popupOverlay.classList.remove('popup-overlay--visible');
    popups.forEach((el) => {
      el.classList.remove('popup--visible');
    });
    bodyUnlock();
  };
});
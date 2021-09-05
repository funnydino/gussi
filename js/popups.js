"use strict";

// Popups:

const $body = document.querySelector('.body');
const $popupLinks = document.querySelectorAll('.popup-link');
const $popupOverlay = document.querySelector('.popup-overlay');
const $popups = document.querySelectorAll('.popup');
const $fixBlocks = document.querySelectorAll('.fix-block');

const disableScroll = () => {
  const paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
  $body.classList.add('body--lock');
  $fixBlocks.forEach((el) => {
    el.style.paddingRight = paddingOffset;
  });
  document.body.style.paddingRight = paddingOffset;
};

const enableScroll = () => {
  $body.classList.remove('body--lock');
  $fixBlocks.forEach((el) => {
    el.style.paddingRight = '0px';
  });
  document.body.style.paddingRight = '0px';
};

$popupLinks.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    disableScroll();
    const path = e.currentTarget.getAttribute('data-path');
    $popups.forEach((el) => {
      el.classList.remove('popup--visible');
    });
    document.querySelector(`[data-target="${path}"]`).classList.add('popup--visible');
    $popupOverlay.classList.add('popup-overlay--visible');
  });
});

$popupOverlay.addEventListener('click', (e) => {
  if (e.target == $popupOverlay) {
    $popupOverlay.classList.remove('popup-overlay--visible');
    $popups.forEach((el) => {
      el.classList.remove('popup--visible');
    });
    enableScroll();
  };
});
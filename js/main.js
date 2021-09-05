"use strict";

(() => {

  console.log('Hello, world!');

  const itemPrice = 119.99;
  let itemAmount = 1,
    cartPrice = itemPrice * itemAmount;
  const $itemPriceField = document.querySelector('.order-form__cost-field');
  const $itemAmountField = document.querySelector('.quantity>input[name="count"]');
  const $reduceAmountBtn = document.querySelector('.quantity__btn--remove');
  const $increaseAmountBtn = document.querySelector('.quantity__btn--add');
  const $orderInfoItems = document.querySelectorAll('.order__info-header');

  // Spincrement (сумма товаров в корзине увеличивается плавно):

  const step = itemPrice.toString().split('.')[0].slice(-1) != 0 || itemPrice.toString().split('.')[1] ? 1 : 10;
  const spincrementTime = 150;

  const updateCost = (itemPrice, quantity = 1) => {

    $itemAmountField.value = quantity;
    cartPrice = cartPrice.toString().split('.')[0];
    const currentCost = (+itemPrice * +quantity).toFixed(2).split('.');

    let n = +cartPrice;
    const t = Math.round(spincrementTime / (Math.abs(currentCost[0] - cartPrice) / step));

    const interval = setInterval(() => {
      if (n < currentCost[0]) {
        n = n + step;
        if (n == currentCost[0]) {
          clearInterval(interval);
        };
      } else {
        n = n - step;
        if (n == currentCost[0]) {
          clearInterval(interval);
        };
      }
      $itemPriceField.innerHTML = `<span>$${new Intl.NumberFormat("usd").format(n)}.</span>${currentCost[1]}`;
    }, t);

    cartPrice = +itemPrice * +quantity;

  };

  updateCost(itemPrice, itemAmount);

  $reduceAmountBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (itemAmount > 1) {
      --itemAmount;
      updateCost(itemPrice, itemAmount);
    };
    if (itemAmount == 1) {
      $reduceAmountBtn.setAttribute('disabled', true);
    };
  });

  $increaseAmountBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if ($reduceAmountBtn.hasAttribute('disabled')) {
      $reduceAmountBtn.removeAttribute('disabled');
    };
    ++itemAmount;
    updateCost(itemPrice, itemAmount);
  });

  $orderInfoItems.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      el.parentNode.classList.toggle('order-info__item--opened');
    });
    el.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.keyCode === 32) {
        e.preventDefault();
        el.parentNode.classList.toggle('order-info__item--opened');
      };
    });
  });

  document.querySelectorAll('.card-header').forEach((el) => {
    el.setAttribute('style', 'opacity: 1; transform: translateY(0)')
  });

  document.querySelectorAll('.card-text').forEach((el) => {
    el.setAttribute('style', 'opacity: 1;')
  });

})();
'use strict';

const header = document.querySelector('.header');
const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.menu');

function setMenu(isOpen) {
  header.classList.toggle('header--open', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
  burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
}

burger.addEventListener('click', () => {
  setMenu(!header.classList.contains('header--open'));
});

menu.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    setMenu(false);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    setMenu(false);
  }
});

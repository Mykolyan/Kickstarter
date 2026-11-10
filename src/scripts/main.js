'use strict';

const header = document.querySelector('.header');
const logo = document.querySelector('.header__logo');
const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.menu');
const desktopQuery = window.matchMedia('(min-width: 1280px)');

function setMenu(isOpen) {
  header.classList.toggle('header--open', isOpen);
  document.body.classList.toggle('page--locked', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
  burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
}

burger.addEventListener('click', () => {
  setMenu(!header.classList.contains('header--open'));
});

logo.addEventListener('click', () => {
  setMenu(false);
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

// the menu does not exist on desktop, so do not keep the page locked
desktopQuery.addEventListener('change', (e) => {
  if (e.matches) {
    setMenu(false);
  }
});

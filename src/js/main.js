import { loadLayout } from './components/layout.js';
import { initNavigation } from './components/navigation.js';
import { setActiveLinks } from './utils/activeLink.js';

async function init() {
  await loadLayout();
  initNavigation();
  setActiveLinks();
}

init();

// you are a star slide js start
const slides = document.querySelectorAll('.slide');
let currentIndex = 1;

function showSlide(index) {
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  slides.forEach((slide) => slide.classList.remove('active'));
  slides[index].classList.add('active');

  currentIndex = index;
}

document.querySelectorAll('.slider-arrow-left').forEach((btn) => {
  btn.addEventListener('click', () => {
    showSlide(currentIndex - 1);
  });
});

document.querySelectorAll('.slider-arrow-right').forEach((btn) => {
  btn.addEventListener('click', () => {
    showSlide(currentIndex + 1);
  });
});

showSlide(currentIndex);

// you are a star slide js end

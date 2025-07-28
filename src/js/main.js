import { ContactMethodController } from './components/contact.js';
import { BookingFormController } from './components/forms.js';
import { LayoutLoader } from './components/layout.js';
import { NavigationController } from './components/navigation.js';
import { ActiveLinkController } from './utils/activeLink.js';
import { FloatingMenu } from './components/floatingMenu.js';

async function init() {
  const layoutLoader = new LayoutLoader();
  await layoutLoader.loadLayout();
  new NavigationController();
  new ActiveLinkController();
  new ContactMethodController();
  new BookingFormController('#booking-form');
  const floatingMenu = new FloatingMenu();
  await floatingMenu.loadMenu();
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

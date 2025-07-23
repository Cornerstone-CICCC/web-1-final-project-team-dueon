import { handleScrollHeader } from '../utils/scroll.js';
import { setActiveLinks } from '../utils/activeLink.js';
import { toggleMobileMenu } from '../utils/dom.js';

export function initNavigation() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navContainer = document.querySelector('.nav-container');
  const header = document.querySelector('.site-header');

  if (!toggleBtn || !mobileMenu || !navContainer || !header) return;

  toggleBtn.addEventListener('click', () => {
    toggleMobileMenu({ toggleBtn, mobileMenu, navContainer });
  });

  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(() => {
      handleScrollHeader(header);

      toggleMobileMenu({ toggleBtn, mobileMenu, navContainer }, false);
    });
  });

  setActiveLinks();
}

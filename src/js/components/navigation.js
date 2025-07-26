import { handleScrollHeader } from '../utils/scroll.js';
import { toggleMobileMenu } from '../utils/dom.js';

export class NavigationController {
  constructor() {
    this.toggleBtn = document.querySelector('.menu-toggle');
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.navContainer = document.querySelector('.nav-container');
    this.header = document.querySelector('.header');

    if (
      !this.toggleBtn ||
      !this.mobileMenu ||
      !this.navContainer ||
      !this.header
    ) {
      return;
    }

    this.bindEvents();
  }

  bindEvents() {
    this.toggleBtn.addEventListener('click', () => {
      toggleMobileMenu({
        toggleBtn: this.toggleBtn,
        mobileMenu: this.mobileMenu,
        navContainer: this.navContainer
      });
    });

    window.addEventListener('scroll', () => {
      window.requestAnimationFrame(() => {
        handleScrollHeader(this.header);
        toggleMobileMenu(
          {
            toggleBtn: this.toggleBtn,
            mobileMenu: this.mobileMenu,
            navContainer: this.navContainer
          },
          false
        );
      });
    });
  }
}

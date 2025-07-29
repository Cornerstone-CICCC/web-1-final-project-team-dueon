export class ActiveLinkController {
  constructor() {
    this.navLinks = document.querySelectorAll(
      '.nav-left a, .nav-right a, .mobile-menu a'
    );
    this.currentPath = window.location.pathname.replace(/\/index\.html$/, '/');

    if (this.navLinks.length > 0) {
      this.setActive();
    }
  }

  setActive() {
    this.navLinks.forEach((link) => {
      const linkUrl = new URL(link.href);

      if (linkUrl.origin !== window.location.origin) {
        link.classList.remove('active');
        return;
      }

      const linkPath = linkUrl.pathname.replace(/\/index\.html$/, '/');

      if (linkPath === this.currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

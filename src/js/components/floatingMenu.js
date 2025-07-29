export class FloatingMenu {
  constructor() {
    this.chatToggle = null;
    this.iconMenu = null;
    this.closeButton = null;
    this.depth = Math.max(this.calculateDepth(), 0);
  }

  calculateDepth() {
    return location.pathname.replace(/\/$/, '').split('/').length - 2;
  }

  async loadMenu() {
    await this.loadComponent(
      'floating-menu',
      '/src/components/floating-menu.html'
    );

    this.chatToggle = document.getElementById('chatToggle');
    this.iconMenu = document.getElementById('iconMenu');
    this.closeButton = document.getElementById('closeMenu');

    this.init();
  }

  toRelativePath(path) {
    return (
      '../'.repeat(this.depth) + path.replace(/^\.\//, '').replace(/^\/+/, '')
    );
  }

  adjustRelativePaths(container) {
    const elements = container.querySelectorAll('[src], [href]');
    elements.forEach((el) => {
      if (el.hasAttribute('src')) {
        const src = el.getAttribute('src');
        el.setAttribute('src', this.toRelativePath(src));
      }

      if (el.hasAttribute('href')) {
        const href = el.getAttribute('href');
        if (!href.startsWith('http')) {
          el.setAttribute('href', this.toRelativePath(href));
        }
      }
    });
  }

  async loadComponent(id, path) {
    try {
      const html = await fetch(path).then((res) => res.text());
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html;
      this.adjustRelativePaths(wrapper);
      document.getElementById(id)?.appendChild(wrapper);
    } catch (err) {
      console.error(`Failed to load component at ${path}`, err);
    }
  }

  init() {
    if (this.chatToggle && this.iconMenu) {
      this.chatToggle.addEventListener('click', () => {
        const isOpen = this.iconMenu.classList.contains('active');
        if (isOpen) {
          this.closeMenu();
        } else {
          this.openMenu();
        }
      });
    } else {
      console.error('FloatingMenu: Elements not found.');
    }
  }

  toggleIcon(isOpen) {
    const iconImg = this.chatToggle.querySelector('img');
    if (iconImg) {
      const newSrc = isOpen
        ? './src/assets/svg/cancel.svg'
        : './src/assets/svg/message.svg';

      iconImg.src = this.toRelativePath(newSrc);
    }
  }

  openMenu() {
    this.iconMenu.classList.add('active');
    this.toggleIcon(true);
  }

  closeMenu() {
    this.iconMenu.classList.remove('active');
    this.toggleIcon(false);
  }
}

export class LayoutLoader {
  constructor() {
    this.depth = location.pathname.split('/').length - 2;
  }

  toRelativePath(path) {
    return '../'.repeat(this.depth) + path.replace(/^\.\//, '');
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
    const html = await fetch(path).then((res) => res.text());
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    this.adjustRelativePaths(wrapper);
    document.getElementById(id)?.appendChild(wrapper);
  }

  async loadLayout() {
    await this.loadComponent('header', '/src/components/header.html');
    await this.loadComponent('footer', '/src/components/footer.html');
  }
}

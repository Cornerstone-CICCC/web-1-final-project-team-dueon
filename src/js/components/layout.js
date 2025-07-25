function toRelativePath(path) {
  const depth = location.pathname.split('/').length - 2;
  return '../'.repeat(depth) + path.replace(/^\.\//, '');
}

function adjustRelativePaths(container) {
  const elements = container.querySelectorAll('[src], [href]');
  elements.forEach((el) => {
    if (el.hasAttribute('src')) {
      const src = el.getAttribute('src');
      el.setAttribute('src', toRelativePath(src));
    }

    if (el.hasAttribute('href')) {
      const href = el.getAttribute('href');
      if (!href.startsWith('http')) {
        el.setAttribute('href', toRelativePath(href));
      }
    }
  });
}

async function loadComponent(id, path) {
  const html = await fetch(path).then((res) => res.text());
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  adjustRelativePaths(wrapper);
  document.getElementById(id)?.appendChild(wrapper);
}

export async function loadLayout() {
  await loadComponent('header', '/src/components/header.html');
  await loadComponent('footer', '/src/components/footer.html');
}

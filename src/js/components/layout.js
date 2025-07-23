function toRelativePath(path) {
  const depth = location.pathname.split('/').length - 2;
  return '../'.repeat(depth) + path.replace(/^\.\//, '');
}

async function loadHeader() {
  const headerHtml = await fetch('/src/components/header.html').then((res) =>
    res.text()
  );
  const headerEl = document.createElement('div');
  headerEl.innerHTML = headerHtml;

  const tagsToFix = headerEl.querySelectorAll('[src], [href]');
  tagsToFix.forEach((el) => {
    if (el.hasAttribute('src')) {
      el.setAttribute('src', toRelativePath(el.getAttribute('src')));
    }
    if (el.hasAttribute('href')) {
      const href = el.getAttribute('href');

      if (!href.startsWith('http')) {
        el.setAttribute('href', toRelativePath(href));
      }
    }
  });

  document.getElementById('header').appendChild(headerEl);
}

export async function loadLayout() {
  await loadHeader();
}

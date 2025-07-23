export function setActiveLinks() {
  const navLinks = document.querySelectorAll(
    '.nav-left a, .nav-right a, .mobile-menu a'
  );

  const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');

  navLinks.forEach((link) => {
    const linkUrl = new URL(link.href);

    if (linkUrl.origin !== window.location.origin) {
      link.classList.remove('active');
      return;
    }

    const linkPath = linkUrl.pathname.replace(/\/index\.html$/, '/');

    if (linkPath === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

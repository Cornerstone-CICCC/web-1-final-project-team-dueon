export function toggleMobileMenu(
  { toggleBtn, mobileMenu, navContainer },
  force = null
) {
  const method = force === null ? 'toggle' : force ? 'add' : 'remove';

  toggleBtn.classList[method]('open');
  mobileMenu.classList[method]('open');
  navContainer.classList[method]('open');
}

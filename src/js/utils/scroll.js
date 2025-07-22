export function handleScrollHeader(header) {
  const scrollY = window.scrollY;

  if (scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

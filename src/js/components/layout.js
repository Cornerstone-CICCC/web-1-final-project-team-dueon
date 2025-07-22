export async function loadLayout() {
  const headerHtml = await fetch('/src/components/header.html').then((res) =>
    res.text()
  );

  document.getElementById('header').innerHTML = headerHtml;
}

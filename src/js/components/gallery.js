function showImages(idName, event) {
  event.preventDefault();

  const imgarea1 = document.querySelector('.img-area-1');
  const imgarea2 = document.querySelector('.img-area-2');
  const makeup = document.querySelector('.make-up');
  const hairStyle = document.querySelector('.hairstyle');

  if (idName === 'make-up') {
    imgarea1.style.display = 'flex';
    imgarea2.style.display = 'none';
    makeup.style.borderBottom = '1px solid rgba(136, 136, 136, 1)';
    hairStyle.style.borderBottom = 'none';
    makeup.style.color = 'black';
    hairStyle.style.color = 'grey';
  } else if (idName === 'hairstyle') {
    imgarea2.style.display = 'flex';
    imgarea1.style.display = 'none';
    makeup.style.borderBottom = 'none';
    hairStyle.style.borderBottom = '1px solid rgba(136, 136, 136, 1)';
    makeup.style.color = 'grey';
    hairStyle.style.color = 'black';
  }
}

document.getElementById('view-btn').addEventListener('click', function (event) {
  event.preventDefault();
  event.stopPropagation();
});

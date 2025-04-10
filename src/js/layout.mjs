export function handleResize() {
  const width = window.innerWidth;
  const body = document.body;

  if (width < 768) {
    body.classList.add('mobile');
    body.classList.remove('desktop');
  } else {
    body.classList.add('desktop');
    body.classList.remove('mobile');
  }
}
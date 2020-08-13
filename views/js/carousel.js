/**
 *
 * Carousel JS Code
 * @param {number} index
 */
function carousel(index) {
  clearInterval(window.intervalID);
  const carousels = document.querySelectorAll('.carousel');
  const circles = document.querySelectorAll('.circle');
  for (let i = 0; i < carousels.length; i++) {
    if (i === index) {
      carousels[i].classList.add('show');
      circles[i].classList.add('circle-b');
    } else {
      carousels[i].classList.remove('show');
      circles[i].classList.remove('circle-b');
    }
  }
  carouselAuto(index+1);
}

/**
 *
 * Carousel JS Code
 * @param {number} index
 */
function carouselAuto(index) {
  window.intervalID = setInterval(() => {
    (index > 2) ? index = 0 : index;
    const carousels = document.querySelectorAll('.carousel');
    const circles = document.querySelectorAll('.circle');
    for (let i = 0; i < carousels.length; i++) {
      if (i === index) {
        carousels[i].classList.add('show');
        circles[i].classList.add('circle-b');
      } else {
        carousels[i].classList.remove('show');
        circles[i].classList.remove('circle-b');
      }
    }
    index += 1;
  }, 4000);
}


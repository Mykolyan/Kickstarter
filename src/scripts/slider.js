'use strict';

// Generic slider on top of native scroll-snap (see components/_slider.scss).
// Finds every [data-slider], needs inside it:
//   [data-slider-track]   scrolling list, its children are the slides
//   [data-slider-prev], [data-slider-next]   buttons
//   [data-slider-current], [data-slider-total]   counter numbers
// No loop: the first/last slide disables the matching button.

const pad = (number) => String(number).padStart(2, '0');

function initSlider(slider) {
  const track = slider.querySelector('[data-slider-track]');
  const prev = slider.querySelector('[data-slider-prev]');
  const next = slider.querySelector('[data-slider-next]');
  const current = slider.querySelector('[data-slider-current]');
  const total = slider.querySelector('[data-slider-total]');

  const slides = [...track.children];
  let activeIndex = 0;
  let trackWidth = track.clientWidth;
  const lastIndex = slides.length - 1;

  if (slides.length < 2) {
    return;
  }

  total.textContent = pad(slides.length);

  // distance between the starts of two neighbour slides
  function getStep() {
    return slides[1].offsetLeft - slides[0].offsetLeft;
  }

  function getIndex() {
    const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;

    if (atEnd) {
      return lastIndex;
    }

    return Math.min(lastIndex, Math.round(track.scrollLeft / getStep()));
  }

  function update() {
    const index = getIndex();

    activeIndex = index;
    current.textContent = pad(index + 1);
    prev.disabled = index === 0;
    next.disabled = index === lastIndex;
  }

  function goTo(index) {
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)')
      .matches;

    track.scrollTo({
      left: index * getStep(),
      behavior: smooth ? 'smooth' : 'auto',
    });
  }

  let isScheduled = false;

  track.addEventListener('scroll', () => {
    // while the width changes, the old scroll position is not valid
    if (isScheduled || track.clientWidth !== trackWidth) {
      return;
    }

    isScheduled = true;

    window.requestAnimationFrame(() => {
      isScheduled = false;
      update();
    });
  });

  prev.addEventListener('click', () => goTo(getIndex() - 1));
  next.addEventListener('click', () => goTo(getIndex() + 1));

  // slide sizes change when the window is resized: stay on the same slide
  new window.ResizeObserver(() => {
    trackWidth = track.clientWidth;
    track.scrollLeft = activeIndex * getStep();
    update();
  }).observe(track);

  slider.classList.add('slider--ready');
  update();
}

export function initSliders() {
  document.querySelectorAll('[data-slider]').forEach(initSlider);
}

/* Motion Retro-Tech: transições em steps e typewriter respeitando reduced-motion. */
(function () {
  'use strict';
  let timer = null;
  function stop() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function typewriter(el, text) {
    stop();
    let i = 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) i = text.length;
    function frame() {
      const node = document.createTextNode(text.slice(0, i));
      const cursor = document.createElement('span');
      cursor.className = 'blinking-cursor';
      cursor.setAttribute('aria-hidden', 'true');
      el.replaceChildren(node, cursor);
      if (i < text.length) {
        i++;
        timer = setTimeout(frame, 18);
      }
    }
    frame();
  }
  window.CourseAnimation = { stop, typewriter };
})();

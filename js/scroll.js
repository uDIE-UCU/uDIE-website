document.addEventListener('DOMContentLoaded', function () {
  const hash = window.location.hash;
  if (hash) {
    // Evita el scroll automático del navegador
    window.scrollTo(0, 0);

    const target = document.querySelector(hash);
    if (target) {
      setTimeout(function () {
        // Scroll lento personalizado
        const targetY = target.getBoundingClientRect().top + window.pageYOffset;
        const startY = window.pageYOffset;
        const duration = 1200; // ms
        let start;

        function step(timestamp) {
          if (!start) start = timestamp;
          const time = timestamp - start;
          const percent = Math.min(time / duration, 1);
          window.scrollTo(0, startY + (targetY - startY) * percent);
          if (time < duration) {
            window.requestAnimationFrame(step);
          }
        }
        window.requestAnimationFrame(step);
      }, 300);
    }
  }
});
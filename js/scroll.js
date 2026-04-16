document.addEventListener('DOMContentLoaded', function () {
  const hash = window.location.hash;

  if (hash) {
    // Evita salto instantáneo
    window.scrollTo(0, 0);

    const target = document.querySelector(hash);

    if (target) {
      setTimeout(function () {

        const header = document.getElementById('header');
        const headerHeight = header ? header.offsetHeight : 0;

        const targetY =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight - 10;

        const startY = window.pageYOffset;
        const duration = 800;
        let start = null;

        function step(timestamp) {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const percent = Math.min(progress / duration, 1);

          window.scrollTo(0, startY + (targetY - startY) * percent);

          if (progress < duration) {
            window.requestAnimationFrame(step);
          }
        }

        window.requestAnimationFrame(step);

      }, 200);
    }
  }
});
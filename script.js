/*
 * Feet Care – Podologia Sudoeste
 * Comportamento do hero: a foto/vídeo da podóloga sobe e dá um leve zoom
 * conforme a página rola. No celular e com "reduzir movimento" ativado,
 * a animação fica desligada.
 */
(function () {
  'use strict';

  var hero = document.getElementById('hero');
  if (!hero) return;

  var video = hero.querySelector('.frame video');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mobile = window.matchMedia('(max-width: 47.99rem)');
  var ticking = false;

  // Progresso da rolagem dentro do hero, de 0 a 1 (usado pelo CSS em var(--p)).
  function updateProgress() {
    ticking = false;

    if (reduceMotion.matches || mobile.matches) {
      hero.style.setProperty('--p', 0);
      return;
    }

    var rect = hero.getBoundingClientRect();
    var range = hero.offsetHeight - window.innerHeight;
    var progress = range > 0 ? -rect.top / range : 0;
    hero.style.setProperty('--p', Math.min(1, Math.max(0, progress)));
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateProgress);
    }
  }

  // Vídeo do hero: parado para quem prefere menos movimento e
  // pausado quando sai da tela, para poupar bateria.
  function setupVideo() {
    if (!video) return;

    if (reduceMotion.matches) {
      video.removeAttribute('autoplay');
      video.pause();
      return;
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var playing = video.play();
            if (playing && playing.catch) playing.catch(function () {});
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.1 }).observe(video);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateProgress();
  setupVideo();
})();

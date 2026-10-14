// Le Monde de Fabienne : en-tete, menu telephone, apparitions au defilement.
(function () {
  'use strict';
  var calme = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var entete = document.querySelector('[data-entete]');
  var majEntete = function () {
    if (window.scrollY > 10) entete.setAttribute('data-ombre', '');
    else entete.removeAttribute('data-ombre');
  };
  window.addEventListener('scroll', majEntete, { passive: true });
  majEntete();

  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu-mobile');
  if (burger && menu) {
    var fermer = function () { menu.hidden = true; burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Ouvrir le menu'); };
    burger.addEventListener('click', function () {
      var ouvert = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!ouvert));
      burger.setAttribute('aria-label', ouvert ? 'Ouvrir le menu' : 'Fermer le menu');
      menu.hidden = ouvert;
    });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) fermer(); });
  }

  var aReveler = document.querySelectorAll('.reveler');
  if ('IntersectionObserver' in window && !calme) {
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (!e.isIntersecting) return;
        var freres = [].slice.call(e.target.parentNode.children).filter(function (x) { return x.classList.contains('reveler'); });
        e.target.style.transitionDelay = Math.min(freres.indexOf(e.target), 5) * 80 + 'ms';
        e.target.classList.add('vu');
        obs.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    aReveler.forEach(function (el) { obs.observe(el); });
  } else {
    aReveler.forEach(function (el) { el.classList.add('vu'); });
  }
  /* Le rendez-vous epingle : ouvre la fenetre, se masque apres la date. */
  var epingle = document.querySelector('[data-ouvrir-agenda]');
  var fenetre = document.querySelector('[data-agenda]');
  if (epingle && fenetre) {
    var fin = new Date(epingle.getAttribute('data-fin') + 'T23:59:59');
    if (new Date() > fin) epingle.hidden = true;
    epingle.addEventListener('click', function () {
      if (fenetre.showModal) fenetre.showModal(); else fenetre.setAttribute('open', '');
    });
    fenetre.querySelector('[data-fermer-agenda]').addEventListener('click', function () { fenetre.close(); });
    fenetre.addEventListener('click', function (e) { if (e.target === fenetre) fenetre.close(); });
  }
})();

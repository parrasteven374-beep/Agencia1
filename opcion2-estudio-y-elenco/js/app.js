/* Opción 2 · interacciones propias: filtros con FLIP, formulario con motivo condicional */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var y = $('#y'); if (y) y.textContent = new Date().getFullYear();

  /* ---------- Navegación dividida: estado activo según la sección visible ---------- */
  if ('IntersectionObserver' in window) {
    var navLinks = { estudio: $('[data-nav="estudio"]'), elenco: $('[data-nav="elenco"]') };
    var visible = { estudio: false, elenco: false };
    var paint = function () {
      Object.keys(navLinks).forEach(function (k) {
        if (navLinks[k]) navLinks[k].setAttribute('aria-current', visible[k] ? 'true' : 'false');
      });
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting; });
      paint();
    }, { rootMargin: '-35% 0px -55% 0px' });
    ['estudio', 'elenco'].forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* ---------- Filtros del portafolio (FLIP con transform) ---------- */
  var grid = $('#grid');
  var items = $$('.work', grid);
  $$('.chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      $$('.chip').forEach(function (c) {
        var on = c === chip;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      var first = new Map();
      items.forEach(function (it) { if (!it.hidden) first.set(it, it.getBoundingClientRect()); });
      items.forEach(function (it) { it.hidden = !(f === 'all' || it.getAttribute('data-cat') === f); });
      if (reduce || !window.gsap) return;
      items.forEach(function (it) {
        if (it.hidden) return;
        var b = it.getBoundingClientRect(), a = first.get(it);
        if (a) {
          var dx = a.left - b.left, dy = a.top - b.top;
          if (dx || dy) gsap.fromTo(it, { x: dx, y: dy }, { x: 0, y: 0, duration: .5, ease: 'power3.out', clearProps: 'transform' });
        } else {
          gsap.fromTo(it, { opacity: 0, scale: .96 }, { opacity: 1, scale: 1, duration: .4, ease: 'power3.out', clearProps: 'opacity,transform' });
        }
      });
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
  });

  /* ---------- Selector de motivo ---------- */
  var form = $('#form'), motivo = $('#motivo');
  function setMotivo(v) {
    $$('.cond', form).forEach(function (fs) {
      var on = fs.getAttribute('data-for') === v;
      fs.hidden = !on; fs.disabled = !on;
    });
    motivo.value = v;
  }
  motivo.addEventListener('change', function () { setMotivo(motivo.value); });
  $$('[data-motivo]').forEach(function (a) {
    a.addEventListener('click', function () { setMotivo(a.getAttribute('data-motivo')); });
  });

  /* ---------- Envío (validación nativa + éxito local) ---------- */
  var err = $('#err'), ok = $('#ok');
  function enviar(datos) {
    // Punto de integración: reemplazar por fetch() a tu backend/CRM.
    return Promise.resolve(datos);
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    ok.hidden = true; err.hidden = true;
    var bad = null;
    $$('input,select', form).forEach(function (el) {
      if (el.disabled) { el.removeAttribute('aria-invalid'); return; }
      var invalid = !el.checkValidity();
      el.setAttribute('aria-invalid', invalid ? 'true' : 'false');
      if (invalid && !bad) bad = el;
    });
    if (bad) {
      err.textContent = bad.id === 'habeas'
        ? 'Debes aceptar la Política de Privacidad para continuar.'
        : (bad.id === 'edad' ? 'Debes ser mayor de 18 años para postularte.' : 'Revisa los campos marcados.');
      err.hidden = false; bad.focus(); return;
    }
    var d = {}; new FormData(form).forEach(function (v, k) { d[k] = v; });
    enviar(d).then(function () { ok.hidden = false; form.reset(); setMotivo('sesion'); });
  });
})();

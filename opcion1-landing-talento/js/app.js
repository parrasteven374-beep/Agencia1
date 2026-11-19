/* Opción 1 · Plan 1A — interacciones propias: línea de pasos, subrayado, formulario */
(function () {
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var g = window.gsap, ST = window.ScrollTrigger;
  var lines = document.querySelectorAll('[data-steps] line');

  if (g && ST && !reduce) {
    g.registerPlugin(ST);
    /* Línea de pasos que se dibuja con el scroll (solo stroke-dashoffset) */
    var steps = document.querySelector('[data-steps]');
    if (steps) {
      lines.forEach(function (l) {
        g.fromTo(l, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none',
          scrollTrigger: { trigger: steps, start: 'top 75%', end: 'bottom 70%', scrub: true } });
      });
    }
    /* Subrayado dibujado a mano en la palabra clave del hero */
    var p = document.querySelector('.hero h1 em path');
    if (p) {
      p.setAttribute('pathLength', '1');
      p.style.strokeDasharray = '1';
      g.fromTo(p, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.out', delay: 1.1 });
    }
  } else {
    lines.forEach(function (l) { l.style.strokeDashoffset = '0'; }); /* sin JS/animación: línea completa */
  }

  /* Enlaces legales: placeholders hasta tener los documentos */
  document.querySelectorAll('[data-legal]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); });
  });

  /* Formulario: validación nativa + Habeas Data obligatorio */
  var form = document.getElementById('form-postulacion');
  if (!form) return;
  var err = document.getElementById('form-err'), ok = document.getElementById('form-ok');
  var habeas = document.getElementById('habeas');
  habeas.checked = false; /* nunca pre-marcado */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    err.textContent = ''; ok.classList.remove('is-on');
    var edad = parseInt(form.edad.value, 10);
    if (!form.checkValidity()) {
      var bad = form.querySelector(':invalid');
      err.textContent = bad === habeas ? 'Debes aceptar la Política de Privacidad para continuar.' : 'Revisa los campos marcados.';
      bad.focus(); return;
    }
    if (isNaN(edad) || edad < 18) { err.textContent = 'Esta postulación es exclusiva para mayores de 18 años.'; form.edad.focus(); return; }
    /* TODO: enviar a backend / CRM (fetch POST) antes de publicar. */
    ok.classList.add('is-on'); ok.focus(); form.reset(); habeas.checked = false;
  });
})();

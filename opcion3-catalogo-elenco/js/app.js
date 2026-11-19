/* Elenco & Estudio · lógica de catálogo, modal y formulario.
   El HTML ya contiene las fichas (se ven sin JS); este script solo filtra y enriquece. */
(function () {
  'use strict';

  // ► PLACEHOLDER: número comercial oficial de la agencia (formato internacional, sin +).
  var WHATSAPP_AGENCIA = '570000000000';

  // ► Lista editable del elenco (nombres artísticos).
  //   Debe coincidir por "id" con data-id de cada tarjeta en index.html.
  var ELENCO = [
    { id: 'luna-ferre',     nombre: 'Luna Ferré',     cat: 'editorial', sede: 1, esp: 'Modelo editorial · Moda y campaña',                     img: 'assets/photos/elenco-01.jpg' },
    { id: 'valeria-noir',   nombre: 'Valeria Noir',   cat: 'streaming', sede: 2, esp: 'Creadora de streaming · Conversación y marca personal', img: 'assets/photos/elenco-02.jpg' },
    { id: 'isabela-marlow', nombre: 'Isabela Marlow', cat: 'actuacion', sede: 3, esp: 'Actriz · Publicidad y producción audiovisual',          img: 'assets/photos/elenco-03.jpg' },
    { id: 'camila-doree',   nombre: 'Camila Dorée',   cat: 'editorial', sede: 2, esp: 'Modelo editorial · Retrato y belleza',                  img: 'assets/photos/elenco-04.jpg' },
    { id: 'sofia-alba',     nombre: 'Sofía Alba',     cat: 'streaming', sede: 1, esp: 'Creadora de streaming · Música y entretenimiento en vivo', img: 'assets/photos/elenco-05.jpg' },
    { id: 'renata-solis',   nombre: 'Renata Solís',   cat: 'actuacion', sede: 1, esp: 'Actriz · Teatro y contenido de marca',                  img: 'assets/photos/elenco-06.jpg' },
    { id: 'amara-lys',      nombre: 'Amara Lys',      cat: 'editorial', sede: 3, esp: 'Modelo editorial · Catálogo y lookbook',                img: 'assets/photos/elenco-07.jpg' },
    { id: 'elena-vidal',    nombre: 'Elena Vidal',    cat: 'streaming', sede: 3, esp: 'Creadora de streaming · Estilo de vida y comunidad',    img: 'assets/photos/elenco-08.jpg' }
  ];
  var byId = {}; ELENCO.forEach(function (p) { byId[p.id] = p; });

  var $ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function waLink(text) {
    return 'https://wa.me/' + WHATSAPP_AGENCIA + '?text=' + encodeURIComponent(text);
  }

  /* ---------- Filtros combinables (categoría + sede) ---------- */
  var state = { cat: 'todas', sede: 'todas' };
  var cards = $('.card'), count = document.getElementById('count'), empty = document.getElementById('empty');

  function applyFilters() {
    var shown = [];
    cards.forEach(function (c) {
      var ok = (state.cat === 'todas' || c.dataset.cat === state.cat) &&
               (state.sede === 'todas' || c.dataset.sede === state.sede);
      c.hidden = !ok; if (ok) shown.push(c);
    });
    count.textContent = shown.length === 1 ? 'Mostrando 1 perfil' : 'Mostrando ' + shown.length + ' perfiles';
    empty.hidden = shown.length > 0;
    if (!reduce && window.gsap && shown.length) {
      window.gsap.fromTo(shown, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .45, ease: 'power3.out', stagger: .04, clearProps: 'opacity,transform' });
    }
    if (window.Motion && window.Motion.refresh) window.Motion.refresh();
  }
  $('.chip').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var group = btn.dataset.filter;
      $('.chip[data-filter="' + group + '"]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      state[group] = btn.dataset.value;
      applyFilters();
    });
  });

  /* ---------- Modal de contacto (el enlace de cada tarjeta ya funciona sin JS) ---------- */
  var modal = document.getElementById('modal'), lastTrigger = null;
  function openModal(p, trigger) {
    if (!modal || typeof modal.showModal !== 'function') return false;
    lastTrigger = trigger;
    document.getElementById('m-name').textContent = p.nombre;
    document.getElementById('m-spec').textContent = p.esp;
    document.getElementById('m-meta').textContent = 'Sede ' + p.sede;
    var img = document.getElementById('m-img'); img.src = p.img; img.alt = 'Retrato editorial de ' + p.nombre;
    document.getElementById('m-wa').href = waLink('Hola, quiero información sobre el perfil artístico de ' + p.nombre + '.');
    modal.showModal();
    if (window.Motion && window.Motion.lenis) window.Motion.lenis.stop();
    return true;
  }
  $('[data-contact]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var p = byId[a.dataset.contact]; if (!p) return;
      if (openModal(p, a)) e.preventDefault();
    });
  });
  if (modal) {
    modal.addEventListener('close', function () {
      if (window.Motion && window.Motion.lenis) window.Motion.lenis.start();
      if (lastTrigger) lastTrigger.focus();
    });
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.close(); });
  }

  /* ---------- Botón flotante y número (un solo punto de configuración) ---------- */
  var wa = document.getElementById('wa');
  if (wa) wa.href = waLink('Hola, quiero información sobre la agencia.');

  /* ---------- Enlaces legales (placeholders) ---------- */
  $('[data-legal]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); }); });

  /* ---------- Formulario ---------- */
  var form = document.getElementById('form'), status = document.getElementById('status');
  if (form) {
    $('input[type=checkbox]', form).forEach(function (c) { c.checked = false; }); // nunca premarcado
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.classList.add('was-validated');
      status.classList.remove('is-error');
      var edad = form.elements.edad;
      if (edad.value && +edad.value < 18) { edad.setCustomValidity('Debes ser mayor de 18 años.'); } else { edad.setCustomValidity(''); }
      if (!form.checkValidity()) {
        status.classList.add('is-error');
        status.textContent = 'Revisa los campos marcados y acepta la confirmación de edad y la Política de Privacidad.';
        var first = form.querySelector(':invalid'); if (first) first.focus();
        return;
      }
      // ► INTEGRACIÓN: enviar new FormData(form) al backend / CRM de la agencia aquí.
      status.textContent = 'Gracias. Recibimos tu postulación. El equipo la revisará y te escribirá por el canal oficial de la agencia; nadie te contactará desde números personales.';
      form.reset();
      form.classList.remove('was-validated');
    });
    form.elements.edad.addEventListener('input', function () { this.setCustomValidity(''); });
  }
})();

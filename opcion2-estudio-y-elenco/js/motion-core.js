/*! motion-core.js · diseno-web-pro
 * Motor de animación por atributos data-*. Requiere gsap + ScrollTrigger. Lenis es opcional.
 * Respeta prefers-reduced-motion (sin Lenis, sin animaciones: todo visible y final).
 * Atributos:
 *   data-split="lines|words|chars" [data-split-trigger="load"]   reveal de texto con máscara
 *   data-words-scrub                                             párrafo que se ilumina con el scroll
 *   data-reveal="up|fade|mask" [data-delay="0.2"]                reveal de bloques / imágenes (mask = clip-path)
 *   data-stagger                                                 hijos directos aparecen en cascada
 *   data-parallax="0.15"                                         parallax (poner en <img> dentro de .parallax-wrap)
 *   data-count="1200" [data-count-suffix="+"]                    contador
 *   data-marquee [data-speed="80"]                               marquee cuya velocidad responde al scroll
 *   data-magnetic="0.35"                                         botón magnético
 *   data-tilt="10"                                               inclinación 3D
 *   data-scramble                                                texto que se decodifica (al entrar y en hover)
 *   data-horizontal + [data-horizontal-track]                    scroll horizontal fijado (>=900px)
 *   data-theme-section="dark|light"                              cambia body[data-theme] por sección
 *   data-progress                                                barra de progreso de scroll (scaleX)
 *   body[data-cursor]                                            cursor seguidor; etiqueta con data-cursor="Ver"
 *   .preloader > .preloader__count                               intro con contador
 * API: window.Motion = { lenis, refresh(), destroy(), ready:Promise }
 */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var tickers = [];
  var api = { lenis: null, reduce: reduce, ok: false };
  window.Motion = api;

  function showAll() { root.classList.add('motion-failsafe'); }
  if (!window.gsap || !window.ScrollTrigger || reduce) {
    // Sin librerías o con movimiento reducido: contenido final visible, contadores en su valor final.
    d.addEventListener('DOMContentLoaded', function () {
      $('[data-count]').forEach(function (el) { el.textContent = fmt(el, +el.getAttribute('data-count')); });
      var p = d.querySelector('.preloader'); if (p) p.remove();
    });
    showAll(); api.ok = true; api.ready = Promise.resolve(); api.refresh = api.destroy = function () {};
    return;
  }
  var gsap = window.gsap, ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
  var introResolve; api.ready = new Promise(function (r) { introResolve = r; });
  var safe = function (fn) { try { fn(); } catch (e) { console.error('[motion-core]', e); } };
  function fmt(el, n) {
    return n.toLocaleString('es') + (el.getAttribute('data-count-suffix') || '');
  }

  /* ---------- Lenis ---------- */
  function initLenis() {
    if (!window.Lenis || root.hasAttribute('data-no-lenis')) return;
    var l = new window.Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
    api.lenis = l;
    l.on('scroll', ScrollTrigger.update);
    var tick = function (t) { l.raf(t * 1000); };
    gsap.ticker.add(tick); tickers.push(tick);
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- Preloader ---------- */
  function initPreloader() {
    var p = d.querySelector('.preloader');
    if (!p || sessionStorage.getItem('mc-seen')) { if (p) p.remove(); introResolve(); return; }
    var n = p.querySelector('.preloader__count'), o = { v: 0 };
    if (api.lenis) api.lenis.stop();
    var done = function () {
      if (api.lenis) api.lenis.start();
      try { sessionStorage.setItem('mc-seen', '1'); } catch (e) {}
      p.remove(); introResolve();
    };
    gsap.timeline({ onComplete: done })
      .to(o, { v: 100, duration: 1.1, ease: 'power2.inOut', onUpdate: function () { if (n) n.textContent = Math.round(o.v); } })
      .to(p, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' }, '+=0.15');
    setTimeout(function () { if (d.contains(p)) { gsap.killTweensOf([o, p]); done(); } }, 3500);
  }

  /* ---------- Texto: split con máscara ---------- */
  function wrapWords(el, chars) {
    var label = el.textContent.replace(/\s+/g, ' ').trim();
    var words = [];
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = d.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (tok) {
            if (!tok) return;
            if (/^\s+$/.test(tok)) { frag.appendChild(d.createTextNode(' ')); return; }
            var w = d.createElement('span'); w.className = 'w'; w.setAttribute('aria-hidden', 'true');
            var wi = d.createElement('span'); wi.className = 'wi';
            if (chars) tok.split('').forEach(function (ch) { var c = d.createElement('span'); c.className = 'c'; c.textContent = ch; wi.appendChild(c); });
            else wi.textContent = tok;
            w.appendChild(wi); frag.appendChild(w); words.push(wi);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    })(el);
    var sr = d.createElement('span'); sr.className = 'sr-only'; sr.textContent = label;
    el.insertBefore(sr, el.firstChild);
    return words;
  }
  function lineIdx(words) {
    var tops = [];
    return words.map(function (w) {
      var t = Math.round(w.parentNode.offsetTop / 4), i = tops.indexOf(t);
      if (i < 0) { tops.push(t); i = tops.length - 1; }
      return i;
    });
  }
  function initSplit() {
    $('[data-split]').forEach(function (el) {
      var mode = el.getAttribute('data-split') || 'lines';
      var words = wrapWords(el, mode === 'chars');
      el.classList.add('is-split');
      var targets = mode === 'chars' ? $('.c', el) : words;
      gsap.set(targets, { yPercent: 115 });
      var play = function () {
        var vars = { yPercent: 0, duration: mode === 'chars' ? 0.7 : 1, ease: 'power4.out' };
        if (mode === 'lines') { var idx = lineIdx(words); vars.delay = function (i) { return idx[i] * 0.12; }; }
        else vars.stagger = mode === 'chars' ? Math.min(0.03, 0.9 / targets.length) : 0.05;
        gsap.to(targets, vars);
      };
      if (el.getAttribute('data-split-trigger') === 'load') api.ready.then(function () { setTimeout(play, 60); });
      else ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: play });
    });
  }
  function initWordsScrub() {
    $('[data-words-scrub]').forEach(function (el) {
      var words = wrapWords(el, false);
      gsap.fromTo(words, { opacity: 0.15 }, {
        opacity: 1, stagger: 0.1, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true }
      });
    });
  }

  /* ---------- Reveals ---------- */
  function initReveal() {
    $('[data-reveal]').forEach(function (el) {
      var type = el.getAttribute('data-reveal'), delay = parseFloat(el.getAttribute('data-delay')) || 0;
      var tl = gsap.timeline({ paused: true, delay: delay });
      if (type === 'mask') {
        var inner = el.querySelector('img,video,svg,.reveal-inner') || el.firstElementChild;
        gsap.set(el, { clipPath: 'inset(100% 0% 0% 0%)' });
        if (inner) gsap.set(inner, { scale: 1.35 });
        tl.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' });
        if (inner) tl.to(inner, { scale: 1, duration: 1.4, ease: 'power3.out' }, 0);
      } else {
        gsap.set(el, { opacity: 0, y: type === 'fade' ? 0 : 40 });
        tl.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' });
      }
      ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: function () { tl.play(); } });
    });
    $('[data-stagger]').forEach(function (el) {
      var kids = Array.prototype.slice.call(el.children);
      gsap.set(kids, { opacity: 0, y: 36 });
      ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: function () {
        gsap.to(kids, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 });
      } });
    });
  }
  function initParallax() {
    $('[data-parallax]').forEach(function (el) {
      var s = parseFloat(el.getAttribute('data-parallax')) || 0.15, wrap = el.closest('.parallax-wrap') || el;
      gsap.fromTo(el, { yPercent: -s * 50 }, { yPercent: s * 50, ease: 'none',
        scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }
  function initCount() {
    $('[data-count]').forEach(function (el) {
      var target = +el.getAttribute('data-count'), o = { v: 0 };
      el.textContent = fmt(el, 0);
      ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: function () {
        gsap.to(o, { v: target, duration: 1.6, ease: 'power2.out', onUpdate: function () { el.textContent = fmt(el, Math.round(o.v)); } });
      } });
    });
  }

  /* ---------- Marquee ---------- */
  function initMarquee() {
    $('[data-marquee]').forEach(function (el) {
      var track = el.firstElementChild, group = track && track.firstElementChild;
      if (!group) return;
      var speed = parseFloat(el.getAttribute('data-speed')) || 80, x = 0, dir = -1, boost = 0, lastY = window.scrollY, gw = 0;
      var build = function () {
        while (track.children.length > 1) track.removeChild(track.lastChild);
        gw = group.getBoundingClientRect().width;
        var copies = Math.ceil((el.clientWidth * 2) / Math.max(gw, 1)) + 1;
        for (var i = 0; i < copies; i++) { var c = group.cloneNode(true); c.setAttribute('aria-hidden', 'true'); track.appendChild(c); }
      };
      build(); window.addEventListener('resize', build);
      var tick = function (t, dt) {
        var y = window.scrollY, dy = y - lastY; lastY = y;
        boost += (Math.min(Math.abs(dy), 60) * 0.12 * speed - boost) * 0.1;
        if (dy !== 0) dir = dy > 0 ? -1 : 1;
        x += dir * (speed + boost) * (dt / 1000);
        track.style.transform = 'translate3d(' + (((x % gw) - gw) % gw) + 'px,0,0)';
      };
      gsap.ticker.add(tick); tickers.push(tick);
    });
  }

  /* ---------- Interacción (solo puntero fino) ---------- */
  function initMagnetic() {
    if (!fine) return;
    $('[data-magnetic]').forEach(function (el) {
      var k = parseFloat(el.getAttribute('data-magnetic')) || 0.35;
      var xt = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' }), yt = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        xt((e.clientX - (r.left + r.width / 2)) * k); yt((e.clientY - (r.top + r.height / 2)) * k);
      });
      el.addEventListener('pointerleave', function () { xt(0); yt(0); });
    });
  }
  function initTilt() {
    if (!fine) return;
    $('[data-tilt]').forEach(function (el) {
      var max = parseFloat(el.getAttribute('data-tilt')) || 10;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(el, { rotationY: px * max * 2, rotationX: -py * max * 2, transformPerspective: 900, duration: 0.4, ease: 'power2.out' });
      });
      el.addEventListener('pointerleave', function () { gsap.to(el, { rotationX: 0, rotationY: 0, duration: 0.6, ease: 'power3.out' }); });
    });
  }
  function initCursor() {
    if (!fine || !d.body.hasAttribute('data-cursor')) return;
    var c = d.createElement('div'); c.className = 'cursor'; c.setAttribute('aria-hidden', 'true');
    c.innerHTML = '<span class="cursor__label"></span>'; d.body.appendChild(c);
    var label = c.firstChild;
    gsap.set(c, { xPercent: -50, yPercent: -50 });
    var xt = gsap.quickTo(c, 'x', { duration: 0.35, ease: 'power3' }), yt = gsap.quickTo(c, 'y', { duration: 0.35, ease: 'power3' });
    d.addEventListener('pointermove', function (e) { xt(e.clientX); yt(e.clientY); c.classList.add('is-on'); });
    d.addEventListener('pointerleave', function () { c.classList.remove('is-on'); });
    d.addEventListener('pointerover', function (e) {
      var t = e.target.closest('[data-cursor],a,button');
      c.classList.toggle('is-hover', !!t);
      var txt = t && t.getAttribute('data-cursor'); label.textContent = txt || '';
      c.classList.toggle('has-label', !!txt);
    });
  }
  var GLYPHS = '!<>-_\\/[]{}—=+*^?#';
  function scramble(el, text) {
    var o = { p: 0 };
    gsap.killTweensOf(o); el.setAttribute('aria-label', text);
    gsap.to(o, { p: 1, duration: Math.min(1.2, 0.3 + text.length * 0.04), ease: 'none',
      onUpdate: function () {
        var n = Math.floor(o.p * text.length), out = '';
        for (var i = 0; i < text.length; i++) out += i < n || text[i] === ' ' ? text[i] : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        el.textContent = out;
      }, onComplete: function () { el.textContent = text; } });
  }
  function initScramble() {
    $('[data-scramble]').forEach(function (el) {
      var text = el.textContent;
      ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: function () { scramble(el, text); } });
      if (fine) el.addEventListener('pointerenter', function () { scramble(el, text); });
    });
  }

  /* ---------- Estructura de scroll ---------- */
  function initHorizontal() {
    var mm = gsap.matchMedia(); api._mm = mm;
    mm.add('(min-width: 900px)', function () {
      $('[data-horizontal]').forEach(function (sec) {
        var track = sec.querySelector('[data-horizontal-track]'); if (!track) return;
        var dist = function () { return Math.max(0, track.scrollWidth - sec.clientWidth); };
        gsap.to(track, { x: function () { return -dist(); }, ease: 'none',
          scrollTrigger: { trigger: sec, pin: true, scrub: 1, start: 'top top', end: function () { return '+=' + dist(); }, invalidateOnRefresh: true } });
      });
    });
  }
  function initThemeSections() {
    $('[data-theme-section]').forEach(function (el) {
      var v = el.getAttribute('data-theme-section');
      ScrollTrigger.create({ trigger: el, start: 'top 50%', end: 'bottom 50%',
        onToggle: function (s) { if (s.isActive) d.body.setAttribute('data-theme', v); } });
    });
  }
  function initProgress() {
    $('[data-progress]').forEach(function (el) {
      gsap.set(el, { scaleX: 0, transformOrigin: '0 50%' });
      gsap.to(el, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 0.2 } });
    });
  }

  /* ---------- Arranque ---------- */
  function start() {
    safe(initLenis); safe(initPreloader);
    [initSplit, initWordsScrub, initReveal, initParallax, initCount, initMarquee, initMagnetic, initTilt,
     initCursor, initScramble, initHorizontal, initThemeSections, initProgress].forEach(safe);
    api.ok = true; root.classList.add('ready');
    var refresh = function () { ScrollTrigger.refresh(); };
    window.addEventListener('load', refresh);
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(refresh);
    setTimeout(function () { if (!api.ok) showAll(); }, 4000);
  }
  api.refresh = function () { ScrollTrigger.refresh(); };
  api.destroy = function () {
    ScrollTrigger.getAll().forEach(function (t) { t.kill(); });
    tickers.forEach(function (t) { gsap.ticker.remove(t); });
    if (api._mm) api._mm.revert();
    if (api.lenis) { api.lenis.destroy(); api.lenis = null; }
  };
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', start); else start();
})();

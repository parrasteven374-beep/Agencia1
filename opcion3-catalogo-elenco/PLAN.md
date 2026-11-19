# Opción 3 — Plan 3C · Piedra y esmeralda oscuro («Orgánico de lujo»)

Página **clara** (piedra `#F1EFEA`, superficie `#FFFFFF`, texto `#14201C`); el tono oscuro viene solo del **esmeralda `#0B3B2E`** (botones, banda de sedes, footer, barra +18) con latón `#836327` / `#D9BD86` en detalles. Tipografía: Instrument Serif + Inter. Contrastes calculados: texto 14.6:1, esmeralda con texto marfil 10.9:1, latón claro sobre esmeralda 6.9:1, latón sobre fondo 4.8:1.

## Recorrido
Barra +18 → Header → Hero asimétrico (titular serif + imagen con parallax suave) → «Tres frentes» (lista editorial con título sticky) → **Catálogo** de 8 fichas (nombres artísticos ficticios) con filtros combinables por categoría y sede → **Sedes + estudio** (banda esmeralda, solo zonas generales) → Beneficios (lista numerada) → FAQ → **Formulario de reclutamiento** → CTA → Footer legal. WhatsApp flotante.

## Contacto de artistas
El botón «Contactar» es un enlace real a `wa.me` (funciona sin JS) y con JS abre un `<dialog>` que lleva al WhatsApp **comercial de la agencia** con el nombre artístico prellenado. Número en `WHATSAPP_AGENCIA` de `js/app.js` (placeholder `570000000000`).

## Movimiento
Lenis + GSAP vía `motion-core`: reveals de título con máscara, `clip-path` en la imagen del hero, parallax suave, escalonado de listas, barra de progreso. Único efecto de puntero: cursor «Ver» en las fotos del catálogo (más botón magnético en CTAs, solo con puntero fino). Filtros con entrada escalonada; modal con animación CSS. Sin preloader (no retrasa el LCP). `prefers-reduced-motion`: contenido final visible, sin animaciones.

## Reglas comunes cumplidas
Copy limpio (sin lenguaje explícito ni plataformas adultas), sedes solo por zona, «+18 Exclusivo para mayores de edad» en barra superior, hero y footer, Habeas Data `required` y sin marcar (más confirmación de mayoría de edad), enlaces legales en el footer (placeholders `#`), catálogo visible sin JavaScript.

## Pendiente del cliente
Número de WhatsApp, textos legales (revisión jurídica), fotografías reales (ver `IMAGENES.md`), nombre definitivo (hoy «Elenco & Estudio», nombre provisional) y envío del formulario (punto marcado `INTEGRACIÓN` en `js/app.js`).

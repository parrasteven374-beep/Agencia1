# Opción 1 — Plan 1A · Marfil y burdeos (editorial de agencia)

Página CLARA; el tono oscuro viene del burdeos (botones, bandas de sedes y formulario, footer). Sin modo oscuro.

**Reglas comunes (brief):** copy limpio para Meta/Google (creación de contenido digital, streaming profesional, manejo de imagen); sedes solo como "Sede 1/2/3" por zona general; aviso "+18 Exclusivo para mayores de edad" (barra superior, hero, requisitos, footer); checkbox Habeas Data `required` y sin premarcar; footer legal; WhatsApp flotante (número placeholder `573000000000`).
**Secciones:** Hero con CTA · propuesta de valor · 3 sedes e infraestructura · beneficios (estudio fotográfico propio, soporte técnico, bloqueo geográfico, pagos puntuales) · galería editorial · requisitos +18 · pasos · formulario corto · footer.

## Identidad
- Paleta: fondo `#F7F1EC` · superficie `#FFFFFF` · texto `#1F1418` (16:1) · suave `#5A4750` (7.6:1) · burdeos `#6E1230` (blanco encima 11.7:1) · burdeos oscuro `#4F0C23` · latón `#8A6A33` (solo detalles/títulos grandes).
- Tipografía: DM Serif Display + DM Sans.

## Movimiento (web-animation-design)
Lenis + GSAP/ScrollTrigger vía `motion-core`: reveal de líneas en H1, clip-path en galería, palabras que se iluminan en Requisitos, línea SVG de pasos que se dibuja con el scroll, subrayado dibujado a mano en el hero. Único efecto de puntero: botón magnético de la CTA principal. Solo `transform`/`opacity`/`stroke-dashoffset`; `prefers-reduced-motion` deja el contenido final visible; contenido legible sin JS.

## Pendientes
Fotos editoriales reales (ver IMAGENES.md), número de WhatsApp, documentos legales (enlaces `#`), envío del formulario (TODO en `js/app.js`), nombre comercial ("Estudio Talento" es provisional).

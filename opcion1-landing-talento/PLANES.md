# Opción 1 — Landing de talento y streaming · 3 planes (v2: fondo claro, toque oscuro por color)

**Criterio de esta versión:** la página es **clara y luminosa** (fondo marfil/perla); el "toque oscuro" lo dan los **colores profundos** (burdeos, ciruela, azul medianoche) en acentos, botones, titulares, una o dos bandas de color y el footer. No hay estilos brutalistas, minimalistas ni modo oscuro. Estilo base de los tres: **editorial corporativo de agencia** (E01/E13/E04 de la skill), serio y limpio.

**Reglas comunes (brief):** copy limpio para Meta/Google (solo creación de contenido, streaming profesional, manejo de imagen); sedes como "Sede 1/2/3" por zona general; aviso visible "+18 Exclusivo para mayores de edad"; checkbox Habeas Data obligatorio y sin premarcar; footer legal; WhatsApp flotante.
**Secciones obligatorias:** Hero con CTA · 3 sedes e infraestructura · Beneficios (estudio fotográfico propio, soporte técnico, bloqueo geográfico, pagos puntuales) · Galería editorial · Requisitos +18 · Formulario corto · WhatsApp.
**Movimiento (web-animation-design):** Lenis + GSAP/ScrollTrigger, `transform`/`opacity`, reduced-motion con contenido final visible, contenido legible sin JS, máx. 1 efecto de puntero, LCP del hero sin animar desde opacidad 0. Intensidad **expresiva pero elegante**: reveals de máscara y parallax suave, sin rebotes.

---

## Plan 1A · Marfil y burdeos — «Editorial de agencia»
**Sensación:** cálido, sofisticado, de revista; el burdeos aporta el tono profundo. Concepto: *una partitura con ritmo y silencios*.
**Paleta:** fondo `#F7F1EC` · superficie `#FFFFFF` · texto `#1F1418` · suave `#5A4750` · **acento burdeos `#6E1230`** (texto blanco encima, 11.7:1) · latón `#8A6A33` solo para detalles y títulos grandes. Contrastes calculados: texto 16:1, burdeos sobre fondo 10.5:1.
**Tipografía:** DM Serif Display (títulos) + DM Sans.
**Recorrido:** Hero asimétrico con titular serif grande, imagen editorial recortada y CTA burdeos → Propuesta de valor en afirmaciones grandes → Sedes (3 tarjetas sobre banda burdeos con texto marfil) → Beneficios en lista editorial numerada → Galería masonry → Requisitos +18 (párrafo que se ilumina con el scroll) → Pasos con línea SVG que se dibuja → Formulario → Footer burdeos.
**Movimiento:** reveal de líneas en H1, clip-path en imágenes, subrayado dibujado a mano en una palabra clave, botón magnético solo en la CTA.
**Ideal si:** quieres calidez y elegancia con un tono profundo y sensual sin salirte de lo corporativo.

## Plan 1B · Hueso y ciruela — «Showroom de agencia»
**Sensación:** moderno, pulido, de marca de producción audiovisual. Concepto: *un escenario con telones*.
**Paleta:** fondo `#F5F2F6` · superficie `#FFFFFF` · texto `#1A1422` · suave `#54485F` · **acento ciruela `#3B1A4F`** (blanco encima, 14.5:1) · terracota apagado `#9A4F3E` para detalles. Texto 16.2:1.
**Tipografía:** Instrument Serif (títulos) + Inter.
**Recorrido:** Hero por capítulos fijados (pin + scrub, solo ≥900px) con 3 mensajes: estudio, streaming, imagen → Bento de beneficios → Galería editorial en carrusel arrastrable (cursor "Arrastrar" como único efecto de puntero) → Sedes e infraestructura → Requisitos +18 → FAQ en acordeón → Formulario → Footer ciruela.
**Movimiento:** pin + scrub, parallax de capas, contadores **solo con datos reales** (si no hay, se omiten).
**Ideal si:** quieres la sensación más "producción profesional" y tecnológica.

## Plan 1C · Perla y azul medianoche — «Corporativo suizo»
**Sensación:** confiable, ordenado, ideal para anuncios. Concepto: *una guía de estudio con índice*.
**Paleta:** fondo `#F2F4F8` · superficie `#FFFFFF` · texto `#0E1424` · suave `#475069` · **acento azul medianoche `#14213D`** (blanco encima, 16:1) · acento 2 vino `#9B2D4F` para detalles. Texto 16.7:1.
**Tipografía:** Bricolage Grotesque + Inter.
**Recorrido:** Hero con titular grande y panel de pasos de postulación → Dato central con gráfico SVG (solo con datos reales) → Sedes en módulos bento → Beneficios con marcadores numerados → Galería masonry → Requisitos +18 → Formulario corto → Footer azul medianoche.
**Movimiento:** scramble en etiquetas del menú, trazos SVG, reveals de bloques con curvas suaves.
**Ideal si:** priorizas claridad y confianza sobre emoción.

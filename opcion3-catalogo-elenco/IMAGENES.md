# Imágenes — Opción 3 (Plan 3C)

Las fotos de `assets/photos/` son **stock de prueba** descargado de Unsplash (Unsplash License: uso comercial permitido, atribución no obligatoria). Son personas reales que no representan a la agencia: **antes de publicar hay que reemplazarlas por fotografía propia**, con consentimiento y cesión de imagen firmada de cada artista (solo mayores de 18). Los nombres artísticos de las fichas son ficticios.

Cada foto se recortó con Unsplash (`fit=crop`, 1200×1500 retratos / 1600×1000 espacios). La URL base de cada una es `https://images.unsplash.com/photo-<ID>`; el autor sale del listado público de Unsplash.

| Archivo | Uso | Autor (Unsplash) | ID de foto |
|---|---|---|---|
| `hero.jpg` | Hero (4:5) | Onur Senay | 1668952135120-7d997b1b3778 |
| `elenco-01.jpg` | Luna Ferré | sammy swae | 1771072426488-87e6bbcc0cf7 |
| `elenco-02.jpg` | Valeria Noir | Lauro Rodríguez | 1664076458686-3449062080ac |
| `elenco-03.jpg` | Isabela Marlow | Ben Scott | 1601597565151-70c4020dc0e1 |
| `elenco-04.jpg` | Camila Dorée | Igor Rand | 1653152707179-125e4e184a0b |
| `elenco-05.jpg` | Sofía Alba | Dominik kielbasa | 1612731486606-2614b4d74921 |
| `elenco-06.jpg` | Renata Solís | Ahmed Carter | 1509631179647-0177331693ae |
| `elenco-07.jpg` | Amara Lys | Marjan Taghipour | 1662532577856-e8ee8b138a8b |
| `elenco-08.jpg` | Elena Vidal | Nicolas Ladino Silva | 1772758058699-5b3f1abc384d |
| `estudio-plato.jpg` | Sedes y estudio (16:10) | Alexander Dummer | 1471341971476-ae15ff5dd4ea |
| `estudio-color.jpg` | Sedes y estudio (16:10) | KOBU Agency | 1647427854253-b92bb40c9330 |
| `streaming.jpg` | Sedes y estudio (16:10) | Higor Hanschen | 1594009375825-564aac98bda6 |
| `estudio-blanco.jpg` | Beneficios (4:3) | George Pagan III | 1586232702178-f044c5f4d4b7 |

## Al reemplazar por fotos propias
- Retratos: 4:5, mismo fondo y luz en todas las fichas para coherencia; nombre artístico, nunca el real. El modal usa la misma foto de la ficha (`img` en el array `ELENCO` de `js/app.js` y en cada tarjeta de `index.html`).
- Hero: 4:5, luz suave, sin texto. Es la imagen LCP: mantener `fetchpriority="high"` y pesar menos de ~250 KB.
- Espacios: 16:10, sin rótulos, fachadas ni elementos identificables (privacidad de las sedes).
- Ajustar los `alt` a lo que muestre cada foto nueva.
- Falta una foto de lounge o sala de recepción de agencia (no se encontró una adecuada en Unsplash).

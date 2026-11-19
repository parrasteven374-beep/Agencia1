# Opción 2 · Plan 2B — «Showroom» · Niebla y azul tinta

Sitio dual: Estudio Fotográfico + Agencia de Talento. Página **clara**; el tono profundo viene del **azul tinta** (botones, bandas, footer). Sin modo oscuro ni estilos brutalistas.

## Reglas comunes (brief)
- Copy corporativo seguro para anuncios y hosting: todo se presenta como fotografía editorial/comercial, producción de estudio, creación de contenido y streaming profesional. Sin lenguaje explícito ni enlaces a sitios para mayores de edad.
- Sedes solo por zona general (Sede 1 norte, Sede 2 centro, Sede 3 sur); nunca direcciones.
- Aviso "+18 Exclusivo para mayores de edad" visible (franja superior, formulario, footer).
- Checkbox de tratamiento de datos (Habeas Data) **obligatorio y sin premarcar**; footer con Política de Privacidad y Términos y Condiciones.
- Botón flotante de WhatsApp (número placeholder).

## Identidad
- Tipografía: **Instrument Serif** (títulos) + **Inter** (texto).
- Paleta: fondo `#EEF0F3` · superficie `#FFFFFF` · texto `#10131A` · suave `#444B5C` · acento azul tinta `#1D2B53` (texto blanco 13.8:1) · latón `#836327` solo detalles (5.6:1 sobre blanco) y `#D4B06A` sobre azul tinta (6.7:1). Texto sobre fondo 16.3:1.
- Radios 14 px, bordes finos, sin sombras difusas.

## Estructura
| # | Sección | Qué ocurre |
|---|---|---|
| 0 | Franja +18 y nav dividida | "Estudio Fotográfico" \| marca \| "Únete al Elenco"; estado activo por scroll |
| 1 | Hero dual | Mitad clara = Estudio, mitad azul tinta = Elenco; la mitad con hover/foco se expande (CSS, ≥900 px con puntero) |
| 2 | Afirmación | Párrafo que se ilumina palabra por palabra con el scroll |
| 3 | Bento de servicios | 5 módulos, entrada escalonada |
| 4 | Portafolio | Filtros Editorial / Estudio / Retrato (`aria-pressed`, reordenado con FLIP); cursor "Ver" |
| 5 | Sedes | Banda azul tinta con 3 módulos |
| 6 | Beneficios para talentos | Tabla comparativa (estudio propio, soporte técnico, bloqueo geográfico, pagos puntuales, imagen) |
| 7 | Proceso | Título fijo (sticky ≥900 px) + 3 pasos |
| 8 | Preguntas frecuentes | Acordeón con `details` |
| 9 | Formulario | Selector de motivo (sesión / talento) con campos condicionales; Habeas Data; éxito local |
| 10 | Footer | Legal + +18 |

## Movimiento (web-animation-design)
Lenis + GSAP/ScrollTrigger vía `motion-core`. Firma sobria: reveals de línea con máscara en títulos, párrafo con scrub, entradas escalonadas, FLIP en filtros, expansión del hero. **Único efecto de puntero:** cursor "Ver" sobre el portafolio. Los titulares del hero no se animan (LCP). Solo `transform`/`opacity`/`clip-path` en JS. `prefers-reduced-motion`: contenido final visible, sin Lenis ni transiciones. Contenido legible sin JS (excepto el reveal de títulos, que se muestran por failsafe).

## Pendientes del cliente
- Número de WhatsApp (`570000000000`), enlaces legales (`#`), marca y textos legales finales (revisión jurídica de Habeas Data).
- Fotos reales (ver `IMAGENES.md`); hoy son visuales SVG propios.
- Integración del formulario: función `enviar()` en `js/app.js`.

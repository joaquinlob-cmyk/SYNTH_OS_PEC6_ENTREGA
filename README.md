# SYNTH_OS — PEC 6 · Proyecto con IA

## 1. Concepto del proyecto
SYNTH_OS es una plataforma **ficticia** de práctica de mecanografía presentada como un terminal de entrenamiento gamificado. La experiencia principal es escribir textos y mejorar velocidad, precisión, racha y puntuación.

La web se organiza en cuatro páginas:

- `index.html` — **DASHBOARD**: typing test principal, efectos activos, estadísticas locales y leaderboard ficticio.
- `trabajos.html` — **OPERATIONS**: tres modos de juego de mecanografía con mecánicas diferentes.
- `servicios.html` — **SERVICES**: boosts ficticios que modifican las reglas o métricas del entrenamiento.
- `contacto.html` — **CONTACT**: formulario de comunicación simulado.

Todos los nombres, pilotos, puntuaciones, PX, servicios y operaciones son ficticios y forman parte del universo visual del proyecto.

## 2. Requisitos de la PEC 6

| Requisito | Implementación |
|---|---|
| Mínimo 4 páginas | Dashboard, Operations, Services y Contact |
| Navegación | Header común y menú responsive |
| Header y footer | Presentes en las cuatro páginas |
| Responsive básico | CSS con breakpoints para desktop, tablet y móvil |
| JavaScript | Typing test, operaciones, boosts, estadísticas, menú y formulario |
| Código revisado | HTML, CSS y JS separados y adaptados manualmente |
| README | Este documento |
| Uso crítico de IA | Proceso, herramientas, prompts y revisión documentados |

## 3. Stack

- HTML5
- CSS3
- JavaScript vanilla
- SVG para recursos gráficos propios
- `localStorage` para estadísticas y loadout ficticio

No se utiliza `node_modules` ni frameworks de JavaScript.

## 4. Herramientas de IA utilizadas

### Google Stitch
Se utilizó para generar propuestas iniciales de interfaz y estructura visual a partir del concepto del proyecto. Las propuestas sirvieron como punto de partida para la identidad SYNTH_OS, sus componentes y las distintas páginas.

### ChatGPT
Se utilizó para revisar y transformar la maqueta inicial en una web multipágina funcional, proponer y depurar HTML/CSS/JavaScript, resolver problemas responsive, desarrollar la lógica del typing test, crear las interacciones y revisar errores.

## 5. Prompts principales utilizados

Los prompts se fueron refinando durante el proceso. Los principales objetivos solicitados a la IA fueron:

1. **Transformación de la maqueta:** convertir las pantallas generadas con IA en una web completa de cuatro páginas con navegación real.
2. **Arquitectura:** separar HTML, CSS y JavaScript, eliminar dependencias innecesarias y preparar una estructura adecuada para GitHub.
3. **Responsive:** adaptar la interfaz a escritorio, tablet y móvil manteniendo la identidad visual.
4. **Typing test:** crear una interacción de mecanografía con textos variables, timer, WPM, precisión, errores, progreso, racha y resultados.
5. **Operations:** convertir las operaciones en modos de juego diferentes en lugar de páginas informativas o logs.
6. **Services:** hacer que los boosts ficticios tengan efectos reales dentro del typing test y que sus compras persistan localmente.
7. **Revisión:** localizar errores visuales y funcionales, mejorar accesibilidad, navegación, estados y coherencia entre páginas.

## 6. Qué fue generado con IA

La IA se utilizó especialmente para:

- propuestas iniciales de layout e interfaz;
- estructura HTML inicial;
- propuestas de estilos y componentes;
- textos ficticios y nomenclatura del universo SYNTH_OS;
- ideas de interacciones;
- primera implementación de JavaScript;
- generación y adaptación de recursos gráficos SVG;
- propuestas de responsive y organización del código.

## 7. Qué fue revisado y modificado manualmente

El resultado final no corresponde a una exportación sin revisión. Se realizaron decisiones y modificaciones para convertir la propuesta en un proyecto coherente y funcional:

- se reorganizó la navegación y se definieron las cuatro páginas finales;
- se cambió el enfoque para que la mecanografía fuese el núcleo del proyecto;
- se eliminó la dependencia inicial de Tailwind y se consolidó el CSS en `css/styles.css`;
- se centralizó el comportamiento en `js/main.js`;
- se corrigieron enlaces, estados y errores de interacción;
- se creó el typing test funcional;
- se desarrollaron tres modos de juego diferentes para Operations;
- se implementaron compras y efectos ficticios de Services;
- se añadieron estadísticas locales y leaderboard ficticio;
- se revisaron los estados activos para que fueran legibles;
- se adaptó el contenido a móvil;
- se revisaron etiquetas semánticas, estados ARIA y controles;
- se eliminaron elementos de la maqueta que no aportaban a la experiencia final.

## 8. Funcionalidades principales

### Dashboard

- typing test libre;
- textos variables;
- timer;
- WPM;
- precisión;
- errores;
- combo;
- score;
- resultado de la partida;
- estadísticas locales;
- boosts activos;
- leaderboard ficticio.

### Operations

- **VOID_WALKER** — Speed Run por oleadas.
- **NEON_SILENCE** — Precision Run con tres strikes.
- **GHOST_SHELL** — Endurance Run con tres vidas.

Las operaciones llevan al typing test principal y configuran su mecánica.

### Services

Los servicios utilizan PX, una moneda completamente ficticia:

- **NEURAL SPEED BOOST** — +20% al WPM mostrado.
- **STREAK SHIELD** — una protección de combo.
- **SCORE OVERCLOCK** — multiplicador de puntuación.
- **PRECISION CALIBRATION** — información adicional de errores.

El estado del loadout se guarda localmente mediante `localStorage`.

### Contact

Formulario de contacto simulado con validación frontend. No envía información a un servidor.

## 9. Comparación con el proyecto manual

### Qué fue más rápido con IA
La IA permitió obtener rápidamente una dirección visual, una estructura inicial y propuestas de componentes. También aceleró la creación de primeras versiones de HTML, CSS y JavaScript.

### Qué fue más difícil de controlar
La principal dificultad fue mantener coherencia entre páginas y evitar que componentes generados automáticamente funcionaran de forma aislada. También fue necesario revisar responsive, estados de interacción y la relación entre Operations, Services y el typing test.

### Qué partes tuvieron que corregirse
Se corrigieron la navegación, la estructura de CSS, los estados de los botones, la lógica del typing test, las operaciones, los boosts, el responsive, algunos estados visuales y varios elementos que procedían de la maqueta inicial pero no encajaban con el concepto definitivo.

### Resultado visual frente a PEC 3
La versión con IA mantiene la identidad visual y el lenguaje gráfico definidos para SYNTH_OS, pero introduce una segunda interpretación del proyecto. No pretende ser una copia exacta del proyecto manual.

### Qué se aprendió al comparar ambos procesos
El proceso mostró que la IA permite acelerar la exploración y la producción inicial, pero la integración, la revisión y las decisiones de producto siguen requiriendo intervención humana. Una interfaz generada automáticamente puede parecer completa y, aun así, contener problemas de navegación, interacción o coherencia que solo aparecen al probarla como una web real.

## 10. Referencia al diseño de PEC 3

**Figma PEC 3:** `AÑADIR AQUÍ EL ENLACE AL ARCHIVO DE FIGMA DE LA PEC 3`

> Este enlace debe sustituirse por la URL real del archivo de Figma antes de entregar.

## 11. Referencia funcional

La interacción del typing trainer toma como referencia el patrón habitual de herramientas de práctica de mecanografía: comenzar el cronómetro al escribir, calcular WPM, controlar precisión y errores, y permitir corregir mediante Backspace. La implementación y el diseño de SYNTH_OS son propios.

## 12. Estructura del proyecto

```text
SYNTH_OS_PEC6/
├── index.html
├── trabajos.html
├── servicios.html
├── contacto.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   └── *.svg
├── DESIGN.md
├── README.md
└── .gitignore
```

## 13. Ejecución local

Abrir la carpeta en VS Code y utilizar **Live Server** sobre `index.html`. No es necesario instalar dependencias.

## 14. Entrega

Antes de entregar en Google Classroom:

- subir esta carpeta a un repositorio de GitHub;
- realizar commits descriptivos durante el proceso;
- sustituir el placeholder del enlace de Figma por el enlace real de la PEC 3;
- publicar mediante GitHub Pages si se desea entregar también una URL navegable;
- compartir el enlace del repositorio y, si procede, la URL publicada.


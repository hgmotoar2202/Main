# Análisis del Product Brief v0.2 e informe de diferencias

- Fecha: 2026-11-07
- Autor: Giovanny (con Claude como asistente)
- Documentos comparados: Plan Maestro v1.0, Product Brief v0.2 (`docs/contexto/`) y Product Brief v0.3 consolidado (`_bmad-output/product-brief-insure-ai.md`)
- Estado: pendiente de aprobación del Product Owner

## 1. Resumen

El Brief v0.2 aporta decisiones útiles (tres escenarios, web primero, modelo multidimensional, contratos JSON, matriz RBAC, criterios de calidad de IA) y un proceso de análisis completo, pensado para un proyecto de semanas. Con 5 días, **adoptamos sus decisiones de producto y comprimimos su proceso**: cada entregable se produce en versión ajustada y la aprobación del Product Owner se registra en el repositorio antes de pasar a la siguiente fase.

## 2. Diferencias entre el Plan Maestro v1.0 y el Brief v0.2

| Tema | Plan Maestro v1.0 | Brief v0.2 | Decisión para el MVP |
|---|---|---|---|
| Escenarios | Laboral, personal y tránsito, con ejemplos | Los tres confirmados como alcance inicial | Adoptar: un asistente común con secciones condicionales |
| Plataforma | Web/PWA primero, móvil después | Web responsive primero; móvil como fase posterior reutilizando backend | Adoptar; la app móvil no añade alcance |
| Dimensiones del evento | Tipo de evento, contexto laboral, relación con empleador, contexto personal, estado | Naturaleza, contexto, relación laboral, **ámbito de seguro/proceso**, estado | Adoptar el modelo v0.2 (agrega ámbito de seguro) |
| Video y frames | Módulo propio (v0.7) | "Se priorizará según viabilidad" | Fuera del MVP, plus de fase 2 |
| Procesamiento | Colas y workers (Redis/BullMQ) | Workers asíncronos | MVP síncrono con campo de estado; interfaz preparada para volverse asíncrona |
| Método de trabajo | BMAD y agentes | BMAD para análisis/arquitectura/QA; **Claude Code** para implementar | Sin Claude Code (acceso no disponible): Claude en el chat produce artefactos y código por historias |
| Antes de programar | Analysis y Planning primero | 10 entregables aprobados, incluidos wireframes y diagramas | Versión ajustada (sección 4) |
| Roadmap | v0.1.0 a v1.0.0 | Mismos hitos, aclarando que no son fechas | Se mantienen los nombres; se agrupan para el MVP (sección 8) |

## 3. Propuestas de mejora del Brief v0.2

**Se adoptan:**
- Dimensiones independientes con "ámbito de seguro" como catálogo configurable.
- Registro de requisitos con origen, estado, prioridad, criterio de aceptación y aprobación (se incorpora a la tabla del PRD).
- Contratos JSON versionados para extracción y evaluación preliminar, con campos faltantes, contradicciones, evidencias, incertidumbre y revisión humana. Es el núcleo del motor de IA.
- Matriz RBAC con casos de prueba positivos y negativos.
- Evaluación de IA por campo, clase y tipo de error (extracción: campos omitidos y valores inventados).
- Definición de terminado del análisis, usada como lista de verificación antes de programar.
- Informe de diferencias como primera salida (este documento).

**Se adaptan (versión reducida):**
- Arquitectura: 1 a 2 páginas con un diagrama de componentes, no un paquete completo.
- ADR: solo los de decisiones que condicionan el MVP (monorepo y web-first, NestJS, MongoDB, proveedor y adaptador de IA, RAG mínimo).
- UX: flujos de pantallas en texto y componentes, sin wireframes formales.
- QA strategy: una página con niveles de prueba y el conjunto de casos sintéticos.

**Se aplazan (fase 2):**
- Análisis de video y frames, y análisis visual de imágenes.
- Evaluación comparativa de MongoDB Vector Search y Qdrant (el MVP usa una solución simple y se documenta la comparación como pendiente).
- Matriz de riesgos con responsables por área y evaluación de proveedores.

## 4. Tensiones con el plazo y cómo se resuelven

1. **"No programar hasta aprobar PRD, arquitectura y backlog."** Se respeta con puertas cortas: el Product Owner (tú) aprueba por escrito cada documento, y la aprobación queda registrada en el repositorio. Sin esa puerta no se escribe código del área correspondiente.
2. **Tres escenarios completos.** Un solo flujo con secciones condicionales evita triplicar el trabajo. Los escenarios se diferencian en datos, no en pantallas distintas.
3. **Carga de evidencias.** Se incluye subir, guardar con hash y metadatos y mostrar la lista; el análisis visual queda fuera.
4. **RAG.** Es el primer recorte si el tiempo falla; el flujo reportar → revisar → PDF es la prioridad no negociable.
5. **Sin Claude Code.** El código se entrega por historias pequeñas mediante scripts que crean los archivos en tu equipo. Falta validar el mecanismo de transferencia (véase la prueba de descarga propuesta).

## 5. Registro de decisiones y supuestos

| ID | Decisión o supuesto | Origen | Estado |
|---|---|---|---|
| D-01 | Alcance con los tres escenarios | Brief v0.2 | Adoptada |
| D-02 | Web responsive primero; app móvil posterior | Brief v0.2 | Adoptada |
| D-03 | Backend común reutilizable | Brief v0.2 | Adoptada |
| D-04 | MongoDB como persistencia | Brief v0.2 | Candidata, ADR pendiente |
| D-05 | Frames y video fuera del MVP | Product Owner | Adoptada |
| D-06 | Colas asíncronas fuera del MVP | Análisis | Propuesta |
| D-07 | Aprobaciones del Product Owner registradas en el repositorio | Análisis | Propuesta |
| S-01 | Se desconoce el enunciado de la prueba | Product Owner | Supuesto |
| S-02 | Una sola organización; Colombia como referencia | Plan Maestro | Supuesto |
| S-03 | Datos 100 % sintéticos | Plan Maestro | Regla |
| S-04 | Hará falta una clave de API de IA, o se usa el proveedor simulado | Análisis | Abierto |

## 6. Preguntas abiertas priorizadas

1. ¿Existe un enunciado o criterios de evaluación de la prueba? Si aparece, puede cambiar el alcance.
2. ¿Habrá clave de API de un proveedor de IA (Anthropic u otro) para la demostración, o se usará el proveedor simulado?
3. ¿Dónde se ejecutará la demostración: solo en local con `docker compose` o también desplegada en línea?
4. ¿Qué formularios PDF se deben reproducir? En el MVP se usará una plantilla sintética propia.
5. ¿Qué documentos alimentan el RAG? En el MVP, documentos sintéticos redactados por nosotros.
6. ¿Se evaluará el código, la documentación, la demostración funcionando o todo? Define dónde invertir el tiempo.
7. ¿Idioma de la interfaz y de la documentación? Se asume español.

## 7. Riesgos principales

| Riesgo | Efecto | Mitigación |
|---|---|---|
| Alcance excesivo para 5 días | Entrega incompleta | Flujo central primero; RAG y evidencias como recortables |
| Sin Claude Code | Más fricción al pasar el código al equipo | Scripts generadores por historia; probar el mecanismo temprano |
| Sin clave de API | La IA no funciona en la demostración | Proveedor simulado detrás del adaptador |
| Errores de la IA en extracción | Datos inventados | Salida con esquema, validación, revisión humana y métricas por campo |
| Privacidad | Exposición de datos sensibles | Solo datos sintéticos; sin datos reales a servicios externos |
| Planificación que consume el tiempo de construcción | Poco código funcional | Documentos en versión ajustada y puertas de aprobación cortas |

## 8. Plan ajustado (hasta el viernes 13 de noviembre)

| Día | Trabajo | Puerta de aprobación |
|---|---|---|
| Sáb 7 | Brief v0.3, este análisis, PRD con registro de requisitos | Brief y análisis |
| Dom 8 | Arquitectura breve, ADR, modelo de datos y contratos JSON, matriz RBAC, historias; monorepo y CI básico | PRD, arquitectura y backlog |
| Lun 9 | Backend: usuarios, roles, expedientes, auditoría, con pruebas | Historias de backend |
| Mar 10 | Frontend: login, bandeja, asistente de reporte; adaptador de IA y extracción | Flujo de reporte |
| Mié 11 | Revisión humana, evidencias, PDF desde plantilla | Flujo completo |
| Jue 12 | RAG mínimo si hay tiempo, pruebas E2E, evaluación de casos sintéticos, README, `docker compose` | Lista de calidad |
| Vie 13 | Colchón, demostración grabada y entrega | Entrega |

## 9. Versionado propuesto

- `v0.0.1`: estructura inicial (ya existe).
- `v0.1.0` Foundation: cuando el monorepo y el CI básico estén funcionando.
- `v0.2.0` Product & UX: cuando PRD, arquitectura y backlog estén aprobados.
- El MVP de la prueba se publica con un tag posterior (por definir) y su entrada en `CHANGELOG.md`.

## 10. Lista de verificación antes de programar

- [ ] Los tres escenarios están en requisitos y flujos, sin confundir naturaleza del evento, relación laboral y ámbito de seguro.
- [ ] La estrategia web-first aparece en UX, arquitectura, backlog y criterios de aceptación.
- [ ] La app nativa está marcada como fase 2 y no añade alcance.
- [ ] Las decisiones técnicas importantes tienen ADR con alternativas y consecuencias.
- [ ] El Product Owner aprobó por escrito PRD, arquitectura y backlog.

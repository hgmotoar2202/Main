# Product Brief: INSURE AI

- Autor: Giovanny
- Fecha: 2026-11-07
- Versión: 0.4 (el RAG pasa a imprescindible), pendiente de aprobación del Product Owner
- Origen: Plan Maestro INSURE AI v1.0 y Product Brief v0.2 (ambos en `docs/contexto/`), recortados al alcance de una prueba técnica de 5 días. Las diferencias y decisiones están en `analisis-product-brief-v0-2.md`.

## Executive Summary

INSURE AI es una plataforma web que ayuda a recibir, ordenar y documentar reportes de accidentes laborales, personales y de tránsito. Una persona cuenta lo ocurrido con sus palabras; el sistema extrae los datos estructurados, detecta lo que falta o se contradice, hace preguntas de aclaración y prepara un formulario PDF para revisión humana.

El principio rector es que **la IA asiste y documenta; las personas deciden**. El sistema nunca determina cobertura, responsabilidad, causalidad, diagnóstico ni autorización definitiva. Cada resultado de la IA queda trazado (modelo, versión de prompt, fuentes) y pasa por revisión humana.

La visión completa (RAG documental extenso, análisis de imágenes y video, app móvil, autorizaciones avanzadas) requiere semanas. Este brief define una **primera versión funcional en 5 días** que demuestra el flujo central de extremo a extremo con calidad de ingeniería: contratos claros, permisos probados en la API, auditoría, pruebas y documentación.

## The Problem

*Hipótesis tomada del plan maestro; no se ha validado con usuarios reales.*

Quien recibe un reporte de accidente parte de un relato libre, incompleto o ambiguo. Los datos clave (fecha, lugar, actividad, relación con el trabajo, personas, vehículos, testigos) llegan desordenados; los formularios se llenan a mano, con errores y sin rastro de quién cambió qué; y la misma información se pide varias veces. Esto retrasa los trámites y dificulta auditar cómo se llegó a cada dato.

## The Solution

Un flujo guiado y único para los tres escenarios: la persona reporta el evento, la IA propone datos estructurados y preguntas de aclaración, un revisor corrige y confirma, y el sistema genera el formulario PDF desde una plantilla versionada. Una consulta de conocimiento con citas ayuda al revisor a contrastar con documentos autorizados y responde "información insuficiente" cuando no hay soporte. Todo el recorrido queda auditado.

## What Makes This Different

- **Humano en el circuito por diseño:** la IA propone, nunca decide; los estados definitivos los fija una persona.
- **Clasificación multidimensional:** laboral, personal y tránsito no son categorías excluyentes; se modelan como dimensiones independientes.
- **Trazabilidad:** cada propuesta guarda modelo, versión de prompt, fuentes y revisión.
- **Abstención honesta:** si no hay evidencia, el sistema lo dice en vez de inventar.

No se afirma una ventaja técnica irrepetible: el valor está en la disciplina del proceso y la confianza que genera.

## Who This Serves

- **Reportante (asegurado o trabajador):** quiere contar lo ocurrido sin llenar un formulario complejo y saber el estado de su caso.
- **Analista / revisor:** necesita datos ordenados, contradicciones señaladas y poder corregir antes de aprobar.
- **Administrador:** gestiona usuarios y roles y consulta la auditoría.

## Modelo de clasificación (dimensiones independientes)

| Dimensión | Valores iniciales |
|---|---|
| Naturaleza del evento | tránsito, caída, golpe, corte, quemadura, otro, no determinado |
| Contexto | laboral, personal, recreativo, desplazamiento, desconocido |
| Relación laboral | en jornada, en misión, trayecto, transporte suministrado, no aplica, por verificar |
| Ámbito de seguro/proceso | laboral, accidentes personales, tránsito u otro producto (catálogo configurable) |
| Estado de evaluación | pendiente de información, preliminar, revisión humana, validado por responsable, no determinado |

Son un modelo inicial para análisis, no categorías legales ni operativas definitivas; requieren validación del Product Owner y asesoría especializada.

## Success Criteria

Para la demostración de la prueba técnica (valores objetivo, a calibrar con casos sintéticos):

- Un usuario completa el flujo reportar → revisar → PDF sin ayuda, en cualquiera de los tres escenarios.
- La extracción se evalúa con un conjunto de casos sintéticos con respuesta esperada conocida, midiendo exactitud por campo, campos omitidos y valores inventados; se reporta el resultado real, no una cifra prometida.
- Los permisos están probados en la API con casos positivos y negativos: un rol sin autorización recibe rechazo aunque el botón no se vea.
- Cada resultado de IA es trazable y cada acción relevante queda en auditoría.
- El RAG se evalúa con un conjunto de preguntas de referencia y reporta recuperación, exactitud de citas y abstención correcta.
- Cualquier persona puede clonar el repositorio, ejecutar un solo comando y ver funcionando el flujo.
- Pruebas unitarias y de API en verde, y al menos una prueba E2E del flujo principal.

## Scope

**Dentro de la primera versión (5 días):**
- Inicio de sesión y roles (reportante, revisor, administrador) con RBAC validado en el backend.
- Un asistente de reporte común a los tres escenarios, con secciones condicionales (por ejemplo, vehículos para tránsito, empleador para contexto laboral).
- Extracción estructurada con IA, detección de campos faltantes y contradicciones, y preguntas de aclaración neutrales.
- Pantalla de revisión y corrección humana, con estados del expediente.
- Carga de evidencias (documentos e imágenes) con metadatos y hash, sin análisis visual.
- Generación de PDF desde una plantilla versionada.
- Auditoría de acciones.
- Base de conocimiento (RAG) imprescindible: Corpus sintético versionado, ingesta, consulta con citas, abstención ("información insuficiente") y evaluación con preguntas de referencia. Recuperación léxica por defecto, con un puerto listo para embeddings.
- Datos 100 % sintéticos; despliegue local con `docker compose`; pruebas y documentación.
- Interfaz web responsive.

**Fuera de esta versión (fase 2):**
- Extracción de frames y análisis de video o imágenes.
- App móvil nativa (Expo / React Native), operación sin conexión.
- Multi-organización, MFA, firma electrónica, almacenamiento S3, colas y workers asíncronos.
- Flujos de autorización complejos (solo aprobar o rechazar con motivo).
- Cualquier decisión de cobertura, diagnóstico, responsabilidad, causalidad o pago.

## Supuestos y dependencias

- No se dispone del enunciado original de la prueba; se toman el plan maestro y el Product Brief v0.2 como requisitos. Se ajustará si aparece el enunciado.
- El equipo es una persona desarrolladora asistida por IA (Claude para análisis y código; ChatGPT como revisor independiente). El Product Owner es la misma persona; sus aprobaciones se registran explícitamente en el repositorio.
- Se asume una sola organización y Colombia como jurisdicción de referencia. Para casos reales haría falta asesoría jurídica (Ley 1581 de 2012); no se usan datos reales.
- La extracción con IA requiere una clave de API de un proveedor de modelos, dependencia externa. **Mitigación:** una capa adaptadora con un proveedor simulado (respuestas de ejemplo) para que la demostración funcione sin clave o crédito.
- Las tecnologías (Next.js, NestJS, MongoDB) son candidatas y se confirman en arquitectura mediante ADR.
- En este proyecto "entrenar" significa construir y mejorar el conocimiento (Corpus), las instrucciones (prompts versionados), los contratos y las evaluaciones; no se ajustan los pesos de un modelo. BMAD define y sustenta ese proceso; el código lo escribe Claude y el diseño UX lo trabaja ChatGPT.

## Vision

Si la prueba valida el flujo, el producto crece según el roadmap del plan maestro: RAG documental completo con evaluación, análisis de evidencias visuales con frames de video, app móvil nativa conectada al mismo backend, flujos de autorización robustos y métricas de calidad por categoría, siempre con revisión humana para decisiones críticas.

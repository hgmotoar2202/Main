# Política de versionado

Objetivo: que cualquier punto importante del proyecto se pueda recuperar, y que volver atrás no obligue a empezar de cero. La guía práctica para volver atrás está en `docs/RELEASES/guia-rollback.md`.

## 1. Qué se versiona

- Código de la aplicación (`apps/`, `packages/`).
- Documentación y artefactos BMAD (`docs/`, `_bmad-output/`).
- Contratos y esquemas JSON de la IA, con el número de versión en el nombre del archivo (por ejemplo `extraction.v1.json`). Un cambio incompatible crea un archivo nuevo (`v2`); no se edita el anterior.
- Prompts, configuración de modelos y Plantillas de formulario, también con versión explícita.
- Documentos de conocimiento y datos sintéticos de prueba.

## 2. Convención de versiones (SemVer)

| Rango | Significado |
|---|---|
| `v0.0.x` | Puntos de control de preparación: documentos y configuración, sin código de producto |
| `v0.1.0` | Foundation: monorepo y CI básico funcionando |
| `v0.2.0` | Producto y UX: PRD, arquitectura y backlog aprobados por el Product Owner |
| `v0.3.0` en adelante | Incrementos de construcción (backend, interfaz, IA, formularios...) |
| versión de entrega | Se define al cerrar el MVP; incluye entrada en `CHANGELOG.md` |

Los tags son **anotados** (`git tag -a`) y llevan un mensaje que dice qué contiene ese punto.

## 3. Cuándo se crea un punto de control (tag)

- Al aprobar un documento importante (Brief, PRD, arquitectura).
- Al terminar una historia o un grupo de historias con las pruebas en verde.
- Antes de un cambio grande o arriesgado (cambio de base de datos, de proveedor de IA, de contratos).
- Antes de la entrega.

## 4. Lista de verificación para crear un punto de control

1. `git status` limpio, con todo confirmado.
2. `CHANGELOG.md` actualizado con una entrada para la versión.
3. Respaldo local: `.\scripts\backup.ps1`.
4. Crear el tag anotado y subirlo: `git tag -a vX.Y.Z -m "descripción"` y `git push origin vX.Y.Z`.
5. Registrar el hito en la tabla de la sección 6.

## 5. Ramas y commits

- `main` contiene siempre un estado funcional o documental coherente.
- Cada historia se desarrolla en `feature/<historia>-nombre` y se integra a `main` mediante Pull Request.
- Los commits siguen Conventional Commits (`feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `ci`).
- **No se reescribe el historial de `main`** (sin `git push --force`). Para deshacer algo ya publicado se usa `git revert`.

## 6. Historial de hitos

| Versión | Commit | Fecha | Contenido |
|---|---|---|---|
| `v0.0.1` | `4dab3b1` | 2026-11-07 | Estructura inicial, políticas, ADR-0001 y script de respaldo |
| `v0.0.2` | `d5e029f` | 2026-11-07 | BMAD 6.12.4 instalado (módulo BMM, Claude Code) y plan maestro como contexto |
| `v0.0.3` | `1f1ccf8` | 2026-11-08 | Product Brief v0.3 consolidado, análisis del Brief v0.2 y PDF del Brief v0.2 |
| `v0.0.4` | `adcf56b` | 2026-11-08 | PRD v0.1, política de versionado, guía de rollback y CHANGELOG |
| `v0.0.5` | `f47a1e5` | 2026-11-08 | Arquitectura v0.1, ADR-0002 a 0007, modelo de datos, contrato ExtractionV1 y matriz RBAC |
| `v0.0.6` | `1087579` | 2026-11-08 | RAG imprescindible en el MVP: PRD v0.2, Brief v0.4, AD-12 y ADR-0008 |
| `v0.1.0` | (se completa al crearlo) | 2026-11-08 | Foundation: monorepo, paquetes domain y contracts, API y web mínimas, CI y MongoDB con Docker Compose |

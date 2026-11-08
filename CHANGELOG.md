# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y
[Versionado Semántico](https://semver.org/lang/es/).

## [Sin publicar]

## [0.1.0] - 2026-11-08
### Añadido
- Monorepo con pnpm workspaces, TypeScript, ESLint y CI en GitHub Actions (lint, typecheck, pruebas y build).
- `packages/domain`: estados del Expediente y cálculo de campos corregidos, con pruebas.
- `packages/contracts`: contrato `ExtractionV1` en Zod, estricto y con pruebas.
- `apps/api`: API NestJS con endpoint `/health` y validación de configuración.
- `apps/web`: web Next.js mínima en español.
- MongoDB local con Docker Compose, `.env.example` y guía de desarrollo (`docs/desarrollo.md`).
- Registro de aprobaciones del Product Owner (`docs/BMAD/aprobaciones.md`).

## [0.0.6] - 2026-11-08
### Cambiado
- El RAG pasa a ser imprescindible en el MVP: PRD v0.2, Product Brief v0.4, arquitectura con AD-12 y ADR-0008.
- Modelo de datos con `corpus_versions` y `rag_queries`; matriz RBAC con los endpoints de conocimiento.

## [0.0.5] - 2026-11-08
### Añadido
- Arquitectura v0.1 (`_bmad-output/architecture-spine-insure-ai.md`) y ADR-0002 a ADR-0007.
- Modelo de datos, contrato `ExtractionV1`, estados del Expediente y matriz RBAC (`_bmad-output/modelo-datos-contratos-rbac.md`).

## [0.0.4] - 2026-11-08
### Añadido
- PRD v0.1 de INSURE AI con 29 requisitos funcionales y registro de requisitos (`_bmad-output/prd-insure-ai.md`).
- Política de versionado (`docs/RELEASES/politica-versionado.md`).
- Guía de rollback (`docs/RELEASES/guia-rollback.md`).

### Cambiado
- CHANGELOG con el historial de versiones.

## [0.0.3] - 2026-11-08
### Añadido
- Product Brief v0.3 consolidado (`_bmad-output/product-brief-insure-ai.md`).
- Análisis y informe de diferencias del Product Brief v0.2 (`_bmad-output/analisis-product-brief-v0-2.md`).
- PDF del Product Brief v0.2 en `docs/contexto/`.

## [0.0.2] - 2026-11-07
### Añadido
- BMAD Method 6.12.4 instalado (módulo BMM, herramienta Claude Code): carpetas `_bmad/` y `.claude/`.
- Plan maestro de INSURE AI como contexto en `docs/contexto/`.

## [0.0.1] - 2026-11-07
### Añadido
- Estructura inicial del repositorio (apps, packages, docs, policies, tests, infrastructure).
- README, .gitignore, .gitattributes, CONTRIBUTING.
- Política de backups y script de respaldo con `git bundle`.
- Plantilla de ADR y ADR-0001 (repositorio único).
- Prompt inicial para BMAD en `docs/BMAD/`.

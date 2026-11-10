# INSURE AI — contexto para Claude Code

Prueba técnica con **entrega el viernes 2026-11-13**. Plataforma para gestionar siniestros/reclamaciones con IA, RAG y revisión humana. Solo datos sintéticos.

## Equipo y roles
- **Giovanny**: Product Owner y único desarrollador. Decide y aprueba.
- **Claude (Code)**: solo código, análisis técnico y pruebas.
- **ChatGPT**: UX y revisión independiente (su entregable de UX es necesario antes del frontend).
- **BMAD (6.12.4)**: único responsable de definir y sostener el "entrenamiento": Corpus RAG, prompts versionados, contratos y evaluaciones. Skills en `.claude/skills/bmad-*`, config en `_bmad/`, salidas en `_bmad-output/`. Usa `/bmad-help` para saber el siguiente paso.

## Alcance aprobado
- Tres escenarios: laboral, personal, tránsito. Web responsive primero; app nativa después.
- Backend común, MongoDB. Extracción de frames/video: diferida (plus).
- **RAG obligatorio desde el MVP** (ADR-0008, AD-12): ingesta, versionado de Corpus (`corpus_versions`), citas, abstención por umbral de score, log en `rag_queries`, set de evaluación (Recall@k, exactitud de citas, abstención correcta).
- Roles: Reportante, Revisor, Administrador. RBAC siempre en el backend, con pruebas positivas y negativas.
- UI en español. Proveedor de IA por defecto: `simulated`; real opcional vía `AI_PROVIDER` + `ANTHROPIC_API_KEY`.

## Documentos fuente (leer antes de decidir)
`_bmad-output/`: `product-brief-insure-ai.md` (v0.4), `prd-insure-ai.md` (v0.2, FR-1..FR-31, prioridades M/S/C en §11), `architecture-spine-insure-ai.md` (AD-1..AD-12), `modelo-datos-contratos-rbac.md`. ADRs en `docs/ADR/`. Aprobaciones en `docs/BMAD/aprobaciones.md`.

## Arquitectura (resumen de AD-1..AD-12)
Monolito modular hexagonal. Dominio puro (sin I/O). IA solo por `AiProviderPort`; almacenamiento por `StoragePort`; recuperación por `RetrieverPort` (léxico con índice de texto de MongoDB, embeddings opcional). Salida de IA validada con `ExtractionV1` (Zod estricto, `humanReviewRequired: true`, máx. 5 preguntas, rechaza campos desconocidos como decisiones de cobertura) y nunca es definitiva. Auditoría append-only. Procesamiento de IA síncrono en el MVP. Contratos definidos una vez en `packages/contracts`. Estado del expediente = máquina de estados en `packages/domain` (pending_info → preliminary → human_review → validated/undetermined).

## Comandos
`pnpm install` · `pnpm lint` · `pnpm typecheck` · `pnpm test` · `pnpm build` (todos deben quedar en verde antes de commit). Mongo: `docker compose -f infrastructure/docker-compose.yml up -d`. Stack: Node 24, pnpm 9.15.0, TS 5.9, NestJS 11, Next 16, React 19, Zod 3, Vitest (domain/contracts), Jest (api).
**No actualizar versiones** antes de la entrega.

## Versionado y rollback (nunca empezar de cero)
- Commits convencionales en español. Cambios pequeños y frecuentes en `main`.
- Tags SemVer anotados como puntos de restauración; **nunca mover ni reescribir un tag**: usar el siguiente número. Actual: **v0.1.0**.
- Actualizar `CHANGELOG.md` (Keep a Changelog) en cada hito. Ver `docs/RELEASES/politica-versionado.md` y `guia-rollback.md`. Respaldo: `scripts/backup.ps1` → `D:\Backups\insure-ai`.
- No commitear `node_modules`, `dist`, `.next`, `storage/`, secretos ni `.env`.

## Estado actual
Hecho: documentación BMAD (brief, PRD, arquitectura, modelo de datos), esqueleto del monorepo (domain, contracts, api con /health, web mínima), CI, Docker Compose con MongoDB. Local verde: lint, typecheck, 19 tests, build.
Pendiente (el calendario se atrasó; el backend estaba previsto para el 9/nov):
1. Historias/épicas con BMAD (`/bmad-create-epics-and-stories`) y corpus + set de evaluación RAG.
2. Backend: identidad, RBAC, expedientes, auditoría.
3. Módulo de IA con proveedor simulado.
4. RAG: ingesta, versionado de corpus, citas, abstención, evaluación.
5. UI web (tras el entregable UX de ChatGPT).
6. Formulario PDF desde plantilla versionada; evidencias (menor prioridad).
7. Pruebas E2E, README, arranque con un solo `docker compose`.
Confirmar con Giovanny: proveedor real vs simulado, proteger `main`, resultado de CI en GitHub.

## Reglas de trabajo
Priorizar lo funcional y demostrable sobre lo completo. Ante ambigüedad costosa, preguntar a Giovanny. Respetar AD-1..AD-12; si un cambio los contradice, proponer un ADR en vez de saltárselos.

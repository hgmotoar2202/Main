# INSURE AI

Plataforma inteligente para gestión de accidentes, siniestros y formularios.
Desarrollo asistido por agentes de IA con **BMAD Method**, arquitectura **RAG** y análisis visual.

> Estado: **Foundation (v0.0.1)**. Aún no hay código de producto. Primero análisis y planificación.

## Principio rector
La IA asiste y documenta. Las decisiones de cobertura, diagnóstico, responsabilidad y
autorización definitiva las toman siempre personas facultadas.

## Estructura
| Carpeta | Contenido |
|---|---|
| `apps/` | web (Next.js), api (NestJS), workers, mobile (Expo, fase posterior) |
| `packages/` | contratos, validaciones, dominio puro, cliente API y UI web compartidos |
| `docs/` | BMAD, ADR, arquitectura, UX, API, seguridad, releases y contexto |
| `policies/` | políticas de autonomía de agentes, seguridad y estándares |
| `infrastructure/` | despliegue e infraestructura como código |
| `tests/` | integración, E2E, seguridad y evaluación de IA |
| `scripts/` | utilidades (backups, etc.) |

## Contexto del proyecto
El plan maestro inicial está en `docs/contexto/` (copiar allí el PDF).
No sustituye los artefactos oficiales de BMAD (Product Brief, PRD, arquitectura).

## Flujo de trabajo
1. Ramas: `main` (protegida), `feature/<historia>-nombre`, `fix/<id>-nombre`, `release/x.y.z`.
2. Todo cambio entra por Pull Request con checks y revisión.
3. Commits según [CONTRIBUTING.md](CONTRIBUTING.md) (Conventional Commits).
4. Cada hito lleva tag (`v0.1.0`, ...) y entrada en [CHANGELOG.md](CHANGELOG.md).
5. Las decisiones técnicas se registran como ADR en `docs/ADR/`.

## Seguridad
- Nunca subir `.env`, claves, tokens, datos reales de siniestros ni fotos/videos sensibles.
- Desarrollo y pruebas solo con datos sintéticos.
- No enviar datos identificables a modelos externos hasta aprobar política, contrato y base jurídica.

## Backups
Ver [docs/SECURITY/politica-backups.md](docs/SECURITY/politica-backups.md).
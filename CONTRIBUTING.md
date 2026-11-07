# Guía de contribución

## Ramas
- `main`: estable, protegida, solo por Pull Request.
- `feature/<id-historia>-nombre`, `fix/<id>-nombre`, `release/x.y.z`, `hotfix/x.y.z`.

## Commits (Conventional Commits)
Formato: `tipo(alcance opcional): descripción en imperativo`

| Tipo | Uso |
|---|---|
| `feat` | nueva funcionalidad |
| `fix` | corrección de defecto |
| `docs` | documentación |
| `refactor` | cambio interno sin alterar comportamiento |
| `test` | pruebas |
| `chore` | mantenimiento, configuración |
| `ci` | pipelines |

Ejemplos:
- `feat(claims): crear endpoint de registro de expediente`
- `docs(adr): registrar ADR-0004 sobre MongoDB`

## Pull Requests
- Vinculados a una historia o issue.
- Lint, typecheck, tests y build en verde.
- Documentación y CHANGELOG actualizados.
- Quien implementa no es el único que valida.

## Versionado
SemVer. Un tag anotado por hito (`v0.1.0` ...). Versionar también prompts,
esquemas de salida, configuración de modelos, embeddings y corpus documental.

## Prohibido en el repositorio
Secretos, `.env`, datos reales de siniestros, fotos/videos sensibles.
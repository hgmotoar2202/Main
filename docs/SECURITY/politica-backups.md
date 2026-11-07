# Política de backups y línea de tiempo

Objetivo: no volver a empezar desde cero ante pérdida de equipo, cuenta o repositorio.

## 1. Código (Git)
- Remoto principal: GitHub (`origin`), rama `main` protegida.
- Remoto espejo: un segundo servicio (GitLab o Bitbucket) como `mirror`.
  ```
  git remote add mirror <URL-del-espejo>
  git push mirror --all
  git push mirror --tags
  ```
- Bundle local: `scripts/backup.ps1` genera `git bundle` (todas las ramas y tags) en
  `D:\Backups\insure-ai`, lo verifica y conserva los 10 más recientes.
  Frecuencia: al cerrar cada sesión de trabajo y antes de cada release.
- Copiar periódicamente la carpeta de bundles a un disco externo o almacenamiento en la nube.

## 2. Línea de tiempo
- Commits convencionales + un tag anotado por hito.
- `CHANGELOG.md` actualizado en cada release.
- Decisiones en `docs/ADR/`.
- Para volver a un punto: `git checkout v0.x.y` o `git clone <bundle>`.

## 3. Datos del producto (cuando existan)
- MongoDB: respaldos automáticos con restauración probada (no basta con respaldar).
- Almacenamiento de objetos: versionado activado y réplica.
- Versionar corpus RAG, índices, embeddings, prompts y configuración de modelos.

## 4. Reglas
- Los backups no deben contener secretos ni datos reales sin cifrar.
- Probar la restauración al menos una vez por hito.
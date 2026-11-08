# Guía de rollback

Cómo volver a un punto anterior del proyecto sin perder trabajo. Los puntos de restauración son los **tags** (por ejemplo `v0.0.3`) y los respaldos `.bundle` de `D:\Backups\insure-ai`.

**Regla general:** primero mirar, luego decidir. Casi todo lo que sigue es reversible; lo único peligroso está marcado y es la última opción.

## 1. Ver los puntos de restauración

```powershell
git tag -n
git log --oneline --decorate -15
```

`git tag -n` lista cada versión con su descripción. `git log` muestra los últimos commits y a qué tag pertenece cada uno.

## 2. Mirar cómo estaba el proyecto en un punto, sin cambiar nada

```powershell
git switch --detach v0.0.3
```

Los archivos se muestran como estaban en ese tag. No se borra nada de `main`. Para regresar:

```powershell
git switch main
```

## 3. Recuperar un solo archivo de un punto anterior

```powershell
git restore --source v0.0.3 -- _bmad-output/prd-insure-ai.md
```

Reemplaza ese archivo por su versión de `v0.0.3`. Si te arrepientes, aún no está confirmado: `git restore --staged --worktree -- <ruta>` vuelve a la versión del último commit.

## 4. Deshacer un commit ya publicado (la forma recomendada)

```powershell
git log --oneline -10
git revert <hash-del-commit>
git push
```

`git revert` crea un commit nuevo que deshace al anterior. El historial se conserva, y no hay que forzar nada en GitHub.

## 5. Dejar `main` como estaba en un tag, conservando todo el historial

Sirve cuando varios commits seguidos salieron mal:

```powershell
git switch main
git revert --no-commit v0.0.3..HEAD
git commit -m "revert: volver al estado de v0.0.3"
git push
```

Los commits "malos" siguen en el historial, pero el contenido de `main` vuelve a ser el de `v0.0.3`. Si aparecen conflictos, Git los indica; se resuelven y se continúa con `git revert --continue`.

## 6. Conservar el trabajo actual antes de experimentar

Antes de probar algo arriesgado, guarda el estado actual en una rama:

```powershell
git switch -c rescate/antes-del-cambio
git switch main
```

También se puede tomar el respaldo local:

```powershell
.\scripts\backup.ps1
```

## 7. Cambios locales que aún no se han confirmado

```powershell
git status
git restore <archivo>        # descarta los cambios de un archivo
git stash                    # guarda todo a un lado sin perderlo
git stash pop                # lo vuelve a traer
```

## 8. Reconstruir el proyecto desde cero en otra carpeta

Desde GitHub, en un punto concreto:

```powershell
git clone --branch v0.0.3 https://github.com/hgmotoar2202/Main.git D:\Prueba\Main-v0.0.3
```

Desde un respaldo local (reemplaza el nombre por el de tu archivo `.bundle`):

```powershell
git clone D:\Backups\insure-ai\NOMBRE-DEL-ARCHIVO.bundle D:\Prueba\Main-recuperado
```

## 9. Recuperar un commit que parece perdido

```powershell
git reflog
git switch -c recuperado <hash>
```

`git reflog` lista dónde ha estado `HEAD` en los últimos movimientos, incluso commits que ya no aparecen en ninguna rama.

## 10. Última opción: reset duro (no recomendado)

`git reset --hard` borra cambios no confirmados y, si se combina con `git push --force`, reescribe el historial en GitHub. **No se usa en `main`.** Si alguna vez hace falta, primero se toma un respaldo (`.\scripts\backup.ps1`) y se crea una rama de rescate (sección 6).

## Resumen

| Quiero... | Uso |
|---|---|
| Ver cómo estaba algo | `git switch --detach <tag>` |
| Recuperar un archivo | `git restore --source <tag> -- <ruta>` |
| Deshacer un commit publicado | `git revert <hash>` |
| Volver `main` a un tag | `git revert --no-commit <tag>..HEAD` |
| Guardar el estado actual | rama `rescate/...` o `.\scripts\backup.ps1` |
| Reconstruir en otra carpeta | `git clone --branch <tag>` o clonar el `.bundle` |

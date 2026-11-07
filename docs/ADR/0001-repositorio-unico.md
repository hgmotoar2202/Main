# ADR-0001: Repositorio único con entorno BMAD y monorepo de producto

- Estado: aceptada
- Fecha: 2026-11-07
- Nivel de autonomía: 3

## Contexto
El plan maestro propone dos repositorios (entorno de ingeniería y producto). El proyecto
parte de cero y el equipo es pequeño.

## Decisión
Usar un único repositorio con `/docs`, `/policies`, entorno BMAD y monorepo de producto
(`apps/`, `packages/`). Separar el entorno de ingeniería solo cuando otro proyecto lo reutilice.

## Alternativas consideradas
Dos repositorios desde el inicio (mayor sobrecarga de gestión sin beneficio inmediato).

## Consecuencias
Menor fricción inicial; la separación futura requiere migrar `policies/` y la configuración BMAD.
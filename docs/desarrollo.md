# Guia de desarrollo local

## Requisitos
Node.js 20.12 o superior (se usa 24 LTS), pnpm y Docker Desktop.

## Comandos
```powershell
pnpm install                 # instala dependencias de todo el monorepo
pnpm lint                    # ESLint
pnpm typecheck               # TypeScript sin emitir
pnpm test                    # pruebas de domain, contracts y api
pnpm build                   # compila libs, API y web

docker compose -f infrastructure/docker-compose.yml up -d   # MongoDB local
pnpm --filter @insure/api start:dev                         # API en http://localhost:3001/health
pnpm --filter @insure/web dev                               # Web en http://localhost:3000
```

## Configuracion
Copia `.env.example` a `.env`. El Proveedor de IA por defecto es `simulated` (no necesita clave).
No se suben claves ni datos reales al repositorio; solo datos sinteticos.
# ADR-0002 a ADR-0007: Decisiones arquitectónicas del MVP

- Estado de todos: **propuesta**, pendiente de aprobación del Product Owner
- Fecha: 2026-11-08
- Nivel de autonomía: 3 (revisión arquitectónica); ADR-0001 (repositorio único) ya está aceptada
- Referencia: `_bmad-output/architecture-spine-insure-ai.md` contiene las reglas derivadas (AD-1 a AD-11)

## ADR-0002: Monolito modular hexagonal en un monorepo

**Contexto.** Un solo desarrollador, 5 días, y un plan maestro que desaconseja comenzar con microservicios sin necesidad demostrada.

**Decisión.** Un backend único dividido en módulos, con dominio puro y adaptadores, dentro de un monorepo con `apps/` y `packages/`.

**Alternativas.** Microservicios por capacidad (más despliegue y coordinación sin beneficio en el MVP). Backend sin capas claras (más rápido al inicio, más difícil de probar y de cambiar).

**Consecuencias.** Menor fricción y pruebas más sencillas del dominio. A cambio, hay que respetar la disciplina de dependencias; se refuerza con la regla de importaciones de AD-1 y AD-2.

**Riesgos y mitigaciones.** Acoplamiento accidental entre módulos: mitigado con la regla de usar solo servicios exportados y con una verificación de importaciones en CI cuando exista.

## ADR-0003: Web responsive primero con Next.js; backend NestJS

**Contexto.** El Brief v0.2 fija web responsive primero y app móvil después, con un backend común. El plan propone Next.js y NestJS como candidatos.

**Decisión.** Next.js (línea 16.x) para la web y NestJS para el API, ambos en TypeScript, compartiendo contratos.

**Alternativas.** Una sola aplicación fullstack en Next.js (menos piezas, pero acopla el backend a la web y complica reutilizarlo con una app móvil). Express sin estructura (más libertad, menos convenciones y más decisiones por tomar).

**Consecuencias.** El API es reutilizable por la futura app móvil. Hay dos aplicaciones que arrancar y probar; se compensa con `docker compose`.

**Riesgos y mitigaciones.** Versiones y compatibilidad: se fijan en el archivo de bloqueo y se confirman al crear el esqueleto.

## ADR-0004: MongoDB con Mongoose como persistencia

**Contexto.** El Brief v0.2 propone una base no relacional con MongoDB como candidato. Los Expedientes son documentos con estructura variable según el escenario.

**Decisión.** MongoDB con Mongoose; esquemas validados; índices por `reporterId`, estado y fechas; un documento por Propuesta de IA para conservar el historial.

**Alternativas.** PostgreSQL con JSONB (ofrece transacciones y relaciones fuertes; el equipo del plan prefiere documentos). SQLite (simple, pero lejos del objetivo de producto).

**Consecuencias.** Esquema flexible y modelo cercano al relato. Se renuncia a las uniones relacionales; las referencias entre colecciones se manejan en la capa de aplicación.

**Riesgos y mitigaciones.** Documentos que crezcan sin límite o duplicación de datos: las Propuestas, revisiones y eventos de auditoría van en colecciones separadas.

## ADR-0005: IA detrás de un puerto, con Proveedor simulado y salida validada

**Contexto.** Se necesita demostrar la extracción aunque no haya clave o crédito de API, sin enviar datos reales a servicios externos, y sin que la IA decida nada definitivo.

**Decisión.** `AiProviderPort` con un Proveedor simulado por defecto y un proveedor real opcional. La salida se valida contra `ExtractionV1`; si no valida, se descarta. Incertidumbre ordinal, no probabilidad.

**Alternativas.** Llamar directamente a un proveedor (menos código, pero la demostración depende de una clave). Entrenar o ajustar un modelo propio (fuera del alcance).

**Consecuencias.** La demostración es reproducible y las pruebas son deterministas. El Proveedor simulado no mide la calidad de un modelo real; la evaluación con un proveedor real queda como paso opcional y se reporta por separado.

**Riesgos y mitigaciones.** Que el simulado dé una falsa idea de calidad: el informe de evaluación indica siempre con qué proveedor se midió.

## ADR-0006: Evidencias en disco local detrás de un puerto de almacenamiento

**Contexto.** Los archivos no deben guardarse en MongoDB ni exponerse con enlaces públicos; el MVP corre en local.

**Decisión.** `StoragePort` con adaptador de disco local fuera del repositorio; metadatos y hash en MongoDB; descarga solo por endpoint autenticado y auditado.

**Alternativas.** Almacenamiento de objetos compatible con S3 (adecuado para producción, innecesario en el MVP). Guardar binarios en MongoDB (inflaría la base).

**Consecuencias.** Funciona sin servicios externos. Pasar a S3 después solo exige otro adaptador.

**Riesgos y mitigaciones.** Pérdida de archivos si se borra el volumen: el volumen se documenta en el README y la política de respaldo.

## ADR-0007: Procesamiento de IA síncrono en el MVP

**Contexto.** El plan prevé colas y workers para OCR, extracción y análisis multimedia, pero el MVP no incluye OCR ni multimedia y el plazo es corto.

**Decisión.** La extracción se ejecuta dentro de la petición, con tiempo máximo y Estado de procesamiento visible. El caso de uso se escribe de forma que pueda moverse a una cola.

**Alternativas.** Redis con BullMQ desde el inicio (más piezas que operar y probar sin necesidad demostrada).

**Consecuencias.** Menos infraestructura y un flujo fácil de depurar. Con un proveedor lento, la petición puede tardar; el tiempo máximo y el estado visible lo contienen.

**Riesgos y mitigaciones.** Tiempos de espera largos: tiempo máximo configurable y mensaje claro al usuario.

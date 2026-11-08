# Modelo de datos, contratos y matriz RBAC

- Versión: 0.1 (borrador), 2026-11-08
- Complementa: `architecture-spine-insure-ai.md` y `prd-insure-ai.md`
- Todos los datos son sintéticos. Los términos siguen el Glosario del PRD.

## 1. Colecciones de MongoDB

Convenciones: ids como cadenas, fechas ISO 8601 en UTC, nombres de colección en `snake_case` plural.

| Colección | Campos principales | Índices |
| --- | --- | --- |
| `users` | `email`, `passwordHash`, `name`, `role` (reporter, reviewer, admin), `active`, `createdAt` | `email` único |
| `claims` | `claimNumber`, `reporterId`, `narrative`, `basics` (fecha, hora, lugar, personas, testigos, vehículos, empleador, actividad), `dimensions` (`nature`, `context`, `laborRelation`, `insuranceScope`, `evaluationStatus`), `processing` (idle, running, failed), `answers[]`, `validatedData`, `validatedBy`, `validatedAt`, `validationReason`, `createdAt`, `updatedAt` | `reporterId`, `dimensions.evaluationStatus`, `createdAt` |
| `ai_analyses` | `claimId`, `schemaVersion`, `promptVersion`, `provider`, `model`, `inputHash`, `status` (ok, invalid, error), `output` (ExtractionV1), `errorDetail`, `createdAt` | `claimId`, `createdAt` |
| `reviews` | `claimId`, `analysisId`, `corrections[]` (`path`, `from`, `to`), `reviewerId`, `createdAt` | `claimId` |
| `evidences` | `claimId`, `originalName`, `mimeType`, `size`, `sha256`, `storageKey`, `uploadedBy`, `createdAt` | `claimId`, `sha256` |
| `form_templates` | `templateId`, `version`, `name`, `fieldMap` (campo de la plantilla → ruta del dato validado), `active` | `templateId + version` único |
| `generated_forms` | `claimId`, `templateId`, `templateVersion`, `storageKey`, `sha256`, `version`, `generatedBy`, `createdAt` | `claimId` |
| `knowledge_documents` | `title`, `docType` (póliza, procedimiento, norma), `version`, `publishedAt`, `validFrom`, `validTo`, `storageKey` | `docType`, `validTo` |
| `knowledge_chunks` | `documentId`, `section`, `text`, `order` | índice de texto sobre `text` |
| `audit_events` | `actorId`, `action`, `objectType`, `objectId`, `result`, `correlationId`, `at`, `meta` | `at`, `actorId`, `action`, `objectId` |

Notas:
- `validatedData` es nulo hasta que un Revisor valida; solo de ahí sale el Formulario.
- `audit_events` solo admite inserciones desde la aplicación.
- `knowledge_chunks` existe solo si se construye la base de conocimiento (opcional en el MVP).

## 2. Estados del Expediente (`dimensions.evaluationStatus`)

| De | A | Quién | Cómo |
| --- | --- | --- | --- |
| (nuevo) | pendiente de información | sistema | Al crear el Expediente (FR-4) |
| pendiente de información | preliminar | Reportante | Al enviar el Reporte; comienza el procesamiento |
| preliminar | revisión humana | sistema | Cuando la Propuesta de IA queda guardada o falla la validación |
| revisión humana | pendiente de información | Revisor | Al pedir más datos al Reportante |
| revisión humana | validado por responsable | Revisor, Administrador | Con motivo; exige campos obligatorios completos |
| revisión humana | no determinado | Revisor, Administrador | Con motivo |
| validado por responsable | revisión humana | Revisor, Administrador | Reapertura con motivo |

Toda otra transición se rechaza. Cada transición genera un Evento de auditoría.

## 3. Contrato `ExtractionV1`

Salida que debe producir cualquier Proveedor de IA. Todo se valida con Zod; lo que no cumple se descarta.

```json
{
  "schemaVersion": "extraction.v1",
  "dimensions": {
    "nature": { "value": "traffic", "uncertainty": "low", "support": "me caí de la moto" },
    "context": { "value": "labor", "uncertainty": "medium", "support": "iba hacia mi trabajo" },
    "laborRelation": { "value": "commute", "uncertainty": "medium", "support": "camino al trabajo" },
    "insuranceScope": { "value": null, "uncertainty": "high", "support": null }
  },
  "fields": [
    { "path": "basics.eventDate", "value": "2026-11-03", "uncertainty": "low", "support": "el lunes 3 de noviembre" },
    { "path": "basics.location", "value": "Avenida 68 con calle 26", "uncertainty": "low", "support": "en la avenida 68 con calle 26" }
  ],
  "missingFields": [
    { "path": "basics.eventTime", "reason": "El relato no menciona la hora" }
  ],
  "contradictions": [],
  "clarifyingQuestions": [
    { "targets": ["basics.eventTime"], "text": "¿A qué hora ocurrió el evento?" }
  ],
  "limitations": ["El relato no indica si hubo otros vehículos involucrados"],
  "humanReviewRequired": true
}
```

Reglas del contrato:
- `uncertainty` toma los valores `low`, `medium` o `high`; no es una probabilidad ni tiene valor legal.
- `support` es el fragmento del Relato que respalda el dato; si no hay, el valor es nulo y el campo se declara faltante.
- `humanReviewRequired` es siempre `true`.
- El contrato no incluye campos de cobertura, responsabilidad, causalidad ni diagnóstico.
- Las `clarifyingQuestions` son neutrales, no sugieren respuesta, y como máximo hay 5 por ronda.
- Valores permitidos de las Dimensiones: `nature` (traffic, fall, blow, cut, burn, other, undetermined); `context` (labor, personal, recreational, commute, unknown); `laborRelation` (during_shift, on_assignment, commute, employer_transport, not_applicable, to_verify); `insuranceScope` (catálogo configurable, nulo si no se sabe).

## 4. API y matriz RBAC

Roles: **Reportante** (R), **Revisor** (V), **Administrador** (A). "propio" significa solo sus Expedientes; "—" significa acceso denegado.

| Endpoint | R | V | A |
| --- | --- | --- | --- |
| `POST /auth/login`, `POST /auth/logout`, `GET /auth/me` | sí | sí | sí |
| `GET /users`, `POST /users`, `PATCH /users/:id` | — | — | sí |
| `POST /claims` | sí | — | — |
| `GET /claims` | propio | todos | todos |
| `GET /claims/:id` | propio | sí | sí |
| `POST /claims/:id/submit` | propio | — | — |
| `POST /claims/:id/answers` | propio | — | — |
| `PATCH /claims/:id/review` (correcciones y Dimensiones) | — | sí | sí |
| `POST /claims/:id/validate` | — | sí | sí |
| `POST /claims/:id/request-info` | — | sí | sí |
| `POST /claims/:id/evidences` | propio | sí | sí |
| `GET /evidences/:id/download` | propio | sí | sí |
| `GET /claims/:id/form-preview` | — | sí | sí |
| `POST /claims/:id/forms` (solo si está validado) | — | sí | sí |
| `GET /forms/:id/download` | — | sí | sí |
| `POST /knowledge/documents` | — | — | sí |
| `GET /knowledge/documents` | — | sí | sí |
| `POST /knowledge/query` | — | sí | sí |
| `GET /audit` | — | — | sí |

## 5. Casos de prueba de autorización (mínimos)

Negativos:
1. Sin sesión, cualquier endpoint protegido responde 401.
2. Un Reportante no puede leer, enviar ni responder en un Expediente ajeno.
3. Un Reportante no puede validar, corregir ni generar un Formulario.
4. Un Reportante no puede descargar una Evidencia de otro Expediente.
5. Un Revisor no puede crear ni modificar usuarios.
6. Un Revisor no puede consultar la Auditoría.
7. Un Administrador desactivado no puede iniciar sesión.
8. Nadie puede editar ni borrar un Evento de auditoría (no existe el endpoint).
9. No se puede generar un Formulario de un Expediente que no esté validado.
10. Una Propuesta de IA no puede llevar el Estado a "validado por responsable".

Positivos:
1. Un Reportante crea un Expediente, lo ve en su lista y lo envía.
2. Un Revisor ve todos los Expedientes, corrige, valida y genera el Formulario.
3. Un Administrador crea un usuario, le asigna un rol y consulta la Auditoría.
4. Cada una de estas acciones genera su Evento de auditoría.

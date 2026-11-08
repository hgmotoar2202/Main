---
title: INSURE AI
created: 2026-11-08
updated: 2026-11-08
status: borrador v0.2 (el RAG pasa a imprescindible), pendiente de aprobación del Product Owner
---

# PRD: INSURE AI
*Título de trabajo, por confirmar.*

## 0. Propósito del documento

Este PRD define los requisitos de la primera versión funcional de INSURE AI, construida en 5 días para una prueba técnica. Está dirigido al Product Owner, al arquitecto, a quien implementa y a quien revisa (QA). Se apoya en el Plan Maestro v1.0, el Product Brief v0.2 y el Product Brief v0.3 consolidado (`_bmad-output/product-brief-insure-ai.md`) y en el análisis de diferencias (`_bmad-output/analisis-product-brief-v0-2.md`); no los duplica. El vocabulario está anclado en el Glosario (§3): los requisitos usan esos términos de forma literal. Las funciones se agrupan en características con sus requisitos funcionales (FR) numerados globalmente; los supuestos se marcan `[ASSUMPTION]` y se indexan en §9. El registro de requisitos con prioridad, origen y estado está en §10.

## 1. Visión

INSURE AI ayuda a recibir, ordenar y documentar reportes de accidentes laborales, personales y de tránsito. Una persona cuenta lo ocurrido con sus palabras; el sistema propone datos estructurados, señala lo que falta o se contradice, formula preguntas de aclaración y prepara un formulario PDF. Un revisor corrige y valida cada Expediente antes de que algo se considere definitivo.

La IA asiste y documenta; las personas deciden. El sistema nunca determina cobertura, responsabilidad, causalidad, diagnóstico ni autorización definitiva. Cada Propuesta de IA es trazable, y cada acción relevante queda en la Auditoría.

La primera versión demuestra el flujo central de extremo a extremo para los tres escenarios, con permisos verificados en el backend, pruebas, y datos 100 % sintéticos. El análisis de video, la app móvil y los flujos de autorización avanzados quedan para fases posteriores.

## 2. Usuario objetivo

### 2.1 Trabajos por realizar (JTBD)

- **Reportante:** contar lo ocurrido con mis palabras, sin entender el formulario, y saber en qué estado está mi caso.
- **Revisor:** recibir los datos ya ordenados, ver qué falta o se contradice, corregir con rapidez y dejar constancia de mi decisión.
- **Administrador:** controlar quién entra y con qué permisos, y poder consultar qué pasó y quién lo hizo.
- **Quien desarrolla (contexto de la prueba):** demostrar un producto pequeño pero completo, con criterio de ingeniería visible.

### 2.2 No usuarios (v1)

Terceros ajenos al Expediente, aseguradoras u organismos externos con integración directa, y cualquier persona que busque una decisión automática de cobertura.

### 2.3 Recorridos clave de usuario

- **UJ-1. Laura reporta un accidente de tránsito en su trayecto al trabajo.**
  - **Persona y contexto:** Laura, trabajadora de una empresa de mensajería, se cayó de su moto camino al trabajo y quiere dejar constancia.
  - **Estado de entrada:** con sesión iniciada como Reportante, desde el navegador del celular.
  - **Ruta:** abre "Nuevo reporte"; escribe el Relato libre; completa fecha, lugar y personas; el asistente muestra la sección de vehículos (tránsito) y la de empleador (contexto laboral); envía; responde dos Preguntas de aclaración; adjunta una foto.
  - **Clímax:** ve su Expediente con el estado "revisión humana" y la lista de datos que el sistema entendió.
  - **Resolución:** queda a la espera del Revisor y puede ver el estado cuando quiera.
  - **Caso límite:** si la Propuesta de IA no valida contra el esquema, el Expediente conserva su Relato y datos tal como los escribió y pasa al Revisor sin Propuesta.

- **UJ-2. Camilo revisa, corrige y valida el Expediente de Laura.**
  - **Persona y contexto:** Camilo, revisor, atiende la bandeja de Expedientes en revisión humana.
  - **Estado de entrada:** sesión como Revisor.
  - **Ruta:** abre el Expediente; compara el Relato con la Propuesta de IA; corrige dos campos y ajusta las dimensiones (naturaleza: tránsito, contexto: laboral, relación laboral: trayecto); consulta la base de conocimiento; previsualiza el Formulario.
  - **Clímax:** marca el Expediente "validado por responsable" con un motivo y genera el PDF.
  - **Resolución:** el PDF queda guardado con la versión de plantilla; la Auditoría registra cada paso.
  - **Caso límite:** si faltan campos obligatorios, el sistema no permite validar y lista lo que falta.

- **UJ-3. Marta administra usuarios y revisa la Auditoría.**
  - **Persona y contexto:** Marta, administradora, incorpora a un nuevo revisor.
  - **Estado de entrada:** sesión como Administrador.
  - **Ruta:** crea el usuario, asigna el rol Revisor, luego filtra la Auditoría por usuario y fecha.
  - **Clímax:** ve el evento de creación y los accesos del nuevo usuario.
  - **Resolución:** puede desactivar la cuenta si hace falta, y esa acción también queda registrada.

- **UJ-4. Camilo consulta una norma interna con cita.**
  - **Persona y contexto:** Camilo duda de un requisito del procedimiento.
  - **Ruta:** escribe una pregunta en la base de conocimiento; recibe una respuesta con cita (documento, sección, versión); otra pregunta sin soporte documental recibe "información insuficiente".

## 3. Glosario

- **Expediente** — Registro integral de un evento reportado y su gestión. Tiene un Reportante, un Relato, Dimensiones, Evidencias, Propuestas de IA y un Estado.
- **Reporte** — Acción de crear un Expediente. Origina el Relato y los datos básicos.
- **Relato** — Texto libre con el que el Reportante describe el evento.
- **Reportante** — Rol de quien crea Expedientes y ve solo los suyos.
- **Revisor** — Rol que corrige, valida y genera Formularios.
- **Administrador** — Rol que gestiona usuarios, roles y consulta la Auditoría.
- **Dimensión** — Eje independiente de clasificación: Naturaleza del evento, Contexto, Relación laboral, Ámbito de seguro, Estado de evaluación. Las Dimensiones no son excluyentes entre sí.
- **Estado** — Valor de la Dimensión "Estado de evaluación" del Expediente: pendiente de información, preliminar, revisión humana, validado por responsable, no determinado.
- **Propuesta de IA** — Resultado estructurado que el sistema genera a partir del Relato; nunca es definitivo.
- **Campo faltante** — Dato requerido que no aparece en el Relato ni en los datos básicos.
- **Contradicción** — Dos datos del Expediente que no pueden ser ciertos a la vez.
- **Pregunta de aclaración** — Pregunta neutral que pide un Campo faltante o resuelve una Contradicción.
- **Evidencia** — Archivo (documento o imagen) asociado a un Expediente.
- **Plantilla de formulario** — Modelo versionado del que se genera un Formulario.
- **Formulario** — PDF generado a partir de una Plantilla de formulario y datos validados.
- **Documento de conocimiento** — Texto autorizado (póliza, procedimiento, norma) con versión y vigencia.
- **Cita** — Referencia a un Documento de conocimiento: documento, sección y versión.
- **Corpus** — Conjunto de Documentos de conocimiento autorizados (sintéticos en el MVP) que sustentan las respuestas.
- **Versión de corpus** — Identificador reproducible del contenido del Corpus en un momento dado; cada respuesta registra la suya.
- **Conjunto de evaluación** — Preguntas de referencia con la respuesta y las Citas esperadas, o con la abstención esperada, que sirven para medir el RAG.
- **Evento de auditoría** — Registro inmutable de quién hizo qué, sobre qué y cuándo.
- **Proveedor de IA** — Servicio que produce Propuestas de IA; puede ser real o simulado.
- **Proveedor simulado** — Proveedor de IA que devuelve respuestas de ejemplo predefinidas, sin red ni clave.
- **Caso sintético** — Reporte ficticio con respuesta esperada conocida, usado para pruebas y evaluación.

## 4. Características

### 4.1 Identidad y acceso

**Descripción:** Los usuarios inician sesión y su rol determina qué pueden hacer. La autorización se verifica en el backend; ocultar botones en la interfaz no cuenta. Realiza UJ-1, UJ-2, UJ-3.

**Requisitos funcionales:**

#### FR-1: Inicio de sesión
Un usuario registrado puede iniciar sesión con correo y contraseña. Realiza UJ-1, UJ-2, UJ-3.

**Consecuencias (verificables):**
- Con credenciales inválidas, el sistema responde 401 sin revelar si falló el correo o la contraseña.
- Las contraseñas se almacenan con hash; nunca en texto plano.
- La sesión caduca después de un tiempo configurable. `[ASSUMPTION: autenticación propia con correo y contraseña; sin MFA en v1]`
- Tras varios intentos fallidos seguidos, el sistema limita los intentos.

#### FR-2: Autorización por rol en el backend
Cada endpoint verifica el permiso del rol del usuario. Realiza UJ-1, UJ-2, UJ-3.

**Consecuencias (verificables):**
- Un Reportante no puede leer ni modificar Expedientes de otro Reportante (el sistema rechaza la petición).
- Solo el Revisor y el Administrador pueden validar un Expediente.
- Solo el Administrador puede gestionar usuarios y leer la Auditoría.
- Existen pruebas automatizadas positivas y negativas para cada combinación de rol y endpoint (matriz RBAC).

#### FR-3: Administración de usuarios
El Administrador puede crear usuarios, asignarles un rol y desactivarlos. Realiza UJ-3.

**Consecuencias (verificables):**
- Un usuario desactivado no puede iniciar sesión.
- Cada alta, cambio de rol y desactivación genera un Evento de auditoría.

### 4.2 Reporte de accidente

**Descripción:** El Reportante describe el evento con su Relato y completa datos básicos en un asistente común a los tres escenarios. El asistente muestra secciones según las Dimensiones: vehículos si la Naturaleza es tránsito; empleador y Relación laboral si el Contexto es laboral. Ninguna sección excluye a otra. Realiza UJ-1.

**Requisitos funcionales:**

#### FR-4: Crear Expediente con Relato
Un Reportante puede crear un Expediente con un Relato y datos básicos (fecha, hora, lugar, personas involucradas, testigos). Realiza UJ-1.

**Consecuencias (verificables):**
- El Relato es obligatorio y tiene un límite de longitud.
- La fecha del evento no puede ser futura.
- El Expediente se crea con el Estado "pendiente de información" y un Evento de auditoría.

#### FR-5: Secciones condicionales por Dimensión
El asistente muestra secciones adicionales según las Dimensiones elegidas. Realiza UJ-1.

**Consecuencias (verificables):**
- Si la Naturaleza es tránsito, aparecen los campos de vehículos.
- Si el Contexto es laboral, aparecen empleador, actividad y Relación laboral.
- Un mismo Expediente puede tener ambas secciones a la vez.

#### FR-6: Estados del Expediente
El sistema mantiene el Estado del Expediente con transiciones válidas definidas. Realiza UJ-1, UJ-2.

**Consecuencias (verificables):**
- Las transiciones no definidas son rechazadas.
- El Estado "validado por responsable" solo lo puede fijar un Revisor o un Administrador.
- Cada cambio de Estado genera un Evento de auditoría.

#### FR-7: Seguimiento por el Reportante
Un Reportante puede ver sus Expedientes con su Estado y responder Preguntas de aclaración. Realiza UJ-1.

**Consecuencias (verificables):**
- La lista muestra únicamente los Expedientes del propio Reportante.
- Una respuesta a una Pregunta de aclaración queda asociada al Expediente y puede generar una nueva Propuesta de IA.

### 4.3 Extracción con IA y preguntas de aclaración

**Descripción:** Al enviar el Reporte, el sistema genera una Propuesta de IA estructurada con un esquema JSON versionado: Dimensiones, datos del evento, Campos faltantes, Contradicciones, incertidumbre por campo y sustento textual (el fragmento del Relato que respalda cada dato). La IA se accede mediante un adaptador; sin clave, el Proveedor simulado permite demostrar el flujo. Realiza UJ-1, UJ-2.

**Requisitos funcionales:**

#### FR-8: Propuesta de IA estructurada
El sistema genera una Propuesta de IA a partir del Relato y los datos básicos. Realiza UJ-1.

**Consecuencias (verificables):**
- La salida valida contra un esquema JSON versionado; si no valida, se descarta, se registra el error y el Expediente no se modifica.
- Cada campo propuesto incluye incertidumbre y sustento textual.
- Un valor que no aparece en el Relato se marca como Campo faltante, no se inventa.

#### FR-9: Campos faltantes y Contradicciones
La Propuesta de IA lista los Campos faltantes y las Contradicciones detectadas. Realiza UJ-1, UJ-2.

**Consecuencias (verificables):**
- Cada Campo faltante y cada Contradicción hace referencia al campo o campos afectados.
- Para los Casos sintéticos con un campo faltante conocido, la Propuesta lo lista.

#### FR-10: Preguntas de aclaración neutrales
El sistema formula Preguntas de aclaración por cada Campo faltante o Contradicción. Realiza UJ-1.

**Consecuencias (verificables):**
- Las preguntas no sugieren la respuesta ni contienen juicios sobre culpa o causa.
- Se limita el número de preguntas por ronda. `[ASSUMPTION: máximo 5 por ronda]`

#### FR-11: Adaptador de IA y Proveedor simulado
El sistema accede a la IA solo mediante un adaptador, y el Proveedor de IA se elige por configuración. Realiza UJ-1.

**Consecuencias (verificables):**
- Con el Proveedor simulado, el flujo completo funciona sin red ni clave.
- Cambiar de Proveedor de IA no requiere modificar el dominio ni los endpoints.
- Las claves se leen del entorno y nunca se guardan en el repositorio.

#### FR-12: Trazabilidad de la Propuesta
Cada Propuesta de IA guarda su origen. Realiza UJ-2.

**Consecuencias (verificables):**
- Se registran Proveedor de IA, modelo, versión de esquema, versión de prompt, fecha y hora, y el resultado.
- Se puede reconstruir qué entrada produjo cada Propuesta.

#### FR-13: Límites de la IA
Ninguna Propuesta de IA decide cobertura, responsabilidad, causalidad, diagnóstico ni autorización. Realiza UJ-1, UJ-2.

**Consecuencias (verificables):**
- El esquema de la Propuesta no contiene campos para esas decisiones.
- Una Propuesta de IA no puede cambiar el Estado a "validado por responsable".
- La interfaz muestra el aviso de que es una propuesta que requiere revisión humana.

### 4.4 Revisión humana

**Descripción:** El Revisor compara el Relato con la Propuesta de IA, corrige campos, ajusta las Dimensiones y valida el Expediente. Se conservan la Propuesta original y las correcciones con su autor. Realiza UJ-2.

**Requisitos funcionales:**

#### FR-14: Revisión y corrección de la Propuesta
Un Revisor puede ver la Propuesta junto al Relato y corregir cada campo. Realiza UJ-2.

**Consecuencias (verificables):**
- La Propuesta original se conserva sin cambios; las correcciones se guardan aparte con autor y fecha.
- Se puede calcular la proporción de campos corregidos por el Revisor.

#### FR-15: Clasificación multidimensional editable
Un Revisor puede editar cada Dimensión de forma independiente. Realiza UJ-2.

**Consecuencias (verificables):**
- Se admiten combinaciones como Naturaleza "tránsito" con Contexto "laboral".
- Los valores iniciales de cada Dimensión provienen de un catálogo configurable. `[ASSUMPTION: los valores del Brief v0.2 son iniciales y no constituyen categorías legales]`

#### FR-16: Validación del Expediente
Un Revisor puede validar un Expediente con un motivo. Realiza UJ-2.

**Consecuencias (verificables):**
- No se puede validar si hay campos obligatorios vacíos; el sistema los lista.
- La validación registra usuario, motivo y fecha en la Auditoría.

### 4.5 Evidencias

**Descripción:** Se adjuntan documentos e imágenes al Expediente. En la primera versión solo se almacenan y se listan; no se analizan visualmente. Realiza UJ-1.

**Requisitos funcionales:**

#### FR-17: Subir Evidencias
Un Reportante o un Revisor puede subir Evidencias a un Expediente al que tiene acceso. Realiza UJ-1.

**Consecuencias (verificables):**
- Solo se aceptan tipos permitidos (imágenes y PDF) y hasta un tamaño máximo; lo demás se rechaza con un mensaje claro.
- El tipo se valida por contenido y no solo por la extensión. `[ASSUMPTION: antivirus real fuera de v1]`

#### FR-18: Hash y metadatos
El sistema guarda el hash y los metadatos de cada Evidencia. Realiza UJ-1.

**Consecuencias (verificables):**
- Se guardan nombre original, tipo, tamaño, hash, fecha y autor de la subida.
- Subir dos veces el mismo archivo es detectable por el hash.

#### FR-19: Acceso controlado a Evidencias
La descarga de una Evidencia exige autorización. Realiza UJ-2.

**Consecuencias (verificables):**
- Un usuario sin acceso al Expediente no puede descargar sus Evidencias.
- No existen enlaces públicos permanentes a los archivos.

### 4.6 Formularios PDF

**Descripción:** A partir de una Plantilla de formulario versionada y datos validados, el sistema genera un Formulario en PDF. Realiza UJ-2.

**Requisitos funcionales:**

#### FR-20: Plantilla de formulario versionada
El sistema dispone de una Plantilla de formulario con versión. `[ASSUMPTION: se usa una plantilla sintética propia]` Realiza UJ-2.

**Consecuencias (verificables):**
- Cada Plantilla de formulario tiene identificador y versión.
- Los campos de la plantilla están mapeados a campos del Expediente.

#### FR-21: Previsualizar y generar Formulario
Un Revisor puede previsualizar el prellenado y generar el Formulario PDF de un Expediente validado. Realiza UJ-2.

**Consecuencias (verificables):**
- La previsualización está disponible durante la revisión; el PDF final solo se genera con Expedientes en Estado "validado por responsable".
- El PDF contiene los datos validados, no la Propuesta de IA sin revisar.

#### FR-22: Registro del Formulario generado
El sistema guarda el PDF y su origen. Realiza UJ-2.

**Consecuencias (verificables):**
- Se guarda la versión de la plantilla, la fecha, el autor y el hash del PDF.
- Regenerar el Formulario crea una nueva versión sin borrar la anterior.

### 4.7 Base de conocimiento (RAG)

**Descripción:** El sistema sustenta sus respuestas en un Corpus de Documentos de conocimiento autorizados (sintéticos en el MVP). El Administrador carga los documentos; el sistema los fragmenta, calcula su hash y registra una Versión de corpus reproducible. El Revisor consulta y recibe respuestas con Citas, o "información insuficiente" cuando no hay soporte. Cada respuesta registra la Versión de corpus, la versión de prompt y el proveedor, y un Conjunto de evaluación mide la calidad. `[ASSUMPTION: recuperación léxica (índice de texto) por defecto, sin clave; el recuperador es intercambiable por uno con embeddings]` `[NON-GOAL for MVP: OCR de documentos escaneados]` Realiza UJ-4.

**Requisitos funcionales:**

#### FR-23: Carga e ingesta de Documentos de conocimiento
El Administrador puede cargar Documentos de conocimiento y ejecutar su ingesta. Realiza UJ-4.

**Consecuencias (verificables):**
- Cada documento guarda tipo (póliza, procedimiento, norma), versión, fecha de publicación y vigencia.
- La ingesta fragmenta el documento conservando sección y orden, y calcula el hash de cada fragmento.
- Los documentos no vigentes no se recuperan en las respuestas.
- Ingestar el mismo contenido produce la misma Versión de corpus.

#### FR-24: Consulta con Citas
Un Revisor puede hacer una pregunta y recibir una respuesta con Citas. Realiza UJ-4.

**Consecuencias (verificables):**
- Cada afirmación de la respuesta se acompaña de una Cita (documento, sección, versión).
- Se registran la consulta, los fragmentos recuperados con su puntuación, la versión de prompt, el proveedor y la Versión de corpus.
- Solo se citan fragmentos que realmente fueron recuperados.

#### FR-25: Abstención
Si no hay evidencia suficiente, el sistema responde "información insuficiente". Realiza UJ-4.

**Consecuencias (verificables):**
- Si la mejor puntuación de recuperación no supera el umbral configurado, el sistema se abstiene y no genera contenido.
- Para preguntas sin soporte en el Corpus, no se inventan artículos, coberturas ni requisitos.
- Existe al menos una prueba automatizada con una pregunta sin soporte.

#### FR-30: Versionado del Corpus
El Administrador puede reindexar el Corpus y consultar el historial de Versiones de corpus. Realiza UJ-4.

**Consecuencias (verificables):**
- Cada reindexación genera una Versión de corpus con la lista de documentos y sus hashes.
- Para cualquier respuesta registrada se puede saber con qué Versión de corpus y qué fragmentos se produjo.

#### FR-31: Evaluación del RAG
El proyecto incluye un Conjunto de evaluación y un comando que mide el RAG.

**Consecuencias (verificables):**
- El Conjunto de evaluación incluye preguntas con soporte en el Corpus y preguntas sin soporte.
- El comando reporta Recall@k, exactitud de Citas y tasa de abstención correcta, e indica qué recuperador y proveedor se usaron.
- El resultado se guarda en el repositorio como evidencia.

### 4.8 Auditoría

**Descripción:** Cada acción relevante genera un Evento de auditoría que no se puede editar. Realiza UJ-3.

**Requisitos funcionales:**

#### FR-26: Registro de Eventos de auditoría
El sistema registra los eventos relevantes. Realiza UJ-3.

**Consecuencias (verificables):**
- Cada evento guarda actor, acción, objeto, fecha y hora, resultado e identificador de correlación.
- Quedan registrados: inicios de sesión, cambios de usuarios y roles, creación y cambios de Estado de Expedientes, Propuestas de IA, correcciones, descargas de Evidencias, validaciones y generación de Formularios.
- Los eventos no se pueden editar ni borrar desde la aplicación.

#### FR-27: Consulta de la Auditoría
El Administrador puede consultar y filtrar los Eventos de auditoría. Realiza UJ-3.

**Consecuencias (verificables):**
- Se puede filtrar por usuario, acción, objeto y rango de fechas.
- Otros roles no pueden acceder a la Auditoría.

### 4.9 Evaluación y operación

**Requisitos funcionales:**

#### FR-28: Evaluación de la extracción con Casos sintéticos
El proyecto incluye un conjunto de Casos sintéticos de los tres escenarios y un comando que mide la extracción.

**Consecuencias (verificables):**
- El comando reporta exactitud por campo, campos omitidos y valores inventados.
- El resultado se guarda en el repositorio como evidencia.

#### FR-29: Arranque con un comando
Cualquier persona puede levantar el sistema con un solo comando, con datos de ejemplo sintéticos.

**Consecuencias (verificables):**
- `docker compose up` deja el sistema funcionando, con usuarios de ejemplo para cada rol.
- El README explica el arranque, la configuración del Proveedor de IA y cómo ejecutar las pruebas.

## 5. No objetivos (explícitos)

- No decidir cobertura, responsabilidad, causalidad, diagnóstico, culpabilidad ni autorización definitiva.
- No procesar datos reales de personas ni siniestros.
- No analizar video ni imágenes con IA, ni extraer frames, en v1.
- No ser una app móvil nativa en v1; la interfaz web es responsive.
- No integrarse con sistemas de aseguradoras, ARL, autoridades o prestadores.
- No automatizar pagos ni indemnizaciones.
- No ser multi-organización ni ofrecer MFA ni firma electrónica en v1.

## 6. Alcance del MVP

### 6.1 Dentro del alcance

- Identidad, roles y autorización en el backend (FR-1 a FR-3).
- Reporte común a los tres escenarios con secciones condicionales (FR-4 a FR-7).
- Propuesta de IA con Proveedor simulado y adaptador (FR-8 a FR-13).
- Revisión humana y validación (FR-14 a FR-16).
- Evidencias: subir, guardar con hash y controlar acceso (FR-17 a FR-19); deseable y primer recorte si el tiempo falla.
- Formulario PDF desde plantilla versionada (FR-20 a FR-22).
- Base de conocimiento (RAG): ingesta versionada, consulta con Citas, abstención y evaluación (FR-23 a FR-25, FR-30, FR-31).
- Auditoría (FR-26, FR-27).
- Evaluación con Casos sintéticos y arranque con un comando (FR-28, FR-29).

### 6.2 Fuera del alcance del MVP

- Recuperación semántica con embeddings y base vectorial: el MVP usa recuperación léxica con un puerto listo para añadirla (fase 2, o antes si hay clave de embeddings).
- OCR de documentos escaneados: fase 2.
- Análisis de video, frames y análisis visual: fase 2.
- App móvil nativa, trabajo sin conexión: fase 2.
- Colas y procesamiento asíncrono: el MVP procesa de forma síncrona con un estado de procesamiento visible. `[ASSUMPTION]`
- Autorizaciones con varios aprobadores y delegación: fase 2.

## 7. Métricas de éxito

**Primarias**
- **SM-1**: Flujo completo (reportar, revisar, validar, generar PDF) ejecutado sin ayuda para cada uno de los tres escenarios. Valida FR-4 a FR-7, FR-14 a FR-16, FR-21.
- **SM-2**: Exactitud por campo, campos omitidos y valores inventados en los Casos sintéticos; se reporta el resultado real. Valida FR-8, FR-9, FR-28.
- **SM-3**: 100 % de las pruebas negativas de autorización pasan (rol sin permiso es rechazado). Valida FR-2, FR-19, FR-27.
- **SM-4**: El sistema arranca con `docker compose up` y los datos de ejemplo en una máquina limpia. Valida FR-29.
- **SM-7**: Recall@k, exactitud de Citas y abstención correcta del RAG, medidos sobre el Conjunto de evaluación; se reporta el resultado real y con qué recuperador. Valida FR-24, FR-25, FR-31.

**Secundarias**
- **SM-5**: Cada acción relevante tiene su Evento de auditoría. Valida FR-26.
- **SM-6**: Proporción de campos corregidos por el Revisor, medida y visible. Valida FR-14.

**Contra-métricas (no optimizar)**
- **SM-C1**: Porcentaje de Propuestas aceptadas sin cambios. No debe perseguirse como meta, porque incentiva aprobar sin revisar. Contrarresta SM-2 y SM-6.
- **SM-C2**: Rapidez para completar el Reporte a costa de dejar vacíos los campos obligatorios. Contrarresta SM-1.

## 8. Preguntas abiertas

1. ¿Existe un enunciado o criterios de evaluación de la prueba técnica?
2. ¿Habrá una clave de API de un Proveedor de IA real para la demostración, o se usa el Proveedor simulado?
3. ¿La demostración se ejecuta solo en local, o también desplegada en línea?
4. ¿Qué formularios oficiales se esperan? En el MVP se usa una plantilla sintética.
5. ¿Qué Documentos de conocimiento se usarán? En el MVP son sintéticos.
6. ¿Qué se evalúa: código, documentación, demostración funcionando, o todo?
7. ¿La interfaz y la documentación van en español? Se asume que sí.
8. ¿Habrá una clave de un servicio de embeddings para añadir recuperación semántica?
9. ¿Qué Documentos de conocimiento reales y autorizados alimentarán el Corpus cuando se pase de datos sintéticos a un piloto?

## 9. Índice de supuestos

- §4.1 FR-1: autenticación propia con correo y contraseña; sin MFA en v1.
- §4.3 FR-10: máximo 5 Preguntas de aclaración por ronda.
- §4.4 FR-15: los valores de las Dimensiones provienen de un catálogo inicial y no constituyen categorías legales ni operativas.
- §4.5 FR-17: sin antivirus real en v1.
- §4.6 FR-20: se usa una Plantilla de formulario sintética propia.
- §6.2: procesamiento síncrono con estado visible, sin colas.
- §4.7: recuperación léxica por defecto, sin clave; el recuperador es intercambiable por uno con embeddings.
- Decisión del Product Owner (8 nov): el RAG es imprescindible desde el MVP.
- Se desconoce el enunciado de la prueba y se toman el Plan Maestro y el Brief v0.2 como requisitos.
- El Product Owner y quien desarrolla son la misma persona; las aprobaciones se registran por escrito en el repositorio.

## 10. Restricciones y salvaguardas

**Seguridad:** autorización en el backend; validación de entradas; límites de carga; secretos fuera del repositorio.

**Privacidad:** solo datos sintéticos; datos mínimos; ningún dato real se envía a servicios externos de IA. Para operar con datos reales haría falta asesoría jurídica y evaluación del proveedor, conforme a la Ley 1581 de 2012.

**Costo:** el proyecto debe funcionar sin gasto obligatorio mediante el Proveedor simulado; una clave real es opcional.

**Calidad transversal (NFR):**
- Interfaz web responsive utilizable en escritorio, tablet y móvil, con formularios accesibles (etiquetas, teclado, contraste).
- Pruebas unitarias y de API en verde; al menos una prueba E2E del flujo principal; lint y tipado sin errores.
- Versiones de dependencias fijadas.
- Identificador de correlación en los registros y en la Auditoría para seguir una petición.

## 11. Registro de requisitos

Prioridad: M = imprescindible, S = deseable, C = si hay tiempo. Aprobación: pendiente hasta que el Product Owner la registre por escrito.

| ID | Origen | Prioridad | Estado | Aprobación |
|---|---|---|---|---|
| FR-1 Inicio de sesión | Plan Maestro §3 | M | Propuesto | Pendiente |
| FR-2 Autorización por rol | Plan Maestro §3, §16; Brief v0.2 §6 | M | Propuesto | Pendiente |
| FR-3 Administración de usuarios | Plan Maestro §3 | M | Propuesto | Pendiente |
| FR-4 Crear Expediente con Relato | Plan Maestro §3, Brief v0.2 §3 | M | Propuesto | Pendiente |
| FR-5 Secciones condicionales | Brief v0.2 §3.1 | M | Propuesto | Pendiente |
| FR-6 Estados del Expediente | Plan Maestro §6, Brief v0.2 §3.1 | M | Propuesto | Pendiente |
| FR-7 Seguimiento por el Reportante | Plan Maestro §2 | M | Propuesto | Pendiente |
| FR-8 Propuesta de IA estructurada | Brief v0.2 §10 punto 5 | M | Propuesto | Pendiente |
| FR-9 Campos faltantes y Contradicciones | Plan Maestro §6.1 | M | Propuesto | Pendiente |
| FR-10 Preguntas de aclaración | Plan Maestro §6.1 | M | Propuesto | Pendiente |
| FR-11 Adaptador y Proveedor simulado | Plan Maestro §4; Análisis S-04 | M | Propuesto | Pendiente |
| FR-12 Trazabilidad de la Propuesta | Plan Maestro §16 | M | Propuesto | Pendiente |
| FR-13 Límites de la IA | Plan Maestro §1.2; Brief v0.2 §6 | M | Propuesto | Pendiente |
| FR-14 Revisión y corrección | Plan Maestro §3 | M | Propuesto | Pendiente |
| FR-15 Clasificación multidimensional | Brief v0.2 §3.1 | M | Propuesto | Pendiente |
| FR-16 Validación del Expediente | Plan Maestro §3 | M | Propuesto | Pendiente |
| FR-17 Subir Evidencias | Plan Maestro §3 | C | Propuesto | Pendiente |
| FR-18 Hash y metadatos | Plan Maestro §6.2 | C | Propuesto | Pendiente |
| FR-19 Acceso controlado | Plan Maestro §8 | C | Propuesto | Pendiente |
| FR-20 Plantilla versionada | Plan Maestro §3 | M | Propuesto | Pendiente |
| FR-21 Previsualizar y generar Formulario | Plan Maestro §3 | M | Propuesto | Pendiente |
| FR-22 Registro del Formulario | Plan Maestro §4.2 | M | Propuesto | Pendiente |
| FR-23 Carga e ingesta de Documentos de conocimiento | Plan Maestro §5; Product Owner (8 nov) | M | Propuesto | Pendiente |
| FR-24 Consulta con Citas | Plan Maestro §5.2; Product Owner (8 nov) | M | Propuesto | Pendiente |
| FR-25 Abstención | Plan Maestro §5.2; Product Owner (8 nov) | M | Propuesto | Pendiente |
| FR-26 Registro de auditoría | Plan Maestro §3, §8 | M | Propuesto | Pendiente |
| FR-27 Consulta de la Auditoría | Plan Maestro §3 | M | Propuesto | Pendiente |
| FR-28 Evaluación con Casos sintéticos | Brief v0.2 §7 | S | Propuesto | Pendiente |
| FR-29 Arranque con un comando | Análisis, Brief v0.3 | M | Propuesto | Pendiente |
| FR-30 Versionado del Corpus | Plan Maestro §5.2, §13; Product Owner (8 nov) | M | Propuesto | Pendiente |
| FR-31 Evaluación del RAG | Plan Maestro §16; Brief v0.2 §7; Product Owner (8 nov) | M | Propuesto | Pendiente |

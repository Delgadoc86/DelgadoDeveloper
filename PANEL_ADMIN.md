# DelgadoDev Gestión — Panel de administración

Panel privado en `/admin` para cobrar y dejar constancia: clientes, cobros con
comprobante (PDF y WhatsApp), abonos periódicos con vencimientos, catálogo de
servicios y un dashboard de ingresos. El comprobante **no es una factura**: es la
constancia que se le da al cliente cuando la pide. Backend en un proyecto Firebase
separado (`delgadodev-gestion`, cuenta `delgadodev86@gmail.com`), independiente del
Firebase de PresuPDF, QREvento o cualquier catálogo. Hasta 2026-11 era `delgadodevgestion`; ver
"Migración de proyecto Firebase (2026-11-12)" más abajo.

Ver [`ROADMAP_DELGADODEV_GESTION.md`](ROADMAP_DELGADODEV_GESTION.md) para el
detalle etapa por etapa de cómo se construyó (con notas de verificación) y las
decisiones de arquitectura tomadas en el camino.

## Acceso

- URL: `/admin` (redirige a `/admin/login` si no hay sesión).
- Un solo usuario admin por ahora (`role: "owner"` en `adminUsers/{uid}`).
- Login con correo/contraseña de Firebase Authentication.
- La sesión dura 5 días (cookie httpOnly, ver `src/lib/auth/session-constants.ts`).

### Recuperar acceso

Si perdés el acceso (olvidaste la contraseña, o necesitás dar de alta a otro
admin):

1. **Contraseña olvidada**: en `/admin/login` → "¿Olvidaste tu contraseña?"
   envía un mail de recuperación con `sendPasswordResetEmail` de Firebase
   Auth (client SDK, sin backend propio). El mensaje de confirmación es el
   mismo exista o no la cuenta, a propósito, para no revelar qué correos
   están dados de alta como admin. Si por algún motivo el mail no llega,
   queda la vía manual: Firebase Console → Authentication → Users → el
   usuario → "Reset password".
2. **Nuevo admin**: crear el usuario en Firebase Console → Authentication →
   Add user, copiar su UID, y crear manualmente el documento
   `adminUsers/{uid}` en Firestore con `{ email, displayName, role: "owner" }`.
   No hay forma de crear un admin nuevo desde el panel mismo (a propósito: solo
   se hace desde la consola, nunca desde un formulario público).
3. Si la cuenta de Firebase Auth se pierde por completo, el proyecto
   `delgadodev-gestion` y sus datos en Firestore siguen intactos — solo hay que
   recrear el acceso, no los datos. Si lo que se pierde es **el proyecto entero**,
   los datos solo se recuperan desde un backup (ver la migración de 2026-11-12).

## Diseño del panel (rediseño 2026-11-12)

- **Mobile-first, tema claro por defecto** con opción de oscuro (se guarda en el
  navegador, `localStorage["admin-theme"]`). En el celular: barra superior + barra
  inferior tipo app (Inicio, Clientes, **+** Registrar cobro, Cobros, Más). En PC:
  barra lateral con todas las secciones y el botón "Registrar cobro".
- **Kit propio en `src/app/admin/_ui/`** (sin dependencias nuevas): botones,
  tarjetas, campos, badges de estado (siempre ícono + texto), panel deslizable
  (`Sheet`: hoja inferior en el celular, diálogo en PC), fila de cobro expandible y
  acciones de comprobante reutilizables.
- **Gráficos en SVG hechos a mano** (`_ui/charts/`): tendencia de 12 meses con
  tooltip y navegación por teclado, ranking por servicio y barra segmentada de
  medios de pago. Paleta validada (skill de dataviz) contra el fondo de cada tema:
  tokens `--chart-*`, `--method-*` y `--status-*` en `globals.css`.
- **Datos centralizados** en `src/lib/admin/data.ts` (lectura y mapeo de Firestore)
  y formatos/etiquetas en `src/lib/admin/format.ts` (moneda, fechas y meses en
  castellano, estado de vencimiento).
- Los meses se eligen con un selector propio en castellano (no `<input type="month">`,
  que depende del idioma del navegador).

## Guías de uso

### Registrar un cobro y mandar el comprobante (flujo principal)

Botón **+** (celular) o **Registrar cobro** (PC) → `/admin/payments/new`:

1. **Cliente**: buscador por nombre, negocio o teléfono. Si no existe, "Crear
   cliente" ahí mismo (nombre + teléfono). Al elegirlo se prellenan servicio,
   importe, concepto y medio de pago con su **último cobro**.
2. Si el cliente tiene abonos, aparece "¿Es el pago de un abono?": al marcarlo se
   completan servicio, importe y concepto.
3. Importe, servicio, período que paga, concepto (lo que figura en el comprobante),
   medio de pago, fecha y N.º de operación (opcional).
4. Con **Emitir comprobante** activado (por defecto), al guardar se registra el
   cobro **y** se emite el comprobante en el mismo paso. La pantalla de éxito
   ofrece **Enviar por WhatsApp** (en el celular abre el menú de compartir con el
   PDF adjunto; en PC descarga el PDF y abre WhatsApp Web con el mensaje armado) y
   **PDF**.

Si el cobro está atado a un abono, al emitir el comprobante el próximo vencimiento
se corre solo (30/180/365 días corridos). Para llegar con datos ya cargados se usan
`?customerId=` y `?subscriptionId=` (los botones "Registrar cobro" de la ficha del
cliente y "Cobrar" de Vencimientos).

### Cobros

`/admin/payments`: buscador (cliente, concepto o N.º de comprobante), filtro por mes
y por estado con contadores (**Sin comprobante**, Emitidos, Anulados) y lista
agrupada por mes con su total. Cada fila se expande para ver el detalle y las
acciones: emitir comprobante (si falta), WhatsApp, PDF y **Anular** (pide motivo; el
comprobante queda anulado y no se puede revertir).

### Clientes

`/admin/customers`: lista con total cobrado y último cobro de cada uno, filtros
(Activos, Recurrentes, Ocasionales, Inactivos) y alta en panel deslizable. La ficha
(`/admin/customers/[id]`) muestra métricas, abonos con botón "Cobrar", historial de
cobros con sus comprobantes y datos de contacto (llamar / WhatsApp). El teléfono
tiene que ser válido para poder enviar comprobantes por WhatsApp.

### Vencimientos (abonos)

`/admin/subscriptions`: ingreso recurrente mensual (equivalente mensual de los
abonos activos), lo vencido, lo que vence en 7 días y los abonos agrupados por
urgencia. "Cobrar" lleva al flujo de cobro con el abono ya vinculado. Estados
editables: activo, pausado o cancelado. Se eliminó el botón "renovar" (y su API) que
corría la fecha sin registrar el pago: ahora el vencimiento avanza solo al emitir
el comprobante.

### Servicios

`/admin/products` (en el celular, dentro de **Más**): catálogo con tipo, frecuencia
habitual y precio sugerido, que se usa para prellenar cobros y abonos. Desactivar un
servicio lo saca de los formularios sin borrar su historial.

### Dashboard

`/admin`, filtrable por mes y servicio: ingresos del mes con variación contra el mes
anterior y tendencia de 12 meses, **Por cobrar** (vencidos y próximos 7 días, con
acceso directo a cobrar), cobros del mes, ticket promedio, cobros **sin
comprobante** (acceso directo para emitirlos), clientes activos, ingresos por
servicio, medios de pago y últimos cobros. Los ingresos suman todo cobro no anulado
del período, tenga o no comprobante.

### Descargas de APK (eliminadas 2026-11-12)

Mi Almacén y la versión Android de PresuPDF se discontinuaron. Se eliminaron la
sección "Aplicaciones", `/api/admin/apps`, la ruta `/descargar/[slug]`, la colección
`apps` y los productos de catálogo de esas apps. Los links viejos `/descargar/*`,
`/trabajos/mi-almacen` y `/legal/mi-almacen/*` redirigen (308) al sitio de PresuPDF
o al home, definidos en `next.config.ts`.

## Estructura de Firestore

| Colección            | Campos principales                                                                                                                                                        | Relaciones                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `adminUsers/{uid}`   | `email`, `displayName`, `role`                                                                                                                                            | —                                                        |
| `customers/{id}`     | `name`, `businessName`, `phone`, `phoneRaw`, `email`, `taxId`, `type`, `status`, `notes`, `productIds[]`                                                                  | `productIds` → `products`                                |
| `products/{id}`      | `name`, `type`, `suggestedPrice`, `suggestedFrequency`, `active`                                                                                                          | —                                                        |
| `subscriptions/{id}` | `customerId`, `productId`, `amount`, `frequency`, `nextDueDate`, `status`, `lastPaymentAt`                                                                                | → `customers`, → `products`                              |
| `payments/{id}`      | `customerId`, `productId`, `subscriptionId?`, `amount`, `concept`, `period`, `method`, `date`, `transferReference`, `notes`, `status`, `receiptId?`                       | → `customers`, `products`, `subscriptions?`, `receipts?` |
| `receipts/{id}`      | `number`, `paymentId`, `customerSnapshot` (congelado), `amount`, `concept`, `period`, `method`, `issuedAt`, `issuedBy`, `voided`, `voidedAt?`, `voidedBy?`, `voidReason?` | → `payments` (1:1)                                       |
| `counters/{año}`     | `year`, `lastNumber`                                                                                                                                                      | usado solo por la transacción de emisión                 |
| `auditLogs/{id}`     | `actorUid`, `action`, `targetCollection`, `targetId`, `details`, `timestamp`                                                                                              | referencia genérica a cualquier colección                |

**Índices**: ninguna consulta del panel combina `where` + `orderBy` en campos
distintos — se decidió deliberadamente traer cada colección completa y
filtrar/ordenar en código (la escala de datos de un solo negocio lo permite
sin problema), así que **no hace falta crear ningún índice compuesto** en
Firestore. Si en el futuro el volumen de datos crece mucho y esto deja de ser
verdad, ahí sí evaluar índices puntuales.

**Reglas desplegadas**: ver [`firestore.rules`](firestore.rules) en la raíz
del repo — es el contenido exacto publicado en Firebase Console (se
mantienen sincronizados a mano; cada vez que cambia el archivo hay que
republicarlo en la consola). Resumen: todo cerrado por defecto
(`allow read, write: if false`), cada colección tiene su propia excepción
`isAdmin()`, y `receipts`/`auditLogs` son de solo lectura para el admin
(las escrituras reales pasan siempre por Firebase Admin SDK en los Route
Handlers, que ignora estas reglas).

## Seguridad

- Autenticación: Firebase Auth (correo/contraseña) + cookie de sesión propia
  (httpOnly, `sameSite: lax`, 5 días).
- Autorización: cada Route Handler privado valida la sesión con
  `requireSessionAdmin()` antes de tocar datos.
- CSRF: `src/proxy.ts` rechaza (403) cualquier método mutante a `/api/**`
  cuyo `Origin` no coincida con el sitio.
- App Check: wiring listo (opcional) en `src/lib/firebase/client.ts` — se
  activa solo si existe `NEXT_PUBLIC_FIREBASE_GESTION_APPCHECK_SITE_KEY`.
- Comprobantes y pagos emitidos son inmutables desde la API — la única
  mutación posible es la anulación (con motivo).
- Clientes nunca se eliminan, solo se desactivan.

## Troubleshooting conocido

**500 en `/admin/login` o `/api/auth/session` solo en producción (Vercel),
nunca en local** (`pnpm dev` ni `pnpm build && pnpm start`): revisar el log
del error en Vercel antes que nada — el mensaje real importa más que
cualquier suposición (ver el incidente real más abajo como ejemplo de por
qué). En Vercel → proyecto → Logs (o el deployment → Functions).

**Incidente real (2026-08-01)**: al desplegar por primera vez, ese mismo
error apareció con este mensaje: `Error [ERR_REQUIRE_ESM]: require() of ES
Module .../jose/dist/webapi/index.js ... not supported`. Causa:
`firebase-admin/auth` depende de `jwks-rsa`, que hace `require()` de
`jose`; `jose@6` dejó el build CommonJS (quedó ESM puro), lo que rompe ese
`require()` específicamente en el bundling serverless de Vercel (no se
reproducía en ningún entorno local). Solución aplicada: fijar `jose` en
`^5` (última mayor con build CJS) vía `overrides` en `pnpm-workspace.yaml`.
Si en el futuro se actualiza `firebase-admin` y este override deja de hacer
falta (porque `jwks-rsa` actualizó su propio import), se puede sacar — pero
solo después de confirmar en un deploy de Preview, no directo en producción.

## Migración de proyecto Firebase (2026-11-12)

**Qué pasó:** el proyecto original `delgadodevgestion` se borró por error desde la
consola de Firebase. Google mantiene un proyecto borrado 30 días en "pendiente de
eliminación" y se puede restaurar en ese plazo, pero cuando se detectó ya había
pasado más de un mes: no figuraba como restaurable en ninguna de las cuentas de
Google. Síntomas: no llegaba el mail de recuperación de contraseña (la cuenta ya no
existía), el login del panel fallaba y `/descargar/mi-almacen` dejó de funcionar.

**Qué se hizo:**

- Proyecto nuevo **`delgadodev-gestion`** en la cuenta `delgadodev86@gmail.com`.
- Firestore en `southamerica-east1` (São Paulo, la región más cercana a Mendoza),
  con las mismas reglas de `firestore.rules`.
- App web y clave de cuenta de servicio nuevas: actualizadas en `.env.local` y en
  las variables de entorno de Vercel (mismos nombres de variables, solo cambian
  los valores; no hubo cambios de código).
- Restaurado desde `backups/firestore-backup-2026-08-02...json`: `apps` (link del
  APK de Mi Almacén) y `products` (6 productos del catálogo).
- **Se perdió:** clientes, suscripciones, pagos y comprobantes cargados después del
  2026-08-02, porque no había un backup más reciente.
- El usuario admin se crea de nuevo (Authentication → Correo electrónico/contraseña
  tiene que estar habilitado en la consola: activarlo por API exige facturación).

**Acceso y despliegue después de la migración:**

- Usuario admin: `delgadocdev@hotmail.com`, con su documento `adminUsers/{uid}`
  (`role: "owner"`). Si se borra y se vuelve a crear el usuario desde la consola,
  cambia el UID y hay que crear de nuevo `adminUsers/{nuevoUid}`: sin ese documento
  el login de Firebase funciona, pero el panel rechaza la sesión.
- Variables en Vercel: se cargan las 9 `…FIREBASE_GESTION_…` pegando el bloque
  `.env` en el campo **Key** de Settings → Environment Variables, con **Production**
  tildado. Síntoma de que las de servidor (`FIREBASE_GESTION_ADMIN_*`) están mal o
  faltan en Production: `/descargar/mi-almacen` da 500 y el login responde
  "Credenciales inválidas", aunque el navegador ya use el proyecto nuevo.
- `src/lib/firebase/admin.ts` acepta la clave privada con o sin comillas y con
  `
` literales o saltos de línea reales, para evitar errores al pegarla.
- Pendiente: rotar la clave de la cuenta de servicio (la actual se compartió en
  un chat de soporte) y actualizar solo `FIREBASE_GESTION_ADMIN_PRIVATE_KEY`.

**Lección:** correr el backup manual cada mes (ver abajo). Es lo único que permite
recuperar datos si el proyecto se borra.

## Mantenimiento y backups

- **Backup manual**: `node scripts/export-firestore-backup.mjs` (necesita
  `.env.local` con las credenciales de Admin). Genera un JSON con las 9
  colecciones en `backups/`, que está en `.gitignore` — nunca se sube a Git
  porque tiene datos reales de clientes y pagos.
- **Cuándo correrlo**: antes de cualquier cambio grande al modelo de datos, y
  **una vez por mes** mientras no exista un backup automático programado. Sin
  backup reciente, un proyecto borrado se pierde con todos sus datos (pasó en
  2026-11, ver la migración de arriba).
- **Reglas de Firestore**: si se edita `firestore.rules`, hay que republicarlo
  a mano en Firebase Console → Firestore Database → Reglas (no hay
  despliegue automático desde este repo).
- **Variables de entorno**: ver la tabla en [`.env.example`](.env.example).
  Cualquier variable nueva que se agregue al código tiene que reflejarse ahí
  y cargarse en Vercel (Production, y en Preview si corresponde).

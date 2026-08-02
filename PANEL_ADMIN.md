# DelgadoDev Gestión — Panel de administración

Panel privado en `/admin` para gestionar los productos de DelgadoDev: enlaces
de descarga de apps, clientes, productos/servicios, suscripciones, pagos y
comprobantes. Backend en un proyecto Firebase separado (`delgadodevgestion`),
independiente del Firebase de PresuFácil, Mi Almacén o cualquier catálogo.

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

1. **Contraseña olvidada**: Firebase Console → Authentication → Users → el
   usuario → "Reset password" (o desde ahí generar un link de reseteo). No hay
   flujo de "olvidé mi contraseña" dentro del panel (a propósito: es un solo
   usuario, no vale la pena esa superficie extra).
2. **Nuevo admin**: crear el usuario en Firebase Console → Authentication →
   Add user, copiar su UID, y crear manualmente el documento
   `adminUsers/{uid}` en Firestore con `{ email, displayName, role: "owner" }`.
   No hay forma de crear un admin nuevo desde el panel mismo (a propósito: solo
   se hace desde la consola, nunca desde un formulario público).
3. Si la cuenta de Firebase Auth se pierde por completo, el proyecto
   `delgadodevgestion` y sus datos en Firestore siguen intactos — solo hay que
   recrear el acceso, no los datos.

## Guías de uso

### Cambiar el enlace/versión de una APK

`/admin` → "Aplicaciones" (o `/admin/apps` directo). Cada app (`presufacil`,
`mi-almacen`) tiene su propio formulario: nombre, versión, enlace de Google
Drive (tiene que ser `https://`), estado (`draft` / `published` / `paused`) y
plataforma. Al guardar, el cambio es inmediato — la web pública lee el enlace
desde Firestore en cada click de descarga (`/descargar/[slug]`), sin
necesidad de redeploy.

- `published`: el botón público descarga normalmente.
- `paused` o `draft`: `/descargar/[slug]` devuelve 404 (no revela el motivo).

### Dar de alta un cliente

`/admin/customers` → "Nuevo cliente", o desde el dashboard → "Nuevo cliente"
(abre el formulario directo). Campos: nombre, negocio, teléfono (se normaliza
solo para WhatsApp), correo, CUIT/DNI opcional, tipo (recurrente/ocasional),
servicios contratados (checkboxes contra el catálogo de productos) y notas.

También se puede dar de alta un cliente ocasional **desde el mismo formulario
de un pago nuevo** (botón "+ Nuevo cliente ocasional"), sin salir de esa
pantalla.

Un cliente nunca se borra — solo se desactiva (`status: "inactivo"`) editándolo.

### Registrar un pago y emitir el comprobante

`/admin/payments` → "Nuevo pago" (o el acceso rápido del dashboard). Elegís
cliente, producto, suscripción opcional, importe, concepto, período, medio de
pago, fecha, referencia de transferencia y observaciones. El pago queda en
estado `registrado` — **todavía no es un comprobante** y se puede editar.

Cuando esté listo, click en **"Emitir comprobante"**. Eso dispara una
transacción atómica que:

1. Incrementa el contador anual y genera el número (`DD-2026-0001`).
2. Congela una copia de los datos del cliente en el comprobante (si editás el
   cliente después, el comprobante ya emitido no cambia).
3. Marca el pago como `emitido` (deja de poder editarse).
4. Si el pago está vinculado a una suscripción, avanza su próximo vencimiento.
5. Deja un registro en `auditLogs`.

Con el comprobante ya emitido podés **descargar el PDF** o **enviarlo por
WhatsApp** (arma el mensaje automático y, si el navegador lo soporta —
Android/Chrome mobile —, comparte el PDF directo al selector de apps; en
escritorio descarga el PDF y abre WhatsApp Web con el mensaje, para adjuntarlo
a mano).

### Anular un comprobante

Solo se puede **anular**, nunca editar ni borrar un comprobante ya emitido.
Botón "Anular comprobante" en el pago correspondiente → pide un motivo
obligatorio → marca el comprobante como anulado (con quién y cuándo) y el
pago pasa a estado `anulado`. Queda registrado en `auditLogs`.

### Suscripciones y vencimientos

`/admin/subscriptions`: alta/edición de suscripciones (cliente, producto,
importe, frecuencia, próximo vencimiento, estado). El botón "Registrar pago
(avanza vencimiento)" es un atajo manual para marcar el período como pagado
sin pasar por el flujo completo de pagos — calcula el próximo vencimiento en
el servidor. Cuando un pago real se vincula a una suscripción y se emite su
comprobante, esto pasa automáticamente (ver arriba).

### Dashboard

`/admin` muestra: ingresos del mes (con variación vs. el mes anterior),
cantidad de pagos, clientes activos, suscripciones activas, próximos
vencimientos (7 días) y pagos vencidos, filtrables por período y producto.
Los tres accesos rápidos de arriba llevan directo a los formularios de alta
de pago, cliente o al listado de aplicaciones.

## Estructura de Firestore

| Colección            | Campos principales                                                                                                                                                        | Relaciones                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `adminUsers/{uid}`   | `email`, `displayName`, `role`                                                                                                                                            | —                                                        |
| `apps/{slug}`        | `name`, `version`, `downloadUrl`, `status`, `platform`, `updatedAt`, `updatedBy`                                                                                          | —                                                        |
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

## Mantenimiento y backups

- **Backup manual**: `node scripts/export-firestore-backup.mjs` (necesita
  `.env.local` con las credenciales de Admin). Genera un JSON con las 9
  colecciones en `backups/`, que está en `.gitignore` — nunca se sube a Git
  porque tiene datos reales de clientes y pagos.
- **Cuándo correrlo**: antes de cualquier cambio grande al modelo de datos, y
  como buena práctica cada tanto (mensual, por ejemplo) mientras no exista un
  backup automático programado.
- **Reglas de Firestore**: si se edita `firestore.rules`, hay que republicarlo
  a mano en Firebase Console → Firestore Database → Reglas (no hay
  despliegue automático desde este repo).
- **Variables de entorno**: ver la tabla en [`.env.example`](.env.example).
  Cualquier variable nueva que se agregue al código tiene que reflejarse ahí
  y cargarse en Vercel (Production, y en Preview si corresponde).

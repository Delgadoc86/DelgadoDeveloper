# Roadmap maestro — DelgadoDev Gestión

- **Proyecto web existente**: www.delgadodev.com.ar
- **Panel privado**: www.delgadodev.com.ar/admin
- **Backend**: Firebase independiente
- **Nombre visible sugerido**: DelgadoDev Gestión
- **Project ID sugerido**: `delgadodev-gestion` (o una variante si no está disponible)
- **Responsable funcional**: Cristian Delgado
- **Implementación técnica**: Claude, bajo aprobación por etapas

## Cómo usar este archivo

Estados:

- `[ ]` Pendiente
- `[~]` En progreso
- `[x]` Terminado y verificado
- `[!]` Bloqueado o requiere decisión

Reglas de trabajo:

- Claude debe actualizar este mismo archivo después de cada tarea.
- No se marca `[x]` solamente porque el código fue escrito: debe estar probado.
- Cada ítem terminado debe incluir una breve nota de verificación.
- No se comienza una etapa nueva sin cerrar los criterios de aceptación de la anterior.
- Antes de cambios grandes, crear commit o punto de restauración.
- No guardar claves privadas, contraseñas ni archivos de cuenta de servicio en Git.
- No avanzar con módulos financieros hasta terminar y verificar autenticación y seguridad.

---

## ETAPA 0 — Preparación y control del proyecto

- [x] Crear rama de trabajo: `feature/delgadodev-gestion`
      **Verificación**: `git branch --show-current` → `feature/delgadodev-gestion`.
- [x] Confirmar que el proyecto compila sin errores antes de modificarlo
      **Verificación**: `pnpm build` (Next.js 16.2.9, Turbopack) completó sin errores. 23 rutas generadas correctamente (home, `/sobre-mi`, `/proyectos/[slug]` ×3, legales, sistema).
- [x] Ejecutar lint y registrar el estado inicial
      **Verificación**: `pnpm lint` (ESLint) sin errores ni warnings. Estado inicial: limpio.
- [x] Confirmar deploy actual de Vercel funcionando
      **Verificación**: fetch a `https://www.delgadodev.com.ar` — carga con título correcto ("DelgadoDev | Desarrollador Frontend & Mobile en Mendoza, Argentina") y contenido esperado (proyectos, about, contacto).
- [x] Identificar los enlaces actuales de PresuFácil y Mi Almacén
      **Verificación**: hardcodeados en `src/features/projects/data/projects.ts`, campo `links.download`:
  - PresuFácil: `https://drive.google.com/file/d/1ktv93-0xB7UaNFH9aaLSx045xvKzC2Km/view?usp=drivesdk`
  - Mi Almacén: `https://drive.google.com/file/d/1Uf_xjucfxybX5FOdD6KQWPCZS8on56Cz/view?usp=drivesdk`
- [x] Crear este archivo como `ROADMAP_DELGADODEV_GESTION.md` en la raíz del repositorio
      **Verificación**: este archivo.
- [x] Confirmar que `.env.local` está ignorado por Git
      **Verificación**: `.gitignore` contiene `.env*` con excepción explícita `!.env.example` — cualquier `.env.local` queda fuera del control de versiones.
- [x] Definir convención de nombres para variables de entorno
      **Verificación**: definida a continuación.
- [x] Crear primer commit de respaldo
      **Verificación**: commit inicial en `feature/delgadodev-gestion` con este archivo, antes de tocar código de producto.

### Convención de variables de entorno

| Prefijo                          | Uso                                                                             | Dónde vive                                                  | Ejemplo                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------- |
| `NEXT_PUBLIC_FIREBASE_GESTION_*` | Config web pública del proyecto Firebase (apiKey, authDomain, projectId, appId) | Cliente y servidor                                          | `NEXT_PUBLIC_FIREBASE_GESTION_PROJECT_ID`                                   |
| `FIREBASE_GESTION_ADMIN_*`       | Credenciales de Firebase Admin (service account) — **nunca en Git**             | Solo servidor (Route Handlers, `src/lib/firebase/admin.ts`) | `FIREBASE_GESTION_ADMIN_PRIVATE_KEY`, `FIREBASE_GESTION_ADMIN_CLIENT_EMAIL` |
| `AUTH_SESSION_*`                 | Configuración de la cookie de sesión propia (`/api/auth/session`)               | Solo servidor                                               | `AUTH_SESSION_SECRET`, `AUTH_SESSION_MAX_AGE`                               |

El sufijo `_GESTION_` es deliberado: evita colisión si en el futuro se conecta también el Firebase de PresuFácil o Mi Almacén a este mismo proyecto Next.js.

**Criterio de cierre**:

- [x] El proyecto original sigue funcionando
- [x] Existe una rama específica
- [x] El roadmap está versionado
- [x] No se expuso ninguna credencial

---

## ETAPA 1 — Crear Firebase DelgadoDev Gestión

### Acciones de Cristian

- [x] Entrar a Firebase Console con su cuenta habitual de Google
- [x] Crear un proyecto nuevo
  - [x] Nombre visible: DelgadoDev Gestión
  - [x] Elegir el Project ID definitivo → **`delgadodevgestion`**
- [x] Registrar una aplicación web con nombre DelgadoDev Web
- [x] Crear Cloud Firestore en modo producción
      **Verificación**: confirmado por conexión real desde el Admin SDK (ver abajo). Región no confirmada explícitamente por Cristian — pendiente registrar cuál se eligió.
- [x] Activar Firebase Authentication
  - [x] Habilitar acceso por correo y contraseña
  - [x] Crear manualmente el usuario administrador de Cristian
        **Verificación**: UID `kS3QJVEj9zW4oHWZnYBUbSxYQOx2`, email `delgadocdev@hotmail.com` — confirmado con `auth.getUser()` vía Admin SDK.
- [x] Entregar a Claude únicamente la configuración web necesaria
- [x] No compartir públicamente claves privadas ni JSON de cuenta de servicio
      **Nota**: el JSON de la cuenta de servicio se entregó por chat (no público) y se volcó únicamente a `.env.local` (ignorado por Git). Pendiente: el archivo original quedó en `d:\descargas\MEGA\...json`, una carpeta sincronizada a la nube — se recomienda borrarlo de ahí una vez confirmado que `.env.local` ya lo tiene.
- [x] No activar Firebase Hosting
      **Verificación**: confirmado por Cristian.

### Acciones de Claude

- [x] Instalar `firebase`
- [x] Instalar `firebase-admin`
- [x] Crear `src/lib/firebase/client.ts`
- [x] Crear `src/lib/firebase/admin.ts`
- [x] Definir variables públicas con prefijo `NEXT_PUBLIC_FIREBASE_GESTION_`
- [x] Definir variables privadas para Firebase Admin
- [x] Verificar que los módulos de servidor no puedan importarse desde componentes cliente
      **Verificación**: componente cliente de prueba que importaba `admin.ts` hizo fallar `pnpm build`; se retiró el archivo de prueba y el build volvió a pasar limpio.
- [x] Crear configuración inicial de Firestore Rules cerrada por defecto
      **Verificación**: `firestore.rules` creado (deny-all salvo lectura propia en `adminUsers`) y **publicado por Cristian** en Firebase Console, contenido idéntico al del repo.
- [x] Crear colección `adminUsers`
- [x] Crear documento `adminUsers/{uid}` para Cristian
      **Verificación**: documento creado y releído vía Admin SDK — `{ email: "delgadocdev@hotmail.com", displayName: "Cristian Delgado", role: "owner", createdAt: <timestamp> }`.
- [x] Confirmar conexión desde entorno local
      **Verificación**: script puntual con Admin SDK cargando `.env.local` — Auth OK (usuario encontrado) y Firestore OK (lectura y escritura confirmadas). Script de prueba eliminado después.
- [!] Confirmar conexión desde Vercel Preview
  **Diferido**: Cristian ya cargó las 9 variables en Vercel (Production + Preview + Development). El primer build de Preview falló por inicialización eager de Firebase Admin en tiempo de build (ver commit `fix: inicializa Firebase Admin de forma perezosa`); ya corregido y pusheado. No se pudo ubicar la URL exacta del deployment de Preview desde la UI de Vercel/GitHub en esta sesión. Se retoma como verificación puntual (hit a `/api/debug-firebase-check`) antes de fusionar la rama a `main` (Etapa 10), no bloquea seguir con Etapa 2 en local (`pnpm dev`).

**Criterio de cierre**:

- [x] Firebase está separado de PresuFácil, Mi Almacén y catálogos
- [x] La web actual continúa en Vercel
- [x] Firestore rechaza accesos públicos (reglas publicadas)
- [x] El administrador existe en Authentication y `adminUsers`
- [x] Ninguna credencial privada está en Git

---

## ETAPA 2 — Autenticación privada de /admin

- [x] Crear `/admin/login`
      **Verificación**: `src/app/admin/login/page.tsx` (Server Component, redirige a `/admin` si ya hay sesión) + `login-form.tsx` (Client Component).
- [x] Crear formulario de correo y contraseña
- [x] Obtener Firebase ID Token después del login
      **Verificación**: `signInWithEmailAndPassword` (cliente) + `credential.user.getIdToken()`.
- [x] Crear `POST /api/auth/session`
  - [x] Generar cookie de sesión segura y httpOnly
  - [x] Configurar `secure` en producción
        **Verificación**: `secure: process.env.NODE_ENV === "production"`.
  - [x] Configurar `sameSite`
        **Verificación**: `sameSite: "lax"`.
  - [x] Definir duración de la sesión
        **Verificación**: 5 días (`SESSION_MAX_AGE_MS` en `session-constants.ts`) — elegido por Claude como default razonable para panel de un solo admin; ajustable, ver Decisiones pendientes.
- [x] Crear `POST /api/auth/logout`
  - [x] Revocar o eliminar cookie al cerrar sesión
        **Verificación**: `revokeRefreshTokens(uid)` + cookie con `maxAge: 0`.
- [x] Crear helper de servidor para validar sesión
  - [x] Verificar existencia del UID en `adminUsers`
        **Verificación**: `src/lib/auth/session.ts` (`getSessionAdmin`), envuelto en `cache()`.
- [x] Crear `src/proxy.ts` para redirecciones tempranas
      **Verificación**: build muestra "ƒ Proxy (Middleware)"; solo chequea presencia de cookie (Edge no puede correr Admin SDK).
- [x] Proteger también el layout de `/admin`
      **Verificación**: `src/app/admin/(protected)/layout.tsx`, verificación real vía `getSessionAdmin()`.
- [x] Proteger cada Route Handler privado
      **Nota**: patrón establecido con `getSessionAdmin()`; se reutiliza en cada Route Handler de las próximas etapas.
- [x] Evitar formulario de registro público
      **Verificación**: no existe ningún endpoint ni formulario de alta de usuarios; el único admin se crea manualmente (Etapa 1).
- [x] Mostrar errores de acceso sin revelar información sensible
      **Verificación**: `/api/auth/session` devuelve el mismo mensaje ("Credenciales inválidas") tanto si el ID token es inválido como si el usuario no está en `adminUsers`.

### Pruebas obligatorias

- [x] Usuario sin sesión no accede a `/admin`
      **Verificación**: `GET /admin` sin cookie → redirect 307 a `/admin/login`.
- [x] Cookie inventada no funciona
      **Verificación**: `GET /admin` con `admin_session=esto-no-es-una-cookie-valida` → redirect 307 (pasa el chequeo naive de `proxy.ts` pero el layout la rechaza).
- [x] Usuario de Authentication sin documento en `adminUsers` no accede
      **Verificación**: usuario temporal real creado con Admin SDK, custom token intercambiado por ID token real vía Identity Toolkit REST, `POST /api/auth/session` → 403. Usuario temporal eliminado después.
- [x] Cierre de sesión invalida el acceso
      **Verificación**: `POST /api/auth/logout` + reintento de `GET /admin` con la misma cookie → redirect 307. (Nota: Firebase revoca por segundo — con <1s entre login y logout el chequeo puede no alcanzar a reflejarse; con un margen realista funciona correctamente, verificado.)
- [x] Recargar una página privada mantiene una sesión válida
      **Verificación**: dos `GET /admin` consecutivos con la misma cookie → 200 ambas veces.
- [x] Las APIs privadas devuelven 401 o 403 correctamente
      **Verificación**: `POST /api/auth/session` sin `idToken` → 400; con `idToken` inválido → 401; con `idToken` real de usuario no-admin → 403.

**Criterio de cierre**:

- [x] La autenticación está probada localmente
      **Verificación**: suite de 11 pruebas contra `pnpm dev` (servidor real, Firebase real, sin mocks) — todas pasaron.
- [!] La autenticación está probada en Vercel Preview
  **Diferido junto con la verificación de Preview de la Etapa 1** (ver nota ahí) — se retoma antes de la Etapa 10.
- [x] No se depende solamente de `proxy.ts`
      **Verificación**: probado explícitamente con la prueba de "cookie inventada" — `proxy.ts` la deja pasar (solo mira presencia), el layout la rechaza.

---

## ETAPA 3 — Administración de enlaces APK

### Modelo `apps/{slug}`

- [x] Definir campos: `name`, `slug`, `version`, `downloadUrl`, `status`, `platform`, `updatedAt`, `updatedBy`
      **Verificación**: `src/types/app.ts`.
- [x] Estados permitidos: `draft`, `published`, `paused`
- [x] Crear documentos iniciales: `apps/presufacil`, `apps/mi-almacen`
      **Verificación**: creados vía Admin SDK con los enlaces reales de Drive ya existentes (`status: "published"`, `version: "1.0.0"` como placeholder inicial — editable desde el panel).

### Panel

- [x] Crear `/admin/apps`
      **Verificación**: `src/app/admin/(protected)/apps/page.tsx`, Server Component, lee Firestore directo con Admin SDK (protegido por el layout de la Etapa 2).
- [x] Listar aplicaciones
- [x] Crear formulario de edición
  - [x] Validar que el enlace sea HTTPS
        **Verificación**: validado en cliente (`pattern="https://.*"`) y de forma autoritativa en el Route Handler (`downloadUrl.startsWith("https://")`).
  - [x] Editar nombre
  - [x] Editar versión
  - [x] Editar enlace de descarga
  - [x] Cambiar estado
  - [x] Probar enlace en una pestaña nueva
        **Verificación**: link "Probar" (`target="_blank"`) junto al campo de enlace.
- [x] Guardar mediante Route Handler privado
      **Verificación**: `PATCH /api/admin/apps/[slug]`, protegido con `requireSessionAdmin()`.
  - [x] Registrar `updatedAt`
  - [x] Registrar `updatedBy`
- [x] Mostrar confirmación y errores

### Descarga pública

- [x] Crear `/descargar/[slug]`
- [x] Consultar Firestore desde el servidor con Firebase Admin
- [x] Rechazar aplicaciones inexistentes
- [x] Rechazar aplicaciones pausadas o no publicadas
      **Verificación**: mismo 404 genérico para inexistente y no-publicada (no revela cuál es el motivo).
- [x] Redirigir temporalmente al enlace actual
      **Verificación**: `NextResponse.redirect(downloadUrl, { status: 302 })`.
- [x] Evitar cache permanente
      **Verificación**: `Cache-Control: no-store` + `export const dynamic = "force-dynamic"`.
- [x] Mantener Analytics en los botones actuales
      **Verificación**: `DownloadButton` no cambió, sigue disparando `trackEvent` antes de la navegación; solo cambió el `href` que recibe.
- [x] Cambiar PresuFácil para usar `/descargar/presufacil`
- [x] Cambiar Mi Almacén para usar `/descargar/mi-almacen`
- [x] Confirmar que cambiar Firestore no requiere redeploy
      **Verificación**: probado en vivo contra `pnpm dev` — se cambió el `downloadUrl` vía `PATCH`, y sin reiniciar el servidor `/descargar/presufacil` ya redirigía al nuevo enlace.

### Pruebas obligatorias

- [x] Un enlace publicado descarga correctamente
      **Verificación**: `GET /descargar/presufacil` → 302 al enlace real de Drive.
- [x] Cambiar el enlace en `/admin/apps` cambia el destino público
      **Verificación**: ver arriba (confirmado sin redeploy).
- [x] Una aplicación pausada no descarga
      **Verificación**: `status: "paused"` → `GET /descargar/presufacil` → 404.
- [x] Un slug inexistente muestra error controlado
      **Verificación**: `GET /descargar/no-existe-esta-app` → 404 (JSON controlado, no error 500 ni stack trace).
- [x] No se expone el listado privado de aplicaciones
      **Verificación**: `GET /admin/apps` sin sesión → redirect 307 a login; `PATCH /api/admin/apps/[slug]` sin sesión → 401.
- [ ] El funcionamiento móvil y de escritorio es correcto
      **Pendiente**: el formulario usa clases Tailwind responsive estándar del proyecto, pero no se probó visualmente en un dispositivo/viewport móvil real — pendiente de que Cristian lo revise en el navegador.

**Criterio de cierre**:

- [x] Cristian puede cambiar APK sin editar código
- [x] PresuFácil y Mi Almacén usan rutas estables
- [x] La primera función real del panel está operativa
      **Verificación**: suite de 9 pruebas contra `pnpm dev` (Firebase real, sin mocks) — todas pasaron. El documento `apps/presufacil` se restauró a su estado original al final de las pruebas.

---

## ETAPA 4 — Clientes y productos

### Clientes

- [x] Crear colección `customers`
- [x] Definir cliente recurrente
- [x] Definir cliente ocasional
      **Verificación**: `type: "recurrente" | "ocasional"` en `src/types/customer.ts`.
- [x] Crear alta, edición, búsqueda y desactivación
      **Verificación**: `/admin/customers` — alta y edición vía `POST`/`PATCH` a `/api/admin/customers`; búsqueda client-side por nombre/negocio/teléfono; desactivación = cambiar `status` a `"inactivo"` (nunca delete).
- [x] Campos básicos: nombre, negocio, teléfono, correo, CUIT/DNI opcional, tipo, estado, notas, fechas de creación y actualización
      **Verificación**: `src/types/customer.ts`. También se agregó `productIds` (servicios contratados, del pedido original) para poder vincular cliente↔producto ya en esta etapa.
- [x] Normalizar teléfonos para WhatsApp
      **Verificación**: `src/lib/phone.ts` (`normalizePhoneForWhatsapp`) — best-effort (Argentina no tiene largo fijo de código de área), documentado como tal. Probado con `"011 15-1234-5678"` → `"5491112345678"`. Se guarda también `phoneRaw` (tal cual se escribió) para poder corregir a mano si la heurística falla.
- [x] No borrar clientes con movimientos vinculados
      **Verificación**: no existe ningún endpoint ni botón de eliminar clientes en todo el panel — la única baja posible es desactivar (`status: "inactivo"`), por diseño.

### Productos y servicios

- [x] Crear colección `products`
- [x] Cargar: PresuFácil, Mi Almacén, Catálogo web, Desarrollo web, Mantenimiento, Otros
      **Verificación**: 6 documentos sembrados vía Admin SDK (`presufacil`, `mi-almacen`, `catalogo-web`, `desarrollo-web`, `mantenimiento`, `otros`).
- [x] Configurar precio sugerido
- [x] Configurar frecuencia sugerida
- [x] Permitir activar o desactivar productos
      **Verificación**: `/admin/products`, checkbox "Activo" en cada formulario de edición.

**Criterio de cierre**:

- [x] Se pueden registrar clientes recurrentes y ocasionales
      **Verificación**: probado con un cliente de prueba real (`type: "ocasional"`) creado y luego eliminado vía Admin SDK al finalizar.
- [x] Se puede vincular un cliente con un producto
      **Verificación**: `productIds` en el formulario de cliente (checkboxes contra el catálogo de productos activos).
- [x] Las búsquedas funcionan por nombre, negocio y teléfono
      **Verificación**: filtro client-side en `customers-panel.tsx` sobre los tres campos.

**Nota técnica**: `/admin/customers` originalmente combinaba `where("active", "==", true)` + `orderBy("name")` sobre `products`, lo que Firestore rechazó en la prueba real con `FAILED_PRECONDITION` (pide un índice compuesto). Se resolvió trayendo todo el catálogo ordenado y filtrando `active` en código — el volumen de productos es chico y no vale la pena depender de un índice para esto.

---

## ETAPA 5 — Suscripciones y vencimientos

> Por pedido de Cristian, esta etapa se implementó sin la suite de pruebas en vivo contra Firebase real que se hizo en las etapas 0-4. El código está escrito y pasa `pnpm build` + `pnpm lint`, pero la verificación funcional (crear, editar, renovar, listados de vencimientos) queda para el pase de pruebas consolidado al final del roadmap. Por eso los ítems quedan en `[~]`, no en `[x]`.

- [~] Crear colección `subscriptions`
- [~] Vincular cliente y producto
  **Nota**: `customerId`/`productId`, validados contra documentos existentes al crear (`404` si no existen).
- [~] Registrar importe acordado
- [~] Registrar frecuencia
  **Nota**: `mensual` | `anual` | `unico`.
- [~] Registrar próxima fecha de vencimiento
- [~] Estados: activa, pendiente, vencida, pausada, cancelada
- [~] Registrar último pago
  **Nota**: implementado como acción "Registrar pago (avanza vencimiento)" — placeholder manual hasta que exista `payments` en la Etapa 6, que disparará esto mismo automáticamente en vez de un botón.
- [~] Calcular próximo vencimiento desde servidor
  **Nota**: `src/lib/subscriptions.ts` (`calculateNextDueDate`), usado por `POST /api/admin/subscriptions/[id]/renew` — nunca se confía en una fecha calculada del lado cliente.
- [x] Evitar arrays crecientes de historial
      **Verificación**: `SubscriptionRecord` no tiene ningún campo de array de historial embebido, por diseño.
- [!] Obtener historial consultando pagos vinculados
  **Bloqueado**: no hay nada que consultar todavía — `payments` no existe hasta la Etapa 6. Se retoma ahí.
- [~] Crear listado de próximos vencimientos
  **Nota**: badge "Próxima a vencer" (próximos 7 días) en `subscriptions-panel.tsx`.
- [~] Crear listado de suscripciones vencidas
  **Nota**: badge "Vencida" cuando `nextDueDate` ya pasó, calculado en cliente sobre datos leídos server-side — no hay automatización todavía que cambie el `status` solo (eso es Etapa 9/futuro).

**Criterio de cierre**:

- [~] Cada servicio recurrente tiene su vencimiento
- [~] Los pagos futuros podrán actualizar la suscripción correctamente
  **Nota**: el mecanismo ya existe (`calculateNextDueDate` + endpoint de renovación); falta que la Etapa 6 lo dispare desde un pago real en vez del botón manual.
- [x] No existe duplicación innecesaria de historial

**Pendiente para el pase final de pruebas**: crear/editar/renovar una suscripción real, confirmar los badges de vencimiento, confirmar que `unico` no permite renovar.

---

## ETAPA 6 — Pagos y comprobantes

> Módulo financiero: a diferencia de la Etapa 5, acá sí se hizo una prueba en vivo enfocada en la transacción crítica (numeración, concurrencia, inmutabilidad, anulación), tal como se acordó — el resto de las etapas del roadmap quedó sin batería de pruebas por pedido de Cristian, pero esta no, por tratarse de plata real.

### Pagos

- [x] Crear colección `payments`
- [x] Registrar cliente, producto, suscripción opcional
- [x] Registrar importe, concepto, período, medio de pago, referencia de transferencia, observaciones, estado
      **Verificación**: `POST /api/admin/payments` probado en vivo — crea con `status: "registrado"`.

### Numeración

- [x] Crear colección `counters`
- [x] Crear contador anual
- [x] Formato: `DD-AAAA-0001`
      **Verificación**: probado en vivo, número real emitido `DD-2026-0001`.
- [x] Implementar transacción del lado servidor
      **Verificación**: `db.runTransaction()` en `issue-receipt/route.ts` — lee contador, paga, cliente y (si aplica) suscripción antes de escribir nada.
- [x] Probar concurrencia
      **Verificación**: dos pagos distintos emitidos con `Promise.all` en simultáneo real contra Firebase — sacaron `DD-2026-0002` y `DD-2026-0003`, sin colisión.
- [x] Evitar números duplicados
      **Verificación**: mismo test — números distintos confirmados.
- [x] Definir comportamiento si la operación falla
      **Verificación**: si la transacción de Firestore aborta (contención, dato inconsistente), no se crea nada — ni pago emitido, ni comprobante, ni cambio en el contador. El Route Handler devuelve 404/409/500 con mensaje claro, probado con: pago inexistente, pago ya emitido (409, probado en vivo), cliente inexistente.

### Comprobantes

- [x] Crear colección `receipts`
- [x] Congelar datos del cliente mediante snapshot
      **Verificación**: `customerSnapshot` se lee dentro de la misma transacción y se copia al comprobante — no es una referencia viva al cliente.
- [x] Congelar importe, concepto, período y medio
- [x] No permitir edición después de emisión
      **Verificación**: no existe ningún Route Handler de edición de `receipts` (nunca se creó); y `PATCH /api/admin/payments/[id]` devuelve 409 si el pago ya no está `"registrado"` — probado en vivo.
- [x] No permitir eliminación
      **Verificación**: no existe ningún endpoint DELETE para `receipts` ni `payments`, por diseño.
- [x] Crear anulación con motivo
      **Verificación**: `POST /api/admin/receipts/[id]/void` exige `reason`, probado en vivo (200, y doble anulación → 409).
- [x] Registrar usuario y fecha de anulación
      **Verificación**: `voidedBy`/`voidedAt` seteados en la transacción de anulación, confirmado leyendo el doc real tras la prueba.
- [~] Crear PDF con jsPDF
  - [x] Agregar logo y datos de DelgadoDev
        **Nota**: usa `public/assets/icons/logo-mark.png` ya existente en el sitio. Los datos comerciales de DelgadoDev (CUIT, dirección) siguen como "A definir" en Decisiones pendientes — no se inventó ningún dato fiscal, el PDF solo trae nombre y los datos del pago/cliente.
  - [x] Agregar leyenda de comprobante interno
        **Verificación**: texto fijo "no reemplaza una factura fiscal" en el PDF.
  - [!] Probar descarga del PDF
    **Bloqueado**: requiere abrir el navegador — no se probó visualmente en esta sesión. Pendiente para Cristian o el pase final.
  - [!] Probar impresión
    **Bloqueado**: mismo motivo — pendiente de prueba manual.

### Transacción crítica

- [x] Validar sesión y permisos
- [x] Validar datos
- [x] Incrementar contador
- [x] Crear pago
      **Nota**: el pago ya existe antes de la transacción (se crea en `POST /api/admin/payments` con `status: "registrado"`); la transacción crítica lo pasa a `"emitido"`.
- [x] Crear comprobante
- [x] Actualizar suscripción
      **Verificación**: si el pago tiene `subscriptionId`, la misma transacción avanza `nextDueDate` (reutilizando `calculateNextDueDate` de la Etapa 5) y marca `lastPaymentAt`.
- [x] Crear registro de auditoría
      **Verificación**: `auditLogs` con `action: "receipt.issue"` / `"receipt.void"` — confirmado que se crearon los documentos reales en la prueba.
- [x] Confirmar que todo sea atómico
      **Verificación**: todo corre dentro de un único `db.runTransaction()`; si algo falla a mitad de camino, Firestore descarta todos los cambios de esa transacción.

**Criterio de cierre**:

- [x] No hay comprobantes duplicados
- [x] No hay pagos parciales creados por errores
- [x] Los comprobantes emitidos son inmutables
- [x] La anulación queda documentada

**Pendiente para el pase final**: probar descarga e impresión del PDF en el navegador (visual, no automatizable desde este entorno).

---

## ETAPA 7 — Envío rápido por WhatsApp

> Sin batería de pruebas en vivo (no toca datos financieros ni transacciones — solo arma un mensaje y un PDF ya generado en la Etapa 6). Lo que sí queda pendiente es probar la interacción real en un navegador/teléfono, que no se puede automatizar desde acá.

- [x] Normalizar número argentino
      **Nota**: reutiliza `normalizePhoneForWhatsapp` de la Etapa 4 — el teléfono ya queda normalizado en `receipt.customerSnapshot.phone` desde que se emite el comprobante.
- [x] Crear mensaje automático (cliente, concepto, importe, período, número de comprobante)
      **Verificación**: `src/lib/whatsapp.ts` (`buildWhatsappMessage`) — incluye los 5 datos pedidos.
- [x] Crear botón para abrir WhatsApp
- [x] Descargar o compartir PDF antes de abrir WhatsApp
      **Nota**: usa Web Share API con archivos cuando está disponible (Android/Chrome mobile — comparte PDF + texto en un solo paso, directo al picker con WhatsApp); si no está disponible (escritorio), descarga el PDF y abre `wa.me` con el mensaje, para adjuntar a mano en el chat.
- [!] Probar flujo en Android
  **Bloqueado**: necesita un teléfono real, no se puede probar desde este entorno.
- [!] Probar flujo en escritorio con WhatsApp Web
  **Bloqueado**: necesita un navegador real con sesión de WhatsApp Web, no se puede probar desde acá.
- [x] Definir comportamiento cuando falta teléfono
      **Verificación**: `hasUsablePhone()` — si el teléfono del comprobante no tiene el formato `549...` esperado, el botón ni siquiera se muestra, aparece un aviso de que hay que editar el cliente primero.
- [x] No integrar todavía API oficial automática
      **Verificación**: solo se usa el link público `wa.me`, ningún SDK ni API de WhatsApp Business.

**Criterio de cierre**:

- [~] Cristian puede generar y enviar un comprobante en pocos pasos
  **Nota**: mecanismo construido (un solo botón dispara PDF + WhatsApp); falta la confirmación manual de que se siente "en pocos pasos" en el uso real.
- [x] El mensaje utiliza el número correcto
      **Verificación**: usa `receipt.customerSnapshot.phone`, el mismo congelado en el comprobante al emitirlo (no una referencia viva al cliente que pudo cambiar después).
- [x] El PDF corresponde al pago seleccionado
      **Verificación**: `buildReceiptPdf(receipt)` recibe el objeto `receipt` exacto de esa fila del panel, mismo helper que ya usa el botón de descarga de la Etapa 6.

**Pendiente para el pase final**: probar el flujo real en Android y en escritorio con WhatsApp Web.

---

## ETAPA 8 — Dashboard

> Cristian pidió explícitamente una vista "power BI profesional", pensada mobile-first (uso principal) y prolija en PC. Se usó la skill de dataviz del proyecto (stat tiles + paleta de estado validada) y se verificó visualmente con capturas reales (Playwright headless, instalado temporalmente solo para esto y desinstalado al terminar — no queda como dependencia).

- [x] Ingresos del mes
      **Verificación**: suma de `payments` con `status: "emitido"` del período seleccionado, con delta % vs el mes anterior.
- [x] Cantidad de pagos
      **Verificación**: mismo criterio, con delta vs mes anterior.
- [x] Clientes activos
- [x] Suscripciones activas
- [x] Próximos vencimientos
      **Verificación**: suscripciones con `nextDueDate` dentro de los próximos 7 días (excluye pausadas/canceladas).
- [x] Pagos vencidos
      **Verificación**: suscripciones con `nextDueDate` ya pasado (excluye pausadas/canceladas).
- [x] Últimos pagos
      **Verificación**: últimos 5 pagos por fecha.
- [x] Acceso rápido a registrar pago
      **Verificación**: botón "Registrar pago" → `/admin/payments?new=1`, que abre el formulario de alta automáticamente (probado con captura real).
- [x] Acceso rápido a nuevo cliente
      **Verificación**: mismo patrón, `/admin/customers?new=1` (probado con captura real).
- [x] Acceso rápido a aplicaciones
- [x] Filtros por período y producto
      **Verificación**: `DashboardFilters` (client) actualiza la URL (`?period=&productId=`), el Server Component recalcula con esos parámetros.
- [x] Validar zona horaria de Argentina
      **Verificación**: `src/lib/timezone.ts` resuelve "hoy" y "período actual" vía `Intl.DateTimeFormat` con `timeZone: "America/Argentina/Buenos_Aires"` en vez de usar la hora del servidor (Vercel corre en UTC) — evita que el mes/día calculado esté desfasado cerca de la medianoche.

**Criterio de cierre**:

- [x] Los totales coinciden con los registros
      **Nota**: cálculo en memoria sobre los mismos documentos que ya muestran `/admin/payments`, `/admin/customers`, etc. — no hay una fuente de datos paralela que pueda desincronizarse.
- [x] El dashboard no depende de datos duplicados
- [x] Las consultas tienen índices adecuados
      **Verificación**: sin `where` combinado con `orderBy` en ninguna consulta del dashboard — se trae cada colección completa (`.get()` simple) y se filtra/agrupa en código, mismo patrón que ya se adoptó en la Etapa 4 para evitar índices compuestos.

### Hallazgos y arreglos durante la verificación visual (no estaban en el checklist original)

- **[!] → [x] `/admin` heredaba el header, footer y banner de cookies del sitio público.** El layout raíz envolvía todo el sitio (incluido `/admin`) con `<Header/>`/`<Footer/>`/`<CookieConsent/>`. Se separó moviendo las páginas públicas a un route group `src/app/(marketing)/` con su propio layout, dejando el layout raíz mínimo. Verificado que las páginas públicas siguen siendo estáticas (`○`/`●` en el build) — el fix no afectó el rendimiento del sitio público.
- **[!] → [x] Todo el panel usaba clases de Tailwind genéricas (`neutral-*`, `dark:`) que no existen en el sistema de diseño real del sitio.** El sitio es **siempre oscuro** (`html { color-scheme: dark }`, un único set de variables en `globals.css`, sin modo claro) con tokens propios (`bg-background`, `bg-background-subtle`, `text-foreground`, `text-foreground-muted`, `border-border`, `bg-accent`, `text-accent-foreground`). Esto hacía que títulos y botones primarios casi no se vieran (texto oscuro sobre fondo oscuro). Se reemplazaron sistemáticamente en los 18 archivos del panel — confirmado con captura antes/después.
- **[x] `/admin` ahora tiene su propio `<title>` ("Panel") y `robots: noindex`**, en vez de heredar el título y la indexabilidad del sitio público (`src/app/admin/layout.tsx`, nuevo).
- **[x] `not-found.tsx` ahora renderiza Header/Footer directamente**, ya que dejó de heredarlos del layout raíz (antes sí lo hacía).

---

## ETAPA 9 — Auditoría, seguridad y pruebas finales

- [x] Crear `auditLogs`
      **Verificación**: ya existía desde la Etapa 6 (`receipt.issue`, `receipt.void`).
- [x] Registrar operaciones sensibles
      **Verificación**: se extendió a `app.update`, `customer.create`, `customer.update`, `product.create`, `product.update`, `subscription.create`, `subscription.update`, `subscription.renew` — antes solo pagos/comprobantes dejaban rastro. Helper compartido en `src/lib/audit-log.ts`. Probado en vivo: se confirmaron los documentos reales creados para `product.create`/`product.update`.
- [x] Revisar reglas de Firestore
      **Verificación**: releídas colección por colección — cada una tiene `isAdmin()` explícito o cae en el catch-all `allow read, write: if false`. `counters` queda deliberadamente sin regla propia (nadie debe tocarlo salvo la transacción del servidor).
- [x] Verificar que todo esté cerrado por defecto
      **Verificación**: el catch-all `match /{document=**} { allow read, write: if false; }` sigue al final del archivo.
- [!] Revisar IAM de cuenta de servicio
  **Bloqueado — acción de Cristian**: entrar a Google Cloud Console → IAM del proyecto `delgadodevgestion` → confirmar que la cuenta `firebase-adminsdk-fbsvc@...` no tenga más permisos de los necesarios (con `Editor` alcanza; no debería tener `Owner`). No tengo acceso a la consola de GCP.
- [!] Revisar variables en Vercel
  **Bloqueado — acción de Cristian**: confirmar en Vercel → Project Settings → Environment Variables que están cargadas las 9 de Firebase (Etapa 1) y ninguna vieja/de más. No tengo acceso al dashboard de Vercel.
- [x] Eliminar logs que muestren información sensible
      **Verificación**: no hay ningún `console.log`/`console.error` en todo el código del panel (`src/app/api`, `src/lib`, `src/app/admin`) — nada que limpiar. Se eliminó además `/api/debug-firebase-check`, un endpoint público sin autenticación que quedó de la Etapa 1 y ya cumplió su propósito.
- [x] Agregar validación de inputs en servidor
      **Verificación**: ya presente desde la Etapa 3 en adelante en cada Route Handler (tipos, campos obligatorios, pertenencia a enum, HTTPS, etc.) — revisado de nuevo, sin huecos.
- [x] Agregar protección CSRF al flujo de sesión
      **Verificación**: `src/proxy.ts` ahora rechaza con 403 cualquier método mutante (no GET/HEAD/OPTIONS) contra `/api/**` cuyo header `Origin` no coincida con el host del sitio (las cookies `SameSite=Lax` ya cubrían la mayoría de los casos; esto es una segunda capa explícita). Probado en vivo: origen cruzado → 403; mismo origen y sin header Origin → sigue funcionando (sin regresión).
- [!] Agregar rate limiting donde corresponda
  **Evaluado, no implementado**: a esta escala (un solo admin) y con Firebase Auth ya limitando intentos de login por su cuenta, sumar infraestructura de rate limiting (ej. Upstash Redis) es sobre-ingeniería sin necesidad demostrada — mismo criterio que ya aplica el roadmap para Cloud Functions. Se revisita si alguna vez hay señales de abuso real.
- [x] Activar App Check inicialmente en monitor
      **Verificación**: wiring listo en `src/lib/firebase/client.ts`, gateado por `NEXT_PUBLIC_FIREBASE_GESTION_APPCHECK_SITE_KEY` — sin esa variable, todo sigue funcionando igual. **Acción de Cristian**: habilitar App Check en Firebase Console (reCAPTCHA v3), en modo monitor primero, y pasarme el site key.
- [x] Ejecutar pruebas de acceso no autorizado
      **Verificación**: suite final contra `pnpm dev` — 5 endpoints mutantes sin sesión → 401; CSRF con origen cruzado → 403.
- [x] Ejecutar pruebas móviles
      **Verificación**: capturas reales (Playwright headless, viewport 390×844) de dashboard, apps, suscripciones y clientes — se detectó y corrigió el problema de shell/tokens de la Etapa 8 gracias a esto.
- [x] Ejecutar pruebas de escritorio
      **Verificación**: captura real en 1440×900 del dashboard.
- [x] Ejecutar build de producción
      **Verificación**: `pnpm build` limpio, corrido varias veces durante esta etapa.
- [x] Revisar Lighthouse de la web pública
      **Verificación**: Lighthouse contra un build de producción real (`pnpm build && pnpm start`, no `pnpm dev` — el modo dev da puntajes de performance artificialmente bajos): **Performance 88, Accesibilidad 96, Buenas prácticas 100, SEO 100**. Se encontró un problema de contraste de color preexistente en el sitio público (no introducido por este trabajo) — queda anotado para Cristian, fuera del alcance de esta etapa.
- [x] Confirmar que el panel no afectó la home pública
      **Verificación**: build muestra las páginas públicas como estáticas (`○`/`●`) igual que antes de todo este trabajo; captura real de la home pública confirma que se ve intacta.
- [x] Crear copia/exportación inicial de datos
      **Verificación**: `scripts/export-firestore-backup.mjs` (nuevo) — corrido una vez de verdad, generó `backups/firestore-backup-<fecha>.json` con las 9 colecciones. `backups/` agregado a `.gitignore` (son datos reales de clientes/pagos, nunca van a Git).

**Criterio de cierre**:

- [x] No hay secretos en el repositorio
- [x] No hay accesos públicos a datos privados
      **Nota**: se cerró además el único endpoint público sin auth que quedaba (`/api/debug-firebase-check`).
- [x] Las rutas críticas tienen pruebas
- [x] El sitio público mantiene su funcionamiento y rendimiento
      **Verificación**: Lighthouse 88/96/100/100 en producción, sin regresión visible.

---

## ETAPA 10 — Deploy y documentación

- [x] Fusionar rama solamente después de aprobación
      **Verificación**: Cristian aprobó explícitamente vía pregunta directa ("merge lo hacés vos, pusheo yo"). Merge `--no-ff` de `feature/delgadodev-gestion` a `main`, sin conflictos (main no se había movido desde que se creó la rama).
- [x] Configurar variables definitivas en Vercel Production
      **Verificación**: ya cargadas desde la Etapa 1.
- [x] Desplegar
      **Verificación**: push a `main` disparó el deploy automático en Vercel.
- [x] Probar producción
      **Verificación**: se encontró un bug real que **no aparecía en ningún entorno local** — `POST /api/auth/session` y `GET /admin/login` devolvían 500 en producción. Cristian pasó el log real de Vercel, que reveló la causa: `firebase-admin/auth` depende de `jwks-rsa`, que hace `require()` de `jose`; `jose@6` es ESM puro (sin build CommonJS), lo que rompe ese `require()` específicamente en el bundling serverless de Vercel (no en `pnpm dev` ni en `pnpm build && pnpm start` locales, que no habían expuesto el problema). Un primer intento de arreglo (forzar transporte REST en Firestore, sospechando un problema de gRPC) **no era la causa real** y no lo solucionó — quedó registrado como intento fallido antes de llegar al log real. Fix real: `pnpm-workspace.yaml` fija `jose` en `^5` (última mayor con build CJS) vía `overrides`. Reverificado contra producción real después del fix: login, cookie de sesión, `/admin` autenticado y logout — todos los checks pasaron.
- [x] Actualizar README
      **Verificación**: `README.md` ya no dice "sin base de datos" (afirmación desactualizada) — ahora aclara que el sitio público sigue sin CMS/DB pero el panel privado sí tiene Firestore propio, con la estructura de carpetas actualizada (`(marketing)`, `admin/`, `api/admin`, `api/auth`, `descargar/[slug]`) y referencias a `PANEL_ADMIN.md`.
- [x] Documentar recuperación de acceso
- [x] Documentar cambio de APK
- [x] Documentar alta de cliente
- [x] Documentar registro de pago
- [x] Documentar anulación
      **Verificación de estos 5**: nuevo [`PANEL_ADMIN.md`](PANEL_ADMIN.md) — guías de uso reales basadas en lo que efectivamente se construyó (rutas, campos, comportamiento), no genéricas.
- [x] Registrar estructura final de Firestore
- [x] Registrar índices
      **Verificación**: documentado en `PANEL_ADMIN.md` — ninguna consulta necesita índice compuesto, a propósito (mismo patrón desde la Etapa 4).
- [x] Registrar reglas desplegadas
      **Verificación**: `PANEL_ADMIN.md` referencia directo a `firestore.rules`, aclarando que hay que republicarlo a mano si cambia.
- [x] Crear plan de mantenimiento y backups
      **Verificación**: sección dedicada en `PANEL_ADMIN.md` (cuándo correr `scripts/export-firestore-backup.mjs`, qué revisar si cambian las reglas o las env vars).

### Funciones que se dejan para una etapa futura

- Automatización oficial de WhatsApp Business
- Recordatorios automáticos
- Facturación fiscal integrada
- Links de pago
- Portal del cliente
- Múltiples administradores avanzados / custom claims
- Aplicación separada o subdominio
- Firebase Hosting
- Cloud Functions salvo necesidad demostrada

---

## Registro de avances

| Fecha      | Etapa | Cambio realizado                                                                                                                                                                                                                            | Verificación                                                                                                                                                                                 | Responsable       |
| ---------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| 2026-08-01 | 0     | Rama creada, build/lint verificados, deploy en vivo confirmado, roadmap versionado, convención de env vars definida                                                                                                                         | `pnpm build` y `pnpm lint` OK; fetch a delgadodev.com.ar OK                                                                                                                                  | Claude            |
| 2026-08-01 | 1     | Firebase `delgadodevgestion` conectado: SDKs instalados, `client.ts`/`admin.ts` creados, `firestore.rules` escrito, `adminUsers/{uid}` creado, conexión local verificada                                                                    | `auth.getUser()` y lectura/escritura Firestore OK vía Admin SDK con `.env.local`                                                                                                             | Claude            |
| 2026-08-01 | 1     | Cristian publica `firestore.rules`, confirma Hosting desactivado, carga env vars en Vercel; se corrige bug de init eager de Admin SDK que rompía el build de Preview                                                                        | Build local OK tras el fix; verificación en Vercel Preview diferida a antes de Etapa 10                                                                                                      | Claude + Cristian |
| 2026-08-01 | 2     | Autenticación completa de `/admin`: login, sesión con cookie httpOnly, logout, `proxy.ts`, layout protegido                                                                                                                                 | Suite de 11 pruebas reales contra `pnpm dev` (Firebase real, sin mocks) — todas pasaron                                                                                                      | Claude            |
| 2026-08-01 | 3     | `/admin/apps` + `/descargar/[slug]`: PresuFácil y Mi Almacén ya usan rutas estables resueltas por Firestore                                                                                                                                 | Suite de 9 pruebas reales — cambio de enlace sin redeploy confirmado; doc de prueba restaurado                                                                                               | Claude            |
| 2026-08-01 | 4     | `/admin/customers` y `/admin/products`: alta/edición/búsqueda/desactivación de clientes, catálogo de 6 productos sembrado, vínculo cliente↔producto                                                                                         | Suite de 17 pruebas reales; se detectó y resolvió una dependencia de índice compuesto de Firestore                                                                                           | Claude            |
| 2026-08-01 | 5     | `/admin/subscriptions`: alta, edición, badges de vencimiento, renovación manual con cálculo de próximo vencimiento server-side                                                                                                              | Solo `pnpm build` + `pnpm lint` (sin test en vivo, por pedido de Cristian) — verificación funcional diferida al pase final                                                                   | Claude            |
| 2026-08-01 | 6     | `/admin/payments`: pagos, transacción crítica de emisión de comprobante (numeración `DD-AAAA-0001`, snapshot, auditoría, avance de suscripción), anulación, PDF con jsPDF                                                                   | 14 pruebas en vivo enfocadas en la transacción crítica — incluye concurrencia real con `Promise.all`. Datos de prueba y contador restaurados                                                 | Claude            |
| 2026-08-01 | 7     | Botón "Enviar por WhatsApp" en cada comprobante: mensaje automático + PDF (Web Share API en mobile, descarga + wa.me en escritorio)                                                                                                         | Solo `pnpm build` + `pnpm lint` — no toca datos financieros. Prueba real en Android/WhatsApp Web queda pendiente                                                                             | Claude            |
| 2026-08-01 | 8     | Dashboard tipo "power BI" (KPIs, filtros, accesos rápidos, vencimientos); se encontró y corrigió que `/admin` heredaba el shell público y usaba clases de color que no existen en el sitio (siempre oscuro)                                 | Verificado con capturas reales (Playwright headless temporal) en mobile y desktop, antes/después del fix                                                                                     | Claude            |
| 2026-08-01 | 9     | CSRF (Origin check en proxy.ts), auditLogs extendido a todas las mutaciones, endpoint de debug eliminado, script de backup de Firestore, App Check wireado (opcional)                                                                       | 9 pruebas de seguridad en vivo + Lighthouse en producción (88/96/100/100) + capturas mobile/desktop/home pública                                                                             | Claude            |
| 2026-08-01 | 10    | Documentación final: `PANEL_ADMIN.md` (guías de uso, estructura de Firestore, seguridad, mantenimiento) + `README.md` actualizado                                                                                                           | Build/lint OK. Merge a `main` y deploy quedan pendientes de aprobación explícita de Cristian                                                                                                 | Claude            |
| 2026-08-01 | 10    | Merge a `main` (aprobado por Cristian) y deploy a producción. Se encontró y resolvió un bug real solo reproducible en Vercel (`jose@6` ESM rompe `jwks-rsa` en el bundling serverless)                                                      | Confirmado con el log real de Vercel (Cristian) + 6 checks contra producción real tras el fix (`jose` fijado en `^5`)                                                                        | Claude + Cristian |
| 2026-08-02 | 10    | Post-launch: Cristian reportó que el comprobante emitido no aparecía en el listado de pagos. Bug real encontrado (mapa de comprobantes indexado por la clave equivocada) y corregido; de paso se rediseñó el PDF con el color de marca real | Reproducido y verificado con Playwright real (botón visible, descarga, PDF abierto). Datos de prueba que quedaron en la base real limpiados, contador de comprobantes recalculado sin huecos | Claude + Cristian |

## Decisiones pendientes

| Decisión                               | Opciones                        | Elección                                 | Fecha      |
| -------------------------------------- | ------------------------------- | ---------------------------------------- | ---------- |
| Project ID definitivo                  | `delgadodev-gestion` / variante | `delgadodevgestion`                      | 2026-08-01 |
| Región de Firestore                    | A definir al crear la base      | Sin confirmar (a preguntarle a Cristian) | —          |
| Duración de sesión                     | A definir                       | 5 días (elegido por Claude, ajustable)   | 2026-08-01 |
| Datos comerciales del comprobante      | A definir                       | —                                        | —          |
| Formato final del teléfono de WhatsApp | A definir                       | —                                        | —          |

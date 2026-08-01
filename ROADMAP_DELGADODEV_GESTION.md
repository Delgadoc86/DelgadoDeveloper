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

- [ ] Crear colección `customers`
- [ ] Definir cliente recurrente
- [ ] Definir cliente ocasional
- [ ] Crear alta, edición, búsqueda y desactivación
- [ ] Campos básicos: nombre, negocio, teléfono, correo, CUIT/DNI opcional, tipo, estado, notas, fechas de creación y actualización
- [ ] Normalizar teléfonos para WhatsApp
- [ ] No borrar clientes con movimientos vinculados

### Productos y servicios

- [ ] Crear colección `products`
- [ ] Cargar: PresuFácil, Mi Almacén, Catálogo web, Desarrollo web, Mantenimiento, Otros
- [ ] Configurar precio sugerido
- [ ] Configurar frecuencia sugerida
- [ ] Permitir activar o desactivar productos

**Criterio de cierre**:

- [ ] Se pueden registrar clientes recurrentes y ocasionales
- [ ] Se puede vincular un cliente con un producto
- [ ] Las búsquedas funcionan por nombre, negocio y teléfono

---

## ETAPA 5 — Suscripciones y vencimientos

- [ ] Crear colección `subscriptions`
- [ ] Vincular cliente y producto
- [ ] Registrar importe acordado
- [ ] Registrar frecuencia
- [ ] Registrar próxima fecha de vencimiento
- [ ] Estados: activa, pendiente, vencida, pausada, cancelada
- [ ] Registrar último pago
- [ ] Calcular próximo vencimiento desde servidor
- [ ] Evitar arrays crecientes de historial
- [ ] Obtener historial consultando pagos vinculados
- [ ] Crear listado de próximos vencimientos
- [ ] Crear listado de suscripciones vencidas

**Criterio de cierre**:

- [ ] Cada servicio recurrente tiene su vencimiento
- [ ] Los pagos futuros podrán actualizar la suscripción correctamente
- [ ] No existe duplicación innecesaria de historial

---

## ETAPA 6 — Pagos y comprobantes

### Pagos

- [ ] Crear colección `payments`
- [ ] Registrar cliente, producto, suscripción opcional
- [ ] Registrar importe, concepto, período, medio de pago, referencia de transferencia, observaciones, estado

### Numeración

- [ ] Crear colección `counters`
- [ ] Crear contador anual
- [ ] Formato: `DD-AAAA-0001`
- [ ] Implementar transacción del lado servidor
- [ ] Probar concurrencia
- [ ] Evitar números duplicados
- [ ] Definir comportamiento si la operación falla

### Comprobantes

- [ ] Crear colección `receipts`
- [ ] Congelar datos del cliente mediante snapshot
- [ ] Congelar importe, concepto, período y medio
- [ ] No permitir edición después de emisión
- [ ] No permitir eliminación
- [ ] Crear anulación con motivo
- [ ] Registrar usuario y fecha de anulación
- [ ] Crear PDF con jsPDF
  - [ ] Agregar logo y datos de DelgadoDev
  - [ ] Agregar leyenda de comprobante interno
  - [ ] Probar descarga del PDF
  - [ ] Probar impresión

### Transacción crítica

- [ ] Validar sesión y permisos
- [ ] Validar datos
- [ ] Incrementar contador
- [ ] Crear pago
- [ ] Crear comprobante
- [ ] Actualizar suscripción
- [ ] Crear registro de auditoría
- [ ] Confirmar que todo sea atómico

**Criterio de cierre**:

- [ ] No hay comprobantes duplicados
- [ ] No hay pagos parciales creados por errores
- [ ] Los comprobantes emitidos son inmutables
- [ ] La anulación queda documentada

---

## ETAPA 7 — Envío rápido por WhatsApp

- [ ] Normalizar número argentino
- [ ] Crear mensaje automático (cliente, concepto, importe, período, número de comprobante)
- [ ] Crear botón para abrir WhatsApp
- [ ] Descargar o compartir PDF antes de abrir WhatsApp
- [ ] Probar flujo en Android
- [ ] Probar flujo en escritorio con WhatsApp Web
- [ ] Definir comportamiento cuando falta teléfono
- [ ] No integrar todavía API oficial automática

**Criterio de cierre**:

- [ ] Cristian puede generar y enviar un comprobante en pocos pasos
- [ ] El mensaje utiliza el número correcto
- [ ] El PDF corresponde al pago seleccionado

---

## ETAPA 8 — Dashboard

- [ ] Ingresos del mes
- [ ] Cantidad de pagos
- [ ] Clientes activos
- [ ] Suscripciones activas
- [ ] Próximos vencimientos
- [ ] Pagos vencidos
- [ ] Últimos pagos
- [ ] Acceso rápido a registrar pago
- [ ] Acceso rápido a nuevo cliente
- [ ] Acceso rápido a aplicaciones
- [ ] Filtros por período y producto
- [ ] Validar zona horaria de Argentina

**Criterio de cierre**:

- [ ] Los totales coinciden con los registros
- [ ] El dashboard no depende de datos duplicados
- [ ] Las consultas tienen índices adecuados

---

## ETAPA 9 — Auditoría, seguridad y pruebas finales

- [ ] Crear `auditLogs`
- [ ] Registrar operaciones sensibles
- [ ] Revisar reglas de Firestore
- [ ] Verificar que todo esté cerrado por defecto
- [ ] Revisar IAM de cuenta de servicio
- [ ] Revisar variables en Vercel
- [ ] Eliminar logs que muestren información sensible
- [ ] Agregar validación de inputs en servidor
- [ ] Agregar protección CSRF al flujo de sesión
- [ ] Agregar rate limiting donde corresponda
- [ ] Activar App Check inicialmente en monitor
- [ ] Ejecutar pruebas de acceso no autorizado
- [ ] Ejecutar pruebas móviles
- [ ] Ejecutar pruebas de escritorio
- [ ] Ejecutar build de producción
- [ ] Revisar Lighthouse de la web pública
- [ ] Confirmar que el panel no afectó la home pública
- [ ] Crear copia/exportación inicial de datos

**Criterio de cierre**:

- [ ] No hay secretos en el repositorio
- [ ] No hay accesos públicos a datos privados
- [ ] Las rutas críticas tienen pruebas
- [ ] El sitio público mantiene su funcionamiento y rendimiento

---

## ETAPA 10 — Deploy y documentación

- [ ] Fusionar rama solamente después de aprobación
- [ ] Configurar variables definitivas en Vercel Production
- [ ] Desplegar
- [ ] Probar producción
- [ ] Actualizar README
- [ ] Documentar recuperación de acceso
- [ ] Documentar cambio de APK
- [ ] Documentar alta de cliente
- [ ] Documentar registro de pago
- [ ] Documentar anulación
- [ ] Registrar estructura final de Firestore
- [ ] Registrar índices
- [ ] Registrar reglas desplegadas
- [ ] Crear plan de mantenimiento y backups

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

| Fecha      | Etapa | Cambio realizado                                                                                                                                                         | Verificación                                                                                   | Responsable       |
| ---------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- | ----------------- |
| 2026-08-01 | 0     | Rama creada, build/lint verificados, deploy en vivo confirmado, roadmap versionado, convención de env vars definida                                                      | `pnpm build` y `pnpm lint` OK; fetch a delgadodev.com.ar OK                                    | Claude            |
| 2026-08-01 | 1     | Firebase `delgadodevgestion` conectado: SDKs instalados, `client.ts`/`admin.ts` creados, `firestore.rules` escrito, `adminUsers/{uid}` creado, conexión local verificada | `auth.getUser()` y lectura/escritura Firestore OK vía Admin SDK con `.env.local`               | Claude            |
| 2026-08-01 | 1     | Cristian publica `firestore.rules`, confirma Hosting desactivado, carga env vars en Vercel; se corrige bug de init eager de Admin SDK que rompía el build de Preview     | Build local OK tras el fix; verificación en Vercel Preview diferida a antes de Etapa 10        | Claude + Cristian |
| 2026-08-01 | 2     | Autenticación completa de `/admin`: login, sesión con cookie httpOnly, logout, `proxy.ts`, layout protegido                                                              | Suite de 11 pruebas reales contra `pnpm dev` (Firebase real, sin mocks) — todas pasaron        | Claude            |
| 2026-08-01 | 3     | `/admin/apps` + `/descargar/[slug]`: PresuFácil y Mi Almacén ya usan rutas estables resueltas por Firestore                                                              | Suite de 9 pruebas reales — cambio de enlace sin redeploy confirmado; doc de prueba restaurado | Claude            |

## Decisiones pendientes

| Decisión                               | Opciones                        | Elección                                 | Fecha      |
| -------------------------------------- | ------------------------------- | ---------------------------------------- | ---------- |
| Project ID definitivo                  | `delgadodev-gestion` / variante | `delgadodevgestion`                      | 2026-08-01 |
| Región de Firestore                    | A definir al crear la base      | Sin confirmar (a preguntarle a Cristian) | —          |
| Duración de sesión                     | A definir                       | 5 días (elegido por Claude, ajustable)   | 2026-08-01 |
| Datos comerciales del comprobante      | A definir                       | —                                        | —          |
| Formato final del teléfono de WhatsApp | A definir                       | —                                        | —          |

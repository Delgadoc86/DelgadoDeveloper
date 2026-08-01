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

- [ ] Entrar a Firebase Console con su cuenta habitual de Google
- [ ] Crear un proyecto nuevo
  - [ ] Nombre visible: DelgadoDev Gestión
  - [ ] Elegir el Project ID definitivo
- [ ] Registrar una aplicación web con nombre DelgadoDev Web
- [ ] No activar Firebase Hosting
- [ ] Crear Cloud Firestore en modo producción
  - [ ] Elegir una región adecuada y registrar cuál se eligió
- [ ] Activar Firebase Authentication
  - [ ] Habilitar acceso por correo y contraseña
  - [ ] Crear manualmente el usuario administrador de Cristian
- [ ] Entregar a Claude únicamente la configuración web necesaria
- [ ] No compartir públicamente claves privadas ni JSON de cuenta de servicio

### Acciones de Claude

- [ ] Instalar `firebase`
- [ ] Instalar `firebase-admin`
- [ ] Crear `src/lib/firebase/client.ts`
- [ ] Crear `src/lib/firebase/admin.ts`
- [ ] Definir variables públicas con prefijo `NEXT_PUBLIC_FIREBASE_GESTION_`
- [ ] Definir variables privadas para Firebase Admin
- [ ] Verificar que los módulos de servidor no puedan importarse desde componentes cliente
- [ ] Crear configuración inicial de Firestore Rules cerrada por defecto
- [ ] Crear colección `adminUsers`
- [ ] Crear documento `adminUsers/{uid}` para Cristian
- [ ] Confirmar conexión desde entorno local
- [ ] Confirmar conexión desde Vercel Preview

**Criterio de cierre**:

- [ ] Firebase está separado de PresuFácil, Mi Almacén y catálogos
- [ ] La web actual continúa en Vercel
- [ ] Firestore rechaza accesos públicos
- [ ] El administrador existe en Authentication y `adminUsers`
- [ ] Ninguna credencial privada está en Git

---

## ETAPA 2 — Autenticación privada de /admin

- [ ] Crear `/admin/login`
- [ ] Crear formulario de correo y contraseña
- [ ] Obtener Firebase ID Token después del login
- [ ] Crear `POST /api/auth/session`
  - [ ] Generar cookie de sesión segura y httpOnly
  - [ ] Configurar `secure` en producción
  - [ ] Configurar `sameSite`
  - [ ] Definir duración de la sesión
- [ ] Crear `POST /api/auth/logout`
  - [ ] Revocar o eliminar cookie al cerrar sesión
- [ ] Crear helper de servidor para validar sesión
  - [ ] Verificar existencia del UID en `adminUsers`
- [ ] Crear `src/proxy.ts` para redirecciones tempranas
- [ ] Proteger también el layout de `/admin`
- [ ] Proteger cada Route Handler privado
- [ ] Evitar formulario de registro público
- [ ] Mostrar errores de acceso sin revelar información sensible

### Pruebas obligatorias

- [ ] Usuario sin sesión no accede a `/admin`
- [ ] Cookie inventada no funciona
- [ ] Usuario de Authentication sin documento en `adminUsers` no accede
- [ ] Cierre de sesión invalida el acceso
- [ ] Recargar una página privada mantiene una sesión válida
- [ ] Las APIs privadas devuelven 401 o 403 correctamente

**Criterio de cierre**:

- [ ] La autenticación está probada localmente
- [ ] La autenticación está probada en Vercel Preview
- [ ] No se depende solamente de `proxy.ts`

---

## ETAPA 3 — Administración de enlaces APK

### Modelo `apps/{slug}`

- [ ] Definir campos: `name`, `slug`, `version`, `downloadUrl`, `status`, `platform`, `updatedAt`, `updatedBy`
- [ ] Estados permitidos: `draft`, `published`, `paused`
- [ ] Crear documentos iniciales: `apps/presufacil`, `apps/mi-almacen`

### Panel

- [ ] Crear `/admin/apps`
- [ ] Listar aplicaciones
- [ ] Crear formulario de edición
  - [ ] Validar que el enlace sea HTTPS
  - [ ] Editar nombre
  - [ ] Editar versión
  - [ ] Editar enlace de descarga
  - [ ] Cambiar estado
  - [ ] Probar enlace en una pestaña nueva
- [ ] Guardar mediante Route Handler privado
  - [ ] Registrar `updatedAt`
  - [ ] Registrar `updatedBy`
- [ ] Mostrar confirmación y errores

### Descarga pública

- [ ] Crear `/descargar/[slug]`
- [ ] Consultar Firestore desde el servidor con Firebase Admin
- [ ] Rechazar aplicaciones inexistentes
- [ ] Rechazar aplicaciones pausadas o no publicadas
- [ ] Redirigir temporalmente al enlace actual
- [ ] Evitar cache permanente
- [ ] Mantener Analytics en los botones actuales
- [ ] Cambiar PresuFácil para usar `/descargar/presufacil`
- [ ] Cambiar Mi Almacén para usar `/descargar/mi-almacen`
- [ ] Confirmar que cambiar Firestore no requiere redeploy

### Pruebas obligatorias

- [ ] Un enlace publicado descarga correctamente
- [ ] Cambiar el enlace en `/admin/apps` cambia el destino público
- [ ] Una aplicación pausada no descarga
- [ ] Un slug inexistente muestra error controlado
- [ ] No se expone el listado privado de aplicaciones
- [ ] El funcionamiento móvil y de escritorio es correcto

**Criterio de cierre**:

- [ ] Cristian puede cambiar APK sin editar código
- [ ] PresuFácil y Mi Almacén usan rutas estables
- [ ] La primera función real del panel está operativa

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

| Fecha      | Etapa | Cambio realizado                                                                                                    | Verificación                                                | Responsable |
| ---------- | ----- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------- |
| 2026-08-01 | 0     | Rama creada, build/lint verificados, deploy en vivo confirmado, roadmap versionado, convención de env vars definida | `pnpm build` y `pnpm lint` OK; fetch a delgadodev.com.ar OK | Claude      |

## Decisiones pendientes

| Decisión                               | Opciones                        | Elección | Fecha |
| -------------------------------------- | ------------------------------- | -------- | ----- |
| Project ID definitivo                  | `delgadodev-gestion` / variante | —        | —     |
| Región de Firestore                    | A definir al crear la base      | —        | —     |
| Duración de sesión                     | A definir                       | —        | —     |
| Datos comerciales del comprobante      | A definir                       | —        | —     |
| Formato final del teléfono de WhatsApp | A definir                       | —        | —     |

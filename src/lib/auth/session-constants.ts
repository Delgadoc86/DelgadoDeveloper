export const SESSION_COOKIE_NAME = "admin_session";

// Firebase permite hasta 14 dias para session cookies. 5 dias es un balance
// razonable para un panel de un solo admin: no obliga a loguearse a diario,
// pero no deja una sesion abierta indefinidamente en un dispositivo perdido.
export const SESSION_MAX_AGE_MS = 5 * 24 * 60 * 60 * 1000;

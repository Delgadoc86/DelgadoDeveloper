// Normaliza un numero argentino al formato que espera wa.me (549 + numero,
// sin 0 ni 15). Es best-effort: Argentina no tiene una longitud fija de
// codigo de area, asi que el "15" viejo de celular se remueve con una
// heuristica (2 a 4 digitos iniciales), no con una lista real de prefijos.
// Por eso el formulario de clientes siempre guarda tambien el telefono tal
// cual se escribio (`phoneRaw`), para poder corregirlo a mano si hace falta.
export function normalizePhoneForWhatsapp(rawPhone: string): string {
  let digits = rawPhone.replace(/\D/g, "");

  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("54")) digits = digits.slice(2);
  if (digits.startsWith("9") && digits.length > 10) digits = digits.slice(1);
  if (digits.startsWith("0")) digits = digits.slice(1);

  digits = digits.replace(/^(\d{2,4})15(\d+)$/, "$1$2");

  return `549${digits}`;
}

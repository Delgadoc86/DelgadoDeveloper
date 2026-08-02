const ARGENTINA_TZ = "America/Argentina/Buenos_Aires";

// Argentina no tiene horario de verano, pero igual conviene resolverlo via
// Intl (no restando 3hs a mano) para que sea correcto sin importar en que
// timezone corra el server (Vercel corre en UTC).
export function getArgentinaTodayISO(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: ARGENTINA_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function getArgentinaCurrentPeriod(date: Date = new Date()): string {
  return getArgentinaTodayISO(date).slice(0, 7);
}

function parseIsoParts(iso: string): [number, number, number] {
  const parts = iso.split("-").map(Number);
  return [parts[0] ?? 0, parts[1] ?? 1, parts[2] ?? 1];
}

export function addDaysISO(iso: string, days: number): string {
  const [year, month, day] = parseIsoParts(iso);
  const d = new Date(Date.UTC(year, month - 1, day));
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function shiftPeriod(period: string, monthsDelta: number): string {
  const [year, month] = parseIsoParts(period);
  const d = new Date(Date.UTC(year, month - 1 + monthsDelta, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

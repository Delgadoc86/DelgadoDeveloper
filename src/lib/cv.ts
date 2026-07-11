import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Server-only: lee el sistema de archivos, así que este módulo no debe
 * importarse desde componentes cliente. Los botones de CV se activan solos
 * en cuanto este archivo exista en /public — sin tocar código.
 */
const CV_FILENAME = "Cristian-Delgado-CV.pdf";

export const cvUrl = `/${CV_FILENAME}`;
export const cvAvailable = existsSync(join(process.cwd(), "public", CV_FILENAME));

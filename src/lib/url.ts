/** "https://www.presupdf.com.ar/x" -> "presupdf.com.ar" */
export function displayDomain(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

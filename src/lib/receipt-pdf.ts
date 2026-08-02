import type { ReceiptRecord } from "@/types/receipt";

const ACCENT: [number, number, number] = [124, 111, 240]; // --accent de globals.css
const MUTED: [number, number, number] = [110, 110, 110];
const INK: [number, number, number] = [20, 20, 20];

async function loadLogoAsDataUrl(): Promise<string | null> {
  try {
    const response = await fetch("/assets/icons/logo-mark.png");
    const blob = await response.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function row(doc: import("jspdf").jsPDF, label: string, value: string, y: number) {
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...INK);
  doc.text(label, 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(value, 65, y);
}

// jsPDF se importa dinámicamente adentro para no sumarlo al bundle principal
// del panel — solo se carga cuando alguien realmente genera un comprobante.
export async function buildReceiptPdf(receipt: ReceiptRecord) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Barra superior de marca
  doc.setFillColor(...ACCENT);
  doc.rect(0, 0, pageWidth, 6, "F");

  const logo = await loadLogoAsDataUrl();
  if (logo) {
    doc.addImage(logo, "PNG", 20, 16, 16, 16);
  }

  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("DelgadoDev", 42, 24);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  doc.text("Comprobante interno de pago", 42, 30);

  doc.setDrawColor(...ACCENT);
  doc.setLineWidth(0.5);
  doc.line(20, 40, pageWidth - 20, 40);

  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(`Comprobante N.º ${receipt.number}`, 20, 52);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  doc.text(
    `Emitido el ${new Date(receipt.issuedAt).toLocaleDateString("es-AR")}`,
    20,
    58,
  );

  doc.setFontSize(11);
  let y = 74;
  row(doc, "Cliente:", receipt.customerSnapshot.name, y);
  y += 7;
  if (receipt.customerSnapshot.businessName) {
    row(doc, "Negocio:", receipt.customerSnapshot.businessName, y);
    y += 7;
  }
  if (receipt.customerSnapshot.taxId) {
    row(doc, "CUIT/DNI:", receipt.customerSnapshot.taxId, y);
    y += 7;
  }

  y += 6;
  row(doc, "Concepto:", receipt.concept, y);
  y += 7;
  row(doc, "Período:", receipt.period, y);
  y += 7;
  row(doc, "Medio de pago:", receipt.method, y);
  y += 14;

  // Importe destacado
  doc.setFillColor(246, 245, 253); // tinte muy claro del accent, para fondo blanco
  doc.roundedRect(20, y - 8, pageWidth - 40, 16, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...ACCENT);
  doc.text(`Importe: $${receipt.amount.toLocaleString("es-AR")}`, 27, y + 2);

  // Pie de página fijo
  const footerY = 275;
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.2);
  doc.line(20, footerY - 8, pageWidth - 20, footerY - 8);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(
    "Este comprobante es un registro interno de DelgadoDev y no reemplaza una factura fiscal.",
    20,
    footerY - 2,
    { maxWidth: pageWidth - 40 },
  );
  doc.text("www.delgadodev.com.ar", 20, footerY + 4);

  if (receipt.voided) {
    doc.setTextColor(208, 59, 59);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text("ANULADO", pageWidth / 2, 150, { angle: 25, align: "center" });
  }

  return doc;
}

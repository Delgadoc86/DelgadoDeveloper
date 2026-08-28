import type { ReceiptRecord } from "@/types/receipt";
import type { SubscriptionFrequency } from "@/types/subscription";

const ACCENT: [number, number, number] = [124, 111, 240]; // --accent de globals.css
const MUTED: [number, number, number] = [110, 110, 110];
const INK: [number, number, number] = [20, 20, 20];

const FREQUENCY_LABEL: Record<SubscriptionFrequency, string> = {
  mensual: "Mensual (30 días corridos)",
  semestral: "Semestral (180 días corridos)",
  anual: "Anual (365 días corridos)",
  unico: "Pago único",
};

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

// Formatea una fecha "YYYY-MM-DD" sin pasar por conversión UTC->local (que
// puede correr el día un dia para atrás para husos horarios negativos como
// Argentina). Las fechas de suscripción se guardan como string de solo
// fecha, no como datetime.
function formatDateOnly(iso: string): string {
  const parts = iso.split("-").map(Number);
  const [year = 1970, month = 1, day = 1] = parts;
  return new Date(year, month - 1, day).toLocaleDateString("es-AR");
}

function row(doc: import("jspdf").jsPDF, label: string, value: string, y: number) {
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...INK);
  doc.text(label, 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(value, 65, y);
}

function sectionLabel(doc: import("jspdf").jsPDF, text: string, y: number) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(...ACCENT);
  doc.text(text.toUpperCase(), 20, y);
  doc.setFontSize(11);
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
  doc.text("Comprobante de pago", 42, 30);

  doc.setDrawColor(...ACCENT);
  doc.setLineWidth(0.5);
  doc.line(20, 40, pageWidth - 20, 40);

  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(`Comprobante / Orden N.º ${receipt.number}`, 20, 52);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  doc.text(
    `Emitido el ${new Date(receipt.issuedAt).toLocaleDateString("es-AR")}`,
    20,
    58,
  );

  doc.setFontSize(11);
  let y = 72;

  sectionLabel(doc, "Cliente", y);
  y += 8;
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

  // Bloque de suscripción: solo si este pago está atado a una (no todos los
  // pagos lo están — un pago suelto no tiene fecha de alta ni vencimiento).
  if (receipt.subscriptionSnapshot) {
    const sub = receipt.subscriptionSnapshot;
    y += 5;
    doc.setFillColor(246, 245, 253); // tinte muy claro del accent, para fondo blanco
    const boxTop = y - 6;
    const boxHeight = sub.frequency === "unico" ? 28 : 35;
    doc.roundedRect(20, boxTop, pageWidth - 40, boxHeight, 2, 2, "F");

    sectionLabel(doc, "Detalle de la suscripción", y);
    y += 8;
    row(doc, "Producto/Plan:", receipt.productSnapshot?.name ?? "—", y);
    y += 7;
    row(doc, "Frecuencia:", FREQUENCY_LABEL[sub.frequency], y);
    y += 7;
    row(doc, "Fecha de alta:", formatDateOnly(sub.startDate), y);
    y += 7;
    if (sub.frequency === "unico") {
      row(doc, "Vencimiento:", "No aplica (pago único)", y);
    } else {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...ACCENT);
      doc.text("Próximo vencimiento:", 20, y);
      doc.text(formatDateOnly(sub.periodEnd), 65, y);
      doc.setTextColor(...INK);
    }
    y += 12;
  } else if (receipt.productSnapshot) {
    y += 2;
    row(doc, "Producto/Servicio:", receipt.productSnapshot.name, y);
    y += 10;
  } else {
    y += 3;
  }

  sectionLabel(doc, "Pago", y);
  y += 8;
  row(doc, "Concepto:", receipt.concept, y);
  y += 7;
  row(doc, "Período:", receipt.period, y);
  y += 7;
  row(doc, "Medio de pago:", receipt.method, y);
  y += 14;

  // Importe destacado
  doc.setFillColor(246, 245, 253);
  doc.roundedRect(20, y - 8, pageWidth - 40, 16, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...ACCENT);
  doc.text(`Total abonado: $${receipt.amount.toLocaleString("es-AR")}`, 27, y + 2);

  // Pie de página fijo
  const footerY = 275;
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.2);
  doc.line(20, footerY - 14, pageWidth - 20, footerY - 14);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...INK);
  doc.text("Gracias por confiar en DelgadoDev.", 20, footerY - 8);
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(
    "Este comprobante es un registro de pago de DelgadoDev y no reemplaza una factura fiscal.",
    20,
    footerY - 2,
    { maxWidth: pageWidth - 40 },
  );
  doc.text("www.delgadodev.com.ar · delgadocdev@hotmail.com", 20, footerY + 4);

  if (receipt.voided) {
    doc.setTextColor(208, 59, 59);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text("ANULADO", pageWidth / 2, 150, { angle: 25, align: "center" });
  }

  return doc;
}

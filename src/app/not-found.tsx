import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: {
    index: false,
    follow: false,
  },
};

// El not-found.tsx de la raíz de app/ es el fallback global de Next.js para
// cualquier URL que no matchee ninguna ruta, así que solo lo envuelve el
// layout raíz (sin Header/Footer, que ahora viven en (marketing)/layout.tsx).
// Por eso los renderiza acá directamente en vez de depender de un layout.
export default function NotFound() {
  return (
    <>
      <Header />
      <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-accent font-mono text-sm">404</p>
        <h1 className="text-foreground mt-4 text-3xl font-semibold">
          Página no encontrada
        </h1>
        <p className="text-foreground-muted mt-3 max-w-sm">
          La página que buscás no existe o fue movida.
        </p>
        <Button href="/" className="mt-8">
          Volver al inicio
        </Button>
      </Container>
      <Footer />
    </>
  );
}

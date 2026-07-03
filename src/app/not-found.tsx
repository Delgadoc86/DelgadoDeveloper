import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
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
  );
}

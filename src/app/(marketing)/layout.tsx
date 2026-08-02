import { MotionConfig } from "motion/react";
import { CookieConsent } from "@/components/analytics/cookie-consent";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { buildPersonJsonLd, buildWebsiteJsonLd } from "@/lib/seo";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([buildPersonJsonLd(), buildWebsiteJsonLd()]),
        }}
      />
      <a
        href="#main-content"
        className="focus:bg-accent focus:text-accent-foreground sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
      >
        Saltar al contenido
      </a>
      <MotionConfig reducedMotion="user">
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </MotionConfig>
      <CookieConsent />
    </>
  );
}

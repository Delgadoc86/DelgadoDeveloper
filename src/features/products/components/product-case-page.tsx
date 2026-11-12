import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { ContactCta } from "@/features/contact-cta/contact-cta";
import { OfficialSiteButton } from "@/features/projects/components/official-site-button";
import { DeviceShowcase } from "@/features/products/components/device-showcase";
import { products } from "@/features/products/data/products";
import type { DeviceShot, ProductShowcase } from "@/features/products/types";
import { siteConfig } from "@/config/site.config";
import { buildContactWhatsappUrl } from "@/lib/contact";
import { buildBreadcrumbJsonLd, buildSoftwareApplicationJsonLd } from "@/lib/seo";
import { displayDomain } from "@/lib/url";

interface ProductCasePageProps {
  product: ProductShowcase;
}

export function ProductCasePage({ product }: ProductCasePageProps) {
  const domain = displayDomain(product.url);
  const otherProduct = products.find((item) => item.slug !== product.slug);
  const pageUrl = `${siteConfig.url}/trabajos/${product.slug}`;

  const jsonLd = [
    buildBreadcrumbJsonLd([
      { name: "Inicio", url: siteConfig.url },
      { name: "Mis productos", url: `${siteConfig.url}/#productos` },
      { name: product.name, url: pageUrl },
    ]),
    buildSoftwareApplicationJsonLd(product),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Encabezado */}
      <section className="py-12 sm:py-16">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Link
              href="/#productos"
              className="text-foreground-muted hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Mis productos
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <p className="text-accent-bright font-mono text-sm">{product.category}</p>
              <span className="border-border text-foreground-muted inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs">
                <span className="bg-accent size-1.5 rounded-full" aria-hidden />
                {product.statusTag}
              </span>
            </div>

            <h1 className="text-foreground mt-3 text-3xl font-semibold text-balance sm:text-4xl lg:text-5xl">
              {product.seo.h1}
            </h1>
            <p className="text-foreground-muted mt-5 max-w-xl text-lg">{product.intro}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <OfficialSiteButton
                href={product.url}
                analyticsId={product.slug}
                label={`Visitar ${domain}`}
              />
              {product.extraLinks?.map((link) => (
                <Button key={link.href} href={link.href} variant="secondary">
                  {link.label}
                  <ArrowUpRight className="size-4" aria-hidden />
                </Button>
              ))}
            </div>
          </div>

          <DeviceShowcase
            desktop={product.showcase.desktop}
            mobile={product.showcase.mobile}
            domain={domain}
            loading="preload"
          />
        </Container>
      </section>

      {/* Problema y solución */}
      <section className="border-border/60 border-t py-12 sm:py-16">
        <Container className="grid gap-6 md:grid-cols-2">
          <FadeIn className="h-full">
            <div className="border-border h-full rounded-2xl border p-6 sm:p-8">
              <p className="text-accent-bright font-mono text-xs">01</p>
              <h2 className="text-foreground mt-2 text-xl font-semibold">El problema</h2>
              <p className="text-foreground-muted mt-3">{product.problem}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.05} className="h-full">
            <div className="border-border bg-background-subtle h-full rounded-2xl border p-6 sm:p-8">
              <p className="text-accent-bright font-mono text-xs">02</p>
              <h2 className="text-foreground mt-2 text-xl font-semibold">La solución</h2>
              <p className="text-foreground-muted mt-3">{product.solution}</p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Qué construí + stack */}
      <section className="border-border/60 border-t py-12 sm:py-16">
        <Container>
          <FadeIn>
            <h2 className="text-foreground text-2xl font-semibold sm:text-3xl">
              Qué construí
            </h2>
            <p className="text-foreground-muted mt-2 max-w-xl">
              Diseño, desarrollo, infraestructura y mantenimiento: el producto completo lo
              hice yo.
            </p>
          </FadeIn>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.built.map((group, index) => (
              <FadeIn key={group.title} delay={index * 0.05} className="h-full">
                <div className="border-border h-full rounded-xl border p-5">
                  <h3 className="text-foreground text-sm font-semibold">{group.title}</h3>
                  <ul className="mt-3 space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="text-foreground-muted flex items-start gap-2 text-sm"
                      >
                        <Check
                          className="text-accent-bright mt-0.5 size-3.5 shrink-0"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <h2 className="text-foreground mt-12 text-sm font-semibold">Stack</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {product.stack.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>
          </FadeIn>
        </Container>
      </section>

      {/* Resultado */}
      <section className="border-border/60 border-t py-12 sm:py-16">
        <Container>
          <FadeIn>
            <h2 className="text-foreground text-2xl font-semibold sm:text-3xl">
              Resultado
            </h2>
            <p className="text-foreground-muted mt-2 max-w-xl">{product.result.text}</p>

            <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
              {product.result.metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col-reverse justify-end">
                  <dt className="text-foreground-muted mt-1.5 text-sm">{metric.label}</dt>
                  <dd className="text-accent-bright text-4xl font-semibold tabular-nums sm:text-5xl">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
            {product.result.note ? (
              <p className="text-foreground-muted mt-6 text-xs">{product.result.note}</p>
            ) : null}
          </FadeIn>
        </Container>
      </section>

      {/* Galería */}
      <section className="border-border/60 border-t py-12 sm:py-16">
        <Container>
          <FadeIn>
            <h2 className="text-foreground text-2xl font-semibold sm:text-3xl">
              Capturas en PC y celular
            </h2>
          </FadeIn>

          <div className="mt-8 grid items-end gap-8 md:grid-cols-3">
            {product.gallery.map((shot) => (
              <GalleryShot key={shot.src} shot={shot} domain={domain} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-border/60 border-t py-12 sm:py-16">
        <Container className="text-center">
          <FadeIn>
            <p className="text-foreground mx-auto max-w-xl text-2xl font-semibold text-balance">
              {product.cta.question}
            </p>
            <p className="text-foreground-muted mx-auto mt-3 max-w-md">
              {product.cta.pitch}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button href={buildContactWhatsappUrl(product.cta.whatsappMessage)}>
                <MessageCircle className="size-4" aria-hidden />
                Hablemos de tu proyecto
              </Button>
              {otherProduct ? (
                <Button href={`/trabajos/${otherProduct.slug}`} variant="secondary">
                  Ver el caso de {otherProduct.name}
                  <ArrowRight className="size-4" aria-hidden />
                </Button>
              ) : null}
            </div>
            <Link
              href="/#trabajos"
              className="text-foreground-muted hover:text-foreground mt-6 inline-block text-sm underline-offset-4 hover:underline"
            >
              Ver más trabajos de desarrollo web en Mendoza
            </Link>
          </FadeIn>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}

function GalleryShot({ shot, domain }: { shot: DeviceShot; domain: string }) {
  if (shot.device === "desktop") {
    return (
      <figure className="md:col-span-2">
        <div className="border-border bg-background overflow-hidden rounded-xl border">
          <div className="border-border flex items-center gap-1.5 border-b px-3 py-2">
            <span className="bg-border size-2 rounded-full" aria-hidden />
            <span className="bg-border size-2 rounded-full" aria-hidden />
            <span className="bg-border size-2 rounded-full" aria-hidden />
            <span className="text-foreground-muted ml-2 font-mono text-[10px]">
              {domain}
            </span>
          </div>
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            loading="lazy"
            sizes="(min-width: 768px) 66vw, 100vw"
            className="block h-auto w-full"
          />
        </div>
        <figcaption className="text-foreground-muted mt-3 text-center text-xs">
          {shot.caption}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="mx-auto w-full max-w-60">
      <div className="border-border bg-background overflow-hidden rounded-[1.75rem] border-4">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          loading="lazy"
          sizes="240px"
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="text-foreground-muted mt-3 text-center text-xs">
        {shot.caption}
      </figcaption>
    </figure>
  );
}

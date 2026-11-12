import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { OfficialSiteButton } from "@/features/projects/components/official-site-button";
import { DeviceShowcase } from "@/features/products/components/device-showcase";
import { products } from "@/features/products/data/products";
import { displayDomain } from "@/lib/url";
import { cn } from "@/lib/utils";

export function ProductsSection() {
  return (
    <section id="productos" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Mis productos"
          title="Productos que diseñé, programé y mantengo"
          description="Mis proyectos más completos: usuarios reales, cobros online y demo pública."
        />

        <div className="mt-10 space-y-8">
          {products.map((product, index) => (
            <FadeIn key={product.slug} delay={index * 0.05}>
              <article className="border-border bg-background-subtle grid items-center gap-10 overflow-hidden rounded-3xl border p-6 sm:p-10 lg:grid-cols-2">
                <div className={cn(index % 2 === 1 && "lg:order-2")}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-accent-muted text-accent-bright rounded-full px-2.5 py-1 font-mono text-[11px]">
                      {product.category}
                    </span>
                    <span className="border-border text-foreground-muted inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px]">
                      <span className="bg-accent size-1.5 rounded-full" aria-hidden />
                      {product.statusTag}
                    </span>
                  </div>

                  <h3 className="text-foreground mt-4 text-2xl font-semibold sm:text-3xl">
                    {product.name}
                  </h3>
                  <p className="text-foreground-muted mt-2">{product.summary}</p>

                  <ul className="mt-5 space-y-2">
                    {product.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="text-foreground flex items-start gap-2.5 text-sm"
                      >
                        <Check
                          className="text-accent-bright mt-0.5 size-4 shrink-0"
                          aria-hidden
                        />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
                    {product.stack.map((tech) => (
                      <li key={tech}>
                        <Badge className="px-2.5 py-0.5 text-[11px]">{tech}</Badge>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <OfficialSiteButton
                      href={product.url}
                      analyticsId={product.slug}
                      label="Visitar sitio"
                    />
                    <Button href={`/trabajos/${product.slug}`} variant="secondary">
                      Ver caso
                      <ArrowRight className="size-4" aria-hidden />
                      <span className="sr-only"> de {product.name}</span>
                    </Button>
                  </div>
                </div>

                <DeviceShowcase
                  desktop={product.showcase.desktop}
                  mobile={product.showcase.mobile}
                  domain={displayDomain(product.url)}
                  className={cn(index % 2 === 1 && "lg:order-1")}
                />
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

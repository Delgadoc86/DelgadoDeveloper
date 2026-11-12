import type { Metadata } from "next";
import { Hero } from "@/features/hero/hero";
import { ProductsSection } from "@/features/products/products-section";
import { ServicesSection } from "@/features/services/services-section";
import { ProjectsSection } from "@/features/projects/projects-section";
import { ProcessSection } from "@/features/process/process-section";
import { AboutSummary } from "@/features/about/about-summary";
import { ContactCta } from "@/features/contact-cta/contact-cta";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <AboutSummary />
      <ContactCta />
    </>
  );
}

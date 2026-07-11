import { Hero } from "@/features/hero/hero";
import { ProjectsSection } from "@/features/projects/projects-section";
import { OtherProjectsSection } from "@/features/projects/components/other-projects-section";
import { StackSection } from "@/features/stack/stack-section";
import { AboutSummary } from "@/features/about/about-summary";
import { ContactCta } from "@/features/contact-cta/contact-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <OtherProjectsSection />
      <StackSection />
      <AboutSummary />
      <ContactCta />
    </>
  );
}

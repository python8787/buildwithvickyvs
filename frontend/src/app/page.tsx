import { HeroSection }       from "@/components/sections/HeroSection";
import { SkillsSection }      from "@/components/sections/SkillsSection";
import { FeaturedProjects }   from "@/components/sections/FeaturedProjects";
import { LabSection }         from "@/components/sections/LabSection";
import { ContactCTA }         from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SkillsSection />
      <FeaturedProjects />
      <LabSection />
      <ContactCTA />
    </>
  );
}

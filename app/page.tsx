import { About } from "@/components/home/About";
import { Approach } from "@/components/home/Approach";
import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { Projects } from "@/components/home/Projects";
import { Skills } from "@/components/home/Skills";
import { PageTransition } from "@/components/ui/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Projects />
      <Approach />
      <Skills />
      <About />
      <Contact />
    </PageTransition>
  );
}

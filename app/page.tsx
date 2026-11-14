import { About } from "@/components/home/About";
import { AiUsage } from "@/components/home/AiUsage";
import { Approach } from "@/components/home/Approach";
import { Architecture } from "@/components/home/Architecture";
import { CaseStudies } from "@/components/home/CaseStudies";
import { Contact } from "@/components/home/Contact";
import { Growth } from "@/components/home/Growth";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { NextProject } from "@/components/home/NextProject";
import { Projects } from "@/components/home/Projects";
import { TechStack } from "@/components/home/TechStack";
import { PageTransition } from "@/components/ui/PageTransition";

/** 섹션 순서는 content/site.ts의 sections 순서와 같게 유지한다. */
export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <TechStack />
      <Intro />
      <Projects />
      <CaseStudies />
      <Architecture />
      <Approach />
      <AiUsage />
      <Growth />
      <About />
      <NextProject />
      <Contact />
    </PageTransition>
  );
}

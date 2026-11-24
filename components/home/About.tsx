import { profile } from "@/content/profile";
import { sections } from "@/content/site";
import { getProjectBySlug } from "@/lib/projects";
import { AboutTimeline, type TimelineStep } from "@/components/home/AboutTimeline";

export function About() {
  const { title, paragraphs, lead, timeline = [] } = profile.about;

  // 프로젝트 slug를 실제 프로젝트 이름으로 바꾼다. 없는 slug는 화면에 내지 않는다.
  const steps: TimelineStep[] = timeline.map((step) => ({
    ...step,
    projects: (step.projects ?? []).flatMap((slug) => {
      const project = getProjectBySlug(slug);
      return project ? [{ slug, title: project.title }] : [];
    }),
  }));

  return (
    <AboutTimeline
      id={sections.about.id}
      label={sections.about.label}
      title={title}
      lead={lead}
      paragraphs={paragraphs}
      steps={steps}
    />
  );
}

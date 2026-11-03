import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-background">
      <Container className="flex flex-col gap-2 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Built with Next.js</p>
      </Container>
    </footer>
  );
}

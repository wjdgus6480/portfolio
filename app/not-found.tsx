import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-32">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
        페이지를 찾을 수 없습니다.
      </h1>
      <div className="mt-10">
        <ButtonLink href="/">홈으로</ButtonLink>
      </div>
    </Container>
  );
}

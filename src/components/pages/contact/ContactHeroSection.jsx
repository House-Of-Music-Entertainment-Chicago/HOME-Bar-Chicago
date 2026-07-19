import Heading from "@/components/utils/HeadingText";
import Title from "@/components/utils/TitleText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import PaperDivider from "@/components/utils/PaperDivider";

export default function ContactHero() {
  return (
    <section className="relative bg-background">
      <Container className="relative z-10 text-center">
        <Heading>
          Get In <span className="text-lime">Touch</span>
        </Heading>
        <DividerFlourish className="mx-auto mt-3 w-20" />
        <Title className="mx-auto mt-4 max-w-100 text-foreground-muted">
          Questions about reservations, private events, or just want to say hi?
          We'd love to hear from you.
        </Title>
      </Container>

      <PaperDivider position="bottom" />
    </section>
  );
}

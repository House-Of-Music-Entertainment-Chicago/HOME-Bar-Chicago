import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";
import Container from "@/components/utils/Container";

// NOTE: address, phone, and hours below match the placeholders
// already used in LocationSection.jsx (Makati City coordinates) —
// keep these two files in sync, and swap both together once you
// have HOME Bar Chicago's real address and phone number. Email is
// a placeholder too — no real inbox has been set up for this yet.
const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Address",
    value: "123 Champions Ave, Makati City, Philippines",
  },
  { icon: Phone, label: "Phone", value: "(02) 8123 4567" },
  { icon: Mail, label: "Email", value: "hello@homesportsbar.com" },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Thu: 4PM – 1AM\nFri – Sun: 12NN – 2AM",
  },
];

export default function ContactInfoStrip() {
  return (
    <section className="bg-background">
      <Container>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 border border-olive/40 bg-background-alt/50 px-4 py-6 text-center"
            >
              <Icon className="h-12 w-12 text-accent" />
              <Title className="uppercase text-lime">{label}</Title>
              <Text className="whitespace-pre-line text-foreground-muted">
                {value}
              </Text>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <a
            href="#"
            aria-label="Facebook"
            className="text-foreground-muted transition-colors hover:text-lime"
          >
            <SiFacebook className="h-12 w-12" />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="text-foreground-muted transition-colors hover:text-lime"
          >
            <SiInstagram className="h-12 w-12" />
          </a>
          {/* lucide-react has no TikTok glyph — swap in a brand SVG here, same caveat as the footer */}
        </div>
      </Container>
    </section>
  );
}

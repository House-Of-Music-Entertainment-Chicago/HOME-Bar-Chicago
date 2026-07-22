import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import logo from "../../../public/images/logo/latest-logo.png";
import SOCIAL_LINKS from "@/data/social-links";
import NAV_LINKS from "@/data/nav-links";
import NewsletterForm from "../utils/NewsLetterForm";
import businessInformation from "@/data/business-info";

export default function Footer() {
  return (
    <footer className="relative border-t border-surface-border bg-background-alt">
      <div className="container mx-auto grid grid-cols-1 gap-5 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {/* Brand */}
        <div className="flex flex-col items-start gap-4">
          <Image src={logo} alt="Home Bar Chicago" className="h-16 w-auto" />
          <p className="max-w-xs text-sm text-foreground-muted">
            Your home away from home — Arlington Heights&rsquo; sports bar, live
            music, and entertainment destination since 2012.
          </p>
        </div>

        {/* Newsletter signup */}
        <div className="sm:col-span-2 xl:col-span-1">
          <NewsletterForm />
        </div>

        {/* Nav links */}
        <div>
          <h3 className="mb-4 font-display text-sm uppercase tracking-wide text-accent">
            Explore
          </h3>
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 font-display text-sm uppercase tracking-wide text-accent">
            Visit Us
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-foreground-muted">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a
                href={businessInformation.googleMapAddressLocation}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                {businessInformation.address}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-accent" />
              <a
                href={`tel:${businessInformation.telephone}`}
                className="transition-colors hover:text-foreground"
              >
                {businessInformation.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-accent" />
              <a
                href={`mailto:${businessInformation.email}`}
                className="transition-colors hover:text-foreground"
              >
                {businessInformation.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Hours — PLACEHOLDER, not listed on the current site */}
        <div>
          <h3 className="mb-4 font-display text-sm uppercase tracking-wide text-accent">
            Hours
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-foreground-muted">
            <li className="flex justify-between gap-4">
              <span>Mon &ndash; Thu</span>
              <span>11am &ndash; 12am</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Fri &ndash; Sat</span>
              <span>11am &ndash; 2am</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Sunday</span>
              <span>11am &ndash; 12am</span>
            </li>
          </ul>
          {/* <p className="mt-2 text-xs italic text-foreground-muted/70">
            Confirm real hours with the client — placeholder values.
          </p> */}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-surface-border">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p className="text-xs text-foreground-muted">
            &copy; {new Date().getFullYear()} Home Bar Chicago. All rights
            reserved.
          </p>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-foreground-muted transition-colors hover:text-accent"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

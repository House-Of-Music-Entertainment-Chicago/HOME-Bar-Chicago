import { SITE_CONFIG } from "@/data/site-confiig";

/**
 * TERMS & CONDITIONS CONTENT
 * ---------------------------------------------------------------
 * Written specifically against what this site actually does, rather
 * than a generic template: reservations hand off to OpenTable, the
 * three forms submit to Wix, there is an embedded Instagram post and a
 * third-party map, no payments are taken on the site, and there are no
 * user accounts. Clauses that would describe functionality this site
 * does not have (checkout, refunds, account termination) are
 * deliberately absent.
 *
 * ⚠ BEFORE PUBLISHING — needs a licensed Illinois attorney to review,
 * and these three facts must be confirmed by the client:
 *
 *   1. LEGAL_ENTITY below is the trading name. If the business operates
 *      through a registered company/LLC, that registered name (and any
 *      "d/b/a") belongs here instead.
 *   2. Governing-law venue is stated as the State of Illinois without
 *      naming a county, because the venue address sits near a county
 *      line. Counsel should pin the county.
 *   3. Section "disputes" currently preserves the right to go to court.
 *      If the client wants binding arbitration and/or a class-action
 *      waiver instead, that is a deliberate legal choice and must be
 *      drafted by counsel — it is not something to toggle casually.
 *
 * Nothing here is legal advice, and this file was not written by a
 * lawyer.
 */

// The name the business trades under. Replace with the registered legal
// entity name if one exists (see note 1 above).
export const LEGAL_ENTITY = SITE_CONFIG.name;

export const LAST_UPDATED = "August 6, 2026";

export const TERMS_SECTIONS = [
  {
    id: "agreement",
    heading: "1. Agreement to These Terms",
    body: [
      `These Terms & Conditions ("Terms") govern your use of this website and, where stated, your visit to our venue. By browsing this website, submitting a form, subscribing to our email updates, or making a reservation through the links we provide, you confirm that you have read, understood, and agree to be bound by these Terms.`,
      "If you do not agree with these Terms, please do not use this website.",
      "These Terms do not limit any rights you may have under applicable consumer protection law that cannot be waived by agreement.",
    ],
  },
  {
    id: "who-we-are",
    heading: "2. Who We Are",
    body: [
      `This website is operated by ${LEGAL_ENTITY}, a sports bar and entertainment venue located in Arlington Heights, Illinois. Where these Terms say "we," "us," or "our," they refer to ${LEGAL_ENTITY}.`,
      { type: "contact" },
    ],
  },
  {
    id: "age",
    heading: "3. Age Requirements and Alcohol Service",
    body: [
      "This website contains information about alcoholic beverages and is intended for a general audience. It is not directed at children under 13, and we do not knowingly collect personal information from them.",
      "The legal drinking age in Illinois is 21. We serve alcohol only to guests who are 21 or older and who present valid, government-issued photo identification on request. We may refuse service where identification cannot be produced, appears altered, or does not appear to belong to the person presenting it.",
      "We reserve the right to refuse or discontinue alcohol service to any person at our discretion, including where we believe a guest is intoxicated, is purchasing alcohol on behalf of a minor, or where continued service would be unlawful or unsafe.",
      "Certain areas of the venue, or the venue as a whole, may be restricted to guests aged 21 or over at particular times. Age restrictions for specific events are stated at the point of entry.",
    ],
  },
  {
    id: "website-use",
    heading: "4. Permitted Use of This Website",
    body: [
      "You may use this website for lawful, personal, non-commercial purposes only. You agree not to:",
      {
        type: "list",
        items: [
          "use the website in any way that breaches any applicable law or regulation;",
          "attempt to gain unauthorised access to the website, the server on which it is stored, or any connected system;",
          "introduce any virus, malware, or other harmful material;",
          "use any automated system to scrape, harvest, or systematically copy content from the website;",
          "submit false, misleading, or fraudulent information through any form on the website; or",
          "reproduce, republish, or redistribute our content except as permitted in the Intellectual Property section below.",
        ],
      },
      "We may suspend or restrict access to the website at any time, without notice, where we consider it necessary.",
    ],
  },
  {
    id: "reservations",
    heading: "5. Table Reservations",
    body: [
      "Table reservations are handled by OpenTable, an independent third-party booking service. When you choose to reserve a table, you leave this website and complete your booking on OpenTable's platform. Your reservation is therefore also subject to OpenTable's own terms and privacy policy, which we do not control.",
      "A reservation is a request to hold a table and is confirmed only when you receive confirmation from OpenTable. We make reasonable efforts to honour every confirmed reservation, but we cannot guarantee a specific table, area, or seating position.",
      "We may release a reserved table if the party has not arrived within a reasonable grace period. During busy periods, on event nights, and on major sporting fixtures, seating may be limited, time-limited, or subject to a minimum party size.",
      "If you need to cancel or amend a reservation, please do so through OpenTable or by contacting us directly using the details above.",
    ],
  },
  {
    id: "enquiries",
    heading: "6. Private Event and General Enquiries",
    body: [
      "The private event form on this website submits an enquiry only. It does not create a booking, reserve a date, or form a contract. All private events are subject to availability, confirmation in writing, and any separate event agreement, deposit terms, and minimum spend that we may require.",
      "We aim to respond to enquiries within a reasonable time, but we do not guarantee a response time and we are not liable for enquiries that are not received, are delayed, or are filtered by spam controls.",
      "Please do not send sensitive personal information, payment card details, or confidential material through the forms on this website.",
    ],
  },
  {
    id: "menus",
    heading: "7. Menus, Pricing and Availability",
    body: [
      "Menus, prices, and product descriptions shown on this website are for general information and are subject to change without notice. The menu in the venue at the time of your visit is the authoritative version.",
      "We make reasonable efforts to keep the website accurate and up to date, but we do not warrant that menu items, prices, availability, beers on tap, or event listings are complete, current, or free of error. Items may be unavailable, substituted, or withdrawn.",
      "Photographs of food and drink are for illustration. Actual presentation, portion size, and garnish may differ.",
      "Prices exclude applicable taxes and any gratuity or service charge unless expressly stated. A service charge may be applied automatically to larger parties; where it is, this is stated on the menu or at the point of ordering.",
    ],
  },
  {
    id: "allergens",
    heading: "8. Food Allergies and Dietary Requirements",
    body: [
      "Our kitchen handles common allergens, including but not limited to milk, eggs, fish, shellfish, tree nuts, peanuts, wheat, soy, and sesame. Because dishes are prepared in a shared kitchen, we cannot guarantee that any item is free from any particular allergen, and cross-contact is possible.",
      "Ingredients and suppliers may change. Allergen and dietary descriptions on this website may not reflect the current recipe.",
      "If you have a food allergy, intolerance, or dietary requirement, you must tell a member of staff before ordering so we can advise you at the time. Please do not rely on this website alone when making decisions about your health or safety.",
      "Consuming raw or undercooked meat, poultry, seafood, shellfish, or eggs may increase your risk of foodborne illness.",
    ],
  },
  {
    id: "events",
    heading: "9. Events, Entertainment and Schedule Changes",
    body: [
      "Event listings, live music, DJ sets, watch parties, and broadcast schedules shown on this website are provided in good faith and may change or be cancelled at short notice for reasons including performer availability, broadcast rights, licensing, capacity, weather, or circumstances beyond our reasonable control.",
      "We do not control which fixtures are made available by broadcasters and cannot guarantee that any particular game, fight, or event will be shown.",
      "Where an event requires a ticket, cover charge, or advance booking, additional terms will be made available at the point of purchase and will apply in addition to these Terms.",
    ],
  },
  {
    id: "conduct",
    heading: "10. Conduct at the Venue and Right to Refuse Entry",
    body: [
      "We want every guest to have a good night. We reserve the right, acting reasonably, to refuse entry to or remove any person from the venue, without refund, where that person:",
      {
        type: "list",
        items: [
          "cannot produce valid proof of age when required;",
          "appears intoxicated or under the influence of illegal substances;",
          "behaves in a manner that is abusive, threatening, discriminatory, or unsafe toward guests or staff;",
          "damages, or attempts to damage, the venue or its equipment;",
          "brings prohibited items onto the premises, including outside alcohol, weapons, or illegal substances; or",
          "fails to comply with reasonable instructions from our staff or security.",
        ],
      },
      "The venue is monitored by CCTV for the safety and security of guests and staff.",
      "You are responsible for your personal property while at the venue. To the fullest extent permitted by law, we are not liable for loss of or damage to personal property except where caused by our negligence.",
    ],
  },
  {
    id: "photography",
    heading: "11. Photography and Filming at the Venue",
    body: [
      "We and those we authorise may take photographs or video at the venue, particularly during events, for our own promotional use, including on this website and on our social media channels.",
      "By entering the venue you acknowledge that you may be recorded and you consent to our use of that footage for those purposes without further notice, compensation, or approval.",
      "If you appear in an image we have published and would like it removed, contact us using the details above and we will act on reasonable requests.",
      "Guests filming or photographing for commercial purposes, or with professional equipment, require our prior written permission.",
    ],
  },
  {
    id: "marketing",
    heading: "12. Email Updates and Marketing",
    body: [
      "If you subscribe to our email updates, you are asking us to send you news about events, offers, and what is on at the venue. You can withdraw that consent at any time using the unsubscribe link in any message we send, or by contacting us directly.",
      "We do not sell your email address. We may use a third-party provider to store subscriber details and send messages on our behalf.",
    ],
  },
  {
    id: "personal-information",
    heading: "13. Personal Information We Collect",
    body: [
      "Through the forms on this website we collect only the information you choose to give us:",
      {
        type: "list",
        items: [
          "Email updates: your name and email address, together with your consent to be contacted.",
          "Private event enquiries: your name, email address, phone number, preferred date, event type, approximate guest numbers, and any message you include.",
          "General enquiries: your name, email address, phone number, and your message.",
        ],
      },
      "We use this information solely to respond to you, to administer the enquiry or booking you have asked about, and — where you have opted in — to send you email updates.",
      "Form submissions are processed and stored using Wix, a third-party platform acting as our service provider. Reservations are processed by OpenTable. These providers handle your information under their own terms and privacy policies.",
      "We do not take payments on this website and do not collect payment card details through it.",
      "You may ask us what personal information we hold about you, ask us to correct it, or ask us to delete it, by contacting us using the details above. We will respond in accordance with applicable law.",
    ],
  },
  {
    id: "third-parties",
    heading: "14. Third-Party Services and Links",
    body: [
      "This website links to and embeds services operated by others, including OpenTable for reservations, Wix for form handling, Instagram for social content, and a third-party mapping provider for directions.",
      "Those services are not under our control. We provide them for convenience and their inclusion does not imply endorsement. We are not responsible for the content, availability, accuracy, or privacy practices of any third-party service or linked website, and your use of them is at your own risk and subject to their terms.",
    ],
  },
  {
    id: "intellectual-property",
    heading: "15. Intellectual Property",
    body: [
      `All content on this website — including the ${LEGAL_ENTITY} name and logo, text, menus, photographs, graphics, layout, and design — is owned by us or used under licence, and is protected by copyright, trade mark, and other intellectual property laws.`,
      "You may view, download, and print pages from this website for your own personal, non-commercial use. You may not otherwise copy, reproduce, modify, distribute, publish, or use our content or branding for commercial purposes without our prior written permission.",
      "Third-party trade marks, product names, and logos appearing on this website remain the property of their respective owners and are used for identification only.",
    ],
  },
  {
    id: "submissions",
    heading: "16. Material You Send Us",
    body: [
      "If you send us feedback, suggestions, reviews, photographs, or other material — through a form, by email, or by tagging us on social media — you confirm that it is yours to share and that it does not infringe anyone else's rights.",
      "You grant us a non-exclusive, royalty-free, worldwide licence to use, reproduce, and display that material in connection with promoting the venue. You are not obliged to send us anything, and you can ask us to stop using material you have sent by contacting us.",
      "We may remove or decline to use any submission at our discretion.",
    ],
  },
  {
    id: "accessibility",
    heading: "17. Accessibility",
    body: [
      "We want this website to be usable by as many people as possible and we work to improve its accessibility over time.",
      "If you encounter a barrier using this website, or need information from it in another format, please contact us using the details above and we will do our best to help.",
    ],
  },
  {
    id: "disclaimers",
    heading: "18. Disclaimer of Warranties",
    body: [
      `This website and its content are provided "as is" and "as available," without warranties of any kind, whether express or implied, to the fullest extent permitted by law. This includes any implied warranties of merchantability, fitness for a particular purpose, and non-infringement.`,
      "We do not warrant that the website will be uninterrupted, timely, secure, or error-free, that defects will be corrected, or that the website is free of viruses or other harmful components.",
      "Information on this website is provided for general guidance only and should not be relied on as the sole basis for any decision.",
    ],
  },
  {
    id: "liability",
    heading: "19. Limitation of Liability",
    body: [
      "To the fullest extent permitted by law, we will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, revenue, data, or goodwill, arising out of or in connection with your use of this website.",
      "Nothing in these Terms excludes or limits our liability for death or personal injury caused by our negligence, for fraud or fraudulent misrepresentation, or for any other liability that cannot lawfully be excluded or limited.",
      "Because some jurisdictions do not allow the exclusion or limitation of certain damages, some of the above may not apply to you.",
    ],
  },
  {
    id: "indemnity",
    heading: "20. Indemnification",
    body: [
      `You agree to indemnify and hold harmless ${LEGAL_ENTITY}, its owners, officers, employees, and agents from any claim, demand, loss, or expense (including reasonable legal fees) arising out of your breach of these Terms, your misuse of this website, or your violation of any law or the rights of a third party.`,
    ],
  },
  {
    id: "disputes",
    heading: "21. Governing Law and Disputes",
    body: [
      "These Terms, and any dispute arising out of or in connection with them or your use of this website, are governed by the laws of the State of Illinois, without regard to its conflict of laws rules.",
      "You agree that any such dispute will be brought exclusively in the state or federal courts located in the State of Illinois, and you consent to the jurisdiction of those courts.",
      "If you have a concern, we would much rather hear from you first — please contact us so we can try to resolve it directly.",
    ],
  },
  {
    id: "changes",
    heading: "22. Changes to These Terms",
    body: [
      "We may update these Terms from time to time to reflect changes to our services, our practices, or the law. The version published on this page is the version in force, and the date it last changed is shown at the top.",
      "Your continued use of this website after we publish a change means you accept the updated Terms. Please check this page periodically.",
    ],
  },
  {
    id: "general",
    heading: "23. Severability and Entire Agreement",
    body: [
      "If any provision of these Terms is found to be unlawful, void, or unenforceable, that provision will be severed and the remaining provisions will continue in full force.",
      "Our failure to enforce any right or provision of these Terms is not a waiver of that right or provision.",
      "These Terms, together with any additional terms that apply to a specific event or booking, constitute the entire agreement between you and us in relation to your use of this website.",
    ],
  },
  {
    id: "contact",
    heading: "24. How to Contact Us",
    body: [
      "If you have questions about these Terms, or about anything on this website, please get in touch:",
      { type: "contact" },
    ],
  },
];

export default TERMS_SECTIONS;

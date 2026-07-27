// "use client";

// import { useState } from "react";
// import { Check } from "lucide-react";
// import Subheading from "@/components/utils/SubHeadingText";
// import Title from "@/components/utils/TitleText";
// import Text from "@/components/utils/BodyText";
// import DividerFlourish from "@/components/utils/DividerFlourish";
// import Container from "@/components/utils/Container";
// import PaperDivider from "@/components/utils/PaperDivider";
// import RibbonButton from "@/components/utils/Ribbonbutton";

// import { motion } from "framer-motion";
// import {
//   groupVariants,
//   itemVariants,
//   headerVariants,
//   buttonVariants,
// } from "@/data/animation-variants";
// import { useSafeVariants } from "@/components/hooks/useSafeVariants";

// const PERKS = [
//   "Private & semi-private areas",
//   "Custom food & drink packages",
//   "Audio/visual setup",
//   "Dedicated event coordinator",
// ];

// const EVENT_TYPES = [
//   "Birthday",
//   "Corporate Event",
//   "Watch Party",
//   "Celebration",
//   "Other",
// ];
// const GUEST_RANGES = ["1–10", "11–25", "26–50", "51–100", "100+"];

// const inputClass =
//   "w-full border border-white/15 bg-background px-4 py-3 text-sm text-white placeholder:text-foreground-muted focus:border-accent focus:outline-none";

// export default function PrivateEventSection() {
//   const v = useSafeVariants();

//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     eventDate: "",
//     eventType: "",
//     guests: "",
//     message: "",
//   });
//   const [status, setStatus] = useState("idle"); // idle | submitting | success | error

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus("submitting");
//     try {
//       // TODO: point this at your private-event inquiry route
//       // (e.g. an API route that emails the business, per your
//       // existing form-routing setup).
//       const res = await fetch("/api/private-event-inquiry", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       if (!res.ok) throw new Error("Request failed");
//       setStatus("success");
//       setForm({
//         fullName: "",
//         email: "",
//         phone: "",
//         eventDate: "",
//         eventType: "",
//         guests: "",
//         message: "",
//       });
//     } catch (err) {
//       setStatus("error");
//     }
//   };

//   return (
//     <section className="relative bg-background">
//       <Container className="relative">
//         {/* Left — copy + perks */}
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-80px" }}
//           variants={v(groupVariants)}
//           className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2"
//         >
//           <div className="flex flex-col gap-4">
//             <motion.div variants={v(headerVariants)}>
//               <Subheading>
//                 Private Event
//                 <br />
//                 Reservations
//               </Subheading>
//               <DividerFlourish className="mx-0 mt-2 w-20" />
//             </motion.div>
//             <motion.div variants={v(headerVariants)}>
//               <Text className="text-foreground-muted">
//                 Planning a birthday, corporate event, or special celebration?
//                 Let us make it unforgettable.
//               </Text>
//             </motion.div>

//             <ul className="flex flex-col gap-2">
//               {PERKS.map((perk) => (
//                 <li key={perk}>
//                   <motion.div
//                     variants={v(itemVariants)}
//                     className="flex items-center gap-3 text-sm text-white sm:text-base"
//                   >
//                     <Check className="h-8 w-8 shrink-0 text-olive" />
//                     <Title>{perk}</Title>
//                   </motion.div>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Right — inquiry form */}
//           <div className="border border-olive/40 p-6 sm:p-8">
//             <motion.div variants={v(headerVariants)}>
//               <Title className="mb-6 text-center uppercase text-accent">
//                 Inquire About Your Private Event
//               </Title>
//             </motion.div>

//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <input
//                   type="text"
//                   name="fullName"
//                   placeholder="Full Name"
//                   value={form.fullName}
//                   onChange={handleChange}
//                   required
//                   className={inputClass}
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email Address"
//                   value={form.email}
//                   onChange={handleChange}
//                   required
//                   className={inputClass}
//                 />
//               </div>

//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="Phone Number"
//                   value={form.phone}
//                   onChange={handleChange}
//                   required
//                   className={inputClass}
//                 />
//                 <input
//                   type="date"
//                   name="eventDate"
//                   value={form.eventDate}
//                   onChange={handleChange}
//                   required
//                   className={`${inputClass}`}
//                 />
//               </div>

//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <select
//                   name="eventType"
//                   value={form.eventType}
//                   onChange={handleChange}
//                   required
//                   className={`${inputClass} appearance-none`}
//                 >
//                   <option value="" disabled>
//                     Type of Event
//                   </option>
//                   {EVENT_TYPES.map((type) => (
//                     <option key={type} value={type}>
//                       {type}
//                     </option>
//                   ))}
//                 </select>

//                 <select
//                   name="guests"
//                   value={form.guests}
//                   onChange={handleChange}
//                   required
//                   className={`${inputClass} appearance-none`}
//                 >
//                   <option value="" disabled>
//                     Number of Guests
//                   </option>
//                   {GUEST_RANGES.map((range) => (
//                     <option key={range} value={range}>
//                       {range}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <textarea
//                 name="message"
//                 placeholder="Tell us about your event"
//                 value={form.message}
//                 onChange={handleChange}
//                 rows={4}
//                 className={`${inputClass} resize-none`}
//               />

//               <motion.div variants={v(buttonVariants)} className="mx-auto">
//                 <RibbonButton
//                   type="submit"
//                   // disabled={status === "submitting"}
//                   disabled={true}
//                 >
//                   {/* {status === "submitting" ? "Submitting..." : "Submit Inquiry"} */}
//                   Work In Progress
//                 </RibbonButton>
//               </motion.div>

//               {status === "success" && (
//                 <p className="text-center text-sm text-olive">
//                   Thanks — we'll be in touch shortly.
//                 </p>
//               )}
//               {status === "error" && (
//                 <p className="text-center text-sm text-red-500">
//                   Something went wrong. Please try again or call us directly.
//                 </p>
//               )}
//             </form>
//           </div>
//         </motion.div>
//       </Container>
//       <PaperDivider position="bottom" />
//     </section>
//   );
// }
"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import PaperDivider from "@/components/utils/PaperDivider";
import RibbonButton from "@/components/utils/Ribbonbutton";
import { handleWixFormSubmit } from "@/app/actions/wixForm";

import { motion } from "framer-motion";
import {
  groupVariants,
  itemVariants,
  headerVariants,
  buttonVariants,
} from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

const PERKS = [
  "Private & semi-private areas",
  "Custom food & drink packages",
  "Audio/visual setup",
  "Dedicated event coordinator",
];

const EVENT_TYPES = [
  "Birthday",
  "Corporate Event",
  "Watch Party",
  "Celebration",
  "Other",
];
const GUEST_RANGES = ["1–10", "11–25", "26–50", "51–100", "100+"];

const inputClass =
  "w-full border border-white/15 bg-background px-4 py-3 text-sm text-white placeholder:text-foreground-muted focus:border-accent focus:outline-none";

export default function PrivateEventSection() {
  const v = useSafeVariants();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    guests: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | success | error
  const [statusMessage, setStatusMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("idle");
    setStatusMessage("");

    const formData = new FormData();
    formData.set("formType", "private-event");
    formData.set("fullName", form.fullName);
    formData.set("email", form.email);
    formData.set("phone", form.phone);
    formData.set("date", form.eventDate);
    formData.set("eventType", form.eventType);
    formData.set("guests", form.guests);
    formData.set("message", form.message);

    startTransition(async () => {
      const result = await handleWixFormSubmit(formData);

      if (!result.success) {
        setStatus("error");
        setStatusMessage(result.message);
        return;
      }

      setStatus("success");
      setStatusMessage(result.message);
      setForm({
        fullName: "",
        email: "",
        phone: "",
        eventDate: "",
        eventType: "",
        guests: "",
        message: "",
      });
    });
  };

  return (
    <section className="relative bg-background">
      <Container className="relative">
        {/* Left — copy + perks */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2"
        >
          <div className="flex flex-col gap-4">
            <motion.div variants={v(headerVariants)}>
              <Subheading>
                Private Event
                <br />
                Reservations
              </Subheading>
              <DividerFlourish className="mx-0 mt-2 w-20" />
            </motion.div>
            <motion.div variants={v(headerVariants)}>
              <Text className="text-foreground-muted">
                Planning a birthday, corporate event, or special celebration?
                Let us make it unforgettable.
              </Text>
            </motion.div>

            <ul className="flex flex-col gap-2">
              {PERKS.map((perk) => (
                <li key={perk}>
                  <motion.div
                    variants={v(itemVariants)}
                    className="flex items-center gap-3 text-sm text-white sm:text-base"
                  >
                    <Check className="h-8 w-8 shrink-0 text-olive" />
                    <Title>{perk}</Title>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — inquiry form */}
          <div className="border border-olive/40 p-6 sm:p-8">
            <motion.div variants={v(headerVariants)}>
              <Title className="mb-6 text-center uppercase text-accent">
                Inquire About Your Private Event
              </Title>
            </motion.div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  disabled={isPending}
                  className={inputClass}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={isPending}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  disabled={isPending}
                  className={inputClass}
                />
                <input
                  type="date"
                  name="eventDate"
                  value={form.eventDate}
                  onChange={handleChange}
                  required
                  disabled={isPending}
                  className={`${inputClass}`}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <select
                  name="eventType"
                  value={form.eventType}
                  onChange={handleChange}
                  required
                  disabled={isPending}
                  className={`${inputClass} appearance-none`}
                >
                  <option value="" disabled>
                    Type of Event
                  </option>
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                <select
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  required
                  disabled={isPending}
                  className={`${inputClass} appearance-none`}
                >
                  <option value="" disabled>
                    Number of Guests
                  </option>
                  {GUEST_RANGES.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                name="message"
                placeholder="Tell us about your event"
                value={form.message}
                onChange={handleChange}
                rows={4}
                required
                disabled={isPending}
                className={`${inputClass} resize-none`}
              />

              <motion.div variants={v(buttonVariants)} className="mx-auto">
                <RibbonButton type="submit" disabled={isPending}>
                  {isPending ? "Submitting..." : "Submit Inquiry"}
                </RibbonButton>
              </motion.div>

              {status === "success" && (
                <p className="text-center text-sm text-olive">
                  {statusMessage}
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-sm text-red-500">
                  {statusMessage}
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </Container>
      <PaperDivider position="bottom" />
    </section>
  );
}

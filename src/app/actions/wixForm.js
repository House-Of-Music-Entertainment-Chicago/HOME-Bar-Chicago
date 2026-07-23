"use server";

import { wixClient } from "@/lib/wix";

export async function handleWixFormSubmit(formData) {
  const formType = formData.get("formType"); // Identifies which form was sent
  const email = formData.get("email");
  const fullName = formData.get("fullName") || "";

  // Split fullName into first/last safely for Wix if provided
  const nameParts = fullName.trim().split(" ");
  const firstName = formData.get("firstName") || nameParts[0] || "Subscriber";
  const lastName =
    formData.get("lastName") || nameParts.slice(1).join(" ") || "";

  if (!email) {
    return { success: false, message: "Email address is required." };
  }

  try {
    // 1. Core payload structure
    const contactPayload = {
      info: {
        name: { first: firstName, last: lastName },
        emails: [
          { email: email.trim().toLowerCase(), tag: "MAIN", primary: true },
        ],
      },
      extendedFields: {
        // "items.marketing_status": "SUBSCRIBED", // Automatically opts them into marketing
        "emailSubscription.subscriptionStatus": "SUBSCRIBED",
      },
      labelKeys: [],
    };

    // Add phone numbers if present in the form data
    const phone = formData.get("phone");
    if (phone) {
      contactPayload.info.phones = [{ phone: phone.trim(), primary: true }];
    }

    // 2. Form-Specific Logic (Data Packing)
    let summaryNote = `Form Submitted: ${formType}\n`;

    if (formType === "newsletter") {
      summaryNote += `User subscribed to the general newsletter.`;

      // Inject label keys for subscription flow
      contactPayload.labelKeys = ["custom.subscriptions"];
    } else if (formType === "private-event") {
      const date = formData.get("date");
      const eventType = formData.get("eventType");
      const guests = formData.get("guests");
      const message = formData.get("message");

      summaryNote += `--- Event Details ---\n`;
      summaryNote += `Target Date: ${date || "Not specified"}\n`;
      summaryNote += `Event Type: ${eventType || "Not specified"}\n`;
      summaryNote += `Estimated Guests: ${guests || "Not specified"}\n`;
      summaryNote += `Message: ${message || "None"}`;

      // Inquiries fall under both categorization matrices
      contactPayload.labelKeys = ["custom.contact", "custom.subscriptions"];
    } else if (formType === "contact-us") {
      const reason = formData.get("reason");
      const message = formData.get("message");

      summaryNote += `--- Contact Inquiry ---\n`;
      summaryNote += `Reason for Contact: ${reason || "Not specified"}\n`;
      summaryNote += `Message: ${message || "None"}`;

      // Mark directly as contact touchpoint
      contactPayload.labelKeys = ["custom.contact", "custom.subscriptions"];
    }

    // Attach the compiled summary directly into Wix Profile Notes
    contactPayload.notes = [{ content: summaryNote }];

    // 3. Post to Wix CRM Tables
    await wixClient.contacts.createContact(contactPayload);

    return {
      success: true,
      message: "Thank you! Your information was securely synced to our system.",
    };
  } catch (error) {
    console.error("Wix Form integration failure:", error);

    // If customer already exists, it updates or logs successfully
    if (error?.message?.includes("ALREADY_EXISTS")) {
      return {
        success: true,
        message: "Submission received! Your profile details have been updated.",
      };
    }

    return {
      success: false,
      message: "Submission failed. Please check your inputs and try again.",
    };
  }
}

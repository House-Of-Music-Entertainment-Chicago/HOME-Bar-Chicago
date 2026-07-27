// actions/handleWixFormSubmit.js
"use server";

import { wixClient } from "@/lib/wix";

const FORM_IDS = {
  newsletter: process.env.WIX_NEWSLETTER_FORM_ID,
  "private-event": process.env.WIX_PRIVATE_EVENT_FORM_ID,
  "contact-us": process.env.WIX_CONTACT_US_FORM_ID,
};

// Replace every value on the right with the real `target`/field key
// from that form's schema (via debug-list-forms).

const {
  WIX_CONTACT_US_FIELD_FIRSTNAME,
  WIX_CONTACT_US_FIELD_LASTNAME,
  WIX_CONTACT_US_FIELD_EMAIL,
  WIX_CONTACT_US_FIELD_PHONE,
  WIX_CONTACT_US_FIELD_MESSAGE,
  WIX_PRIVATE_EVENT_FIELD_FULLNAME,
  WIX_PRIVATE_EVENT_FIELD_EMAIL,
  WIX_PRIVATE_EVENT_FIELD_PHONE,
  WIX_PRIVATE_EVENT_FIELD_DATE,
  WIX_PRIVATE_EVENT_FIELD_EVENT_TYPE,
  WIX_PRIVATE_EVENT_FIELD_GUESTS,
  WIX_PRIVATE_EVENT_FIELD_MESSAGE,
  WIX_NEWSLETTER_FIELD_FULLNAME,
  WIX_NEWSLETTER_FIELD_EMAIL,
  WIX_NEWSLETTER_FIELD_CHECKBOX,
} = process.env;

const FIELD_KEYS = {
  newsletter: {
    fullName: WIX_NEWSLETTER_FIELD_FULLNAME,
    email: WIX_NEWSLETTER_FIELD_EMAIL,
    checkbox: WIX_NEWSLETTER_FIELD_CHECKBOX,
  },
  "private-event": {
    fullName: WIX_PRIVATE_EVENT_FIELD_FULLNAME,
    email: WIX_PRIVATE_EVENT_FIELD_EMAIL,
    phone: WIX_PRIVATE_EVENT_FIELD_PHONE,
    date: WIX_PRIVATE_EVENT_FIELD_DATE,
    eventType: WIX_PRIVATE_EVENT_FIELD_EVENT_TYPE,
    guests: WIX_PRIVATE_EVENT_FIELD_GUESTS,
    message: WIX_PRIVATE_EVENT_FIELD_MESSAGE,
  },
  "contact-us": {
    firstName: WIX_CONTACT_US_FIELD_FIRSTNAME,
    lastName: WIX_CONTACT_US_FIELD_LASTNAME,
    email: WIX_CONTACT_US_FIELD_EMAIL,
    phone: WIX_CONTACT_US_FIELD_PHONE,
    message: WIX_CONTACT_US_FIELD_MESSAGE,
  },
};

const REQUIRED_FIELDS = {
  newsletter: ["fullName", "email", "checkbox"],
  "private-event": [
    "fullName",
    "email",
    "phone",
    "date",
    "eventType",
    "guests",
    "message",
  ],
  "contact-us": ["firstName", "lastName", "email", "phone", "message"],
};

export async function handleWixFormSubmit(formData) {
  const formType = formData.get("formType");
  const keys = FIELD_KEYS[formType];
  const formId = FORM_IDS[formType];

  if (!keys || !formId) {
    return { success: false, message: "Unknown form type." };
  }

  // --- Collect raw values ---
  const values = {
    fullName: (formData.get("fullName") || "").trim(),
    firstName: (formData.get("firstName") || "").trim(),
    lastName: (formData.get("lastName") || "").trim(),
    email: (formData.get("email") || "").trim().toLowerCase(),
    phone: formData.get("phone") || "",
    checkbox:
      formData.get("checkbox") === "true" || formData.get("checkbox") === "on",
    date: formData.get("date") || "",
    eventType: formData.get("eventType") || "",
    guests: formData.get("guests") || "",
    message: formData.get("message") || "",
  };

  // --- Validate required fields for this form type ---
  const missing = REQUIRED_FIELDS[formType].filter((field) => {
    if (field === "checkbox") return values.checkbox !== true;
    return !values[field];
  });

  if (missing.length > 0) {
    return {
      success: false,
      message: `Please fill in all required fields: ${missing.join(", ")}.`,
    };
  }

  // --- Build submission payload for this specific form's field keys ---
  const submissionFields = { [keys.email]: values.email };
  if (keys.fullName) submissionFields[keys.fullName] = values.fullName;
  if (keys.firstName) submissionFields[keys.firstName] = values.firstName;
  if (keys.lastName) submissionFields[keys.lastName] = values.lastName;
  if (keys.phone) submissionFields[keys.phone] = values.phone;
  if (keys.checkbox) submissionFields[keys.checkbox] = values.checkbox;
  if (keys.date) submissionFields[keys.date] = values.date;
  if (keys.eventType) submissionFields[keys.eventType] = values.eventType;
  if (keys.guests) submissionFields[keys.guests] = values.guests;
  if (keys.message) submissionFields[keys.message] = values.message;

  // --- Submit. Wix handles Contact creation, labeling, and Inbox via Automation. ---
  try {
    await wixClient.submissions.createSubmission({
      formId,
      submissions: submissionFields,
    });
  } catch (error) {
    console.error(`Wix submission failed for "${formType}":`, error);
    return {
      success: false,
      message: "Submission failed. Please check your inputs and try again.",
    };
  }

  return {
    success: true,
    message: "Thank you! Your submission has been received.",
  };
}

"server-only";

import { createClient, ApiKeyStrategy } from "@wix/sdk";
import { contacts } from "@wix/crm";
import { items, collections } from "@wix/data";
import { submissions, forms } from "@wix/forms";

if (!process.env.WIX_API_KEY || !process.env.WIX_SITE_ID) {
  throw new Error("Missing Wix API environment variables.");
}

export const wixClient = createClient({
  modules: { contacts, items, collections, submissions, forms },
  auth: ApiKeyStrategy({
    apiKey: process.env.WIX_API_KEY,
    siteId: process.env.WIX_SITE_ID,
  }),
});

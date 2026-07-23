import { createClient, ApiKeyStrategy } from "@wix/sdk";
import { contacts } from "@wix/crm";

if (!process.env.WIX_API_KEY || !process.env.WIX_SITE_ID) {
  throw new Error("Missing Wix API Environment Variables.");
}

export const wixClient = createClient({
  modules: { contacts },
  auth: ApiKeyStrategy({
    apiKey: process.env.WIX_API_KEY,
    siteId: process.env.WIX_SITE_ID,
  }),
});

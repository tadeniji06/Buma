import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: "vtsqdpkh", 
  dataset: "production",
  apiVersion: "2025-09-21", 
  useCdn: true, 
});

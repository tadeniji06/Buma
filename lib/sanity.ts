import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: "xp7mmpyd", 
  dataset: "production",
  apiVersion: "2025-09-21", 
  useCdn: false, 
});

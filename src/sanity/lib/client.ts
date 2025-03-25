import { createClient } from "next-sanity";
import type { SanityClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-03-21",
  useCdn: false,
  perspective: 'published',
}); 
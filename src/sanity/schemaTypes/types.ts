import { type SchemaTypeDefinition } from 'sanity'

export type SanitySchema = SchemaTypeDefinition

export interface SanityField {
  name: string;
  title: string;
  type: string;
  validation?: (rule: any) => any;
  options?: {
    hotspot?: boolean;
    list?: { title: string; value: string }[];
    source?: string;
    maxLength?: number;
  };
  of?: Array<{ type: string; fields?: SanityField[] }>;
  initialValue?: unknown;
} 
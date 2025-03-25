import { type SchemaTypeDefinition } from 'sanity';
import courseSchema from './schemaTypes/course';
import serviceSchema from './schemaTypes/service';
import productSchema from './schemaTypes/product';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [courseSchema, serviceSchema, productSchema],
}; 
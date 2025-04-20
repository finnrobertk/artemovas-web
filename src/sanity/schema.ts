import { type SchemaTypeDefinition } from 'sanity';
import courseSchema from './schemaTypes/course';
import behandlingSchema from './schemaTypes/behandling';
import serviceSchema from './schemaTypes/service';
import productSchema from './schemaTypes/product';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [courseSchema, behandlingSchema, serviceSchema, productSchema],
}; 
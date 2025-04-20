import { type SchemaTypeDefinition } from 'sanity';
import behandling from './schemaTypes/behandling';
import kategori from './schemaTypes/kategori';
import service from './schemaTypes/service';
import product from './schemaTypes/product';
import course from './schemaTypes/course';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    behandling,
    kategori,
    service,
    product,
    course,
  ],
}; 
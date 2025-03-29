import { type SchemaTypeDefinition } from 'sanity'
import service from './service'
import course from './course'
import product from './product'

export const schemaTypes: SchemaTypeDefinition[] = [service, course, product] 
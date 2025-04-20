import { type SchemaTypeDefinition } from 'sanity'
import service from './service'
import behandling from './behandling'
import course from './course'
import product from './product'

export const schemaTypes: SchemaTypeDefinition[] = [service, behandling, course, product] 
import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import behandling from './behandling'
import kategori from './kategori'
import service from './service'
import product from './product'
import course from './course'

export const schemaTypes: SchemaTypeDefinition[] = [
  blockContentType,
  categoryType,
  postType,
  authorType,
  behandling,
  kategori,
  service,
  product,
  course
]

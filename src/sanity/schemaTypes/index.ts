import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { category } from './category'
import customer from './customer'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,category,customer],
}

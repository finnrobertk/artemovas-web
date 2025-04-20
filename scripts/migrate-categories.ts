import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config()

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-21',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const categories = [
  {
    title: "Vippe extensions",
    slug: "vippe-extensions",
    order: 1,
  },
  {
    title: "Ansiktsbehandling",
    slug: "ansiktsbehandling",
    order: 2,
  },
  {
    title: "Microblading: Øyebryn",
    slug: "microblading-oyebryn",
    order: 3,
  },
  {
    title: "Permanent Make Up",
    slug: "permanent-make-up",
    order: 4,
  },
  {
    title: "Tannbleking",
    slug: "tannbleking",
    order: 5,
  }
]

async function migrateCategoriesAndBehandlinger() {
  try {
    console.log('Starting migration...')
    
    // Create categories and store their IDs
    const categoryMap = new Map()
    
    for (const category of categories) {
      console.log(`Creating category: ${category.title}`)
      const result = await client.create({
        _type: 'kategori',
        title: category.title,
        slug: {
          _type: 'slug',
          current: category.slug
        },
        order: category.order
      })
      categoryMap.set(category.title.toLowerCase(), result._id)
    }

    // Get all behandlinger
    const behandlinger = await client.fetch(`*[_type == "behandling"]`)
    
    // Update each behandling with the new category reference
    for (const behandling of behandlinger) {
      const oldCategory = behandling.category.toLowerCase()
      let categoryId = null

      // Map old categories to new ones
      if (oldCategory.includes('vippe') || oldCategory.includes('eyelash')) {
        categoryId = categoryMap.get('vippe extensions')
      } else if (oldCategory.includes('ansikt') || oldCategory.includes('facial')) {
        categoryId = categoryMap.get('ansiktsbehandling')
      } else if (oldCategory.includes('bryn') || oldCategory.includes('brow')) {
        categoryId = categoryMap.get('microblading: øyebryn')
      } else if (oldCategory.includes('permanent')) {
        categoryId = categoryMap.get('permanent make up')
      } else if (oldCategory.includes('tann') || oldCategory.includes('teeth')) {
        categoryId = categoryMap.get('tannbleking')
      }

      if (categoryId) {
        console.log(`Updating behandling: ${behandling.title} with category: ${categoryId}`)
        await client.patch(behandling._id)
          .set({
            category: {
              _type: 'reference',
              _ref: categoryId
            }
          })
          .commit()
      } else {
        console.log(`No matching category found for behandling: ${behandling.title} (${oldCategory})`)
      }
    }

    console.log('Migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

migrateCategoriesAndBehandlinger() 
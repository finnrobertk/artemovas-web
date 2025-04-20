import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config()

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-21',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

interface TimmaService {
  name: string
  price: number
  duration: number
  isSubCategory: boolean
  subCategoryName: string
  subCategoryId: number
}

async function importServices() {
  try {
    // Read the JSON file
    const jsonData = fs.readFileSync(path.join(process.cwd(), 'tjenester.json'), 'utf8')
    const services: TimmaService[] = JSON.parse(jsonData)

    // Get all categories from Sanity
    const categories = await client.fetch(`*[_type == "kategori"]{
      _id,
      title
    }`)

    // Create a map of category titles to IDs
    const categoryMap = new Map(categories.map((cat: any) => [cat.title, cat._id]))

    // Filter out subcategories and map services
    const servicesToImport = services.filter(service => !service.isSubCategory)

    console.log(`Found ${servicesToImport.length} services to import`)

    for (const service of servicesToImport) {
      // Find the parent category name
      const parentCategory = services.find(s => 
        s.isSubCategory && s.subCategoryId === service.subCategoryId
      )
      
      if (!parentCategory) {
        console.log(`No parent category found for service: ${service.name}`)
        continue
      }

      const categoryId = categoryMap.get(parentCategory.name)
      if (!categoryId) {
        console.log(`No matching Sanity category found for: ${parentCategory.name}`)
        continue
      }

      const behandling = {
        _type: 'behandling',
        title: service.name,
        description: service.name,
        price: Math.round(service.price / 100), // Convert from øre to kroner
        duration: service.duration, // This is already a number in minutes
        category: {
          _type: 'reference',
          _ref: categoryId
        }
      }

      try {
        const result = await client.create(behandling)
        console.log(`Created behandling: ${result._id} - ${service.name} (${service.duration} min, ${Math.round(service.price / 100)} kr)`)
      } catch (error) {
        console.error(`Failed to create behandling for ${service.name}:`, error)
      }
    }

    console.log('Import completed!')

  } catch (error) {
    console.error('Import failed:', error)
  }
}

importServices() 
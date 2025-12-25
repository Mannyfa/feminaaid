
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'lxhvxr5b', // <--- REPLACE THIS
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2025-12-09', 
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => {
  return builder.image(source)
}
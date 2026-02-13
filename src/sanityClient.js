
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'lxhvxr5b', 
  dataset: 'production',
  useCdn: true, 
  apiVersion: '2025-12-09', 
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => {
  return builder.image(source)
}
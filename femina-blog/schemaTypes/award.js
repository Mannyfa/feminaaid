export default {
  name: 'award',
  title: 'Awards & Certifications',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Award / Certificate Title',
      type: 'string',
      description: 'e.g., "Best NGO of the Year" or "Leadership Certificate"',
      validation: Rule => Rule.required(),
    },
    {
      name: 'organization',
      title: 'Issuing Organization',
      type: 'string',
      description: 'Who gave this award? (e.g., "United Nations" or "Lagos State Govt")',
      validation: Rule => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date Received',
      type: 'date',
    },
    {
      name: 'description',
      title: 'Short Description (Optional)',
      type: 'text',
      rows: 3,
      description: 'A brief sentence about what the award was for.',
    },
    {
      name: 'image',
      title: 'Upload Certificate / Award Picture',
      type: 'image',
      description: 'Upload a picture directly from your phone gallery or laptop.',
      options: {
        hotspot: true, 
      },
    }
  ],
}
export default {
  name: 'gallery',
  title: 'Gallery Media',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title / Caption',
      type: 'string',
      description: 'e.g., "Women in Tech Summit 2026"',
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Summits', value: 'Summits' },
          { title: 'Workshops', value: 'Workshops' },
          { title: 'Community', value: 'Community' },
          { title: 'Dinners', value: 'Dinners' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image Cover / Thumbnail',
      type: 'image',
      description: 'Upload the photo here. If you are uploading a video, put a nice cover photo here so the website grid looks good before they click play.',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    },
    // --- THIS IS THE NEW PART ---
    {
      name: 'videoUpload',
      title: 'Upload Video File (Optional)',
      type: 'file',
      description: 'Upload an MP4 or MOV file directly from your phone/laptop.',
      options: {
        accept: 'video/*' // This tells the computer to only allow video files
      }
    },
    // ----------------------------
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., "Lagos, Nigeria"',
    },
    {
      name: 'date',
      title: 'Event Date',
      type: 'date',
    }
  ],
}
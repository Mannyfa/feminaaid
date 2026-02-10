// femina-blog/schemaTypes/announcement.js

export default {
  name: 'announcement',
  title: 'Announcement Banner',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'Just for reference (e.g., "Feb Summit Alert")',
    },
    {
      name: 'text',
      title: 'Announcement Text',
      type: 'string',
      validation: Rule => Rule.required().max(100).warning('Keep it short for mobile!'),
      description: 'The text users will see (e.g., "Join us in Lagos on Oct 24th!")',
    },
    {
      name: 'link',
      title: 'Link URL (Optional)',
      type: 'url',
      description: 'Where should people go when they click? (e.g., https://femina.com/events)',
    },
    {
      name: 'isActive',
      title: 'Switch ON/OFF',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle this OFF to hide the banner without deleting it.',
    },
  ],
}
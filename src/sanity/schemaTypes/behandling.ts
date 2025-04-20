import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: rule => rule.required().min(0),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Eyelashes', value: 'eyelashes' },
          { title: 'Facial', value: 'facial' },
          { title: 'Eyebrows', value: 'eyebrows' },
          { title: 'Permanent Makeup', value: 'permanent-makeup' },
          { title: 'Teeth Whitening', value: 'teeth-whitening' },
        ],
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: rule => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `${subtitle} - ${media ? 'Has image' : 'No image'}`,
        media,
      }
    },
  },
}) 
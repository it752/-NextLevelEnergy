export const post = {
  name: 'post',
  title: 'Wpis na Blogu',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Data',
      type: 'string',
      description: 'Format: DD.MM.YYYY (np. 12.02.2025)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Krótki opis (Zajawka)',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'fullText',
      title: 'Pełna treść postu',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Zdjęcie główne',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'date',
    },
  },
};

export const jobOffer = {
  name: 'jobOffer',
  title: 'Oferta Pracy',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Stanowisko',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'department',
      title: 'Dział',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'salary',
      title: 'Wynagrodzenie',
      type: 'string',
      description: 'Np. 8 000 - 25 000 zł',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Lokalizacja',
      type: 'string',
      description: 'Np. Cała Polska, Gdańsk',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Krótki opis / Wstęp',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'responsibilities',
      title: 'Zakres obowiązków',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'requirements',
      title: 'Nasze wymagania',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
    },
  },
};

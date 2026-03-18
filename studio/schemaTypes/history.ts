import { defineType, defineField } from 'sanity'

export const history = defineType({
  name: 'history',
  title: 'Historia',
  type: 'document',
  fields: [
    defineField({
      name: 'milestones',
      title: 'Kamienie milowe',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'milestone',
          fields: [
            { name: 'year', title: 'Rok', type: 'string' },
            { name: 'title', title: 'Tytuł', type: 'string' },
            { name: 'color', title: 'Kolor (HEX)', type: 'string', initialValue: '#A213DA' },
            { name: 'description', title: 'Opis', type: 'text' },
          ],
        },
      ],
      validation: (Rule) => Rule.length(5).error('Musi być dokładnie 5 elementów historii.'),
    }),
  ],
})

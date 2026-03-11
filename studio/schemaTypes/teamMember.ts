export const teamMember = {
  name: 'teamMember',
  title: 'Członek Zespołu',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Imię i Nazwisko',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Stanowisko',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Opis',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Adres E-mail',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'phone',
      title: 'Numer Telefonu',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Zdjęcie Profilowe (Preferowany kwadrat - Opcjonalnie)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'linkedin',
      title: 'Link do LinkedIn (Opcjonalnie)',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
};

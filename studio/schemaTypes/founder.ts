export const founder = {
  name: 'founder',
  title: 'Zarząd i Główni Założyciele',
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
      title: 'Zdjęcie Profilowe',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'linkedin',
      title: 'Link do LinkedIn (Opcjonalnie)',
      type: 'url',
    },
    {
      name: 'stats',
      title: 'Statystyki Umiejętności (Karta 3D)',
      type: 'object',
      fields: [
        { name: 'ovr', title: 'Overall (OVR)', type: 'number', validation: (Rule: any) => Rule.min(0).max(99).required() },
        { name: 'pac', title: 'Pace (PAC)', type: 'number', validation: (Rule: any) => Rule.min(0).max(99).required() },
        { name: 'sho', title: 'Shooting (SHO)', type: 'number', validation: (Rule: any) => Rule.min(0).max(99).required() },
        { name: 'pas', title: 'Passing (PAS)', type: 'number', validation: (Rule: any) => Rule.min(0).max(99).required() },
        { name: 'dri', title: 'Dribbling (DRI)', type: 'number', validation: (Rule: any) => Rule.min(0).max(99).required() },
        { name: 'def', title: 'Defending (DEF)', type: 'number', validation: (Rule: any) => Rule.min(0).max(99).required() },
        { name: 'phy', title: 'Physicality (PHY)', type: 'number', validation: (Rule: any) => Rule.min(0).max(99).required() }
      ]
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

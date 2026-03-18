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
        { name: 'ovr', title: 'Overall — wartość (OVR)', type: 'number', validation: (Rule: any) => Rule.min(0).max(99).required() },
        { name: 'pac', title: 'Stat 1 — wartość', type: 'number', validation: (Rule: any) => Rule.min(0).max(99).required() },
        { name: 'pacLabel', title: 'Stat 1 — skrót (3 litery, np. PAC)', type: 'string', initialValue: 'PAC', validation: (Rule: any) => Rule.required().max(3).uppercase() },
        { name: 'sho', title: 'Stat 2 — wartość', type: 'number', validation: (Rule: any) => Rule.min(0).max(99).required() },
        { name: 'shoLabel', title: 'Stat 2 — skrót (3 litery, np. SHO)', type: 'string', initialValue: 'SHO', validation: (Rule: any) => Rule.required().max(3).uppercase() },
        { name: 'pas', title: 'Stat 3 — wartość', type: 'number', validation: (Rule: any) => Rule.min(0).max(99).required() },
        { name: 'pasLabel', title: 'Stat 3 — skrót (3 litery, np. PAS)', type: 'string', initialValue: 'PAS', validation: (Rule: any) => Rule.required().max(3).uppercase() },
        { name: 'dri', title: 'Stat 4 — wartość', type: 'number', validation: (Rule: any) => Rule.min(0).max(99).required() },
        { name: 'driLabel', title: 'Stat 4 — skrót (3 litery, np. DRI)', type: 'string', initialValue: 'DRI', validation: (Rule: any) => Rule.required().max(3).uppercase() },
        { name: 'def', title: 'Stat 5 — wartość', type: 'number', validation: (Rule: any) => Rule.min(0).max(99).required() },
        { name: 'defLabel', title: 'Stat 5 — skrót (3 litery, np. DEF)', type: 'string', initialValue: 'DEF', validation: (Rule: any) => Rule.required().max(3).uppercase() },
        { name: 'phy', title: 'Stat 6 — wartość', type: 'number', validation: (Rule: any) => Rule.min(0).max(99).required() },
        { name: 'phyLabel', title: 'Stat 6 — skrót (3 litery, np. PHY)', type: 'string', initialValue: 'PHY', validation: (Rule: any) => Rule.required().max(3).uppercase() },
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

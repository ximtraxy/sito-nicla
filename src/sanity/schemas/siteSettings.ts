import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Impostazioni Sito & Profilo',
  type: 'document',
  fields: [
    defineField({
      name: 'photographerName',
      title: 'Nome Fotografa',
      type: 'string',
      initialValue: 'Nicla Cristiano',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Sottotitolo / Qualifica',
      type: 'string',
      initialValue: 'Fotografa & Visual Storyteller',
    }),
    defineField({
      name: 'heroText',
      title: 'Testo Hero / Frase d\'impatto in Homepage',
      type: 'text',
      rows: 2,
      initialValue: 'La fotografia come racconto intimo, luce naturale ed estetica editoriale.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Immagine Hero (Opzionale)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'profileImage',
      title: 'Foto Profilo (per pagina Chi Sono)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Biografia della Fotografa',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normale', value: 'normal' },
            { title: 'Citazione', value: 'blockquote' },
            { title: 'Intestazione', value: 'h3' },
          ],
        },
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email di Contatto',
      type: 'string',
      initialValue: 'niclacristiano.foto@gmail.com',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Link Social Network',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Piattaforma (es. Instagram, Behance, LinkedIn)',
              type: 'string',
            },
            {
              name: 'url',
              title: 'Link Profilo Completo (URL)',
              type: 'url',
            },
          ],
        },
      ],
      initialValue: [
        { platform: 'Instagram', url: 'https://instagram.com/niclacristiano_foto_' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'photographerName',
      subtitle: 'tagline',
      media: 'profileImage',
    },
  },
});

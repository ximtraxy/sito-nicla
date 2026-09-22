import { defineField, defineType } from 'sanity';
import GalleryInput from '../components/GalleryInput';

export default defineType({
  name: 'project',
  title: 'Progetti Fotografici',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo del Progetto',
      type: 'string',
      validation: (Rule) => Rule.required().error('Il titolo è obbligatorio'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL del progetto)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Lo slug è obbligatorio per creare il link'),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      description: 'Es: Ritratti, Reportage, Moda, Matrimoni, Editoriale',
      options: {
        list: [
          { title: 'Street', value: 'Street' },
          { title: 'Ritratti', value: 'Ritratti' },
          { title: 'Reportage', value: 'Reportage' },
          { title: 'Moda & Editoriale', value: 'Moda & Editoriale' },
          { title: 'Matrimoni', value: 'Matrimoni' },
          { title: 'Architettura & Spazi', value: 'Architettura & Spazi' },
          { title: 'Personale', value: 'Personale' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Anno di realizzazione',
      type: 'number',
      initialValue: new Date().getFullYear(),
    }),
    defineField({
      name: 'featured',
      title: 'In Evidenza (Mostra in prima posizione in Home)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Ordine di visualizzazione (1 per il primo, 2 per il secondo...)',
      type: 'number',
      initialValue: 10,
    }),
    defineField({
      name: 'coverImage',
      title: 'Immagine di Copertina (Cover)',
      type: 'image',
      description: 'Immagine principale mostrata nella griglia home e come anteprima',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('L\'immagine di copertina è obbligatoria'),
    }),
    defineField({
      name: 'description',
      title: 'Descrizione / Testo Editoriale',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normale', value: 'normal' },
            { title: 'Citazione d\'impatto', value: 'blockquote' },
            { title: 'Sottotitolo', value: 'h3' },
          ],
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Galleria Immagini',
      type: 'array',
      components: {
        input: GalleryInput,
      },
      options: {
        layout: 'grid',
      },
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Didascalia (Opzionale)',
              description: 'Breve testo descrittivo per l\'immagine (visibile anche nel lightbox)',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Testo Alternativo (Accessibilità)',
            },
          ],
          preview: {
            select: {
              title: 'caption',
              subtitle: 'alt',
              media: 'asset',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Immagine Galleria',
                subtitle: subtitle || '',
                media: media,
              };
            },
          },
        },
      ],
      description: 'Carica più foto contemporaneamente: trascina qui i file o un\'intera cartella dal tuo computer (drag & drop), oppure riordina le miniature trascinandole.',
    }),
  ],
  orderings: [
    {
      title: 'Ordine Manuale',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'year', direction: 'desc' },
      ],
    },
    {
      title: 'Anno (più recenti prima)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      year: 'year',
      media: 'coverImage',
    },
    prepare(selection) {
      const { title, category, year, media } = selection;
      return {
        title: title,
        subtitle: `${category || 'Generale'} • ${year || ''}`,
        media: media,
      };
    },
  },
});

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemas';
import { projectId, dataset } from './src/sanity/env';

export default defineConfig({
  basePath: '/studio',
  name: 'nicla_cristiano_portfolio',
  title: 'Nicla Cristiano Portfolio Studio',

  projectId: projectId || 'dummy-id',
  dataset: dataset || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenuti Portfolio')
          .items([
            // Singleton per le Impostazioni del Sito
            S.listItem()
              .title('Impostazioni Sito & Chi Sono')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            // Lista dei Progetti fotografici
            S.documentTypeListItem('project').title('Tutti i Progetti Fotografici'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});

import { TinaTemplate } from 'tinacms';

export const spacingswitchBlock: TinaTemplate = {
  name: 'spacingswitch',
  label: 'Spacing Switch',
  ui: {
    defaultItem: {
      text:
        'Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.',
    },
  },
  fields: [
    {
      type: 'string',
      label: 'Text',
      name: 'text',
      // ui: {
      //   component: 'markdown',
      // },
    },
    {
      type: 'image',
      label: 'Image',
      name: 'image',
    },
    {
      type: 'string',
      label: 'Image alt text',
      name: 'alt_text',
    },
  ],
}

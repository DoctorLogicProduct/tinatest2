import { TinaTemplate } from 'tinacms';

export const symmetrySwitchBlock: TinaTemplate = {
  name: 'symmetrySwitch',
  label: 'Symmetry Switch',
  ui: {
    defaultItem: {
      text:
        'Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.',
    },
  },
  fields: [
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

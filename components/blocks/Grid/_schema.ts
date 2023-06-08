import { TinaTemplate } from 'tinacms';

const defaultGridItem = {
  title: "Here's Another Feature",
  text: "This is where you might talk about the feature, if this wasn't just filler text.",
  image: "",
  image_alt: "This is the image alt text.",
  // there is no `icon` field on the
  // icon: {
  //     color: "",
  //     style: "float",
  //     name: "",
  // },
};

export const gridBlock: TinaTemplate = {
  name: "grid",
  label: "Grid",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      items: [defaultGridItem, defaultGridItem, defaultGridItem],
    },
  },
  fields: [
    {
      type: "object",
      label: "Grid Items",
      name: "items",
      list: true,
      ui: {
        defaultItem: {
          ...defaultGridItem,
        },
      },
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Text",
          name: "text",
          ui: {
            component: "textarea",
          },
        },
        {
          type: 'image',
          label: 'Image',
          name: 'image',
        },
        {
          type: 'string',
          label: 'Image Alt Tag',
          name: 'image_alt',
        },
        {
          type: 'string',
          label: 'Button Link',
          name: 'btn_link',
        },
        {
          type: 'string',
          label: 'Button Label',
          name: 'btn_label',
        },
      ],
    },
    {
      type: 'string',
      label: 'Layout',
      name: 'layout',
      options: [
        {
          label: '2 up',
          value: '50'
        },
        {
          label: '4 up',
          value: '25'
        },
        {
          label: 'Full Width',
          value: '100'
        },
      ],
    },
  ],
};

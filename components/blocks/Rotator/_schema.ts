import { Template } from 'tinacms';

const availableTags = [
  'Featured',
  'Modern',
  'Traditional'
];

function makeDefaultRotatorItem({ title = '', text = '', image = '' } = {}) {
  return {
    title: title || "Here's Another Item",
    text: text || "This is where you might talk about the item, if this wasn't just filler text.",
    image:  image || "",
    image_alt: "This is the image alt text.",
    // there is no `icon` field on the
    // icon: {
    //     color: "",
    //     style: "float",
    //     name: "",
    // },
  };
}

export const rotatorBlock: Template = {
  name: "rotator",
  label: "Rotator",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      itemProps: (item) => {
        return { label: `${item?.groupLabel}` }
      },
      items: [
        makeDefaultRotatorItem({
          title: 'New Site',
          text: 'This is the default site.',
          image: '/uploads/aionwellness.png',
        }),
      ]
    },
  },
  fields: [
    {
      type: "object",
      name: "items",
      label: "Items",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: `${item?.title}` }
        },
        defaultItem: {
          ...makeDefaultRotatorItem(),
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
          type: "string",
          name: "features",
          label: "Features",
          list: true,
          options: availableTags,
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
  ],
};

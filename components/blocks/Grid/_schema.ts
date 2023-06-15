import { TinaTemplate } from 'tinacms';

function makeDefaultGridItem({ title = '', text = '' } = {}) {
  return {
    title: title || "Here's Another Item",
    text: text || "This is where you might talk about the item, if this wasn't just filler text.",
    image: "",
    image_alt: "This is the image alt text.",
    // there is no `icon` field on the
    // icon: {
    //     color: "",
    //     style: "float",
    //     name: "",
    // },
  };
}

function makeDefaultGroup(params?: { groupLabel?: string } & Parameters<typeof makeDefaultGridItem>[0]) {
  return {
    label: params?.groupLabel || "New Group",
    items: [makeDefaultGridItem(params)],
  };
}

export const gridBlock: TinaTemplate = {
  name: "grid",
  label: "Grid",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      groups: [
        makeDefaultGroup({
          groupLabel: 'Group 1',
          title: 'Item 1.1',
        }),
        makeDefaultGroup({
          groupLabel: 'Group 2',
          title: 'Item 2.1',
        })
      ],
    },
  },
  fields: [
    {
      type: "object",
      name: "groups",
      label: "Groups",
      list: true,
      ui: {
        defaultItem: {
          ...makeDefaultGroup(),
        },
      },
      fields: [
        {
          type: "string",
          name: "label",
          label: "Label",
        },
        {
          type: "object",
          name: "items",
          label: "Group Items",
          list: true,
          ui: {
            defaultItem: {
              ...makeDefaultGridItem(),
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

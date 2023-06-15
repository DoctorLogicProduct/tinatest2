import { defineConfig, defineSchema, RouteMappingPlugin } from "tinacms";
import { client } from "./__generated__/client";
import { heroBlock } from '../components/blocks/Hero/_schema';
import { imageText50Block } from '../components/blocks/ImageText50/_schema';
import { featureBlock } from '../components/blocks/Features/_schema';
import { gridBlock } from '../components/blocks/Grid/_schema';
import { spacingSwitchBlock } from '../components/blocks/SpacingSwitch/_schema';

const schema = defineSchema({
  config: {
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    branch:
      process.env.NEXT_PUBLIC_TINA_BRANCH ||
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
      process.env.HEAD,
    token: process.env.TINA_TOKEN,
    media: {
      tina: {
        mediaRoot: "uploads",
        publicFolder: "public",
      },
    },
  },
  collections: [
    {
      label: "Home Page",
      name: "home",
      path: "content",
      format: "mdx",
      fields: [
        {
          type: 'object',
          list: true,
          name: 'blocks',
          label: 'Sections',
          templates: [heroBlock, imageText50Block, featureBlock, gridBlock, spacingSwitchBlock],
        },
      ],
    },
    {
      label: "Page Content",
      name: "page",
      path: "content/page",
      format: "mdx",
      fields: [
        {
          type: 'image',
          label: 'Hero image',
          name: 'hero',
        },
        {
          name: "body",
          label: "Main Content",
          type: "rich-text",
          isBody: true,
        },
      ]
    },
    {
      label: "Blog Posts",
      name: "post",
      path: "content/post",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: 'image',
          label: 'Hero image',
          name: 'imgSrc',
        },
        {
          type: "string",
          label: "Blog Post Body",
          name: "body",
          isBody: true,
          ui: {
            component: "textarea",
          },
        },
      ],
    },
  ],
});

export default schema;

export const tinaConfig = defineConfig({
  client,
  schema,
  cmsCallback: (cms) => {
    const RouteMapping = new RouteMappingPlugin((collection, document) => {
      if ("home" === collection.name && "home" === document._sys.filename) {
        return "/";
      }

      if (["page"].includes(collection.name)) {
        return `/${document._sys.filename}`;
      }

      if (["post"].includes(collection.name)) {
        return `/posts/${document._sys.filename}`;
      }

      return `/${collection.name}/${document._sys.filename}`;
    });

    cms.plugins.add(RouteMapping);

    return cms;
  },
});

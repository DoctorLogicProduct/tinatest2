import { defineConfig } from "tinacms";

import { heroBlock } from '../components/blocks/Hero/_schema';
import { imageText50Block } from '../components/blocks/ImageText50/_schema';
import { featureBlock } from '../components/blocks/Features/_schema';
import { gridBlock } from '../components/blocks/Grid/_schema';
import { spacingSwitchBlock } from '../components/blocks/SpacingSwitch/_schema';
import { symmetrySwitchBlock } from '../components/blocks/SymmetrySwitch/_schema';
import { rotatorBlock } from "../components/blocks/Rotator/_schema";

export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel branch env
    process.env.HEAD, // Netlify branch env
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        label: "Home Page",
        name: "home",
        path: "content",
        format: "mdx",
        match: {
          include: "home"
        },
        fields: [
          {
            type: 'object',
            list: true,
            name: 'blocks',
            label: 'Sections',
            templates: [
              heroBlock,
              imageText50Block,
              featureBlock,
              gridBlock,
              spacingSwitchBlock,
              symmetrySwitchBlock,
              rotatorBlock,
            ],
          },
        ],
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === 'home') {
              return '/';
            }

            return undefined;
          },
        }
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
        ],
        ui: {
          router: ({ document }) => document._sys.filename,
        },
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
        ui: {
          router: ({ document }) => {
            return `/posts/${document._sys.filename}`;
          },
        },
      },
    ],
  },
});

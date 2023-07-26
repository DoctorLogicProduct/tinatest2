import React from "react";

import type { Home } from "../tina/__generated__/types";
import { Hero } from "./blocks/Hero/Hero";
import { ImageText50 } from "./blocks/ImageText50/ImageText50";
import { Features } from "./blocks/Features/Features";
import { Grid } from "./blocks/Grid/Grid";
import { SpacingSwitch } from "./blocks/SpacingSwitch/SpacingSwitch";
import { SymmetrySwitch } from "./blocks/SymmetrySwitch/SymmetrySwitch";
import { RotatorBlock } from './blocks/Rotator/RotatorBlock';

export const Blocks = (props: Home) => {
  return (
    <>
      {
        props.blocks ?
          props.blocks.map(function (block, i) {
            switch (block.__typename) {
              case "HomeBlocksHero":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Hero
                      data={block}
                      parentField={`blocks.${i}`}
                    />
                  </div>
                );
              case "HomeBlocksImageText50":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <ImageText50
                      data={block}
                      parentField={`blocks.${i}`}
                    />
                  </div>
                );
              case "HomeBlocksFeatures":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Features
                      data={block}
                      parentField={`blocks.${i}`}
                    />
                  </div>
                );
              case "HomeBlocksGrid":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <Grid
                      data={block}
                      parentField={`blocks.${i}`}
                    />
                  </div>
                );
              case "HomeBlocksSpacingSwitch":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <SpacingSwitch
                      data={block}
                      parentField={`blocks.${i}`}
                    />
                  </div>
                );
              case "HomeBlocksSymmetrySwitch":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <SymmetrySwitch
                      data={block}
                      parentField={`blocks.${i}`}
                    />
                  </div>
                );
              case "HomeBlocksRotator":
                return (
                  <div
                    data-tinafield={`blocks.${i}`}
                    key={i + block.__typename}
                  >
                    <RotatorBlock
                      data={block}
                      parentField={`blocks.${i}`}
                    />
                  </div>
                );
              default:
                return null;
            }
          })
          : null
      }
    </>
  );
};

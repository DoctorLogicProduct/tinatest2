import * as React from "react";
import { HomeBlocksGrid, HomeBlocksGridItems } from '../../../.tina/__generated__/types';
import { BlockComponent } from '../_shared';

import styles from "./Grid.module.scss";

type GridItemParams = {
  data: HomeBlocksGridItems
  tinaField: string
}

const getLayoutClass = (layout: string) => styles[`grid--${layout}`];

const GridItem = ({ data, tinaField }: GridItemParams) => {
  return (
    <div
      data-tinafield={`${tinaField}`}
      className={styles.grid}
    >
      {(
        (data.image || []).length > 0 ?
          <div 
          className={styles.image}
          data-tinafield={`${tinaField}.image`}
          >
            <img src={data.image} alt={data.image_alt} />
          </div> :
          null
      )}

      {data.title && (
        <h3
          data-tinafield={`${tinaField}.title`}
          className={styles.headline}
        >
          {data.title}
        </h3>
      )}
      {data.text && (
        <p
          data-tinafield={`${tinaField}.text`}
          className={styles.text}
        >
          {data.text}
        </p>
      )}
      {data.btn_label && (
        <a
          data-tinafield={`${tinaField}.btn_link`}
          className={styles.button}
          href={data.btn_link}
        >
          <span
          data-tinafield={`${tinaField}.btn_label`}
          >
            {data.btn_label}
          </span>
          
        </a>
      )}
    </div>
  );
};

export const Grid: BlockComponent<HomeBlocksGrid> = ({ data, parentField }) => {
  return (
    <div
      className={`${styles.grid} ${getLayoutClass(data.layout)}`}
    >
      {data.items &&
        data.items.map(function (block, i) {
          return (
            <GridItem
              tinaField={`${parentField}.items.${i}`}
              key={i}
              data={block}
            />
          );
        })}
    </div>
  );
};

import * as React from "react";
import { HomeBlocksGrid, HomeBlocksGridGroups, HomeBlocksGridGroupsItems } from '../../../.tina/__generated__/types';
import { BlockComponent } from '../_shared';

import styles from "./Grid.module.scss";

type GridItemParams = {
  data: HomeBlocksGridGroupsItems
  tinaField: string
}

const getLayoutClass = (layout: string) => styles[`grid--${layout}`];

const GridItem = ({ data, tinaField }: GridItemParams) => {
  return (
    <div
      data-tinafield={`${tinaField}`}>
      {(
        (data.image || '').length > 0 ?
          <div
            className={styles.image}
            data-tinafield={`${tinaField}.image`}>
            <img
              src={data.image}
              alt={data.image_alt} />
          </div> :
          null
      )}

      {data.title && (
        <h3
          data-tinafield={`${tinaField}.title`}
          className={styles.headline}>
          {data.title}
        </h3>
      )}
      {data.text && (
        <p
          data-tinafield={`${tinaField}.text`}
          className={styles.text}>
          {data.text}
        </p>
      )}
      {data.btn_label && (
        <a
          data-tinafield={`${tinaField}.btn_link`}
          className={styles.button}
          href={data.btn_link}>
          <span
            data-tinafield={`${tinaField}.btn_label`}>
            {data.btn_label}
          </span>

        </a>
      )}
    </div>
  );
};

type GridGroupParams = {
  inputName: string
  inputId: string
  checked: boolean
  data: HomeBlocksGridGroups
  tinaField: string
}

const GridGroup = ({ inputName, inputId, checked, data, tinaField }: GridGroupParams) => {
  // todo: add classes and probably other markup
  return data.items?.length > 0 ?
    (<>
      <input
        type="radio"
        id={inputId}
        name={inputName}
        defaultChecked={checked} />
      <label
        htmlFor={inputId}
        data-tinafield={tinaField}>
        <span
          data-tinafield={`${tinaField}.label`}>
          {data.label}
        </span>
      </label>
      <div
        className={styles.group}>
        {
          data.items.map((block, i) => {
            const key = `${tinaField}.items.${i}`;
            return (
              <GridItem
                key={key}
                tinaField={key}
                data={block} />
            );
          })
        }
      </div>
    </>)
    : null;
};

export const Grid: BlockComponent<HomeBlocksGrid> = ({ data, parentField }) => {
  const inputName = `grid-toggle-${Math.floor(Math.random() * 100) + 1}`;

  return (
    <div
      className={`${styles.grid} ${getLayoutClass(data.layout)}`}>
      {data.groups &&
        data.groups.map((block, i) => (
          <GridGroup
            key={i}
            tinaField={`${parentField}.groups.${i}`}
            inputId={`${inputName}-${i}`}
            checked={i === 0}
            inputName={inputName}
            data={block} />
        ))}
    </div>
  );
};

import React, { Dispatch, FC, MouseEventHandler, SetStateAction, useEffect, useLayoutEffect, useState } from "react";
import { HomeBlocksGrid, HomeBlocksGridGroups, HomeBlocksGridGroupsItems } from '../../../.tina/__generated__/types';
import { BlockComponent } from '../_shared';

import styles from "./Grid.module.scss";
import { classNames } from "tinacms";


type GridItemParams = {
  setSelectedItem: Dispatch<SetStateAction<HomeBlocksGridGroupsItems>>
  data: HomeBlocksGridGroupsItems
  tinaField: string
}

const getLayoutClass = (layout: string) => styles[`grid--${layout}`];

const GridItem = ({ data, tinaField, setSelectedItem }: GridItemParams) => {
  return (
    <div
      onClick={() => setSelectedItem(data)}
      data-tinafield={`${tinaField}`}>
      {(
        (data.image || '').length > 0 ?
          <div
            className={styles.image}
            data-tinafield={`${tinaField}.image`}>
            <img
              src={data.image}
              alt={data.image_alt} />
            {data.title && (
              <h3
                className={styles.image__headline}
                data-tinafield={`${tinaField}.title`}>
                {data.title}
              </h3>
            )}
          </div> :
          null
      )}
    </div>
  );
};



type GridGroupParams = {
  setSelectedItem: Dispatch<SetStateAction<HomeBlocksGridGroupsItems>>
  inputName: string
  inputId: string
  checked: boolean
  data: HomeBlocksGridGroups
  tinaField: string
}

const GridGroup = ({ setSelectedItem, inputName, inputId, checked, data, tinaField }: GridGroupParams) => {
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
                setSelectedItem={setSelectedItem}
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

type GridModalParams = {
  item: HomeBlocksGridGroupsItems
  setSelectedItem: Dispatch<SetStateAction<HomeBlocksGridGroupsItems>>
}

const GridModal: FC<GridModalParams> = ({ item, setSelectedItem }) => {
  const [className, setClassName] = useState(classNames(styles.modal, styles.modal_close));

  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        setClassName(styles.modal);
      }, 1000);
    });

  }, [item]);

  if (!item) {
    return null;
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = (ev) => {
    if (ev.target instanceof HTMLElement) {
      const parent = ev.target.parentElement
      parent.addEventListener('transitionend', () => setSelectedItem(null))
      parent.classList.add(styles.modal_close)
    }
  }

  return (
    <div
      className={className}>
      <button
        onClick={handleClick}>
        X
      </button>
      {(
        (item.image || '').length > 0 ?
          <div
            className={styles.image__modal}>
            <img
              src={item.image}
              alt={item.image_alt} />
          </div> :
          null
      )}

      {item.title && (
        <h3
          className={styles.headline}>
          {item.title}
        </h3>
      )}
      {item.text && (
        <p
          className={styles.text}>
          {item.text}
        </p>
      )}
      {item.btn_label && (
        <a
          className={styles.button}
          href={item.btn_link}>
          <span>
            {item.btn_label}
          </span>

        </a>
      )}
    </div>
  );
};

export const Grid: BlockComponent<HomeBlocksGrid> = ({ data, parentField }) => {
  const [selectedItem, setSelectedItem] = useState<HomeBlocksGridGroupsItems>();
  const inputName = `grid-toggle-${Math.floor(Math.random() * 100) + 1}`;

  return (
    <div
      className={`${styles.grid} ${getLayoutClass(data.layout)}`}>
      {data.groups &&
        data.groups.map((block, i) => (
          <GridGroup
            setSelectedItem={setSelectedItem}
            key={i}
            tinaField={`${parentField}.groups.${i}`}
            inputId={`${inputName}-${i}`}
            checked={i === 0}
            inputName={inputName}
            data={block} />
        ))}
      <GridModal
        item={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </div>
  );
};

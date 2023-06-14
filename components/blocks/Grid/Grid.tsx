import React, { Dispatch, FC, MouseEventHandler, SetStateAction, useId, useState } from "react";
import { classNames } from "tinacms";

import { HomeBlocksGrid, HomeBlocksGridGroups, HomeBlocksGridGroupsItems } from '../../../.tina/__generated__/types';
import { BlockComponent } from '../_shared';

import styles from "./Grid.module.scss";


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
  checked: boolean
  data: HomeBlocksGridGroups
  tinaField: string
}

const GridGroup = ({ setSelectedItem, inputName, checked, data, tinaField }: GridGroupParams) => {
  // todo: add classes and probably other markup
  const id = useId();

  return data.items?.length > 0 ?
    (<>
      <input
        type="radio"
        id={id}
        name={inputName}
        defaultChecked={checked} />
      <label
        htmlFor={id}
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
  isOpen: boolean
  onCloseClick: MouseEventHandler<HTMLButtonElement>
}

const GridModal: FC<GridModalParams> = ({ item = {}, isOpen, onCloseClick }) => {
  return (
    <div
      className={classNames(styles.modal, isOpen ? styles.modal_open : styles.modal_close)}
      aria-hidden={!isOpen}>
      <div
        className={styles.modal_content}>
        <button
          onClick={onCloseClick}>
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
    </div>
  );
};

export const Grid: BlockComponent<HomeBlocksGrid> = ({ data, parentField }) => {
  const [selectedItem, setSelectedItem] = useState<HomeBlocksGridGroupsItems>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gridToggleId = useId();
  const inputName = `grid-toggle-${gridToggleId}`;

  return (
    <div
      className={`${styles.grid} ${getLayoutClass(data.layout)}`}>
      {data.groups &&
        data.groups.map((block, i) => (
          <GridGroup
            setSelectedItem={item => {
              setSelectedItem(item);
              setIsModalOpen(true);
            }}
            key={i}
            tinaField={`${parentField}.groups.${i}`}
            checked={i === 0}
            inputName={inputName}
            data={block} />
        ))}
      <GridModal
        item={selectedItem}
        isOpen={isModalOpen}
        onCloseClick={() => setIsModalOpen(false)}
      />
    </div>
  );
};

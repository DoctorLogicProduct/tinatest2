import React, { Dispatch, FC, MouseEventHandler, SetStateAction, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
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
      data-tinafield={`${tinaField}`}
      className={styles.item}
    >
      {(
        (data.image || '').length > 0 ?
          <div className={styles.item_wrapper}>
            <div
              className={styles.image}
              data-tinafield={`${tinaField}.image`}>
              <img
                src={data.image}
                alt={data.image_alt} />
            </div>
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

22
const GridGroupFeatures: FC<{ features: string[] }> = ({features}) => {
  return (
    features &&
    <div className={styles.modal_features}>
      {
        features
          .map((feature) => {
            const key = feature;
            return (
              <span
                key={key}>
                {feature}
              </span>
            );
          })
      }
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
        <div className={styles.modal_text}>
        {item.title && (
          <h2
            className={styles.headline}>
            {item.title}
          </h2>
        )}
        {item.text && (
          <p
            className={styles.text}>
            {item.text}
          </p>
        )}
        {item.btn_label && (
          <a
            className={styles.btn_label}
            href={item.btn_link}>
            <span>
              {item.btn_label}
            </span>
          </a>
        )}
        <GridGroupFeatures
          features={item.features}
        />
        </div>
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
      </div>
    </div>
  );
};

export const Grid: BlockComponent<HomeBlocksGrid> = ({ data, parentField }) => {
  const [selectedItem, setSelectedItem] = useState<HomeBlocksGridGroupsItems>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rendered, setRendered] = useState(false);
  const gridToggleId = useId();
  const inputName = `grid-toggle-${gridToggleId}`;

  useEffect(() => {
    setRendered(true);
  }, []);

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
      {
        rendered &&
        createPortal(
          <GridModal
            item={selectedItem}
            isOpen={isModalOpen}
            onCloseClick={() => setIsModalOpen(false)}
          />,
          document.body
        )
      }
    </div>
  );
};

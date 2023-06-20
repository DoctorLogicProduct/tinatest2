import { ButtonHTMLAttributes, FC, MouseEventHandler } from 'react';
import { classNames } from 'tinacms';

import { HomeBlocksGridGroupsItems, Maybe } from '../../../.tina/__generated__/types';

import styles from "./Grid.module.scss";

type GridModalParams = {
  item: Maybe<HomeBlocksGridGroupsItems>
  isOpen: boolean
  onCloseClick: MouseEventHandler<HTMLButtonElement>
  hasNext: boolean
  onNextClick: MouseEventHandler<HTMLButtonElement>
  hasPrev: boolean
  onPrevClick: MouseEventHandler<HTMLButtonElement>
}

export const GridModal: FC<GridModalParams> = ({
  item = {},
  isOpen,
  onCloseClick,
  hasNext,
  onNextClick,
  hasPrev,
  onPrevClick,
}) => {
  return (
    <div
      className={classNames(styles.modal, isOpen ? styles.modal_open : styles.modal_close)}
      aria-hidden={!isOpen}>
      <div
        className={styles.modal_content}>
        <button
          className={styles.modal_button}
          onClick={onCloseClick}>
          X
        </button>
        {makeButton(
          {
            when: hasPrev,
            className: styles.modal_button_prev,
            onClick: onPrevClick,
            children: '<'
          }
        )}
        {makeButton({
          when: hasNext,
          className: styles.modal_button_next,
          onClick: onNextClick,
          children: '>',
        })}
        <div
          className={styles.modal_text}>
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
              className={styles.button}
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

function GridGroupFeatures({ features }: { features: string[] }) {
  return (
    features &&
    <div
      className={styles.modal_features}>
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

function makeButton({ when, children, ...attrs }: { when: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return when ?
    (
      <button
        {...attrs}
        className={classNames(styles.modal_button, attrs.className)}
      >
        {children}
      </button>
    ) :
    null;
}

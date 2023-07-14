import { ButtonHTMLAttributes, FC, MouseEventHandler } from 'react';
import { classNames } from 'tinacms';

import { HomeBlocksGridGroupsItems, Maybe } from '../../../tina/__generated__/types';

import styles from "./Rotator.module.scss";

type RotatorModalParams = {
  item: Maybe<HomeBlocksGridGroupsItems>
  isOpen: boolean
  onCloseClick: MouseEventHandler<HTMLButtonElement>
  hasNext: boolean
  onNextClick: MouseEventHandler<HTMLButtonElement>
  hasPrev: boolean
  onPrevClick: MouseEventHandler<HTMLButtonElement>
}

export const RotatorModal: FC<RotatorModalParams> = ({
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
            className: styles.btn_prev,
            onClick: onPrevClick,
            children: '<'
          }
        )}
        {makeButton({
          when: hasNext,
          className: styles.btn_next,
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
              className={styles.btn_label}
              href={item.btn_link}>
              <span>
                {item.btn_label}
              </span>

            </a>
          )}
          <RotatorGroupFeatures
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

function RotatorGroupFeatures({ features }: { features: string[] }) {
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

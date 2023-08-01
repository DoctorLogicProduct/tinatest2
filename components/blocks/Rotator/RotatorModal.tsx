import { ButtonHTMLAttributes, FC, MouseEventHandler, ReactNode } from 'react';
import { classNames } from 'tinacms';

import { HomeBlocksRotatorItems, Maybe } from '../../../tina/__generated__/types';
import { sanitizeIdent } from '../../../util';

import { featuredFeatures } from './_schema';

import styles from "./RotatorModal.module.scss";

type RotatorModalParams = {
  item: Maybe<HomeBlocksRotatorItems>
  selectedFeature?: string
  features: ReactNode
  isOpen: boolean
  onCloseClick: MouseEventHandler<HTMLButtonElement>
  hasNext: boolean
  onNextClick: MouseEventHandler<HTMLButtonElement>
  hasPrev: boolean
  onPrevClick: MouseEventHandler<HTMLButtonElement>
}

export const RotatorModal: FC<RotatorModalParams> = ({
  item = {},
  selectedFeature = '',
  features = null,
  isOpen,
  onCloseClick,
  hasNext,
  onNextClick,
  hasPrev,
  onPrevClick,
}) => {
  return (
    <div
      className={classNames(
        styles.modal,
        isOpen ? styles.modal_open : styles.modal_close,
        ...(item?.features?.map(makeFeatureClass) ?? [])
      )}
      aria-hidden={!isOpen}
    >
      <div
        className={styles.modal_content}
      >
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
          className={styles.modal_text}
        >
          {
            featuredFeatures.includes(selectedFeature) ? (
              <>
                {item.title && (
                  <h2
                    className={styles.headline}
                  >
                    {item.title}
                  </h2>
                )}
                {item.text && (
                  <p
                    className={styles.text}
                  >
                    {item.text}
                  </p>
                )}
                {item.btn_label && (
                  <a
                    className={styles.btn_label}
                    href={item.btn_link}
                  >
                    <span>
                      {item.btn_label}
                    </span>

                  </a>
                )}
              </>
            ) :
              null
          }
          {
            features &&
            (
              <div
                className={styles.modal_features}
              >
                {features}
              </div>
            )
          }
        </div>
        {(
          (item.image || '').length > 0 ?
            <div
              className={styles.image__modal}
            >
              <img
                src={item.image}
                alt={item.image_alt}
              />
            </div> :
            null
        )}
      </div>
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

function makeFeatureClass(feature: string): string {
  return `modal--${sanitizeIdent(feature)}`;
}

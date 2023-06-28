import React, { CSSProperties, FC, PropsWithChildren, useState } from "react";
import { classNames } from 'tinacms';

import { HomeBlocksSymmetrySwitch } from '../../../tina/__generated__/types';
import { BlockComponent } from '../_shared';

import styles from "./SymmetrySwitch.module.scss";

const Toggle: FC<PropsWithChildren<{ isChecked: boolean, onClick: () => void }>> = ({ children, isChecked, onClick }) => {
  return (
    <button
      className={classNames(styles.toggle, isChecked ? styles.toggle__checked : '')}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const SymmetrySwitch: BlockComponent<HomeBlocksSymmetrySwitch> = ({ data, parentField }) => {
  const [checkedIndex, setCheckedIndex] = useState(0);

  const toggleConfigs = [
    {
      label: 'Symmetrical',
      // className: styles.moderate,
      isChecked: false,
      margin: '0',
    },
    {
      label: 'Asymmetrical',
      // className: styles.heavy,
      isChecked: false,
      margin: '4cqw',
    }
  ];

  // find the checked config and set its `isChecked`
  const checkedToggleConfig = toggleConfigs
    .find((config, i) => {
      if (i === checkedIndex) {
        config.isChecked = true;
        return config;
      }
    });

  const makeMarginStyle = (): CSSProperties => {
    // we're doing this so TS doesn't complain about object literals declaring an unknown type
    let style: CSSProperties = {};
    if (checkedToggleConfig.margin) {
      style['--margin'] = checkedToggleConfig.margin;
    }
    return style;
  };

  return (
    <div
      className={styles.symmetryswitch}
    >
      <div
        className={styles.symmetryswitch__container}
      >
        <h3>Website Symmetry Options</h3>
        <div
          className={styles.toggles}
        >
          {
            toggleConfigs
              .map(({ isChecked, label }, index) => (
                <Toggle
                  key={label}
                  isChecked={isChecked}
                  onClick={() => {
                    setCheckedIndex(() => index);
                  }}>
                  <span>{label}</span>
                </Toggle>
              ))
          }
        </div>
        <div
          className={styles.items}
          style={makeMarginStyle()}
        >
          <div
            className={styles.item}
          >
            <div
              className={styles.item_image}
            >
              {data.image && (
                <div
                  data-tinafield={`${parentField}.image`}
                  className="spacingswitch__item_image_item"
                >
                  <img
                    className=""
                    alt={data.alt_text}
                    src={data.image}
                    // react won't let us put multiple `data-tinafield` attributes on the same element, so we'll add this one here
                    data-tinafield={`${parentField}.alt_text`}
                  />
                </div>
              )}
            </div>
            <div
              className={styles.item_image}
            >
              {data.image && (
                <div
                  data-tinafield={`${parentField}.image`}
                  className="spacingswitch__item_image_item"
                >
                  <img
                    className=""
                    alt={data.alt_text}
                    src={data.image}
                    // react won't let us put multiple `data-tinafield` attributes on the same element, so we'll add this one here
                    data-tinafield={`${parentField}.alt_text`}
                  />
                </div>
              )}
            </div>
          </div>
          <div
            className={styles.item}
          >
            <div
              className={styles.item_image}
            >
              {data.image && (
                <div
                  data-tinafield={`${parentField}.image`}
                  className="spacingswitch__item_image_item"
                >
                  <img
                    className=""
                    alt={data.alt_text}
                    src={data.image}
                    // react won't let us put multiple `data-tinafield` attributes on the same element, so we'll add this one here
                    data-tinafield={`${parentField}.alt_text`}
                  />
                </div>
              )}
            </div>
            <div
              className={styles.item_image}
            >
              {data.image && (
                <div
                  data-tinafield={`${parentField}.image`}
                  className="spacingswitch__item_image_item"
                >
                  <img
                    className=""
                    alt={data.alt_text}
                    src={data.image}
                    // react won't let us put multiple `data-tinafield` attributes on the same element, so we'll add this one here
                    data-tinafield={`${parentField}.alt_text`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import * as React from "react";
import { HomeBlocksSpacingSwitch } from '../../../.tina/__generated__/types';
import styles from "./SpacingSwitch.module.scss";
import { BlockComponent } from '../_shared';

export const SpacingSwitch: BlockComponent<HomeBlocksSpacingSwitch> = ({ data, parentField }) => {
  return (
    <div className={styles.spacingswitch}>
      <div className={styles.spacingswitch__container}>
        <div className={styles.spacingswitch__toggles}>
          <span className={styles.spacingswitch__toggle}>
            Full Width
          </span>
          <span className={styles.spacingswitch__toggle}>
            Moderate Padding
          </span>
          <span className={styles.spacingswitch__toggle}>
            Heavy Padding
          </span>
        </div>
        <div className={styles.spacingswitch__items}>
          <div className={styles.spacingswitch__item}>
            <div className={styles.spacingswitch__item_text}>
            {data.text && (
                <p
                  data-tinafield={`${parentField}.text`}
                  className={styles.hero__headline}
                >
                  {data.text}
                </p>
              )}
            </div>
            <div className={styles.spacingswitch__item_image}>
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
          <div className={styles.spacingswitch__item}>
            <div className={styles.spacingswitch__item_text}>
            {data.text && (
                <p
                  data-tinafield={`${parentField}.text`}
                  className={styles.hero__headline}
                >
                  {data.text}
                </p>
              )}
            </div>
            <div className={styles.spacingswitch__item_image}>
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

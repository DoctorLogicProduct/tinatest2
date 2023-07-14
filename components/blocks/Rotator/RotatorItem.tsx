import React, { FC } from 'react';

import { HomeBlocksGridGroupsItems } from '../../../tina/__generated__/types';

import styles from "./Rotator.module.scss";

type RotatorItemParams = {
  onClick: () => void
  data: HomeBlocksGridGroupsItems
  tinaField: string
}

export const RotatorItem: FC<RotatorItemParams> = ({ data, tinaField, onClick }) => {
  return (
    <div
      onClick={onClick}
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

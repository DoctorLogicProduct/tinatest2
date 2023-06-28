import * as React from "react";
import { HomeBlocksFeatures, HomeBlocksFeaturesItems } from '../../../tina/__generated__/types';
import { BlockComponent } from '../_shared';

import styles from "./Features.module.scss";

type FeatureParams = {
  data: HomeBlocksFeaturesItems
  tinaField: string
}

const getLayoutClass = (layout: string) => styles[`features--${layout}`];

const Feature = ({ data, tinaField }: FeatureParams) => {
  return (
    <div
      data-tinafield={`${tinaField}`}
      className={styles.feature}
    >
      {(
        (data.image || []).length > 0 ?
          <div
          className={styles.image}
          data-tinafield={`${tinaField}.image`}
          >
            <img src={data.image} alt={data.image_alt} />
          </div> :
          null
      )}

      {data.title && (
        <h3
          data-tinafield={`${tinaField}.title`}
          className={styles.headline}
        >
          {data.title}
        </h3>
      )}
      {data.text && (
        <p
          data-tinafield={`${tinaField}.text`}
          className={styles.text}
        >
          {data.text}
        </p>
      )}
      {data.btn_label && (
        <a
          data-tinafield={`${tinaField}.btn_link`}
          className={styles.button}
          href={data.btn_link}
        >
          <span
          data-tinafield={`${tinaField}.btn_label`}
          >
            {data.btn_label}
          </span>

        </a>
      )}
    </div>
  );
};

export const Features: BlockComponent<HomeBlocksFeatures> = ({ data, parentField }) => {
  return (
    <div
      className={`${styles.features} ${getLayoutClass(data.layout)}`}
    >
      {data.items &&
        data.items.map(function (block, i) {
          return (
            <Feature
              tinaField={`${parentField}.items.${i}`}
              key={i}
              data={block}
            />
          );
        })}
    </div>
  );
};

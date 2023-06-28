import * as React from "react";
import { HomeBlocksHero } from '../../../tina/__generated__/types';
import styles from "./Hero.module.scss";
import { BlockComponent } from '../_shared';

export const Hero: BlockComponent<HomeBlocksHero> = ({ data, parentField }) => {
  return (
    <div className={styles.hero}>
      <div className={styles.hero__text}>
        {data.tagline && (
          <h3
            data-tinafield={`${parentField}.tagline`}
            className={styles.featured__subheadline}
          >
            {data.tagline}
          </h3>
        )}
        {data.headline && (
          <h2
            data-tinafield={`${parentField}.headline`}
            className=""
          >
            {data.headline}
          </h2>
        )}
        {data.text && (
          <p
            data-tinafield={`${parentField}.text`}
            className={styles.hero__headline}
          >
            {data.text}
          </p>
        )}
        <a
          className={styles.btn}
          href={data.btn_link}
        >
          {data.btn_label}
        </a>
      </div>
      <div className={styles.hero__image}>
        {data.image && (
          <div
            data-tinafield={`${parentField}.image`}
            className="hero__image-item"
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
  );
};

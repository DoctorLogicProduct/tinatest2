import React from 'react';

import styles from "./RotatorModalFeature.module.scss";

export type RotatorModalFeatureProps = {
  feature: string
  link?: string
  onClick?: ((event: React.MouseEvent) => void)
}

export function RotatorModalFeature({ feature, link, onClick }: RotatorModalFeatureProps) {
  const hasLink = link?.trim()?.length > 0 ?? false;

  return (
    hasLink ? (
      <a
        className={styles.feature}
        href={link}
        onClick={onClick}
      >
        {feature}
      </a>
    )
      : (
        <span
          className={styles.feature}
          onClick={onClick}
        >
          {feature}
        </span>
      )
  );
}

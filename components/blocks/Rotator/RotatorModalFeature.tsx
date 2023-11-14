import React from 'react';
import { classNames } from 'tinacms';

import styles from "./RotatorModalFeature.module.scss";

export type RotatorModalFeatureProps = {
  isCurrent: boolean
  feature: string
  link?: string
  onClick?: ((event: React.MouseEvent) => void)
}

export function RotatorModalFeature({ isCurrent, feature, link, onClick }: RotatorModalFeatureProps) {
  const hasLink = link?.trim()?.length > 0 ?? false;
  const className = classNames(
    styles.feature,
    isCurrent ? styles.current : '',
  );

  return (
    hasLink ? (
      <a
        className={className}
        href={link}
        onClick={onClick}
      >
        {feature}
      </a>
    )
      : (
        <span
          className={className}
          onClick={onClick}
        >
          {feature}
        </span>
      )
  );
}

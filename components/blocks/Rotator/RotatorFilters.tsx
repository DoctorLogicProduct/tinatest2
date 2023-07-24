import React, { useId } from 'react';
import { classNames } from 'tinacms';

import styles from './RotatorFilters.module.scss';

export type RotatorFiltersProps = {
  selected: string
  features: string[]
  onChange: (selected: string) => void
};

export function RotatorFilters({ selected, features, onChange }: RotatorFiltersProps) {
  const filterId = useId();

  return (
    <div
      className={styles.filters}
    >
      <ul
        className={styles.items}
      >
        {features
          .map(feature => {
            const isSelected = feature === selected;

            return (
              <li
                key={feature}
                className={classNames(styles.item, isSelected ? styles.item_selected : '')}
                onClick={() => {
                  onChange(feature);
                }}
              >
                <span>
                  {feature}
                </span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

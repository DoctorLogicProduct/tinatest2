import React from "react";

import {
  HomeBlocksRotator,
  HomeBlocksRotatorItems,
  HomeBlocksRotatorRows,
} from "../../../tina/__generated__/types";
import { BlockComponent } from "../_shared";

import { Rotator } from "./Rotator";

import styles from './RotatorBlock.module.scss';

export const RotatorBlock: BlockComponent<HomeBlocksRotator> = ({
  data,
  parentField,
}) => {
  const { items = [], rows = [] } = data;

  return (
    <div>
      {rows
        // make sure each row has a feature and each feature only appears once
        .reduce((cleanedRows, row) => {
          if (
            row.feature &&
            !cleanedRows.some((r) => r.feature === row.feature)
          ) {
            cleanedRows.push(row);
          }

          return cleanedRows;
        }, [])
        // convert row data to components
        .map((row) => (
          <Row
            key={row.feature}
            items={items}
            row={row}
            parentField={parentField}
          />
        ))}
    </div>
  );
};

type RowProps = {
  items: HomeBlocksRotatorItems[];
  row: HomeBlocksRotatorRows;
  parentField: string;
};

function Row(props: RowProps) {
  const id = `rotator-${props.row.feature}`;

  // filter items by the row feature
  const items = props.items.filter((item) =>
    item.features.includes(props.row.feature),
  );

  return (
    <div
      id={id}
    >
      <p
        className={styles.label}
      >
        {props.row.label}
      </p>
      <Rotator
        {...props}
        items={items}
      />
    </div>
  );
}

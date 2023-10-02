import React from "react";

import {
  HomeBlocksRotator,
  HomeBlocksRotatorItems,
  HomeBlocksRotatorRows,
} from "../../../tina/__generated__/types";
import { sanitizeIdent } from '../../../util';

import { BlockComponent } from "../_shared";

import { Rotator } from "./Rotator";
import { RotatorModal } from './RotatorModal';
import { RotatorModalFeature } from './RotatorModalFeature';

import styles from './RotatorBlock.module.scss';

export const RotatorBlock: BlockComponent<HomeBlocksRotator> = ({
  data,
  parentField,
}) => {
  const { items = [], rows = [] } = data;

  const rowFeatures = rows.map(row => row.feature);

  return (
    <div
      className={styles.rotator_block}
    >
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
            rowFeatures={rowFeatures}
            parentField={parentField}
          />
        ))}
    </div>
  );
};

type RowProps = {
  items: HomeBlocksRotatorItems[]
  row: HomeBlocksRotatorRows
  rowFeatures: string[]
  parentField: string
};

function Row(props: RowProps) {
  const id = rotatorIdFromFeature(props.row.feature);

  // filter items by the row feature
  const items = props.items.filter((item) =>
    item?.features?.includes(props.row.feature)
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
        modalComponent={modalProps => (
          <RotatorModal
            {...modalProps}
            selectedFeature={props.row.feature}
            features={
              modalProps
                .item
                ?.features
                // order the features to make sure the selected feature is first
                ?.reduce((list, item) => {
                  if (item === props.row.feature) {
                    list.unshift(item);
                  } else {
                    list.push(item);
                  }
                  return list;
                }, [])
                // convert features to components
                ?.map(feature => {
                  const isCurrent = feature === props.row.feature;

                  // only show a link if the feature isn't the current one and there is a rotator for it
                  const link =
                    (
                      isCurrent ||
                      !props.rowFeatures.includes(feature)
                    ) ?
                      '' :
                      `#${rotatorIdFromFeature(feature)}`;

                  return (
                    <RotatorModalFeature
                      key={feature}
                      isCurrent={isCurrent}
                      feature={feature}
                      link={link}
                      onClick={link ? modalProps.onCloseClick : null}
                    />
                  );
                })
            }
          />
        )}
      />
    </div>
  );
}

function rotatorIdFromFeature(feature: string) {
  return `${sanitizeIdent(feature)}-rotator`;
}

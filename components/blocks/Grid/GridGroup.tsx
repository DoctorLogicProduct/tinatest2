import React, { useId } from 'react'

import { HomeBlocksGridGroups } from '../../../tina/__generated__/types'
import { GridItem } from './GridItem'

import styles from "./Grid.module.scss";

type GridGroupParams = {
  onGroupSelected: () => void
  onItemSelected: (itemIndex: number) => void
  inputName: string
  checked: boolean
  data: HomeBlocksGridGroups
  tinaField: string
}

export const GridGroup = ({ onGroupSelected, onItemSelected, inputName, checked, data, tinaField }: GridGroupParams) => {
  // todo: add classes and probably other markup
  const id = useId();

  return data.items?.length > 0 ?
    (<>
      <input
        type="radio"
        id={id}
        name={inputName}
        checked={checked}
        onChange={ev => {
          if (ev.target.checked) {
            onGroupSelected();
          }
        }} />
      <label
        htmlFor={id}
        data-tinafield={tinaField}>
        <span
          data-tinafield={`${tinaField}.label`}>
          {data.label}
        </span>
      </label>
      <div
        className={styles.group}>
        {
          data.items.map((item, i) => {
            const key = `${tinaField}.items.${i}`;
            return (
              <GridItem
                onClick={() => onItemSelected(i)}
                key={key}
                tinaField={key}
                data={item} />
            );
          })
        }
      </div>
    </>)
    : null;
};

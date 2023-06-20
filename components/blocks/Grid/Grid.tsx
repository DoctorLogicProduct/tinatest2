import React, { useEffect, useId, useReducer, useState } from "react";
import { createPortal } from "react-dom";

import { HomeBlocksGrid, HomeBlocksGridGroups } from '../../../.tina/__generated__/types';
import { BlockComponent } from '../_shared';

import { GridGroup } from './GridGroup';
import { GridModal } from './GridModal';

import styles from "./Grid.module.scss";

interface GridState {
  groups: HomeBlocksGridGroups[]
  selectedGroupIndex: number
  selectedItemIndex: number
  isModalOpen: boolean
  hasNext: boolean
  hasPrev: boolean
}

type GridActionSetSelected = {
  type: 'selected'
  groupIndex: number
  itemIndex: number
}

type GridActionOpenModal = {
  type: 'open_modal'
}

type GridActionCloseModal = {
  type: 'close_modal'
}

type GridActionNext = {
  type: 'next'
}

type GridActionPrev = {
  type: 'prev'
}

type GridAction = GridActionSetSelected | GridActionOpenModal | GridActionCloseModal | GridActionNext | GridActionPrev

export const Grid: BlockComponent<HomeBlocksGrid> = ({ data, parentField }) => {
  const [state, dispatch] = useReducer(reducer, { groups: data.groups }, initializer);
  const {
    selectedGroupIndex,
    selectedItemIndex,
    isModalOpen,
    hasNext,
    hasPrev,
  } = state;
  const [hasRendered, setHasRendered] = useState(false);
  const gridToggleId = useId();
  const inputName = `grid-toggle-${gridToggleId}`;

  const selectedGroup = data.groups?.[selectedGroupIndex];
  const selectedItem = selectedGroup?.items?.[selectedItemIndex];

  useEffect(() => {
    setHasRendered(true);
  }, []);

  return (
    <div
      className={`${styles.grid} ${getLayoutClass(data.layout)}`}>
      {data.groups &&
        data.groups.map((block, groupIndex) => (
          <GridGroup
            onGroupSelected={() => {
              dispatch({
                type: 'selected',
                groupIndex,
                itemIndex: 0,
              });
            }}
            onItemSelected={itemIndex => {
              dispatch({
                type: 'selected',
                groupIndex,
                itemIndex,
              });
              dispatch({ type: 'open_modal' });
            }}
            key={groupIndex}
            tinaField={`${parentField}.groups.${groupIndex}`}
            checked={groupIndex === selectedGroupIndex}
            inputName={inputName}
            data={block} />
        ))}
      {
        hasRendered &&
        createPortal(
          <GridModal
            item={selectedItem}
            isOpen={isModalOpen}
            onCloseClick={() => dispatch({ type: 'close_modal' })}
            hasNext={hasNext}
            onNextClick={() => dispatch({ type: 'next' })}
            hasPrev={hasPrev}
            onPrevClick={() => dispatch({ type: 'prev' })}
          />,
          document.body
        )
      }
    </div>
  );
};

function getLayoutClass(layout: string | null) {
  return styles[`grid--${layout}`];
}

function initializer(params: { groups: HomeBlocksGridGroups[] }): GridState {
  return {
    groups: params.groups,
    selectedGroupIndex: 0,
    selectedItemIndex: 0,
    isModalOpen: false,
    hasNext: false,
    hasPrev: false,
  };
}

function reducer(state: GridState, action: GridAction): GridState {
    switch (action.type) {
      case 'selected': {
        return setHasPrevNext({
          ...state,
          selectedGroupIndex: action.groupIndex,
          selectedItemIndex: action.itemIndex,
        });
      }
      case 'open_modal': {
        return {
          ...state,
          isModalOpen: true,
        };
      }
      case 'close_modal': {
        return {
          ...state,
          isModalOpen: false,
        };
      }
      case 'next': {
        return setHasPrevNext({
          ...state,
          selectedItemIndex: state.selectedItemIndex + 1,
        });
      }
      case 'prev': {
        return setHasPrevNext({
          ...state,
          selectedItemIndex: state.selectedItemIndex - 1,
        });
      }
      // default:
      //   throw new Error('Unknown action: ' + action.type);
    }

  function setHasPrevNext(state: GridState): GridState {
    const selectedGroup = state.groups?.[state.selectedGroupIndex];

    const hasPrev = state.selectedItemIndex > 0;
    const hasNext = selectedGroup?.items?.length > (state.selectedItemIndex + 1);

    return {
      ...state,
      hasPrev,
      hasNext,
    };
  }
}

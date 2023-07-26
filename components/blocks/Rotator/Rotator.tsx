import React, { FC, MutableRefObject, useReducer, useRef } from "react";
import { createPortal } from "react-dom";
import Flickity from 'react-flickity-component';

import { HomeBlocksRotatorItems } from '../../../tina/__generated__/types';
import { useIfHasRendered } from '../../../hooks/useIfHasRendered';

import { RotatorItem } from './RotatorItem';
import { RotatorModal } from './RotatorModal';

import styles from "./Rotator.module.scss";

type RotatorState = {
  items: HomeBlocksRotatorItems[]
  selectedItemIndex: number
  isModalOpen: boolean
}

type RotatorActionSetSelected = {
  type: 'select'
  itemIndex: number
}

type RotatorActionOpenModal = {
  type: 'open_modal'
}

type RotatorActionCloseModal = {
  type: 'close_modal'
}

type RotatorActionNext = {
  type: 'next'
}

type RotatorActionPrev = {
  type: 'prev'
}

type RotatorAction = RotatorActionSetSelected | RotatorActionOpenModal | RotatorActionCloseModal | RotatorActionNext | RotatorActionPrev

export type RotatorProps = {
  items: HomeBlocksRotatorItems[]
  parentField: string
}

export const Rotator: FC<RotatorProps> = (props) => {
  const { parentField } = props;

  const flickityRef = useRef<Flickity>();
  const draggingRef = useRef<boolean>(false);

  const [state, dispatch] = useReducer(makeReducer(flickityRef), {}, () => initializer(props));
  const {
    items,
    selectedItemIndex,
    isModalOpen,
  } = state;

  const selectedItem = items?.[selectedItemIndex];
  const hasPrev = selectedItemIndex > 0;
  const hasNext = (items?.length > (selectedItemIndex + 1)) ?? false;

  // consolidate unique features into a single list
  const features = items
    .reduce((existingFeatures, item) => {
      item
        .features
        .forEach(feature => {
          const normalized = feature.trim().toLowerCase();

          if (!existingFeatures.some(f => f.key === normalized)) {
            existingFeatures.push({
              key: normalized,
              label: feature,
            });
          }
        });

      return existingFeatures;
    }, [] as { key: string, label: string }[])
    .map(entry => entry.label);

  return (
    <div
      className={styles.rotator}
    >
      <Flickity
        flickityRef={flickityRefSetup}
        options={{
          cellAlign: 'center',
          pageDots: false,
          prevNextButtons: false,
          wrapAround: true,
          initialIndex: 3,
        }}
      >
        {
          items
            .map((item, index) => {
              const selected = selectedItemIndex === index;
              return (
                <RotatorItem
                  key={item.title}
                  data={item}
                  selected={selected}
                  onClick={() => handleItemOnClick(index)}
                  tinaField={`${parentField}.items.${index}`}
                />
              );
            })
        }
      </Flickity>
      {
        // we must use hasRendered because SSR will complain that `document` doesn't exist
        // and if we just check for `globalThis?.document` the initial renders won't match
        useIfHasRendered(() =>
          createPortal(
            <RotatorModal
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
        )
      }
    </div >
  );

  function flickityRefSetup(flkty: Flickity): void {
    flickityRef.current = flkty;

    // handle flickity select event
    flkty.on('select', (index: number) => {
      dispatch({
        type: 'select',
        itemIndex: index,
      });
    });

    // handle flickity drag start/end events
    flkty.on('dragStart', () => draggingRef.current = true);
    flkty.on('dragEnd', () => {
      // queue this action so the item onClick can see that there is a drag
      setTimeout(() => draggingRef.current = false, 1);
    });
  }

  function handleItemOnClick(itemIndex: number): void {
    // must not be dragging
    if (!draggingRef.current) {
      // if the item is not selected, select it
      if (selectedItemIndex !== itemIndex) {
        dispatch({
          type: 'select',
          itemIndex,
        });
      }

      dispatch({
        type: 'open_modal',
      });
    }
  }
};

function initializer(params: RotatorProps): RotatorState {
  return {
    items: params.items,
    selectedItemIndex: 0,
    isModalOpen: false,
  };
}

function makeReducer(flktyRef: MutableRefObject<Flickity>) {
  return function reducer(state: RotatorState, action: RotatorAction): RotatorState {
    switch (action.type) {
      case 'select': {
        return ensureFlickityMatches({
          ...state,
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
        return ensureFlickityMatches({
          ...state,
          selectedItemIndex: state.selectedItemIndex + 1,
        });
      }
      case 'prev': {
        return ensureFlickityMatches({
          ...state,
          selectedItemIndex: state.selectedItemIndex - 1,
        });
      }
      default:
        throw new Error('Unknown action: ' + JSON.stringify(action));
    }
  };

  function ensureFlickityMatches(state: RotatorState): RotatorState {
    if (flktyRef.current && flktyRef.current.selectedIndex !== state.selectedItemIndex) {
      flktyRef.current.select(state.selectedItemIndex);
    }

    return state;
  }
}

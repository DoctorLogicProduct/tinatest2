import React, { ComponentType, FC, MouseEventHandler, MutableRefObject, useReducer, useRef } from "react";
import { createPortal } from "react-dom";
import { classNames } from 'tinacms';

import { HomeBlocksRotatorItems, Maybe } from '../../../tina/__generated__/types';
import { useIfHasRendered } from '../../../hooks/useIfHasRendered';
import { exhaustiveCheck } from '../../../util';

import { Flickity } from '../../Flickity';

import { RotatorItem } from './RotatorItem';

import styles from "./Rotator.module.scss";

type RotatorState = {
  items: HomeBlocksRotatorItems[]
  selectedItemIndex: number
  isModalOpen: boolean
  isReady: boolean
}

type RotatorActionReady = {
  type: 'ready'
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

type RotatorAction = RotatorActionReady | RotatorActionSetSelected | RotatorActionOpenModal | RotatorActionCloseModal | RotatorActionNext | RotatorActionPrev

type ModalParams = {
  item: Maybe<HomeBlocksRotatorItems>
  isOpen: boolean
  onCloseClick: MouseEventHandler
  hasNext: boolean
  onNextClick: MouseEventHandler
  hasPrev: boolean
  onPrevClick: MouseEventHandler
}

export type RotatorProps = {
  items: HomeBlocksRotatorItems[]
  modalComponent: ComponentType<ModalParams>
  parentField: string
}

export const Rotator: FC<RotatorProps> = (props) => {
  const {
    modalComponent: ModalComponent,
    parentField,
  } = props;

  const flickityRef = useRef<Flickity>();

  const [state, dispatch] = useReducer(makeReducer(flickityRef), {}, () => initializer(props));
  const {
    items,
    selectedItemIndex,
    isModalOpen,
    isReady,
  } = state;

  const selectedItem = items?.[selectedItemIndex];
  const hasPrev = items?.length > 1;
  const hasNext = hasPrev;

  return (
    <div
      className={classNames(styles.rotator, isReady ? '' : styles.hidden)}
    >
      <Flickity
        flickityRef={flickity => flickityRef.current = flickity}
        options={{
          cellAlign: 'center',
          pageDots: false,
          prevNextButtons: true,
          wrapAround: true,
          on: {
            ready: () => {
              dispatch({
                type: 'ready'
              });
            },
            select: (index) => {
              dispatch({
                type: 'select',
                itemIndex: index,
              });
            },
            staticClick: (_event, _pointer, _element, index) => {
              dispatch({
                type: 'select',
                itemIndex: index,
              });
              dispatch({
                type: 'open_modal'
              });
            },
          },
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
            <ModalComponent
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
    </div>
  );
};

function initializer(params: RotatorProps): RotatorState {
  return {
    items: params.items,
    selectedItemIndex: 0,
    isModalOpen: false,
    isReady: false,
  };
}

function makeReducer(flickityRef: MutableRefObject<Flickity>) {
  return function reducer(state: RotatorState, action: RotatorAction): RotatorState {
    switch (action.type) {
      case 'ready':
        return {
          ...state,
          isReady: true,
        };
      case 'select':
        return ensureFlickityMatches({
          ...state,
          selectedItemIndex: action.itemIndex,
        });
      case 'open_modal':
        return {
          ...state,
          isModalOpen: true,
        };
      case 'close_modal':
        return {
          ...state,
          isModalOpen: false,
        };
      case 'next':
        return ensureFlickityMatches(
          wrapSelectedIndex({
            ...state,
            selectedItemIndex: state.selectedItemIndex + 1,
          })
        );
      case 'prev':
        return ensureFlickityMatches(
          wrapSelectedIndex({
            ...state,
            selectedItemIndex: state.selectedItemIndex - 1,
          })
        );
      default:
        exhaustiveCheck(action, `Unknown action: ${JSON.stringify(action)}`);
    }
  };

  function ensureFlickityMatches(state: RotatorState): RotatorState {
    if (flickityRef.current && flickityRef.current.selectedIndex !== state.selectedItemIndex) {
      flickityRef.current.select(state.selectedItemIndex);
    }

    return state;
  }

  function wrapSelectedIndex({ selectedItemIndex, ...state }: RotatorState): RotatorState {
    if (selectedItemIndex < 0) {
      selectedItemIndex = state.items.length - 1;
    } else if (selectedItemIndex >= state.items.length) {
      selectedItemIndex = 0;
    }

    return {
      ...state,
      selectedItemIndex,
    };
  }
}

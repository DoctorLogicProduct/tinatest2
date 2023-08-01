import React, { ComponentType, FC, MutableRefObject, useReducer, useRef } from "react";
import { createPortal } from "react-dom";
import { classNames } from 'tinacms';

import { HomeBlocksRotatorItems } from '../../../tina/__generated__/types';
import { useIfHasRendered } from '../../../hooks/useIfHasRendered';
import { exhaustiveCheck } from '../../../util';

import { Flickity } from '../../Flickity';

import { RotatorItem } from './RotatorItem';
import { RotatorModal } from './RotatorModal';

import styles from "./Rotator.module.scss";
import { RotatorModalFeature } from './RotatorModalFeature';

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

export type RotatorProps = {
  items: HomeBlocksRotatorItems[]
  modalFeatureComponent: ComponentType<{ feature: string, onClick: (() => void) }>
  parentField: string
}

export const Rotator: FC<RotatorProps> = (props) => {
  const {
    modalFeatureComponent: ModalFeatureComponent,
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
  const hasPrev = selectedItemIndex > 0;
  const hasNext = (items?.length > (selectedItemIndex + 1)) ?? false;

  return (
    <div
      className={classNames(styles.rotator, isReady ? '' : styles.hidden)}
    >
      <Flickity
        flickityRef={flickityRefSetup}
        options={{
          cellAlign: 'center',
          pageDots: false,
          prevNextButtons: false,
          wrapAround: true,
          on: {
            ready: () => dispatch({ type: 'ready' })
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
            <RotatorModal
              item={selectedItem}
              features={selectedItem?.features?.map(feature => (
                <ModalFeatureComponent
                  key={feature}
                  feature={feature}
                  onClick={() => {
                    dispatch({
                      type: 'close_modal',
                    });
                  }}
                />
              ))}
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

  function flickityRefSetup(flickity: Flickity): void {
    flickityRef.current = flickity;

    // handle flickity select and staticClick events
    flickity.on('select', (index: number) => {
      dispatch({
        type: 'select',
        itemIndex: index,
      });
    });
    flickity.on('staticClick', (event, pointer, element, index) => {
      dispatch({
        type: 'select',
        itemIndex: index,
      });
      dispatch({
        type: 'open_modal'
      });
    });
  }
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
        return ensureFlickityMatches({
          ...state,
          selectedItemIndex: state.selectedItemIndex + 1,
        });
      case 'prev':
        return ensureFlickityMatches({
          ...state,
          selectedItemIndex: state.selectedItemIndex - 1,
        });
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
}

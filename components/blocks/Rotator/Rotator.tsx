import React, { useEffect, useId, useReducer, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { HomeBlocksRotator, HomeBlocksRotatorItems } from '../../../tina/__generated__/types';
import { BlockComponent } from '../_shared';

import { RotatorModal } from './RotatorModal';

import styles from "./Rotator.module.scss";

interface RotatorState {
  items: HomeBlocksRotatorItems[]
  selectedGroupIndex: number
  selectedItemIndex: number
  isModalOpen: boolean
  hasNext: boolean
  hasPrev: boolean
}

type RotatorActionSetSelected = {
  type: 'selected'
  groupIndex: number
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

export const Rotator: BlockComponent<HomeBlocksRotator> = ({ data, parentField }) => {
  return (
    <div className="bob">Bob</div>
  );
//   const [state, dispatch] = useReducer(reducer, { items: data.items }, initializer);
//   const {
//     selectedGroupIndex,
//     selectedItemIndex,
//     isModalOpen,
//     hasNext,
//     hasPrev,
//   } = state;
//   const [hasRendered, setHasRendered] = useState(false);
//   const gridToggleId = useId();
//   const inputName = `grid-toggle-${gridToggleId}`;

//   const selectedGroup = data.groups?.[selectedGroupIndex];
//   const selectedItem = selectedGroup?.items?.[selectedItemIndex];

//   useEffect(() => {
//     setHasRendered(true);
//   }, []);

//   return (
//     <div
//       className={`${styles.grid} ${getLayoutClass(data.layout)}`}>
//       {/* {data.groups &&
//         data.groups.map((block, groupIndex) => (
//           <GridGroup
//             onGroupSelected={() => {
//               dispatch({
//                 type: 'selected',
//                 groupIndex,
//                 itemIndex: 0,
//               });
//             }}
//             onItemSelected={itemIndex => {
//               dispatch({
//                 type: 'selected',
//                 groupIndex,
//                 itemIndex,
//               });
//               dispatch({ type: 'open_modal' });
//             }}
//             key={groupIndex}
//             tinaField={`${parentField}.groups.${groupIndex}`}
//             checked={groupIndex === selectedGroupIndex}
//             inputName={inputName}
//             data={block} />
//         ))} */}
//       {
//         hasRendered &&
//         createPortal(
//           <RotatorModal
//             item={selectedItem}
//             isOpen={isModalOpen}
//             onCloseClick={() => dispatch({ type: 'close_modal' })}
//             hasNext={hasNext}
//             onNextClick={() => dispatch({ type: 'next' })}
//             hasPrev={hasPrev}
//             onPrevClick={() => dispatch({ type: 'prev' })}
//           />,
//           document.body
//         )
//       }
//     </div>
//   );
};

function getLayoutClass(layout: string | null) {
  return styles[`grid--${layout}`];
}

// function initializer(params: { groups: HomeBlocksGridGroups[] }): RotatorState {
//   return {
//     groups: params.groups,
//     selectedGroupIndex: 0,
//     selectedItemIndex: 0,
//     isModalOpen: false,
//     hasNext: false,
//     hasPrev: false,
//   };
// }

// function reducer(state: RotatorState, action: RotatorAction): RotatorState {
//   switch (action.type) {
//     case 'selected': {
//       return setHasPrevNext({
//         ...state,
//         selectedGroupIndex: action.groupIndex,
//         selectedItemIndex: action.itemIndex,
//       });
//     }
//     case 'open_modal': {
//       return {
//         ...state,
//         isModalOpen: true,
//       };
//     }
//     case 'close_modal': {
//       return {
//         ...state,
//         isModalOpen: false,
//       };
//     }
//     case 'next': {
//       return setHasPrevNext({
//         ...state,
//         selectedItemIndex: state.selectedItemIndex + 1,
//       });
//     }
//     case 'prev': {
//       return setHasPrevNext({
//         ...state,
//         selectedItemIndex: state.selectedItemIndex - 1,
//       });
//     }
//     // default:
//     //   throw new Error('Unknown action: ' + action.type);
//   }

//   function setHasPrevNext(state: RotatorState): RotatorState {
//     const selectedGroup = state.groups?.[state.selectedGroupIndex];

//     const hasPrev = state.selectedItemIndex > 0;
//     const hasNext = selectedGroup?.items?.length > (state.selectedItemIndex + 1);

//     return {
//       ...state,
//       hasPrev,
//       hasNext,
//     };
//   }
// }

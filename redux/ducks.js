import remove from "lodash/remove";
//action types

export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";

//create actions

export function addItem(item) {
    console.log(`duckssssss ${item.NAME}`)
  return {
    type: ADD_ITEM,
    id: Math.random(),
  };
}
export function deleteItem(id) {
console.log(`duckssssss ${id}`)
  return {
    type: DELETE_ITEM,
    payload: id,
  };
}

//reducer
const initState = [];

function itemReducer(state = initState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return [
        ...state,
        {
          id: action.id,
          item: action.item,
        },
      ];
    case DELETE_ITEM:
      const itemID= action.payload;
      return state.filter(item => item.id !== itemID);

    default:
      return state;
  }
}

export default itemReducer;

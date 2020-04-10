import remove from "lodash/remove";
//action types

export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const CHANGE_QUANTITY = "CHANGE_QUANTITY";
export const TOTAL_PRICE = "TOTAL_PRICE";

//create actions

export function addItem(item) {
    console.log(`duckssssss ${item.NAME}`)
  return {
    type: ADD_ITEM,
    //id: Math.random(),
    name: item.NAME,
    price: item.PRICE,
    id: item._id,
    quantity: 1
  };
}
export function deleteItem(id) {
console.log(`duckssssss ${id}`)
  return {
    type: DELETE_ITEM,
    payload: id,
  };
}
export function changeTotal(id) {
console.log(`duckssssss ${id}`)
  return {
    type: DELETE_ITEM,
    payload: id,
  };
}
export function changeQuantity(quantity, id, price) {
console.log(`duckssssss quantity ${quantity}`)
  return {
    type: CHANGE_QUANTITY,
    quantity: quantity,
    payload: id,
    price: price
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
          name: action.name,
          price: action.price,
          quantity: 1
        },
      ];
    case DELETE_ITEM:
      const itemID = action.payload;
      return state.filter(item => item.id !== itemID);
    
    case CHANGE_QUANTITY:
      let item = state.find(item => item.id == action.payload);
      //let newCart = state.filter(item => item.id != action.payload);
      item.quantity = action.quantity;
    //   const fixedPrice = item.price
    //   console.log(item.price)
    //   console.log(item.quantity)
    //   item.price = fixedPrice * item.quantity;
      
      //newCart.push(item);
      return [...state];
      
    default:
      return state;
  }
}

export default itemReducer;

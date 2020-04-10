
//action types

export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const CHANGE_QUANTITY = "CHANGE_QUANTITY";
export const CHANGE_TOTAL = "CHANGE_TOTAL";

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
export function changeTotal(updated_price) {
console.log(`duckssssss ${updated_price}`)
  return {
    type: CHANGE_TOTAL,
    updated_price: updated_price
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
      return [...state];
    case CHANGE_TOTAL:
        let total = action.updated_price
        let newTotal = total + action.updated_price
        return [
            ...state,
            {
                newTotal
            },
        ];
        
    default:
      return state;
  }
}

export default itemReducer;

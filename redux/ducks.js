
//action types

export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const CHANGE_QUANTITY = "CHANGE_QUANTITY";
export const ADD_TO_LIST ="ADD_TO_LIST";
export const DELETE_FROM_LIST = "DELETE_FROM_LIST";


//create actions

export function addItem(item) {
    console.log(`duckssssss addtocart ${item.NAME}`)
  return {
    type: ADD_ITEM,
    //id: Math.random(),
    name: item.NAME,
    price: item.PRICE,
    id: item._id,
    quantity: 1
  };
}


//LIST actions======================================================================
export function addToList(item) {
  console.log(`duckssssss addtoList ${item.NAME}`)
    return {
      type: ADD_TO_LIST,
      name: item.NAME,
      price: item.PRICE,
      manufacturer: item.MANUFACTURER
    };
  }
  //IMPORTTANT!!! CALL THIS FUNCTION TO DELETE FROM LIST
  export function deleteFromList(id) {
    console.log(`duckssssss ${id}`)
      return {
        type: DELETE_FROM_LIST,
        id: id,
      };
    }

//CART actyions========================================================================
export function deleteItem(id) {
console.log(`duckssssss ${id}`)
  return {
    type: DELETE_ITEM,
    id: id,
  };
}

export function changeQuantity(quantity, id, price) {
console.log(`duckssssss quantity ${quantity}`)
  return {
    type: CHANGE_QUANTITY,
    quantity: quantity,
    id: id,
    price: price,
    //total: quantity * price
  };
}

//reducer
const initState = {
  cart: [],
  list: []
}
  

function itemReducer(state = initState, action) {
  switch (action.type) {
    //CART REDUCERS
    case ADD_ITEM:
      return {
        ...state,
        cart: {
          id: action.id,
          name: action.name,
          price: action.price,
          quantity: 1
        }
        
      };
      
    case DELETE_ITEM:
      const itemID = action.id;
      return state.cart.filter(item => item.id !== itemID);
    
    case CHANGE_QUANTITY:
      let item = state.cart.find(item => item.id == action.id);
      //let newCart = state.filter(item => item.id != action.payload);
      item.quantity = action.quantity;
      return {...state.cart};

      //LIST REDUCERS

      case ADD_TO_LIST:
        // console.log(typeof(state.list))
        return {
          ...state.list,
          list: {
            //id: action.id,
            name: action.name,
            //price: action.price,
          },
          
        };
      case DELETE_FROM_LIST:
        const itemID_list = action.id;
        return state.list.filter(item => item.id !== itemID_list);
        //action.id is stil undefined because the id is different in 2 stores
        //we might need to use UPC instead to delete


        
    default:
      return state;
  }
}

export default itemReducer;

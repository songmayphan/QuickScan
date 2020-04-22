
//action types

export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const CHANGE_QUANTITY = "CHANGE_QUANTITY";
export const ADD_TO_LIST ="ADD_TO_LIST";
export const DELETE_FROM_LIST = "DELETE_FROM_LIST";


//create actions

//LIST actions======================================================================
export function addToList(item) {
  console.log(`duckssssss addtoList ${item.NAME}`)
    return {
      type: ADD_TO_LIST,
      name: item.NAME,
      price: item.PRICE,
      manufacturer: item.MANUFACTURER,
      id: item._id,
      UPC: item.UPC,
      quantity: 1
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

//reducer===============================================================
const initState = {
  cart: [],
  list: [],
}
  

function itemReducer(state = initState, action) {
  switch (action.type) {
    //CART REDUCERS
    
    case ADD_ITEM:
      console.log(`typeof state.cart is ${typeof(state.cart)}`)
      //flag for found duplicate to return
        let isFound = false;
     //state.cart = [ ...new Set(state.cart.id) ] // [remove duplicate item]
     //for loop to count duplicate htne add duplicate to quantity
     for (let i = 0; i< state.cart.length; i++){
       if (state.cart[i].id == action.id){
         //if there is an existing item in state.cart
         //that matches the item being added to the state
        state.cart[i].quantity += 1; //increase quantity by 1 
        isFound = true;
        break; //break the loop to return
       }
       else {
         continue; //continue if item is not duplicate
       }
     }//end for loop

     if (isFound) {
       console.log("duplicate item found")
       return{
         cart: [...state.cart]
       }
     }
     else {
      console.log("no duplicate items")
     return {
        cart: [...state.cart, 
          {
          id: action.id,
          name: action.name,
          price: action.price,
          quantity: 1
          }
        ]

      };
    };
      
    case DELETE_ITEM:
      const itemID = action.id;
      return {
        cart:  state.cart.filter(item => item.id !== itemID)
      }
    
    case CHANGE_QUANTITY:
      let item = state.cart.find(item => item.id == action.id);
      //let newCart = state.filter(item => item.id != action.payload);
      item.quantity = action.quantity;
      return {cart: [...state.cart]};

      //LIST REDUCERS=====================================================

      case ADD_TO_LIST:
       
        return {
          
          list: [ ...state.list,
              {
                _id: action.id,
                name: action.name,
                manufacturer: action.manufacturer,
                quantity: 1

              }
          ]
            
        };
      case DELETE_FROM_LIST:
        return {
          list: state.list.filter(item =>{ 
            console.log(action.id._id, item._id)

           return item._id != action.id._id
          }
            )
        }
        //action.id is stil undefined because the id is different in 2 stores
        //we might need to use UPC instead to delete


        
    default:
      return {...state};
  }
}

export default itemReducer;
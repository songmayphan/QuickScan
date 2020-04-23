import {
    ADD_ITEM,
    DELETE_ITEM,
    CHANGE_QUANTITY
} from './type';

const initCart = [];

function cartReducer(state = initCart, action) {
    switch (action.type) {
        //CART REDUCERS
        
        case ADD_ITEM:
          console.log(`typeof state.cart is ${typeof(state)}`)
          //flag for found duplicate to return
            let isFound = false;
         //state.cart = [ ...new Set(state.cart.id) ] // [remove duplicate item]
         //for loop to count duplicate htne add duplicate to quantity
         for (let i = 0; i< state.length; i++){
           if (state[i].id == action.id){
             //if there is an existing item in state.cart
             //that matches the item being added to the state
            state[i].quantity += 1; //increase quantity by 1 
            isFound = true;
            break; //break the loop to return
           }
           else {
             continue; //continue if item is not duplicate
           }
         }//end for loop
    
         if (isFound) {
           console.log("duplicate item found")
           return(
             [...state]
           );
         }
         else {
          console.log("no duplicate items")
         return(
            [...state, 
              {
              id: action.id,
              name: action.name,
              price: action.price,
              quantity: 1
              }
            ]
        );
    
          
        };
        //DELETe------------------------------------------
        case DELETE_ITEM:
          const itemID = action.id;
          return(
            [
                state.filter(item => item.id !== itemID)

            ]   
            );
          
        //change quan---------------------------------------
        case CHANGE_QUANTITY:
          let item = state.find(item => item.id == action.id);
          //let newCart = state.filter(item => item.id != action.payload);
          item.quantity = action.quantity;
          return ([...state]);

        default:
            return [...state]
    }
}

export default cartReducer;
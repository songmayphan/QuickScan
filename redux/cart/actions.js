//cart actions
//CART actyions========================================================================
import {
    ADD_ITEM,
    DELETE_ITEM,
    CHANGE_QUANTITY
} from './type';
export function addItem(item) {
    console.log(`cart.actions addtocart ${item.NAME}`)
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
  console.log(`cart.action deleteitem ${id}`)
    return {
      type: DELETE_ITEM,
      id: id,
    };
  }
  
  export function changeQuantity(quantity, id, price) {
  console.log(`cart.action quantity ${quantity}`)
    return {
      type: CHANGE_QUANTITY,
      quantity: quantity,
      id: id,
      price: price,
      //total: quantity * price
    };
  }
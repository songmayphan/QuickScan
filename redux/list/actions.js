import {
    ADD_TO_LIST,
    DELETE_FROM_LIST
}
from './type'
//LIST actions======================================================================
export function addToList(item) {
    console.log(`in list.action addtoList ${item.NAME}`)
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
      console.log(`in list.action deletefriomlist ${id}`)
        return {
          type: DELETE_FROM_LIST,
          id: id,
        };
      }
  
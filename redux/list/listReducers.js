
import {
    ADD_TO_LIST,
    DELETE_FROM_LIST
} from './type'

const initList = []

function listReducer (state = initList, action){
    switch (action.type) {
      case ADD_TO_LIST:
        return [
          ...state,
          {
            _id: action.id,
            name: action.name,
            manufacturer: action.manufacturer,
            quantity: 1,
          },
        ];

      case DELETE_FROM_LIST:
        return (
          state.filter((item) => {
            console.log(action.id._id, item._id);

            return item._id != action.id._id;
          })

        );
          
          
      //action.id is stil undefined because the id is different in 2 stores
      //we might need to use UPC instead to delete

      default:
        return [...state] ;
    }
}
export default listReducer;
import cartReducer from './cart/cartReducers'
import listReducer from './list/listReducers'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    cartReducer,
    listReducer,
})

export default rootReducer;
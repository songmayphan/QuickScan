import {createStore} from 'redux';
import itemReducer from './ducks';

const store = createStore(itemReducer)

export default store;
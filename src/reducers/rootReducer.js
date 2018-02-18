import { combineReducers } from 'redux';
import initialState from '../store/initialState';
import cartReducer from './cartReducer';
import { productReducer, currencyReducer } from './productReducer';

const rootReducer = combineReducers({
    cartItems: cartReducer,
    products: productReducer,
    currency: currencyReducer
});

export default rootReducer;
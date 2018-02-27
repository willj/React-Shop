import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import productReducer from './productReducer';
import currencyReducer from './currencyReducer';
import { loadingErrorReducer } from './loadingReducer';

const rootReducer = combineReducers({
    cartItems: cartReducer,
    products: productReducer,
    currency: currencyReducer,
    loadingError: loadingErrorReducer
});

export default rootReducer;
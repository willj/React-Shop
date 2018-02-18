import { PRODUCTS_LOADED, SET_CURRENCY } from '../actions/actionTypes';
import initialState from '../store/initialState';

export function productReducer(state = initialState.products, action){
    switch(action.type){
        case PRODUCTS_LOADED:
            return products;
        default:
        return state;
    }
}

export function currencyReducer(state = initialState.currency, action){
    switch(action.type){
        case SET_CURRENCY:
            return action.currency;
        default:
        return state;
    }
}
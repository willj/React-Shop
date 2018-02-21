import { PRODUCTS_LOADED } from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function productReducer(state = initialState.products, action){
    switch(action.type){
        case PRODUCTS_LOADED:
            return action.products;
        default:
        return state;
    }
}
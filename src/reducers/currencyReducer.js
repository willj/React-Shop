import { SET_CURRENCY } from '../actions/actionTypes';
import initialState from './initialState';

export default function currencyReducer(state = initialState.currency, action){
    switch(action.type){
        case SET_CURRENCY:
            return action.currency;
        default:
        return state;
    }
}
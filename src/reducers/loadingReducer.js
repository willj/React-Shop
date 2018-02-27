import { PRODUCT_LOADING_ERROR } from '../actions/actionTypes';
import initialState from './initialState';

export function loadingErrorReducer(state = initialState.loadingError, action){
    return (action.type === PRODUCT_LOADING_ERROR) ? true : state;
}
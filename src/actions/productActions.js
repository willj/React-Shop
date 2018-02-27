import Axios from 'axios';
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY, PRODUCTS_LOADED, SET_CURRENCY, PRODUCT_LOADING_ERROR, SET_LOADING_STATUS } from './actionTypes';

export function addToCart(productSlug, variant){
    return {
        type: ADD_TO_CART,
        productSlug,
        variant
    }
}

export function removeFromCart(variantId){
    return {
        type: REMOVE_FROM_CART,
        variantId
    }
}

export function updateCartQuantity(variantId, quantity){
    return {
        type: UPDATE_CART_QUANTITY,
        variantId,
        quantity
    }
}

export function loadProducts(productsUrl){
    return dispatch => {
        Axios.get(productsUrl)
        .then(response => {
            dispatch(productsLoaded(response.data.products));
            dispatch(setCurrency(response.data.currency));
        }).catch(error => {
            dispatch(loadingError());
        });
    }
}

export function productsLoaded(products){
    return {
        type: PRODUCTS_LOADED,
        products
    }
}

export function setCurrency(currency){
    return {
        type: SET_CURRENCY,
        currency
    }
}

export function loadingError(){
    return {
        type: PRODUCT_LOADING_ERROR
    }
}
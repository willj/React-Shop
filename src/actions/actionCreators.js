import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY, PRODUCTS_LOADED, SET_CURRENCY } from './actionTypes';

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
        quantity
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
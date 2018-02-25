import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from './actionTypes';

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

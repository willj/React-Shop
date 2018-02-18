import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function cartReducer(state = initialState.cartItems, action){
    switch(action.type){
        case ADD_TO_CART:
            return addToCartReducer(state, action.productSlug, action.variant);
        case REMOVE_FROM_CART:
            return removeFromCartReducer();
        case UPDATE_CART_QUANTITY:
            return updateCartQuantityReducer(state, action.variantId, action.quantity);
        default:
        return state;
    }
}

function addToCartReducer(cartItems, productSlug, variant){
    let cart = Object.assign({}, cartItems);
    if (variant.id in cart) {
        cart[variant.id].count += 1;
    } else {
        cart[variant.id] = { 
            count: 1, 
            slug: productSlug, 
            variant: variant
        };
    }

    return cart;
}

function removeFromCartReducer(cartItems, variantId){
    let cart = Object.assign({}, cartItems);
    delete cart[variantId];

    return cart;
}

function updateCartQuantityReducer(cartItems, variantId, quantity){
    if (quantity < 1) return removeFromCartReducer(cartItems, variantId);

    let cart = Object.assign({}, cartItems);
        
    if (cart[variantId]){
        cart[variantId].count = quantity;
    }

    return cart;
}

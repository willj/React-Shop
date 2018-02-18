import cartReducer from './cartReducer';
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../actions/actionTypes';

describe('cartReducer', () => {

    const dummyProducts = [
        {
            "slug": "black-forest-bar",
            "title": "Black Forest Bar",
            "desc": "Dark chocolate and cherry slab, topped with cherry and white chocolate flakes",
            "image": "/images/100gBlackforest.jpg",
            "currency": "£",
            "variants": [
                { "id": "black-forest-bar-100", "price": "3.95", "name": "100g Boxed", "image": "bf100g.jpg" },
                { "id": "black-forest-bar-40", "price": "1.75", "name": "40g", "image": "bf40g.jpg" }
            ],
            "categories": [
                "dark",
                "bars"
            ]
        },
        {
            "slug": "salted-caramel",
            "title": "Salted Caramel",
            "desc": "Milk chocolate and soft caramel filling with sea salt",
            "image": "/images/SaltedCaramelDouble.jpg",
            "currency": "£",
            "variants": [
                { "id": "salted-caramel-6", "price": "5.95", "name": "Box of 6" },
                { "id": "salted-caramel-12", "price": "9.95", "name": "Box of 12" }
            ],
            "categories": [
                "milk"
            ]
        }
    ];

    it('returns an empty object for initial state', () => {
        let cartState = cartReducer(undefined, {type: "INIT"});

        expect(cartState).toEqual({});
    });

    it('adds a product to an empty cart when ADD_TO_CART is dispatched', () => {

        let productSlug = dummyProducts[0].slug;
        let variant = dummyProducts[0].variants[0];

        let action = { 
            type: ADD_TO_CART, 
            productSlug: productSlug,
            variant: variant
        };

        let expectedCartItem = {
            count: 1, 
            slug: productSlug, 
            variant: variant
        };

        let state = cartReducer({}, action);

        expect(state[variant.id]).toEqual(expectedCartItem);
    });

    it('updates the quantity when ADD_TO_CART is dispatched for a product variant already in the cart', () =>{
        let productSlug = dummyProducts[0].slug;
        let variant = dummyProducts[0].variants[0];

        let action = { 
            type: ADD_TO_CART, 
            productSlug: productSlug,
            variant: variant
        };

        let expectedCartItem = {
            count: 1, 
            slug: productSlug, 
            variant: variant
        };

        let state = cartReducer({}, action);

        expect(state[variant.id]).toEqual(expectedCartItem);

        state = cartReducer(state, action);

        expect(state[variant.id].slug).toBe(productSlug);
        expect(state[variant.id].variant).toEqual(variant);
        expect(state[variant.id].count).toBe(2);
    });

    it('Adds 2 distinct products to the cart when ADD_TO_CART is dispatched for 2 different products', () => {
        let productSlug1 = dummyProducts[0].slug;
        let variant1 = dummyProducts[0].variants[0];

        let productSlug2 = dummyProducts[0].slug;
        let variant2 = dummyProducts[0].variants[1];

        let action1 = { 
            type: ADD_TO_CART, 
            productSlug: productSlug1,
            variant: variant1
        };

        let action2 = { 
            type: ADD_TO_CART, 
            productSlug: productSlug1,
            variant: variant1
        };

        let action3 = { 
            type: ADD_TO_CART, 
            productSlug: productSlug2,
            variant: variant2
        };

        let state = cartReducer({}, action1);
        state = cartReducer(state, action2);
        state = cartReducer(state, action3);

        expect(state).toHaveProperty(variant1.id);
        expect(state[variant1.id].count).toBe(2);
        
        expect(state).toHaveProperty(variant2.id);
        expect(state[variant2.id].count).toBe(1);
    });

    it('the product is removed from the cart when REMOVE_FROM_CART is dispatched', () => {
        let productSlug = dummyProducts[0].slug;
        let variant = dummyProducts[0].variants[0];

        let addAction = { 
            type: ADD_TO_CART, 
            productSlug: productSlug,
            variant: variant
        };

        let removeAction = {
            type: REMOVE_FROM_CART,
            variantId: variant.id
        };

        let state = cartReducer({}, addAction);

        expect(state).toHaveProperty(variant.id);

        state = cartReducer(state, removeAction);

        expect(state).toEqual({});
    });

    it('the quantity is changed when UPDATE_CART_QUANTITY is dispatched', () => {
        let productSlug = dummyProducts[1].slug;
        let variant = dummyProducts[1].variants[0];

        let addAction = { 
            type: ADD_TO_CART, 
            productSlug: productSlug,
            variant: variant
        };

        let updateAction = {
            type: UPDATE_CART_QUANTITY,
            variantId: variant.id,
            quantity: 23
        };

        let state = cartReducer({}, addAction);

        expect(state).toHaveProperty(variant.id);
        expect(state[variant.id].count).toBe(1);

        state = cartReducer(state, updateAction);

        expect(state[variant.id].count).toBe(23);
    });

    it('removes the product when UPDATE_CART_QUANTITY is dispatched with a quantity of 0', () => {
        let productSlug = dummyProducts[1].slug;
        let variant = dummyProducts[1].variants[0];

        let addAction = { 
            type: ADD_TO_CART, 
            productSlug: productSlug,
            variant: variant
        };

        let updateAction = {
            type: UPDATE_CART_QUANTITY,
            variantId: variant.id,
            quantity: 0
        };

        let state = cartReducer({}, addAction);

        expect(state).toHaveProperty(variant.id);
        expect(state[variant.id].count).toBe(1);

        state = cartReducer(state, updateAction);

        expect(state).toEqual({});
    });

});
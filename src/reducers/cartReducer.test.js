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

    describe('ADD_TO_CART', () => {

        it('adds a product to an empty cart', () => {

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

        it('updates the quantity when dispatched for a product variant already in the cart', () =>{
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

        it('Adds 2 distinct cartItems to the cart when dispatched for 2 variants of the same product ', () => {
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

    });

    describe('REMOVE_FROM_CART', () => {
        it('removes a matching item from the cart', () => {
            let productSlug = dummyProducts[0].slug;
            let variant1 = dummyProducts[0].variants[0];
            let variant2 = dummyProducts[0].variants[1];
    
            let addAction1 = { 
                type: ADD_TO_CART, 
                productSlug: productSlug,
                variant: variant1
            };
    
            let addAction2 = { 
                type: ADD_TO_CART, 
                productSlug: productSlug,
                variant: variant2
            };
    
            let removeAction = {
                type: REMOVE_FROM_CART,
                variantId: variant1.id
            };
    
            let state = cartReducer({}, addAction1);
            state = cartReducer(state, addAction2);
    
            expect(state).toHaveProperty(variant1.id);
            expect(state).toHaveProperty(variant2.id);
    
            state = cartReducer(state, removeAction);
    
            expect(state).not.toHaveProperty(variant1.id);
            expect(state).toHaveProperty(variant2.id);
        });

        it('does not remove an item from the cart if no match', () => {
            let productSlug = dummyProducts[0].slug;
            let variant1 = dummyProducts[0].variants[0];
            let variant2 = dummyProducts[0].variants[1];
    
            let addAction = { 
                type: ADD_TO_CART, 
                productSlug: productSlug,
                variant: variant2
            };
    
            let removeAction = {
                type: REMOVE_FROM_CART,
                variantId: variant1.id
            };
    
            let state = cartReducer({}, addAction);

            expect(Object.keys(state).length).toBe(1);
            expect(state).toHaveProperty(variant2.id);
    
            state = cartReducer(state, removeAction);
    
            expect(Object.keys(state).length).toBe(1);
            expect(state).toHaveProperty(variant2.id);
        });

    });

    describe('UPDATE_CART_QUANTITY', () => {

        it('sets the quantity of a cartItem', () => {
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

        it('removes a product when given a quantity of 0', () => {
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

        it('removes a product when given a quantity of -1', () => {
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
                quantity: -1
            };
    
            let state = cartReducer({}, addAction);
    
            expect(state).toHaveProperty(variant.id);
            expect(state[variant.id].count).toBe(1);
    
            state = cartReducer(state, updateAction);
    
            expect(state).toEqual({});
        });

        it('has no effect when the variant is not in the cart', () => {
            let productSlug = dummyProducts[1].slug;
            let variant1 = dummyProducts[1].variants[0];
            let variant2 = dummyProducts[1].variants[1];
    
            let addAction = { 
                type: ADD_TO_CART, 
                productSlug: productSlug,
                variant: variant1
            };
    
            let updateAction = {
                type: UPDATE_CART_QUANTITY,
                variantId: variant2.id,
                quantity: 23
            };
    
            let state = cartReducer({}, addAction);
    
            expect(state).toHaveProperty(variant1.id);
            expect(state[variant1.id].count).toBe(1);
    
            state = cartReducer(state, updateAction);
    
            expect(state).toHaveProperty(variant1.id);
            expect(state[variant1.id].count).toBe(1);
            expect(state).not.toHaveProperty(variant2.id);
        });

    });

});
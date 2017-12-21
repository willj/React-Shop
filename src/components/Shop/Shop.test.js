import React from 'react';
import { shallow } from 'enzyme';
import Shop from './Shop';

describe('<Shop />', () => {

    const dummyProduct = {
        slug: 'test-product',
        variants: [
            { "id": "test-product-v1", "price": "1", "name": "v1" },
            { "id": "test-product-v2", "price": "3", "name": "v2" }
        ]
    };

    const productVariantToAdd1 = {
        slug: dummyProduct.slug,
        variant: dummyProduct.variants[0]
    };

    const productVariantToAdd2 = {
        slug: dummyProduct.slug,
        variant: dummyProduct.variants[1]
    };

    describe('addToCart', () => {

        it('adds a product to an empty cart', () => {
            const wrapper = shallow(<Shop products={[]} currency="£" />);

            wrapper.instance().addToCart(productVariantToAdd1);

            expect(Object.keys(wrapper.state().cartItems).length).toBe(1);
            expect(wrapper.state().cartItems).toHaveProperty('test-product-v1');
            expect(wrapper.state().cartItems['test-product-v1']).toHaveProperty('count', 1);
        });

        it('increases the count if the same product is added multiple times', () => {
            const wrapper = shallow(<Shop products={[]} currency="£" />);

            wrapper.instance().addToCart(productVariantToAdd1);

            expect(Object.keys(wrapper.state().cartItems).length).toBe(1);
            expect(wrapper.state().cartItems).toHaveProperty('test-product-v1');
            expect(wrapper.state().cartItems['test-product-v1']).toHaveProperty('count', 1);   

            wrapper.instance().addToCart(productVariantToAdd1);
            wrapper.instance().addToCart(productVariantToAdd1);

            expect(Object.keys(wrapper.state().cartItems).length).toBe(1);
            expect(wrapper.state().cartItems['test-product-v1']).toHaveProperty('count', 3);   
        });

        it('stores different variants of the same product as seperate cartItems', () => {
            const wrapper = shallow(<Shop products={[]} currency="£" />);

            wrapper.instance().addToCart(productVariantToAdd1);
            wrapper.instance().addToCart(productVariantToAdd2);
            wrapper.instance().addToCart(productVariantToAdd2);

            expect(Object.keys(wrapper.state().cartItems).length).toBe(2);
            expect(wrapper.state().cartItems).toHaveProperty('test-product-v1');
            expect(wrapper.state().cartItems).toHaveProperty('test-product-v2');
            expect(wrapper.state().cartItems['test-product-v1']).toHaveProperty('count', 1);
            expect(wrapper.state().cartItems['test-product-v2']).toHaveProperty('count', 2);
        });

    });

    describe('removeFromCart', () => {
        
        it('removes an item from the cart', () => {
            const wrapper = shallow(<Shop products={[]} currency="£" />);

            wrapper.instance().addToCart(productVariantToAdd1);
            wrapper.instance().addToCart(productVariantToAdd2);            

            expect(Object.keys(wrapper.state().cartItems).length).toBe(2);
            expect(wrapper.state().cartItems).toHaveProperty('test-product-v1');
            expect(wrapper.state().cartItems).toHaveProperty('test-product-v2');

            wrapper.instance().removeFromCart(productVariantToAdd1.variant.id);

            expect(Object.keys(wrapper.state().cartItems).length).toBe(1);
            expect(wrapper.state().cartItems).toHaveProperty('test-product-v2');
            expect(wrapper.state().cartItems).not.toHaveProperty('test-product-v1');
        });

        it('does not remove from the cart if no match', () => {
            const wrapper = shallow(<Shop products={[]} currency="£" />);

            wrapper.instance().addToCart(productVariantToAdd1);         

            expect(Object.keys(wrapper.state().cartItems).length).toBe(1);
            expect(wrapper.state().cartItems).toHaveProperty('test-product-v1');

            wrapper.instance().removeFromCart(productVariantToAdd2.variant.id);

            expect(Object.keys(wrapper.state().cartItems).length).toBe(1);
            expect(wrapper.state().cartItems).toHaveProperty('test-product-v1');
        });

    });

    describe('updateCartQuantity', () => {

        it('sets the quantity of a cartItem', () => {
            const wrapper = shallow(<Shop products={[]} currency="£" />);

            wrapper.instance().addToCart(productVariantToAdd1);         

            expect(Object.keys(wrapper.state().cartItems).length).toBe(1);
            expect(wrapper.state().cartItems).toHaveProperty('test-product-v1');
            expect(wrapper.state().cartItems['test-product-v1'].count).toBe(1);

            wrapper.instance().updateCartQuantity('test-product-v1', 4);

            expect(wrapper.state().cartItems['test-product-v1'].count).toBe(4);
        });

        it('removes the item when given a quantity of 0', () => {
            const wrapper = shallow(<Shop products={[]} currency="£" />);

            wrapper.instance().addToCart(productVariantToAdd1);         

            expect(Object.keys(wrapper.state().cartItems).length).toBe(1);
            expect(wrapper.state().cartItems).toHaveProperty('test-product-v1');
            expect(wrapper.state().cartItems['test-product-v1'].count).toBe(1);

            wrapper.instance().updateCartQuantity('test-product-v1', 0);

            expect(Object.keys(wrapper.state().cartItems).length).toBe(0);
            expect(wrapper.state().cartItems).not.toHaveProperty('test-product-v1');

        });

        it('removes the item when given a quantity of -1', () => {
            const wrapper = shallow(<Shop products={[]} currency="£" />);

            wrapper.instance().addToCart(productVariantToAdd1);         

            expect(Object.keys(wrapper.state().cartItems).length).toBe(1);
            expect(wrapper.state().cartItems).toHaveProperty('test-product-v1');
            expect(wrapper.state().cartItems['test-product-v1'].count).toBe(1);

            wrapper.instance().updateCartQuantity('test-product-v1', -1);

            expect(Object.keys(wrapper.state().cartItems).length).toBe(0);
            expect(wrapper.state().cartItems).not.toHaveProperty('test-product-v1');
        });

        it('has no effect when the variant is not in the cart', () => {
            const wrapper = shallow(<Shop products={[]} currency="£" />);

            wrapper.instance().addToCart(productVariantToAdd1);         

            expect(Object.keys(wrapper.state().cartItems).length).toBe(1);
            expect(wrapper.state().cartItems).toHaveProperty('test-product-v1');
            
            wrapper.instance().updateCartQuantity('test-product-v2', 4);

            expect(Object.keys(wrapper.state().cartItems).length).toBe(1);
            expect(wrapper.state().cartItems).not.toHaveProperty('test-product-v2');
        });

    });

});
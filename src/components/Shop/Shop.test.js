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

});
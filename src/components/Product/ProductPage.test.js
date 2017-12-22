import React from 'react';
import { shallow } from 'enzyme';
import ProductPage from './ProductPage';
import Product from './Product';

describe('<ProductPage />', () => {

    const addToCart = () => null;

    const dummyProducts = [
        { slug: "product-1" },
        { slug: "product-2" },
        { slug: "product-3" }
    ];

    it('finds and returns the correct product', () => {

        const matchParams = {
            params: {
                slug: "product-2"
            }
        };

        const wrapper = shallow(
            <ProductPage products={dummyProducts} match={matchParams} 
                addToCart={addToCart} /> 
        );

        expect(wrapper.find(Product)).toHaveLength(1);
        expect(wrapper.find(Product).props().product).toBe(dummyProducts[1]);
    });

    it('displays "loading..." whilst products are still being loaded', () => {
        
        const matchParams = {
            params: {
                slug: "product-2"
            }
        };

        const wrapper = shallow(
            <ProductPage products={[]} match={matchParams} 
                addToCart={addToCart} /> 
        );

        expect(wrapper.find(Product)).toHaveLength(0);
        expect(wrapper.contains(<span>Loading...</span>)).toBe(true);
    });

});
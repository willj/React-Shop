import React from 'react';
import { shallow } from 'enzyme';
import ProductList from './ProductList';
import Product from './Product';

describe('<ProductList />', () => {

    const dummyProducts = [
        {
            "slug": "banoffee-bar",
            "title": "Banoffee Bar",
            "desc": "Chunky Belgian milk chocolate with toffee, banana and caramel curls",
            "image": "/images/100gBanoffee.jpg",
            "currency": "£",
            "variants": [
                { "id": "banoffee-bar-100", "price": "3.95", "name": "100g Boxed", "image": "/images/100gBanoffee.jpg" },
                { "id": "banoffee-bar-40", "price": "1.75", "name": "40g", "image": "/images/40gBanoffee.jpg" }
            ],
            "categories": [
                "milk",
                "bars"
            ]
        },
        {
            "slug": "black-forest-bar",
            "title": "Black Forest Bar",
            "desc": "Dark chocolate and cherry slab, topped with cherry and white chocolate flakes",
            "image": "/images/100gBlackforest.jpg",
            "currency": "£",
            "variants": [
                { "id": "black-forest-bar-100", "price": "3.95", "name": "100g Boxed", "image": "/images/100gBlackforest.jpg" },
                { "id": "black-forest-bar-40", "price": "1.75", "name": "40g", "image": "/images/40gBlackForest.jpg" }
            ],
            "categories": [
                "dark",
                "bars"
            ]
        }
    ];

    const addToCart = () => null;

    it('displays a <Product /> for each product', () => {
        const wrapper = shallow(<ProductList products={dummyProducts} addToCart={addToCart} />);

        console.log(wrapper.find(Product));
        expect(wrapper.find(Product).length).toBe(2);
    });

});
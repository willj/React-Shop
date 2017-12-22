import React from 'react';
import { shallow } from 'enzyme';
import ProductPrice from './ProductPrice';

describe('<ProductPrice />', () => {

    it('returns the currency and price when only one price is present', () => {
        const productWithOneVariant = {
            "slug": "lemon-meringue",
            "currency": "£",
            "variants": [
                { "id": "lemon-meringue-6", "price": "5.95", "name": "Box of 6" }
            ]
        };

        const wrapper = shallow(<ProductPrice product={productWithOneVariant} />);

        expect(wrapper.text()).toEqual("£5.95");
    });

    it('returns the lowest price and "From" when multiple prices are present and the cheapest is last', () => {
        const productWithTwoVariants = {
            "slug": "black-forest-bar",
            "currency": "£",
            "variants": [
                { "id": "black-forest-bar-100", "price": "3.95", "name": "100g Boxed" },
                { "id": "black-forest-bar-40", "price": "1.75", "name": "40g" }
            ]
        };

        const wrapper = shallow(<ProductPrice product={productWithTwoVariants} />);

        expect(wrapper.text()).toEqual("From £1.75");
    });

    it('returns the lowest price and "From" when multiple prices are present and the cheapest is first', () => {
        const productWithTwoVariants = {
            "slug": "black-forest-bar",
            "currency": "£",
            "variants": [
                { "id": "black-forest-bar-40", "price": "1.75", "name": "40g" },
                { "id": "black-forest-bar-100", "price": "3.95", "name": "100g Boxed" }
            ]
        };

        const wrapper = shallow(<ProductPrice product={productWithTwoVariants} />);

        expect(wrapper.text()).toEqual("From £1.75");
    });

    it('returns the lowest price and "From" when multiple prices are present and they are the same price', () => {
        const productWithTwoSamePriceVariants = {
            "slug": "lemon-meringue",
            "currency": "£",
            "variants": [
                { "id": "lemon-meringue-6-red", "price": "5.95", "name": "Red Box of 6" },
                { "id": "lemon-meringue-6-blue", "price": "5.95", "name": "Blue Box of 6" }
            ]
        };

        const wrapper = shallow(<ProductPrice product={productWithTwoSamePriceVariants} />);

        expect(wrapper.text()).toEqual("From £5.95");
    });

});
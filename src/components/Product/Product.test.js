import React from 'react';
import { shallow } from 'enzyme';
import Product from './Product';

describe('<Product />', () => {

    const dummyProduct = {
        "slug": "salted-caramel",
        "title": "Salted Caramel",
        "desc": "Mmm, tasty!",
        "image": "SaltedCaramelSingle_medium.jpg",
        "currency": "£",
        "variants": [
            { "id": "salted-caramel-1", "price": "5.95", "name": "Box of 6", "image": "sc1.jpg" },
            { "id": "salted-caramel-2", "price": "9.95", "name": "Box of 12", "image": "sc2.jpg" }
        ],
        "categories": [
            "milk"
        ]
    };

    it('addToCart is called and passed a correctly shaped product', () => {
        
        let expectedVariant = { "id": "salted-caramel-1", "price": "5.95", "name": "Box of 6", "image": "sc1.jpg" }

        const addToCart = jest.fn();

        const wrapper = shallow(<Product product={dummyProduct} addToCart={addToCart} />);

        wrapper.find(".buy-button").simulate('click');

        expect(addToCart).toHaveBeenCalledTimes(1);
        expect(addToCart).toHaveBeenCalledWith("salted-caramel", expectedVariant);
    });

    it('defaults to the first variant in the list', () => {
        const wrapper = shallow(<Product product={dummyProduct} addToCart={() => null} />);

        expect(wrapper.state().selectedVariant).toBe(dummyProduct.variants[0]);
    });

    it('Changes the selectedVariant state and displayed properties when a new variant is selected', () => {
        const wrapper = shallow(<Product product={dummyProduct} addToCart={() => null} />);

        expect(wrapper.state().selectedVariant).toBe(dummyProduct.variants[0]);
        expect(wrapper.find('img').props().src).toBe("sc1.jpg");
        expect(wrapper.find('.display-price').text()).toBe("£5.95");

        wrapper.find('select').simulate('change', { target: { value: "salted-caramel-2" }});

        expect(wrapper.state().selectedVariant).toBe(dummyProduct.variants[1]);
        expect(wrapper.find('img').props().src).toBe("sc2.jpg");
        expect(wrapper.find('.display-price').text()).toBe("£9.95");
    });

    it('Adds the currently selected variant to the cart', () => {
        let variant1 = {
            slug: "salted-caramel",
            variant: dummyProduct.variants[0]
        };

        let variant2 = {
            slug: "salted-caramel",
            variant: dummyProduct.variants[1]
        }

        const addToCart = jest.fn();
        
        const wrapper = shallow(<Product product={dummyProduct} addToCart={addToCart} />);

        wrapper.find(".buy-button").simulate('click');

        expect(addToCart).toHaveBeenCalledTimes(1);
        expect(addToCart).toHaveBeenLastCalledWith(variant1.slug, variant1.variant);

        wrapper.find('select').simulate('change', { target: { value: "salted-caramel-2" }});
        wrapper.find(".buy-button").simulate('click');

        expect(addToCart).toHaveBeenCalledTimes(2);
        expect(addToCart).toHaveBeenLastCalledWith(variant2.slug, variant2.variant);
    });

    it('when no image is available for the selected variant the product image is shown', () => {
        let copyOfDummyProduct = Object.assign({}, dummyProduct);
        delete copyOfDummyProduct.variants[1].image;

        const wrapper = shallow(<Product product={dummyProduct} addToCart={() => null} />);

        expect(wrapper.find('img').props().src).toBe("sc1.jpg");

        wrapper.find('select').simulate('change', { target: { value: "salted-caramel-2" }});

        expect(wrapper.find('img').props().src).toBe("SaltedCaramelSingle_medium.jpg");
    });

});
import React from 'react';
import { shallow } from 'enzyme';
import CheckoutItem from './CheckoutItem';

describe('<CheckoutItem />', () => {

    const nullFunc = () => null;

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

    const cartItems = {
        'salted-caramel-1': {
            count: 2,
            slug: 'salted-caramel',
            variant: { id: 'salted-caramel-1', price: '5.95', name: 'Box of 6' }
        }, 
        'black-forest-bar-40': {
            count: 1,
            slug: 'black-forest',
            variant: { id: 'black-forest-bar-40', price: '1.75', name: '40g', image: 'bf40g.jpg' }
        }
    };

    it('calculates the total for this product variant', () => {
        const wrapper = shallow(
            <CheckoutItem cartItem={cartItems['salted-caramel-1']} product={dummyProducts[1]}
                currency="£" removeFromCart={nullFunc} updateCartQuantity={nullFunc} />  
        );

        expect(wrapper.find('.checkout-item-total').text()).toBe('£11.90');
    });

    it('the add button adds 1 to the quantity', () => {
        const updateQuantity = jest.fn();

        const wrapper = shallow(
            <CheckoutItem cartItem={cartItems['salted-caramel-1']} product={dummyProducts[1]}
                currency="£" removeFromCart={nullFunc} updateCartQuantity={updateQuantity} />  
        );

        wrapper.find('.add-one-button').simulate('click');

        expect(updateQuantity).toHaveBeenLastCalledWith('salted-caramel-1', 3);
    });

    it('the remove one button removes 1 from the quantity when there is more than one in the cart', () => {
        const updateQuantity = jest.fn();

        const wrapper = shallow(
            <CheckoutItem cartItem={cartItems['salted-caramel-1']} product={dummyProducts[1]}
                currency="£" removeFromCart={nullFunc} updateCartQuantity={updateQuantity} />  
        );

        wrapper.find('.remove-one-button').simulate('click');

        expect(updateQuantity).toHaveBeenLastCalledWith('salted-caramel-1', 1);
    });

    it('the remove one button removes the item when there is only one in the cart', () => {
        const updateQuantity = jest.fn();
        const removeFromCart = jest.fn();

        const wrapper = shallow(
            <CheckoutItem cartItem={cartItems['black-forest-bar-40']} product={dummyProducts[0]}
                currency="£" removeFromCart={removeFromCart} updateCartQuantity={updateQuantity} />  
        );

        wrapper.find('.remove-one-button').simulate('click');

        expect(updateQuantity).not.toHaveBeenCalled();
        expect(removeFromCart).toHaveBeenLastCalledWith('black-forest-bar-40');
    });

    it('the remove from cart button calls remove from cart', () => {
        const removeFromCart = jest.fn();

        const wrapper = shallow(
            <CheckoutItem cartItem={cartItems['salted-caramel-1']} product={dummyProducts[1]}
                currency="£" removeFromCart={removeFromCart} updateCartQuantity={nullFunc} />  
        );

        wrapper.find('.remove-from-cart-button').simulate('click');

        expect(removeFromCart).toHaveBeenLastCalledWith('salted-caramel-1');
    });

    it('shows the variant image if one exists', () => {
        const wrapper = shallow(
            <CheckoutItem cartItem={cartItems['black-forest-bar-40']} product={dummyProducts[0]}
                currency="£" removeFromCart={nullFunc} updateCartQuantity={nullFunc} />  
        );

        expect(wrapper.find('img').props().src).toBe('bf40g.jpg');

    });

    it('shows the main product image when the variant has no image', () => {
        const wrapper = shallow(
            <CheckoutItem cartItem={cartItems['salted-caramel-1']} product={dummyProducts[1]}
                currency="£" removeFromCart={nullFunc} updateCartQuantity={nullFunc} />  
        );

        expect(wrapper.find('img').props().src).toBe('/images/SaltedCaramelDouble.jpg');
    });

});
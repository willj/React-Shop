import React from 'react';
import { shallow } from 'enzyme';
import Checkout from './Checkout';
import CheckoutItem from './CheckoutItem';

describe('<Checkout />', () => {

    const dummyProducts = [
        { slug: 'salted-caramel' },
        { slug: 'black-forest' },
        { slug: 'milk-chocolate-truffle' }
    ];
    const currency = "£";
    const removeFromCart = () => null;
    const updateCartQuantity = () => null;

    const cartItems = {
        'salted-caramel-1': {
            count: 2,
            slug: 'salted-caramel',
            variant: { id: 'salted-caramel-1', price: '5.95', name: 'Box of 6', image: 'sc1.jpg' }
        }, 
        'black-forest-bar-40': {
            count: 1,
            slug: 'black-forest',
            variant: { id: 'black-forest-bar-40', price: '1.75', name: '40g', image: 'bf40g.jpg' }
        }
    };

    it('calculates the cart total correctly', () => {
        const wrapper = shallow(
            <Checkout products={dummyProducts} cartItems={cartItems}
                currency={currency} removeFromCart={removeFromCart} 
                updateCartQuantity={updateCartQuantity} />
        );

        expect(wrapper.find('.checkout-total').text()).toBe('£13.65');

    });

    it('recalculates the cart total correctly when quantities & items change', () => {
        const changingCartItems = Object.assign({}, cartItems);

        const wrapper = shallow(
            <Checkout products={dummyProducts} cartItems={changingCartItems}
                currency={currency} removeFromCart={removeFromCart} 
                updateCartQuantity={updateCartQuantity} />
        );

        expect(wrapper.find('.checkout-total').text()).toBe('£13.65');

        changingCartItems['black-forest-bar-40'].count = 4;
        wrapper.setProps({ cartItems: changingCartItems });

        expect(wrapper.find('.checkout-total').text()).toBe('£18.90');

        delete changingCartItems['salted-caramel-1'];
        wrapper.setProps({ cartItems: changingCartItems });

        expect(wrapper.find('.checkout-total').text()).toBe('£7.00');

        changingCartItems['milk-chocolate-truffle-12'] = {
            count: 2,
            slug: 'milk-chocolate-truffle',
            variant: { id: 'milk-chocolate-truffle-12', price: '9.95', name: 'Box of 12' }
        };
        wrapper.setProps({ cartItems: changingCartItems });

        expect(wrapper.find('.checkout-total').text()).toBe('£26.90');

    });

    it('displays a <CheckoutItem /> for each product variant in the cart', () => {
        const wrapper = shallow(
            <Checkout products={dummyProducts} cartItems={cartItems}
                currency={currency} removeFromCart={removeFromCart} 
                updateCartQuantity={updateCartQuantity} />
        );

        expect(wrapper.find(CheckoutItem)).toHaveLength(2);

    });

});
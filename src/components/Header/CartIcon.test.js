import React from 'react';
import { shallow } from 'enzyme';
import CartIcon from './CartIcon';

describe('<CartIcon />', () => {

    it('has no count when no items in the cart', () => {
        let cartItems = {};

        let wrapper = shallow(<CartIcon cartItems={cartItems} />);

        expect(wrapper.find('.cart-item-count').length).toBe(0);
    });

    it('shows a count of 3 when 3 items in the cart', () => {
        let cartItems = {
            'product-1': {
                count: 2
            },
            'product-2': {
                count: 1
            }
        };

        const wrapper = shallow(<CartIcon cartItems={cartItems} />);
        
        expect(wrapper.find('.cart-item-count').text()).toBe('3');
    });

    it('shows a count of 1 when 1 item in the cart', () => {
        let cartItems = {
            'product-1': {
                count: 1
            }
        };

        const wrapper = shallow(<CartIcon cartItems={cartItems} />);
        
        expect(wrapper.find('.cart-item-count').text()).toBe('1');
        
    });

});